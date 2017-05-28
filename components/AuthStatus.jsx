import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { getFirebaseApp } from './db/FirebaseApp';

class AuthStatus extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    getFirebaseApp().auth().signOut();
    browserHistory.push('/');
  }

  render() {
    if (this.props.user === null) {
      return (
        <div id="authStatus" className="navbar-nav">
          <a className="nav-link nav-item" href="/signup">Sign Up</a>
          <a className="nav-link nav-item" href="/login">Log In</a>
        </div>
      );
    }
    return (
      <div id="authStatus" className="navbar-nav">
        <a className="nav-link nav-item" href="/settings">Settings</a>
        <a className="nav-link nav-item" onClick={this.handleLogout}>Log Out</a>
      </div>
    );
  }
}

export default AuthStatus;
