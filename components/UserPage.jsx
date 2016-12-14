import React, { PropTypes } from 'react';
import axios from 'axios';

const propTypes = {
  location: PropTypes.object.isRequired,
};


class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <strong>some user info</strong>
        <p>
          Page For User <strong>{this.props.pathname}</strong>
          <div><label>Username</label>: <span>{this.props.user.username}</span></div>
          <div><label>email</label>: <span>{this.props.user.email}</span></div>
        </p>
      </div>
    )
  }
}

class UserNotFound extends React.Component {
  render() {
    return (
      <div>
        <strong>No Such Page</strong>
        <p>Hmmm... We do not have a page for this link. Did you find an item with this link on it?</p>
      </div>
    )
  }
}

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.user = null;
    /* try to hit an api to find out if the requested user exists */

    const endpoint = `http://ip.jsontest.com/`;
    axios.get(endpoint)
      .then(response => {
        console.log(response.data);
      });
    if (true) {
      this.user = {
        'username': 'foobar',
        'email': 'name@example.com'
      };
    }
  }

  render() {
    if (this.user !== null) {
      return <UserInfo user={this.user} pathname={location.pathname} />;
    } else {
      return <UserNotFound />;
    }
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
