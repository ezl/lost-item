import React, { PropTypes } from 'react';

const propTypes = {
  location: PropTypes.object.isRequired,
};


class UserInfo extends React.Component {
  render() {
    return (
      <div>
        USER INFO CPMPONENT
      </div>
    )
  }
}

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.user = null;
    /* try to hit an api to find out if the requested user exists */

    if (false) {
      this.user = {
        'username': 'foobar',
        'email': 'name@example.com'
      };
    }
  }
  render() {
    if (this.user !== null) {
      return (
        <p>
          Page For User <strong>{location.pathname}</strong>
          <UserInfo user={this.user} />
        </p>
      );
    } else {
      return <h4>user not found</h4>
    }
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
