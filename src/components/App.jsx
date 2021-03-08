/* eslint-disable max-len */
import "@babel/polyfill";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, NavLink, useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import AuthStatus from "./AuthStatus";
import { getFirebaseApp } from "./db/FirebaseApp";
import SignUp from "./Signup";
import LogIn from "./LogIn";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import Labels from "./Labels";
import Testimonials from "./Testimonials";
import UserPage from "./UserPage";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute";
import Loading from "./Loading";
import PayPalCheckout from "./Payment";
import Faq from "./Faq";
import About from "./About";
import Terms from "./Terms";
import Privacy from "./Privacy";
import ThankYou from "./ThankYou";
import Clients from "./Clients";

class NavBar extends React.Component {
  static propTypes = {
    user: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleMobileMenu = this.handleMobileMenu.bind(this);
  }

  handleMobileMenu() {
    let menu = document.querySelector(".b-container");
    let overlay = document.querySelector(".overlay");

    // Open and close the menu
    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
      // When the menu is open, disable scrolling
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      overlay.classList.add("open");
    } else {
      // When the menu is closed, we enable again the scroll on the site
      document.body.style.overflow = "visible";
      overlay.classList.remove("open");
    }
  }

  render() {
    return (
      <div>
        {/* Overlay when menu on mobile is open */}
        <div className="overlay">
          {/* Links, here we'll use NavLink instead of Link so we easily access the active url */}
          <div className="links">
            {this.props.user !== null ? (
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/settings"
              >
                Dashboard
              </NavLink>
            ) : (
              ""
            )}
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/how-it-works"
            >
              How it Works
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/labels">
              Buy Labels
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/testimonials"
            >
              Testimonials
            </NavLink>
          </div>

          {/* Buttons */}
          <AuthStatus user={this.props.user} />
        </div>

        <div className="nav">
          {/* Logo */}
          <Link to="/">
            <img src="images/logo.svg" alt="Lost Item logo" />
          </Link>

          {/* Links, here we'll use NavLink instead of Link so we easily access the active url */}
          <div className="links">
            {this.props.user !== null ? (
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/settings"
              >
                Dashboard
              </NavLink>
            ) : (
              ""
            )}
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/how-it-works"
            >
              How it Works
            </NavLink>
            <NavLink className="nav-link" activeClassName="active" to="/labels">
              Buy Labels
            </NavLink>
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/testimonials"
            >
              Testimonials
            </NavLink>
          </div>

          {/* Buttons */}
          <AuthStatus user={this.props.user} />

          {/* Burger menu for mobile */}
          <span className="b-container">
            <div className="b-menu" onClick={this.handleMobileMenu}>
              <div className="b-bun b-bun--top"></div>
              <div className="b-bun b-bun--mid"></div>
              <div className="b-bun b-bun--bottom"></div>
            </div>
          </span>
        </div>
      </div>
    );
  }
}

const Footer = (props) => (
  <footer>
    <div className="container">
      <div className="links">
        <Link to="/about">About</Link>

        <Link to="/terms">Terms of Service</Link>

        <Link to="/privacy">Privacy</Link>

        <Link to="/faq">FAQ</Link>

        <Link to="/clients">Clients</Link>
      </div>

      <p className="copyright">&copy; All rights reserved by Lost-Item</p>
    </div>
  </footer>
);

Footer.propTypes = {};

class App extends React.Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount(prevProps) {
    this.removeListener = getFirebaseApp()
      .auth()
      .onAuthStateChanged((user) => {
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
        {/* Nav bar */}
        <NavBar user={this.state.user} />

        <div>
          {this.state.loading ? (
            <Loading />
          ) : (
            <Switch>
              <Route
                exact
                path="/signup"
                mapMenuTitle="Claim Your Lost-Item.Com Link"
                component={SignUp}
              />
              <Route
                exact
                path="/login"
                mapMenuTitle="Log In"
                component={LogIn}
              />
              <Route
                exact
                path="/reset-password"
                mapMenuTitle="Reset Password"
                component={ResetPassword}
              />
              <Route
                exact
                path="/how-it-works"
                mapMenuTitle="How It Works"
                component={HowItWorks}
              />
              <Route
                exact
                path="/labels"
                mapMenuTitle="Buy Labels"
                component={Labels}
              />
              <Route
                exact
                path="/testimonials"
                mapMenuTitle="Testimonials"
                component={Testimonials}
              />
              <PrivateRoute
                exact
                path="/payment"
                component={PayPalCheckout}
                user={this.state.user}
              />
              <PrivateRoute
                exact
                path="/settings"
                mapMenuTitle="Settings"
                component={Settings}
                user={this.state.user}
              />
              <PrivateRoute
                exact
                path="/faq"
                mapMenuTitle="FaQ"
                component={Faq}
              />
              <PrivateRoute
                exact
                path="/about"
                mapMenuTitle="About"
                component={About}
              />
              <PrivateRoute
                exact
                path="/terms"
                mapMenuTitle="Terms"
                component={Terms}
              />
              <PrivateRoute
                exact
                path="/privacy"
                mapMenuTitle="Privacy"
                component={Privacy}
              />
              <PrivateRoute
                exact
                path="/success"
                mapMenuTitle="Thank You!"
                component={ThankYou}
              />
              <PrivateRoute
                exact
                path="/clients"
                mapMenuTitle="Clients"
                component={Clients}
              />
              <Route exact path="/" component={Home} />
              <Route path="*" mapMenuTitle="User Page" component={UserPage} />
            </Switch>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

const Root = () => {
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      // close the menu if we change route
      try {
        let menu = document.querySelector(".b-container");
        let overlay = document.querySelector(".overlay");

        window.scrollTo(0, 0);
        document.body.style.overflow = "visible";
        menu.classList.remove("open");
        overlay.classList.remove("open");
      } catch (error) {
        console.error("error trying to close the menu on route change");
      }
    });
  }, [history]);

  return <App />;
};

export default Root;
