import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.element,
};

const HowItWorks = () =>
  <div>
    <h1>How It Works</h1>
    <p>
        If you lose something and it has your link on it, whoever finds it can let you know.
      </p>
    <ol>
      <li>Put your link, like <Link to="/eric">www.lost-item.com/eric</Link> on something you own.</li>
      <li>Lose that item.</li>
      <li>Someone finds that item, then goes to your link.</li>
      <li>That person contacts you and helps you get your item back.</li>
    </ol>
  </div>;


HowItWorks.propTypes = propTypes;

export default HowItWorks;
