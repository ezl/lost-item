/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { getFirebaseApp } from './db/FirebaseApp';

const propTypes = {
  children: PropTypes.element,
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
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
      clink: '',
      signupFormError: '',
      signupButtonPending: false,
    };
    this.createUser = this.createUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    // Check if the user is already logged in, if so, move him to the dashboard
    if (getFirebaseApp().auth().currentUser != null) {
      this.props.history.push('/settings/');
    }
  }

  createUser(e) {
    this.setState({ signupButtonPending: true });
    e.preventDefault();

    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const name = this.state.name.trim();
    const slug = Math.random().toString(36).slice(-6);

    getFirebaseApp().auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const data = {
          name,
          email,
          slug,
          paid_until: null,
        };
        const formData = new FormData();
        formData.append('name', 'Validation successful');
        this.setState({ signupButtonPending: false });
        this.updateProfile(user.user, data);
      })
      .catch((error) => {
        // Handle Errors here.
        this.setState({ signupFormError: error.message });
        this.setState({ signupButtonPending: false });
      });
  }

  updateProfile(user, data) {
    const database = getFirebaseApp().database();
    database.ref(`users/${user.uid}`).set(data).then(() => {
      this.state.clink ? 
      this.props.history.push({ pathname: "/payment", state: { clink: this.state.clink } }) :
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
        <h5 className="color-blue">Dear <strong>Eric,</strong></h5>

        <p>
          <span>My name is</span>
          <input autoComplete="no-autocomplete" className="dotted" value={this.state.name} type="text" name="name" onChange={this.handleChange.bind(this, 'name')} required="required" />
        </p>

        <p>
          <span>and my email is </span>
          <input autoComplete="no-autocomplete" className="dotted" value={this.state.email} type="email" name="email" onChange={this.handleChange.bind(this, 'email')} required="required" />
        </p>

        <p>
          <span>and my password is </span>
          <input autoComplete="no-autocomplete" className="dotted" value={this.state.password} type="password" name="password" onChange={this.handleChange.bind(this, 'password')} required="required" />
        </p>

        <p>
          <span>lost-item.com/</span>
          <div className="input-with-note">
            <input autoComplete="no-autocomplete" className="dotted" value={this.state.clink} type="clink" name="clink" onChange={this.handleChange.bind(this, 'clink')} placeholder="Optional" />
            <p>Get your custom link for just $1,99mo. Otherwise you can get a free random link like lost-item.com/j5h4jfgh9</p>
          </div>
        </p>

        <p className="color-gray">
          If I lose my stuff, I want the person who finds it to easily know how to get it back to me.
        </p>

        <p>
          Give me a personal lost-item.com link, please!
        </p>

        {this.state.signupFormError && (
          <div className="alert alert-danger" role="alert">
            <strong>You suck at signing up. </strong>
            <p>{this.state.signupFormError} :(</p>
          </div>
        )}

        {this.state.signupButtonPending ?
          <button type="submit" className="btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Signing Up...</button>
          :
          <button type="submit" className="btn btn-primary">Sign me up</button>
        }
      </form>
    );
  }
}
const SignUpFormWithRouter = withRouter(SignUpForm);

function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 shadow">
          <h2 className="big-title color-blue">Get Your Own <br /> <span>Lost-Item Link</span></h2>

          <br />

          <SignUpFormWithRouter />
        </div>
      </div>
    </div>
  );
}

SignUp.propTypes = propTypes;

export default withRouter(SignUp);