import React from 'react';
import paypal from 'paypal-checkout';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getFirebaseApp } from './db/FirebaseApp';
import PaymentForm from './PaymentForm';

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
      slug: '',
      updatingLink: false,
      updateLinkErrorMessageVisible: false,
      updateLinkErrorMessageText: '',
    };

    th = this;

    this.updateLink = this.updateLink.bind(this);
    this.flashLinkUpdateErrorMessage = this.flashLinkUpdateErrorMessage.bind(this);
    this.showSuccessMessage = this.showSuccessMessage.bind(this);
  }

  componentDidMount() {
    const database = getFirebaseApp().database();

    // Get user data
    database.ref(`users/${this.props.user.uid}`).once('value').then((snapshot) => {
      console.log("THE SNAPSHOT", snapshot)
      const paidUntil = snapshot.val().paid_until;
      const currentDate = new Date().getTime();
      this.setState({
        slug: snapshot.val().slug,
        can_change_link: paidUntil !== undefined && paidUntil !== null && paidUntil >= currentDate,
      });
    });
  }

  componentWillUnmount() {
    amount = 0;
  }

  flashLinkUpdateErrorMessage(message) {
    this.setState({
      updateLinkErrorMessageText: message,
      updateLinkErrorMessageVisible: true,
    }, () => {
      setTimeout(
        () => {
          this.setState({ updateLinkErrorMessageVisible: false });
        }, 5000);
    });
  }

  showSuccessMessage() {
    // Play animation of the alert
    document.querySelector('.copied').classList.add('active');

    setTimeout(() => {
      document.querySelector('.copied').classList.remove('active');
    }, 2000);
  }

  async updateLink() {
    this.setState({ updatingLink: true });
    const updates = {};

    if (this.state.can_change_link) {
      updates[`users/${this.props.user.uid}/slug`] = this.state.slug;
    }

    const database = getFirebaseApp().database();

    database.ref().update(updates).then(() => {
      // Toast with OK message
      this.showSuccessMessage();
    }, (error) => {
      this.flashLinkUpdateErrorMessage(error.message)
    }).finally(() => {
      this.setState({ updatingLink: false });
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

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
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
        <div className="copied">Link updated.</div>

        <div className="container">
          <div className="row payment">
            <div className="col-md-8 offset-md-2 shadow">
              <h2 className="big-title color-blue">Change <span>Link</span></h2>

              <br />

              <p className="bigger">Get a friendlier, easier to remember lost-item link.</p>

              <p>Instead of <span className="blue">lost-item.com/{this.state.slug}</span>, choose your own custom link! For example, mine is www.lost-item.com/eric - super handy dandy and easy to remember. :)</p>

              <p className="bigger">What do you want your custom lost-item link to be?</p>

              {this.state.can_change_link &&
                <div>
                  <div className="change-link">
                    <p className="blue">www.lost-item.com/</p>
                    <input value={this.state.slug} className="form-control" type="text" onChange={this.handleChange.bind(this, 'slug')} />
                  </div>

                  {this.state.updatingLink ?
                    <button type="submit" className="left btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Updating Link...</button>
                    :
                    <button type="submit" className="left btn btn-primary" onClick={this.updateLink}>Update Link</button>
                  }

                  {this.state.updateLinkErrorMessageVisible &&
                    <span className="settingsFlashMessage settingsError">{this.state.updateLinkErrorMessageText}</span>
                  }
                </div>
              }

              {!this.state.can_change_link &&
                <div>
                  <div className="divider"></div>

                  <p className="bigger center blue">We have 2 plans:</p>

                  <p className="bigger center">You can hold your custom link for $1,99/month or a one-time payment lifetime subscription.</p>

                  <div className="row options">
                    <div className="col-sm-6" id="1y" data-period="1" data-value="23.88" onClick={this.handleSelectOption}>
                      <div className="content">
                        <h3>$1,99</h3>
                        <p className="text-xs-center">monthly<br/>billed annually</p>
                      </div>
                      <p className="last">(You'll get charged again in a year)</p>
                    </div>

                    <div className="col-sm-6" id="forever" data-period="99" data-value="69.00" onClick={this.handleSelectOption}>
                      <div className="content">
                        <h3>$69</h3>
                        <p className="text-xs-center">lifetime<br/>own it forever!</p>
                      </div>
                      <p className="last">(For a 1 time payment of $69.00 you get your link forever!)</p>
                    </div>
                  </div>

                  <PaymentForm price={amount} user={this.props.user} />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PayPalCheckout = withRouter(PayPalCheckoutNR);
export default PayPalCheckout;
