import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

function HowItWorks() {
  return (
    <div>
      <h1>How It Works</h1>
      <p>
        If you lose stuff and it has your link on it, whoever finds it can type that link in and use it to contact you.
      </p>
    </div>
  );
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
