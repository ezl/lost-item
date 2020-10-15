import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { getFirebaseApp } from './db/FirebaseApp';

const propTypes = {
  children: PropTypes.element,
};

class ResetForm extends React.Component {
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
      loginFormError: '',
      loginButtonPending: false,
    };

    this.resetPasswordFn = this.resetPasswordFn.bind(this);
  }

  resetPasswordFn(e) {
    e.preventDefault();
    this.setState({ loginButtonPending: true });

    const email = this.state.email.trim();
    const th = this;

    getFirebaseApp().auth().sendPasswordResetEmail(email)
      .then(() => {
        // th.props.history.push('/settings/');
        console.log('email sent');
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
      <form className="signupForm" onSubmit={this.resetPasswordFn}>

        <p>
          <span>Your email</span>
          <input className="dotted" value={this.state.name} type="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
        </p>

        {this.state.logInFormError && (
          <div className="alert alert-danger" role="alert">
            <strong>Sorry, there was a problem:</strong>
            <p>{this.state.logInFormError} :(</p>
          </div>
        )}

        {this.state.loginButtonPending ?
          <div className="alert alert-success" role="alert">
            <strong>Email sent, please check your inbox!</strong>
          </div>
          :
          <button type="submit" className="btn btn-primary">Reset Password</button>
        }
      </form>
    );
  }
}
const ResetPasswordForm = withRouter(ResetForm);

const Reset = () =>
  <div className="container">
    <div className="row">
      <div className="col-md-8 offset-md-2 shadow">
        <h2 className="big-title color-blue"><span>Reset</span> Password</h2>

        <br />

        <ResetPasswordForm />
      </div>
    </div>
  </div>;

Reset.propTypes = propTypes;

export default Reset;