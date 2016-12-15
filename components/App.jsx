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
        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/signup">Get Your Own Link (It&#39;s Free)</a></li>
        <li className="nav-item"><a className="nav-link" href="/how-it-works">How Does It Work?</a></li>
        <li className="nav-item"><a className="nav-link" href="/shop">Buy Labels</a></li>
      </ul>
    )
  }
}

class AuthStatus extends React.Component {
  render() {
    if (this.props.user === null) {
      return (
        <div id="authStatus">
          <a href="/login">Log In</a>
        </div>
      )
    } else {
      return (
        <div id="authStatus">
          <i className="fa fa-user-o"></i> <strong>{this.props.user.email}</strong> (<a href="#">Log Out</a>)
        </div>
      )
    }
  }
}

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'loggedInUser': null};
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        this.setState({'user': user});
        console.log(user);
      } else {
        this.setState({'user': null});
      }
    }.bind(this));

  }

  render() {
    const user = {name:"Eric", email:"foo@ba.cm"};
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">Lost-Item.Com</a>
        <Links />
        <AuthStatus user={user} />
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
