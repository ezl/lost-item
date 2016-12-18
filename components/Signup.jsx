import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'name': '',
      'email': '',
      'signupFormError': ''
    };

    this.createUser = this.createUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  createUser(e) {
    e.preventDefault();

    var email = this.state.email.trim();
    var password = Math.random().toString(36).substring(7);
    var name = this.state.name.trim();
    var slug = Math.random().toString(36).substring(21);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        const data = {
          name: name,
          email: email,
          slug: slug
        };
        this.updateProfile(user, data);
      }.bind(this))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code, error.message);
        this.setState({signupFormError: error.message});
      }.bind(this));
  }

  updateProfile(user, data) {
    var database = firebase.database();
    database.ref('users/' + user.uid).set(data);
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form onSubmit={this.createUser}>
        <div className="form-group">
          <label>What is your name?</label>
          <input value={this.state.name} className="form-control" type="text" name="name" onChange={this.handleChange.bind(this, 'name')} required="required" />
          <small className="form-text text-muted">So if someone you know finds something that belongs to you, they can give it to you directly.</small>
        </div>
        <div className="form-group">
          <label>What is your email address?</label>
          <input value={this.state.email} className="form-control" type="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
          <small className="form-text text-muted">So we can email you if someone you don't know finds your stuff.</small>
        </div>
        {this.state.signupFormError && (
        <div className="alert alert-danger" role="alert">
          <strong>You suck at signing up. </strong>
          {this.state.signupFormError} :(
        </div>
        )}
        <button type="submit" className="btn btn-primary">Get Your Own Lost Item Link!</button>
      </form>
    )
  }
}

function SignUp() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Get Your Own Lost-Item.Com Link</h2>
          <br />
          <br />
          <p><strong>Why?</strong> So if you lose your stuff, someone can get it back to you.</p>
          <p><strong>How much does this cost?</strong> It's free.</p>
          <p><strong>I don't want to do this.</strong> OK. I don't care.</p>
        </div>
        <div className="col-md-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = propTypes;

export default SignUp;
