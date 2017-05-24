import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.element,
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'name': '',
      'email': '',
      'signupFormError': '',
      'signupButtonPending': false
    };

    this.createUser = this.createUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  createUser(e) {
    console.log("createUser");
    this.setState({signupButtonPending: true});
    e.preventDefault();

    var email = this.state.email.trim();
    var password = Math.random().toString(36).substring(7);
    var password = "password";
    var name = this.state.name.trim();
    var slug = Math.random().toString(36).substring(6);
    console.log("slug", slug);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        const data = {
          name: name,
          email: email,
          slug: slug
        };
        this.updateProfile(user, data);
        this.setState({signupButtonPending: false});
      }.bind(this))
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.code, error.message);
        this.setState({signupFormError: error.message});
        this.setState({signupButtonPending: false});
      }.bind(this));

  }

  updateProfile(user, data) {
    console.log("updateProfile");
    var database = firebase.database();
    database.ref('users/' + user.uid).set(data).then(function() {
      browserHistory.push('/settings/');
    });
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form className='signupForm' onSubmit={this.createUser}>
        <p>Dear Eric,</p>
        <p>
            My name is
            <input className="dotted" value={this.state.name} type="text" placeholder="name" name="name" onChange={this.handleChange.bind(this, 'name')} required="required" />
            and my email is
            <input className="dotted"  value={this.state.email} type="email" placeholder="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
            .
        </p>
        <p>
            If I lose my stuff, I want the person who finds it to easily know how to get it back to me.
        </p>
        <p>
            Give me a personal www.lost-item.com link, please!
        </p>

        {this.state.signupFormError && (
        <div className="alert alert-danger" role="alert">
          <strong>You suck at signing up. </strong>
          <p>{this.state.signupFormError} :(</p>
        </div>
        )}

        {this.state.signupButtonPending ?
        <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin"></i> Signing Up...</button>
        :
        <button type="submit" className="btn btn-primary">Love, {this.state.name ? toTitleCase(this.state.name) : 'Me'}</button>
        }
      </form>
    )
  }
}

function SignUp() {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h2>Get Your Own Lost-Item Link</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <br />
          <SignUpForm />
          <br />
        </div>
        <div className="col-md-6 hidden">
          <br />
          <p><strong className="teal">Why?</strong> So if you lose your stuff, someone can get it back to you.</p>
          <p><strong className="teal">How much does this cost?</strong> It's free.</p>
          <p><strong className="teal">I don't want to do this.</strong> OK. Cool.</p>
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = propTypes;

export default SignUp;
