import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

function Shop() {
  return (
    <div>
      <h1>Buy Stuff</h1>
      <p>
        Placeholder for a shop to sell labels/name tags with your lost-item.com link professionally printed on it.
      </p>
    </div>
  );
}

Shop.propTypes = propTypes;

export default Shop;
