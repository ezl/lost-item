import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.element,
};

const HowItWorks = () =>
  <div className="how container">
    <div className="green">
      <div className="content">
        <div className="img-wrapper">
          <img src="images/lose.svg" />
        </div>
        <p>If you lose something and it has your link on it, whoever finds it can let you know.</p>
      </div>
    </div>

    <div className="items">
      <div className="item">
        <div className="content">
          <div className="img-wrapper">
            <img src="images/step-1.svg" />
          </div>
          <p>Put your link, like <Link to="/eric">lost-item.com/eric</Link> on something you own.</p>
        </div>
      </div>

      <div className="item">
        <div className="content">
          <div className="img-wrapper">
            <img src="images/step-2.svg" />
          </div>
          <p>Lose that item.</p>
        </div>
      </div>

      <div className="item">
        <div className="content">
          <div className="img-wrapper">
            <img src="images/step-3.svg" />
          </div>
          <p>Someone finds that item, then goes to your link.</p>
        </div>
      </div>

      <div className="item">
        <div className="content">
          <div className="img-wrapper">
            <img src="images/step-4.svg" />
          </div>
          <p>That person contacts you and helps you get your item back.</p>
        </div>
      </div>
    </div>

  </div>;


HowItWorks.propTypes = propTypes;

export default HowItWorks;