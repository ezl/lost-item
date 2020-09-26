const functions = require('firebase-functions')
const postmarkTransport = require('nodemailer-postmark-transport')
const nodemailer = require('nodemailer')
const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();
const database = admin.database();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
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
