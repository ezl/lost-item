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
    }

    this.createUser = this.createUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  createUser(e) {
    e.preventDefault();

    var email = this.state.email.trim();
    var password = Math.random().toString(36).substring(7);
    var name = this.state.name.trim();

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        const data = {
          name: name,
          favoriteColor: "blue",
          displayName: "Farts"
          // name and favorite color don't work (not part of default firebase object)
          // displayName does work
          // need to figure out how to push arbitrary attrs for user acct next
        };
        this.updateProfile(user, data);
      }.bind(this))
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code, error.message);
     });

  }

  updateProfile(user, data) {
    user.updateProfile(data).then(function() {
      // Update successful.
    }, function(error) {
      // An error happened.
    });
  }

  handleChange(name, e) {
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form >
        <div className="form-group">
          <label>What is your name?</label>
          <input value={this.state.name} className="form-control" type="text" name="name" onChange={this.handleChange.bind(this, 'name')} />
          <small className="form-text text-muted">So if someone you know finds something that belongs to you, they can give it to you directly.</small>
        </div>
        <div className="form-group">
          <label>What is your email address?</label>
          <input value={this.state.email} className="form-control" type="email" name="email" onChange={this.handleChange.bind(this, 'email')} />
          <small className="form-text text-muted">So we can email you if someone you don't know finds your stuff.</small>
        </div>

        <button onClick={this.createUser} className="btn btn-primary">Get Your Own Lost Item Link!</button>
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
