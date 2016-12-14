import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.object.isRequired,
};

/* Learn how to convert this to a class */
class UserPage extends React.Component {
  render() {
    return (
      <p>
        Page For User <strong>{location.pathname}</strong>
      </p>
    );
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
