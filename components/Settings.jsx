import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
      updateSettingsSuccessMessageVisible: false
    };

    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    var database = firebase.database
    firebase.database().ref('users/' + this.props.user.uid).once('value').then(function(snapshot) {
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email,
        slug: snapshot.val().slug
      });
    }.bind(this));
  }
  specialtyLinkClickHandler() {
    alert("Feature not yet implemented.");
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  flashProfileUpdateSuccessMessage() {
    console.log("flash");
    this.setState({updateSettingsSuccessMessageVisible: true});
    setTimeout(
      () => {
        this.setState({updateSettingsSuccessMessageVisible: false});
      }, 3000);
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
    var database = firebase.database();
    database.ref('users/' + user.uid).set(data);
    setTimeout(
      () => {
        this.setState({updatingSettings: false});
        this.flashProfileUpdateSuccessMessage()
      }, 1000);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="pull-left">
              <label>Your Link</label>: <strong>www.lost-item.com/{this.state.slug}</strong>
              <small className="form-text text-muted">This is the link you'll label your stuff with</small>
            </div>
            <div className="pull-right"><button onClick={this.specialtyLinkClickHandler} className="btn btn-success">Buy a specialty link</button></div>
          </div>
        </div>
        <br />
        <form onSubmit={this.updateProfile}>
          <div className="form-group">
            <label>Name</label>
            <input value={this.state.name} name="name" onChange={this.handleChange.bind(this, 'name')} className="form-control" type="text" />
            <small className="form-text text-muted">Como te llamas?</small>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={this.state.email} name="email" onChange={this.handleChange.bind(this, 'email')} className="form-control" type="text" />
            <small className="form-text text-muted">An email address so we can let you know if your lost items are found</small>
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input value={this.state.slug} name="slug" onChange={this.handleChange.bind(this, 'slug')}  className="form-control" type="text" />
          </div>

          {this.state.updatingSettings ?
          <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin"></i> Updating Settings...</button>
          :
          <button className="btn btn-primary">Update Settings</button>
          }

          {this.state.updateSettingsSuccessMessageVisible &&
          <span id="settingsUpdateSuccessMessage">Success!</span>
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
