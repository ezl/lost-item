import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.object.isRequired,
};

function UserPage({ location }) {
  return (
    <p>
      Page For User <strong>{location.pathname}</strong>
    </p>
  );
}

UserPage.propTypes = propTypes;

export default UserPage;
