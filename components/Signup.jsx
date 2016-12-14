import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

function SignUp() {
  return (
    <div>
      <h1>Get Your Own Lost-Item.Com Link</h1>
      <p>
        So if you lose your stuff, someone can get it back to you.
      </p>
    </div>
  );
}

SignUp.propTypes = propTypes;

export default SignUp;
