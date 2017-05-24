import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element,
};

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      slug: "",
      updatingSettings: false,
      updateSettingsSuccessMessageVisible: false,
      updateSettingsErrorMessageVisible: false,
      updateSettingsErrorMessageText: ''
    };

    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    var database = firebase.database()
    database.ref('users/' + this.props.user.uid).once('value').then(function(snapshot) {
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email,
        slug: snapshot.val().slug
      });
    }.bind(this));
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  flashProfileUpdateSuccessMessage() {
    console.log("flash success");
    this.setState({updateSettingsSuccessMessageVisible: true});
    setTimeout(
      () => {
        this.setState({updateSettingsSuccessMessageVisible: false});
      }, 5000);
  }

  flashProfileUpdateErrorMessage(message) {
    console.log("flash error");
    this.setState({updateSettingsErrorMessageText: message});
    this.setState({updateSettingsErrorMessageVisible: true});
    setTimeout(
      () => {
        this.setState({updateSettingsErrorMessageVisible: false});
      }, 5000);
  }

  updateProfile(e) {
    this.setState({updatingSettings: true});
    e.preventDefault();
    var data = {
      name: this.state.name,
      email: this.state.email,
      slug: this.state.slug
    };
    var user = this.props.user;
    console.log("emails are", user.email, this.state.email);
    if (user.email !== this.state.email) {
      console.log("emails DO NOT match. try update.");
      user.updateEmail(this.state.email).then(function() {
        console.log("update success!");
        // Update successful.
      }, function(error) {
        // An error happened.
        console.log("update failure :(", error.message);
      });
    } else {
      console.log("emails match, no need to update user.email");
    }

    // this.flashProfileUpdateErrorMessage("error message");

    var database = firebase.database();
    database.ref('users/' + user.uid).set(data);
    // oh this is janky. just waiting a second and assuming success.
    setTimeout(
      () => {
        this.setState({updatingSettings: false});
        this.flashProfileUpdateSuccessMessage()
      }, 1000);
  }

  render() {
    var url = "http://www.lost-item.com/" + this.state.slug;
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div>
              <label>Your Link</label>: <strong><a href={url}>www.lost-item.com/{this.state.slug}</a></strong>
              <small className="form-text text-muted">This is the link you'll label your stuff with. You can write it or print it on things you own like credit cards or cell phones, print labels and sew it to clothes.</small>
            </div>
            <div className='hidden-xs-up'>
              <label>Your Log In Email Address</label>: {this.props.user.email}
              <small className="form-text text-muted">Use this email address to log in. It doesn't necessarily have to be the same as the contact email below.</small>
            </div>
          </div>
        </div>
        <br />
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
            <div className="input-group">
              <span className="input-group-addon">http://lost-item.com/</span>
              <input value={this.state.slug} name="slug" onChange={this.handleChange.bind(this, 'slug')}  className="form-control" type="text" />
            </div>
          </div>

          {this.state.updatingSettings ?
          <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin"></i> Updating Settings...</button>
          :
          <button className="btn btn-primary">Update Settings</button>
          }

          {this.state.updateSettingsErrorMessageVisible &&
          <span className='settingsFlashMessage settingsError'>{this.state.updateSettingsErrorMessageText}</span>
          }
          {this.state.updateSettingsSuccessMessageVisible &&
          <span className='settingsFlashMessage settingsSuccess'>Success!</span>
          }
        </form>
      </div>
    );
  }
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user === null) {
      return (
        <div><h2>You must be logged in to view this page</h2><a href="/">Click here to back to the home page.</a></div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>Settings</h2>
              <br />
              <SettingsForm user={this.props.user} />
            </div>
          </div>
        </div>
      );
    }
  }
}

Settings.propTypes = propTypes;

export default Settings;
