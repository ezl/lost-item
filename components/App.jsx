/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import AuthStatus from './AuthStatus';
import { getFirebaseApp } from './db/FirebaseApp';

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

const Nav = (props) =>
  <nav className="navbar navbar-dark">
    <div className="clearfix">
      <button className="navbar-toggler float-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation" />
      <a className="navbar-brand hidden-sm-up" href="/">
        lost-item
      </a>
    </div>
    <div className="collapse navbar-toggleable-xs" id="bd-main-nav">
      <Links user={props.user} />
      <AuthStatus user={props.user} />
    </div>
  </nav>;

Nav.propTypes = {
  user: PropTypes.object,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const user = getFirebaseApp().auth().currentUser;
    this.state = { user };
  }

  componentDidMount() {
    getFirebaseApp().auth().onAuthStateChanged((user) => {
      this.setState({ user });
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
