const functions = require("firebase-functions");
const postmarkTransport = require("nodemailer-postmark-transport");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();
const database = admin.database();
const stripe = require("stripe")(functions.config().stripe.test);
const endpointSecret = `${functions.config().stripe.endpoint}`;

const postmarkKey = functions.config().postmark.key;
const mailTransport = nodemailer.createTransport(
  postmarkTransport({
    auth: {
      apiKey: postmarkKey,
    },
  })
);

function sendEmail(user, what, where, how) {
  // 5. Send welcome email to new users
  console.log(user);
  const mailOptions = {
    from: '"Found Lost Item!!!" <found@lost-item.com>',
    to: `${user.email}`,
    subject: "Lost Item Found!",
    html: `
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
      <div style="
      position: relative;
      width: 100%;
      background-color: #F2F2F2;
      padding: 40px;
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
    ">
      <div style="
        width: 130px;
        margin: 20px auto 30px;
      ">
        <img src="https://www.lost-item.com/images/logo.svg" style="width: 100%;" alt="">
      </div>
      <div style="
        width: 570px;
        margin: 20px auto;
        background-color: white;
        border-radius: 8px;
        padding: 32px;
        color: #242448;
      ">
        <p style="
          font-size: 20px;
          font-weight: 500;
          margin: 0;
        ">Great news, ${user.name}!</p>
        <p style="
          font-size: 16px;
          margin: 15px 0 30px;
        ">Someone found something that belongs to you!</p>
        <div style="display: block;">
          <img src="./sample.png" style="
            display: inline-block;
            width: 160px;
            height: 160px;
            margin-right: 50px;
            vertical-align: top;
            border-radius: 8px;
          " alt="">
          <div style="
            display: inline-block;
            width: calc(100% - 220px);
          ">
            <p style="
              font-size: 16px;
              font-weight: 600;
              color: #1DAD99;
              margin: 0;
            ">What did they find?</p>
            <p style="margin: 8px 0 16px;">${what}</p>
            <p style="
              font-size: 16px;
              font-weight: 600;
              color: #1DAD99;
              margin: 0;
            ">Where did they find it?</p>
            <p style="margin: 8px 0 16px;">${where}</p>
            <p style="
              font-size: 16px;
              font-weight: 600;
              color: #1DAD99;
              margin: 0;
            ">Here’s how you can get it back:</p>
            <p style="margin: 8px 0 16px;">${how}</p>
          </div>
        </div>
        <div style="
          text-align: center;
          border-top: 1px solid #D2E2E0;
          padding-top: 30px;
          margin-top: 22px;
        ">
          <p style="margin: 0 0 8px;">Have a great day! :)</p>
          <p style="
            font-size: 16px;
            font-weight: 500;
            color: #1DAD99;
            margin: 0;
          ">The Lost-item Team</p>
        </div>
      </div>
      <p style="
        text-align: center;
        font-size: 12px;
        margin-top: 40px;
      ">2020 Lost-item, All rights reserved</p>
    </div>`,
  };
  // 6. Process the sending of this email via nodemailer
  return mailTransport
    .sendMail(mailOptions)
    .then(() => console.log("Lost Item Email"))
    .catch((error) =>
      console.error("There was an error while sending the email:", error)
    );
}

exports.stripeWebhooks = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Credentials", "true"); // vital
    if (request.method === "OPTIONS") {
      // Send response to OPTIONS requests
      response.set("Access-Control-Allow-Methods", "GET");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.set("Access-Control-Max-Age", "3600");
      response.status(204).send("");
    } else {
      const payload = request.rawBody;
      const sig = request.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
      }

      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;

          // Update the dabatase if the payment_status is "paid"
          if (session.payment_status === "paid") {
            database
              .ref("/users")
              .orderByChild("stripe_session")
              .equalTo(session.id)
              .once("value")
              .then((snapshot) => {
                if (snapshot.val() !== null) {
                  const updates = {};
                  let key = Object.keys(snapshot.val())[0];

                  // Calculate if we're paying for a year or lifetime option and set paid_until
                  if (session.amount_total == 1900) {
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
              })
              .then(() => {
                response.status(200).send(`Session completed`);
              })
              .catch(() => {
                response.status(400).send(`Session error`);
              });
          }
          // console.log(`checkout.session.completed name -> ${session.id}`);
          // console.log(`checkout.session.completed status -> ${session.payment_status}`);
          // console.log(`checkout.session.completed amount -> ${session.amount_total}`);
          break;
        default:
          console.log("Event type not supported");
          response.status(200).send(`Something other event we don't need`);
          break;
      }
    }
  }
);

exports.paymentYearlySession = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Credentials", "true"); // vital
    if (request.method === "OPTIONS") {
      // Send response to OPTIONS requests
      response.set("Access-Control-Allow-Methods", "GET");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.set("Access-Control-Max-Age", "3600");
      response.status(204).send("");
    } else {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: "price_1HeYI5FamwKDllrdEE3kMEuj",
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: "https://www.lost-item.com/success",
        cancel_url: "https://www.lost-item.com/settings",
      });

      response.status(200).send({ id: session.id });
    }
  }
);

exports.paymentLifetimeDealSession = functions.https.onRequest(
  async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Credentials", "true"); // vital
    if (request.method === "OPTIONS") {
      // Send response to OPTIONS requests
      response.set("Access-Control-Allow-Methods", "GET");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.set("Access-Control-Max-Age", "3600");
      response.status(204).send("");
    } else {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            name: "Lifetime deal for Lost-item",
            description:
              "You can customize this description on the firebase functions",
            amount: 5900,
            currency: "usd",
            quantity: 1,
          },
        ],
        success_url: "https://www.lost-item.com/success",
        cancel_url: "https://www.lost-item.com/settings",
      });

      response.status(200).send({ id: session.id });
    }
  }
);

exports.notifyUser = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  response.set("Access-Control-Allow-Credentials", "true"); // vital
  if (request.method === "OPTIONS") {
    // Send response to OPTIONS requests
    response.set("Access-Control-Allow-Methods", "GET");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");
    response.status(204).send("");
  } else {
    database
      .ref("/users")
      .orderByChild("slug")
      .equalTo(request.body.slug)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() !== null) {
          snapshot.forEach(function (data) {
            const user = data.val();
            sendEmail(
              user,
              request.body.what,
              request.body.where,
              request.body.how
            );
          });
        }
      })
      .then(() => {
        response.status(200).send("");
      });
  }
});
