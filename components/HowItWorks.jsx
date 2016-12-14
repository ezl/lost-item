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
        If you lose stuff and it has your link on it, whoever finds it go to that link and use it to contact you.
      </p>
      <ol>
        <li>Put your link, like <a href="/eric">www.lost-item.com/eric</a> on something you belong.</li>
        <li>Lose that item.</li>
        <li>When a kind and benevolent stranger finds that item, he/she goes to your link, the contacts you.</li>
        <li>Coordinate with stranger to recover your lost item.</li>
      </ol>
    </div>
  );
}

HowItWorks.propTypes = propTypes;

export default HowItWorks;
