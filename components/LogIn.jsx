import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'loginFormError': '',
      'loginButtonPending': false
    };

    this.logInUser = this.logInUser.bind(this);
  }

  logInUser(e) {
    e.preventDefault();
    this.setState({loginButtonPending: true});

    var email = this.state.email.trim();
    var password = "password";
    console.log("trying to log in!", email, password);

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function() {
        console.log("successfully logged in");
        browserHistory.push('/settings/');
        this.setState({loginButtonPending: false});
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.setState({logInFormError: error.message});
        this.setState({loginButtonPending: false});
      }.bind(this));

  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form onSubmit={this.logInUser}>
        <div className="form-group">
          <label>Email</label>
          <div className="input-group">
            <span className="input-group-addon"><i className='fa fa-envelope-o'></i></span>
            <input className="form-control" value={this.state.name} type="email"  name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-group">
            <span className="input-group-addon"><i className='fa fa-lock'></i></span>
            <input className="form-control" value={this.state.password} type="password"  name="password" onChange={this.handleChange.bind(this, 'password')} required="required" />
          </div>
        </div>
        {this.state.logInFormError && (
        <div className="alert alert-danger" role="alert">
          <strong>Hmmm, I can't log you in. </strong>
          <p>{this.state.logInFormError} :(</p>
        </div>
        )}
        {this.state.loginButtonPending ?
        <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin"></i> Logging In...</button>
        :
        <button className="btn btn-primary">Log In</button>
        }
      </form>
    );
  }
}

function LogIn() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Log In</h2>
          <br />
          <LogInForm />
        </div>
      </div>
    </div>
  );
}

LogIn.propTypes = propTypes;

export default LogIn;
