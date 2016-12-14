import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class SignUpForm extends React.Component {
  render() {
    return (
      <form>
        <div>
          <label>What is your name?</label>
          <input type="text" name="name" />
          <p>If someone you know finds something that belongs to you, they can give it to you directly</p>
        </div>
        <div>
          <label>What is your email address?</label>
          <input type="email" name="email" />
          <p>So if someone you do not know finds something of yours, they'll let us know, and we can contact you to let you know.</p>
        </div>
        <div>Privacy</div>
        <div>
          <p>If someone finds something that belongs to you and goes to your link, do you want us to display the email address to them to contact you directly? Or hide it using a form to contact you through us?</p>
          <p><input type="radio" name="contact" value="form" /> Hide my email and contact me through Lost-Item.Com</p>
          <p><input type="radio" name="contact" value="direct" /> Have them email me directly.</p>
        </div>
        <div>
          <input disabled type="submit" value="Get Your Own Lost Item Link!" />
        </div>
      </form>
    )
  }
}

function SignUp() {
  return (
    <div>
      <h1>Get Your Own Lost-Item.Com Link</h1>
      <p>
        So if you lose your stuff, someone can get it back to you.
      </p>
      <SignUpForm />
    </div>
  );
}

SignUp.propTypes = propTypes;

export default SignUp;
