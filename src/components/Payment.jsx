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
    user: PropTypes.object.isRequired
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
      production: 'ASsXllfkIJcAdJkmuqXtqfGNegHSMJee1MKNh5ie4hcreZPMgN2IdhsXq80C6BrThMqUGA1Wn91t_GnT',
    };

    return (
      <div>
        <div>
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
