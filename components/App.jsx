import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

const Links = () =>
  <ul className="nav navbar-nav">
    <li className="nav-item hidden-xs-down">
      <a className="title nav-link" href="/">
        lost-item
      </a>
    </li>
    <li className="nav-item"><a className="nav-link" href="/how-it-works">How Does It Work?</a></li>
  </ul>;

class AuthStatus extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    firebase.auth().signOut();
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
        <a className="nav-link nav-item" onClick={this.handleLogout} href="#">Log Out</a>
      </div>
    );
  }
}

class Nav extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-dark">
        <div className="clearfix">
          <button className="navbar-toggler float-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation" />
          <a className="navbar-brand hidden-sm-up" href="/">
            lost-item
          </a>
        </div>
        <div className="collapse navbar-toggleable-xs" id="bd-main-nav">
          <Links user={this.props.user} />
          <AuthStatus user={this.props.user} />
        </div>
      </nav>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = firebase.auth().currentUser;
    this.state = { user };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
      if (user) {
        // User is signed in.
      } else {
      }
    });
  }
  render() {
    const children = React.cloneElement(this.props.children, { user: this.state.user });
    return (
      <div>
        <Nav user={this.state.user} />
        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
