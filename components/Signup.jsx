import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class SignUpForm extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label>What is your name?</label>
          <input className="form-control" type="text" name="name" />
          <small className="form-text text-muted">If someone you know finds something that belongs to you, they can give it to you directly</small>
        </div>
        <div className="form-group">
          <label>What is your email address?</label>
          <input className="form-control" type="email" name="email" />
          <small className="form-text text-muted">So if someone you do not know finds something of yours, they'll let us know, and we can contact you to let you know.</small>
        </div>

        <fieldset className="form-group">
          <p>If someone finds something that belongs to you and goes to your link, do you want us to display the email address to them to contact you directly? Or hide it using a form to contact you through us?</p>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="contact" value="direct" /> Have them email me directly.
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input type="radio" className="form-check-input" name="contact" value="form" /> Hide my email and them contact me through Lost-Item.Com
            </label>
          </div>
        </fieldset>

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
          <p><strong>How much?</strong> Free.</p>
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
