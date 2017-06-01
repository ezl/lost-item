import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
    this.props.history.push('/');
  }

  render() {
    if (this.props.user === null) {
      return (
        <div id="authStatus" className="navbar-nav">
          <Link className="nav-link nav-item" to="/signup">Sign Up</Link>
          <Link className="nav-link nav-item" to="/login">Log In</Link>
        </div>
      );
    }
    return (
      <div id="authStatus" className="navbar-nav">
        <Link className="nav-link nav-item" to="/settings">Settings</Link>
        <a className="nav-link nav-item" onClick={this.handleLogout}>Log Out</a>
      </div>
    );
  }
}

export default withRouter(AuthStatus);
