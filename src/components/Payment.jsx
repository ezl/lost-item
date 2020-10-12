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

  handleSelectOption = e => {
    e.stopPropagation();

    // Get both payment options so we can mark one as active
    let options = document.querySelectorAll('.options .col-sm-6');

    options.forEach(el => {
      el.classList.remove('active');
    });

    e.target.classList.add('active');

    amount = e.target.getAttribute('data-value');
    period = e.target.getAttribute('data-period');
    this.setState({
      selectedOption: amount,
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
        <div className="row payment">
          <div className="col-md-8 offset-md-2 shadow">
            <h2 className="big-title color-blue">Change <span>Link</span></h2>

            <br />

            <p className="bigger">Get a friendlier, easier to remember lost-item link.</p>

            <p>Instead of <span className="blue">lost-item.com/{this.props.location.state.slug}</span>, choose your own custom link! For example, mine is www.lost-item.com/eric - super handy dandy and easy to remember. :)</p>

            <p className="bigger">What do you want your custom lost-item link to be?</p>

            <div className="divider"></div>

            <p className="bigger center blue">We have 2 plans:</p>

            <p className="bigger center">You can hold your custom link for $19.00/year or an annual subscription.</p>

            <div className="row options">
              <div className="col-sm-6" id="1y" data-period="1" data-value="19.00" onClick={this.handleSelectOption}>
                <div className="content">
                  <h3>$19</h3>
                  <p>per year</p>
                </div>
                <p className="last">(You'll get charged again in a year)</p>
              </div>

              <div className="col-sm-6" id="forever" data-period="99" data-value="59.00" onClick={this.handleSelectOption}>
                <div className="content">
                  <h3>$59</h3>
                  <p>lifetime</p>
                </div>
                <p className="last">(For a 1 time payment of $59.00 you get your link forever!)</p>
              </div>
            </div>

            {/* No need to remove the old inputs, we can just hide them just in case */}
            <div style={{ display: 'none' }}>
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
        </div>
      </div>
    );
  }
}

const PayPalCheckout = withRouter(PayPalCheckoutNR);
export default PayPalCheckout;
