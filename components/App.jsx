import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

class Links extends React.Component {
  render() {
    return(
      <ul className="nav navbar-nav">
        <li className="nav-item hidden-xs-down">
          <a className="title nav-link" href="/">
            <img src="/images/morgia.png" /> Lost-Item
          </a>
        </li>
        <li className="nav-item"><a className="nav-link" href="/signup">Get Your Own Link (It&#39;s Free)</a></li>
        <li className="nav-item"><a className="nav-link" href="/how-it-works">How Does It Work?</a></li>
        <li className="nav-item"><a className="nav-link" href="/shop">Buy Labels</a></li>
      </ul>
    )
  }
}

class AuthStatus extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut() {
    alert("logout not implemented");
  }
  render() {
    if (this.props.user.loggedInUser === null) {
      return (
        <div id="authStatus">
          <a className='nav-link nav-item' href="/login">Log In</a>
        </div>
      )
    } else {
      return (
        <div id="authStatus" className="navbar-nav">
          <div id="username"><i className="fa fa-user-o"></i> <strong>{this.props.user.email}</strong></div>
          <a className='nav-link nav-item' href='/settings'>Settings</a>
          <a className='nav-link nav-item' onClick={this.handleLogOut} href="#">Log Out</a>
        </div>
      )
    }
  }
}

class Nav extends React.Component {

  constructor(props) {
    super(props);
    const firebaseAnonymousUser = {loggedInUser: null};
    this.state = {user: firebaseAnonymousUser};
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        this.setState({'user': user});
        console.log(user);
      } else {
        this.setState({'user': firebaseAnonymousUser});
      }
    }.bind(this));

  }

  render() {
    const user = {name:"Eric", email:"foo@ba.cm"};
    console.log("USER", this.state);
    return (
      <nav className="navbar navbar-light">
        <div className="clearfix">
          <button className="navbar-toggler float-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation"></button>
          <a className="navbar-brand hidden-sm-up" href="/">
            <img src="/images/morgia.png" /> Lost-Item.Com
          </a>
        </div>
        <div className="collapse navbar-toggleable-xs" id="bd-main-nav">
          <Links />
          <AuthStatus user={this.state.user} />
        </div>
      </nav>
    )
  }
}

function App({ children, routes }) {
  return (
    <div>
      <Nav />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
