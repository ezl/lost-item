const functions = require('firebase-functions')
const postmarkTransport = require('nodemailer-postmark-transport')
const nodemailer = require('nodemailer')
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const database = admin.database();
const stripe = require('stripe')(functions.config().stripe.test);
const endpointSecret = `${functions.config().stripe.endpoint}`;

const postmarkKey = functions.config().postmark.key
const mailTransport = nodemailer.createTransport(postmarkTransport({
  auth: {
    apiKey: postmarkKey
  }
}))

function sendEmail (user, what, where, how) {
  // 5. Send welcome email to new users
  console.log(user)
  const mailOptions = {
      from: '"Found Lost Item!!!" <found@lost-item.com>',
      to: `${user.email}`,
      subject: 'Lost Item Found!',
      html: `
        Great news, ${user.name}! <br/><br/> 
          
        Someone found something that belongs to you! <br/> 
          
        <strong>What did they find?</strong> <br/> 
        ${what} <br/> 

          <strong>Where did they find it?</strong> <br/> 
        ${where} <br/> 

        <strong>Here's how you can get it back:</strong> <br/> 
        ${how} <br/> 
          
        Have a great day! :)`
  }
  // 6. Process the sending of this email via nodemailer
  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('Lost Item Email'))
    .catch((error) => console.error('There was an error while sending the email:', error))
}

exports.stripeWebhooks = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const payload = request.rawBody;
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        // Update the dabatase if the payment_status is "paid"
        if(session.payment_status === 'paid') {
          database.ref('/users')
          .orderByChild('stripe_session')
          .equalTo(session.id)
          .once('value')
          .then((snapshot) => {
            if (snapshot.val() !== null) {
              const updates = {};
              let key = Object.keys(snapshot.val())[0];

              // Calculate if we're paying for a year or lifetime option and set paid_until
              if(session.amount_total == 1900) {
                const currentDate = new Date();
                currentDate.setFullYear(currentDate.getFullYear() + 1);
                updates[`users/${key}/paid_until`] = currentDate.getTime();
              } else if (session.amount_total == 5900) {
                const currentDate = new Date();
                currentDate.setFullYear(currentDate.getFullYear() + 99);
                updates[`users/${key}/paid_until`] = currentDate.getTime();
              }
              database.ref().update(updates);
            }
          }).then(() => {
            response.status(200).send(`Session completed`);
          }).catch(() => {
            response.status(400).send(`Session error`);
          })
        }
        // console.log(`checkout.session.completed name -> ${session.id}`);
        // console.log(`checkout.session.completed status -> ${session.payment_status}`);
        // console.log(`checkout.session.completed amount -> ${session.amount_total}`);
        break;
      default:
        console.log('Event type not supported');
        response.status(200).send(`Something other event we don't need`);
        break;
    }
  }
})

exports.paymentYearlySession = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1HeYI5FamwKDllrdEE3kMEuj',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://www.lost-item.com/success',
      cancel_url: 'https://www.lost-item.com/settings',
    });

    response.status(200).send({ id: session.id })
  }
})

exports.paymentLifetimeDealSession = functions.https.onRequest(async (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          name: 'Lifetime deal for Lost-item',
          description: 'You can customize this description on the firebase functions',
          amount: 5900,
          currency: 'usd',
          quantity: 1,
        },
      ],
      success_url: 'https://www.lost-item.com/success',
      cancel_url: 'https://www.lost-item.com/settings',
    });

    response.status(200).send({ id: session.id })
  }
})

exports.notifyUser = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true'); // vital
  if (request.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    response.set('Access-Control-Allow-Methods', 'GET');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.set('Access-Control-Max-Age', '3600');
    response.status(204).send('');
  } else {
    database.ref('/users')
    .orderByChild('slug')
    .equalTo(request.body.slug)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val() !== null) {
        snapshot.forEach(function(data) {
          const user = data.val()
          sendEmail(user, request.body.what, request.body.where, request.body.how )
        })
      }
    }).then(() => {
      response.status(200).send("")
    })
  }
})
