import React from 'react';
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
      <form onSubmit={this.logInUser}>
        <div className="form-group">
          <label>Email</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-envelope-o" /></span>
            <input className="form-control" value={this.state.name} type="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-lock" /></span>
            <input className="form-control" value={this.state.password} type="password" name="password" onChange={this.handleChange.bind(this, 'password')} required="required" />
          </div>
        </div>
        {this.state.logInFormError && (
        <div className="alert alert-danger" role="alert">
          <strong>Hmmm, I can&apos;t log you in. </strong>
          <p>{this.state.logInFormError} :(</p>
        </div>
        )}
        {this.state.loginButtonPending ?
          <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Logging In...</button>
        :
          <button className="btn btn-primary">Log In</button>
        }
      </form>
    );
  }
}
const LogInFormWithRouter = withRouter(LogInForm);
const LogIn = () =>
  <div>
    <div className="row">
      <div className="col-md-6">
        <h2>Log In</h2>
        <br />
        <LogInFormWithRouter />
      </div>
    </div>
  </div>;

LogIn.propTypes = propTypes;

export default LogIn;