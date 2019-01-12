import React from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getFirebaseApp } from './db/FirebaseApp';

const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

const propTypes = {
  env: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
};

PayPalButton.propTypes = propTypes;
let amount = 0;
let period = 0;
let th;

class PayPalCheckoutNR extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
    };
    th = this;
  }


  onAuthorize(data, actions) {
    return actions.payment.execute().then(() => {
      const database = getFirebaseApp().database();
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() + period);
      const updates = {};
      updates[`users/${th.props.user.uid}/paid_until`] = currentDate.getTime();
      database.ref().update(updates);
      th.props.history.push('/settings/');
    });
  }

  payment() {
    const env = this.props.env;
    const client = this.props.client;

    return paypal.rest.payment.create(env, client, {
      transactions: [
        {
          amount: { total: amount, currency: 'USD' },
        },
      ],
    });
  }

  handleOptionChange = e => {
    amount = e.target.value;
    period = e.target.getAttribute('data-period');
    this.setState({
      selectedOption: amount,
    });
  };

  render() {
    const client = {
      sandbox: 'AZ_--6AsX9VFy48qw7j4lzza-B2WI7n-iSWr_iRPIFWi0O_AbwNnxYJHjD47x0MMiqLzdg6eEflb3tgh',
      production: 'ASII0h6jpjWsQ_WUA5Id_aaubko50xz2fLaGaWCFpPPLKi3mKvXBX0TzZuTf-Vugu89zW8HztXf73XHO',
    };
    console.log(this.props.location)
    return (
      <div>
        <div>

          <p>Get a friendlier, easier to remember lost-item link.</p>

            <p>Instead of lost-item.com/{this.props.location.state.slug}, choose your own custom link! For example, mine is www.lost-item.com/eric - super handy dandy and easy to remember. :)</p>

            <p>We have 2 plans:</p>

            <p>You can hold your custom link for $19.00/year on an annual subscription (You&#39;ll get charged again in a year).</p>
            <p>For a 1 time payment of $59.00, you get your link forever!</p>
            <p>Payment is super secure via Paypal.</p>

            <p>Which option works best for you?</p>
          <div>
            <label htmlFor="1y">
              <input id="1y" type="radio" data-period="1" value="19.00" name="period" checked={this.state.selectedOption === '19.00'} onChange={this.handleOptionChange} /> $19/year </label>
          </div>
          <div>
            <label htmlFor="forever">
              <input id="forever" type="radio" data-period="99" value="59.00" name="period" checked={this.state.selectedOption === '59.00'} onChange={this.handleOptionChange} /> $59/forever </label>
          </div>
        </div>
        <PayPalButton
          env={'production'}
          client={client}
          payment={this.payment}
          commit // Optional: show a 'Pay Now' button in the checkout flow
          onAuthorize={this.onAuthorize}
        />
      </div>
    );
  }
}

const PayPalCheckout = withRouter(PayPalCheckoutNR);
export default PayPalCheckout;
