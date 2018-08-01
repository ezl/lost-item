/* eslint-disable max-len */
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import PropTypes from 'prop-types';
import AuthStatus from './AuthStatus';
import { getFirebaseApp } from './db/FirebaseApp';
import SignUp from './Signup';
import LogIn from './LogIn';
import Home from './Home';
import HowItWorks from './HowItWorks';
import UserPage from './UserPage';
import Settings from './Settings';
import PrivateRoute from './PrivateRoute';
import Loading from './Loading';
import PayPalCheckout from './Payment';


const Links = () =>
  <ul className="nav navbar-nav">
    <li className="nav-item hidden-xs-down">
      <Link className="title nav-link" to="/">
        lost-item
      </Link>
    </li>
    <li className="nav-item"><Link className="nav-link" to="/how-it-works">How Does It Work?</Link></li>
  </ul>;

const Nav = (props) =>
  <nav className="navbar navbar-dark">
    <div className="clearfix">
      <button className="navbar-toggler float-xs-right hidden-sm-up" type="button" data-toggle="collapse" data-target="#bd-main-nav" aria-controls="bd-main-nav" aria-expanded="false" aria-label="Toggle navigation" />
      <Link className="navbar-brand hidden-sm-up" to="/">
          lost-item
        </Link>
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
  state = {
    user: null,
    loading: true,
  };

  componentDidMount() {
    this.removeListener = getFirebaseApp().auth().onAuthStateChanged((user) => {
      this.setState({
        user,
        loading: false,
      });
    });
  }
  componentWillUnmount() {
    this.removeListener();
  }
  render() {
    return (
      <div>
        <Nav user={this.state.user} />
        <div className="container">
          {this.state.loading
                    ? <Loading />
                    :
                    <Switch>
                      <Route exact path="/signup" mapMenuTitle="Claim Your Lost-Item.Com Link" component={SignUp} />
                      <Route exact path="/login" mapMenuTitle="Log In" component={LogIn} />
                      <Route exact path="/how-it-works" mapMenuTitle="How It Works" component={HowItWorks} />
                      <PrivateRoute exact path="/payment" component={PayPalCheckout} user={this.state.user} />
                      <PrivateRoute exact path="/settings" mapMenuTitle="Settings" component={Settings} user={this.state.user} />
                      <Route exact path="/" component={Home} />
                      <Route path="*" mapMenuTitle="User Page" component={UserPage} />
                    </Switch>}
        </div>
      </div>
    );
  }
}


export default App;
