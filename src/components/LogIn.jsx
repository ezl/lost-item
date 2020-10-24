import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getFirebaseApp } from './db/FirebaseApp';

const propTypes = {
  children: PropTypes.element,
};

class LogInForm extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginFormError: '',
      loginButtonPending: false,
    };

    this.logInUser = this.logInUser.bind(this);
  }

  componentDidMount() {
    // Check if the user is already logged in, if so, move him to the dashboard
    if (getFirebaseApp().auth().currentUser != null) {
      this.props.history.push('/settings/');
    }
  }

  logInUser(e) {
    e.preventDefault();
    this.setState({ loginButtonPending: true });

    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const th = this;

    getFirebaseApp().auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        th.props.history.push('/settings/');
      })
      .catch((error) => {
        // Handle Errors here.
        th.setState({ logInFormError: error.message });
        th.setState({ loginButtonPending: false });
      });
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form className="signupForm" onSubmit={this.logInUser}>

        <p>
          <span>My Email</span>
          <input className="dotted" value={this.state.name} type="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
        </p>

        <p>
          <span>My Password</span>
          <input className="dotted" value={this.state.password} type="password" name="password" onChange={this.handleChange.bind(this, 'password')} required="required" />
        </p>

        {this.state.logInFormError && (
          <div className="alert alert-danger" role="alert">
            <strong>Hmmm, I can&apos;t log you in. </strong>
            <p>{this.state.logInFormError} :(</p>
          </div>
        )}

        {this.state.loginButtonPending ?
          <button type="submit" className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Logging In...</button>
          :
          <button type="submit" className="btn btn-primary">Log In</button>
        }

        <br/>
        <Link className="nav-button login" to="/reset-password">Forgot your password?</Link>
      </form>
    );
  }
}
const LogInFormWithRouter = withRouter(LogInForm);
const LogIn = () =>
  <div className="container">
    <div className="row">
      <div className="col-md-8 offset-md-2 shadow">
        <h2 className="big-title color-blue"><span>Log in</span></h2>

        <br />

        <LogInFormWithRouter />
      </div>
    </div>
  </div>;

LogIn.propTypes = propTypes;

export default LogIn;