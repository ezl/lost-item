import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { getFirebaseApp } from './db/FirebaseApp';


class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      slug: '',
      updatingSettings: false,
      updateSettingsSuccessMessageVisible: false,
      updateSettingsErrorMessageVisible: false,
      updateSettingsErrorMessageText: '',
    };

    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    const database = getFirebaseApp().database();
    database.ref(`users/${this.props.user.uid}`).once('value').then((snapshot) => {
      const paidUntil = snapshot.val().paid_until;
      const currentDate = new Date().getTime();
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email,
        slug: snapshot.val().slug,
        can_change_link: paidUntil !== undefined && paidUntil !== null && paidUntil >= currentDate,
      });
    });
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  flashProfileUpdateSuccessMessage() {
    this.setState({ updateSettingsSuccessMessageVisible: true });
    setTimeout(
      () => {
        this.setState({ updateSettingsSuccessMessageVisible: false });
      }, 5000);
  }

  flashProfileUpdateErrorMessage(message) {
    this.setState({ updateSettingsErrorMessageText: message });
    this.setState({ updateSettingsErrorMessageVisible: true });
    setTimeout(
      () => {
        this.setState({ updateSettingsErrorMessageVisible: false });
      }, 5000);
  }

  updateProfile(e) {
    this.setState({ updatingSettings: true });
    e.preventDefault();
    const updates = {};
    updates[`users/${this.props.user.uid}/name`] = this.state.name;
    updates[`users/${this.props.user.uid}/email`] = this.state.email;
    if (this.state.can_change_link) {
      updates[`users/${this.props.user.uid}/slug`] = this.state.slug;
    }
    const user = this.props.user;
    if (user.email !== this.state.email) {
      user.updateEmail(this.state.email).then(() => {
        // Update successful.
      }, () => {
        this.flashProfileUpdateErrorMessage("Error Updating");
      });
    }

    // this.flashProfileUpdateErrorMessage("error message");

    const database = getFirebaseApp().database();
    database.ref().update(updates);
    // oh this is janky. just waiting a second and assuming success.
    setTimeout(
      () => {
        this.setState({ updatingSettings: false });
        this.flashProfileUpdateSuccessMessage();
      }, 1000);
  }

  render() {
    const url = `http://www.lost-item.com/${this.state.slug}`;
    return (
      <div>
        {this.props.location.state && this.props.location.state.verifyWarn &&
          <div className="info">In order to receive emails when you’ve lost an item, you MUST first verify your email address. Please check your inbox for a message from Formspree.com and click the link to verify your email address.</div>
        }
        <div className="row">
          <div className="col-md-12">
            <div>
              <label>Your Link</label>: <strong><a href={url}>www.lost-item.com/{this.state.slug}</a></strong>
              <small className="form-text text-muted">This is the link you&apos;ll label your stuff with. You can write it or print it on things you own like credit cards or cell phones, print labels and sew it to clothes.</small>
            </div>
            <div className="hidden-xs-up">
              <label>Your Log In Email Address</label>: {this.props.user.email}
              <small className="form-text text-muted">Use this email address to log in. It doesn&apos;t necessarily have to be the same as the contact email below.</small>
            </div>
          </div>
        </div>
        <br />
        {!this.state.can_change_link &&
          <Link className="nav-link" to="/payment">Choose your own link</Link> &&
          <br />
        }
        <form onSubmit={this.updateProfile}>
          <div className="form-group">
            <label>Name</label>
            <input value={this.state.name} name="name" onChange={this.handleChange.bind(this, 'name')} className="form-control" type="text" />
            <small className="form-text text-muted">What name do you want displayed on your Lost Item page?</small>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={this.state.email} name="email" onChange={this.handleChange.bind(this, 'email')} className="form-control" type="text" />
            <small className="form-text text-muted">This is the email address we will use to contact you if your lost items are found</small>
          </div>

          <div className="form-group">
            <label>Your Link</label>
            {this.state.can_change_link &&
              <div className="input-group">
                <span className="input-group-addon">http://lost-item.com/</span>
                <input value={this.state.slug} name="slug" onChange={this.handleChange.bind(this, 'slug')} className="form-control" type="text" />
              </div>
            }
            {!this.state.can_change_link &&
              <div className="input-group">
                <span className="input-group-addon">http://lost-item.com/{this.state.slug}</span>
              </div>
            }
          </div>

          {this.state.updatingSettings ?
            <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Updating Settings...</button>
          :
            <button className="btn btn-primary">Update Settings</button>
          }

          {this.state.updateSettingsErrorMessageVisible &&
          <span className="settingsFlashMessage settingsError">{this.state.updateSettingsErrorMessageText}</span>
          }
          {this.state.updateSettingsSuccessMessageVisible &&
          <span className="settingsFlashMessage settingsSuccess">Success!</span>
          }
        </form>
      </div>
    );
  }
}

SettingsForm.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
const SettingsFormWithRouter = withRouter(SettingsForm);

const Settings = (props) => (
  <div>
    <div className="row">
      <div className="col-md-6">
        <h2>Settings</h2>
        <br />
        <SettingsFormWithRouter user={props.user} />
      </div>
    </div>
  </div>
  );

Settings.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Settings;
