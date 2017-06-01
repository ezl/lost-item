/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getFirebaseApp } from './db/FirebaseApp';

const propTypes = {
  children: PropTypes.element,
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

class SignUpForm extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      signupFormError: '',
      signupButtonPending: false,
    };
    this.createUser = this.createUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  createUser(e) {
    console.log('createUser');
    this.setState({ signupButtonPending: true });
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const name = this.state.name.trim();
    const slug = Math.random().toString(36).slice(-6);
    console.log('slug', slug);

    getFirebaseApp().auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const data = {
          name,
          email,
          slug,
        };
        this.updateProfile(user, data);
        this.setState({ signupButtonPending: false });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error.code, error.message);
        this.setState({ signupFormError: error.message });
        this.setState({ signupButtonPending: false });
      });
  }

  updateProfile(user, data) {
    console.log('updateProfile');
    console.log(this.props);
    const database = getFirebaseApp().database();
    database.ref(`users/${user.uid}`).set(data).then(() => {
      this.props.history.push('/settings/');
    });
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form className="signupForm" onSubmit={this.createUser}>
        <p>Dear Eric,</p>
        <p>
            My name is
            <input className="dotted" value={this.state.name} type="text" placeholder="name" name="name" onChange={this.handleChange.bind(this, 'name')} required="required" />
            and my email is
            <input className="dotted" value={this.state.email} type="email" placeholder="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
            and my password is
            <input className="dotted" value={this.state.password} type="password" placeholder="password" name="password" onChange={this.handleChange.bind(this, 'password')} required="required" />
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
          <button className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Signing Up...</button>
        :
          <button type="submit" className="btn btn-primary">Love, {this.state.name ? toTitleCase(this.state.name) : 'Me'}</button>
        }
      </form>
    );
  }
}
const SignUpFormWithRouter = withRouter(SignUpForm);

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
          <SignUpFormWithRouter />
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

export default withRouter(SignUp);
