import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { getFirebaseApp } from './db/FirebaseApp';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_51Hdf2RFamwKDllrdzOLjiET8r1vNeMudSeOZrxpga0CVAxE6fl8OYE0jESutkXBu5WXisISnnRexcuPIok3v85MO00n5NKlOaB');

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false,
    };

    this.changeLink = this.changeLink.bind(this);
  }

  async changeLink() {
    this.setState({ sending: true });
    
    const database = getFirebaseApp().database();
    const updates = {};
    // Get Stripe.js instance
    const stripe = await stripePromise;
    let link = ''

    if (this.props.price === '19.00') link = 'https://us-central1-lost-item-ba357.cloudfunctions.net/paymentYearlySession'
    if (this.props.price === '59.00') link = 'https://us-central1-lost-item-ba357.cloudfunctions.net/paymentLifetimeDealSession'

    // Call your backend to create the Checkout Session
    const response = await fetch(link, { method: 'POST' });

    const session = await response.json();

    // Add the session id to the database so we can check webhooks later
    updates[`users/${this.props.user.uid}/stripe_session`] = session.id;

    database.ref().update(updates).then(async () => {
      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    }, (error) => {
      this.flashLinkUpdateErrorMessage(error.message)
    });
  }

  render() {
    return (
      <div>
        {!this.state.sending &&
        <div>
          {this.props.price === 0
            ? <div></div>
            : <button className="left btn btn-primary" role="link" onClick={this.changeLink}>Change my link</button>
          }
        </div>
        }

        {this.state.sending &&
          <button className="left btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Please wait a moment...</button>
        }
      </div>
    );
  }
}

export default PaymentForm;