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
      slug: ""
    };
  }

  componentDidMount() {
    console.log("mount")

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
        <form>
          <div className="form-group">
            <label>Name</label>
            <input value={this.state.name} className="form-control" type="text" />
            <small className="form-text text-muted">Como te llamas?</small>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input value={this.state.email} className="form-control" type="text" />
            <small className="form-text text-muted">An email address so we can let you know if your lost items are found</small>
          </div>
          <button disabled className="btn btn-primary">Update Settings</button>
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
        <div><h2>You must be logged in to view this page</h2></div>
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
