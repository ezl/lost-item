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
        </p>
        <hr />
        <div><label>Username</label>: <span>{this.props.user.username}</span></div>
        <div><label>email</label>: <span>{this.props.user.email}</span></div>
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
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    // During dev, just use the path to decide if the user "exists"
    const noSuchUser = location.pathname.includes("poop");

    const endpoint = `http://ip.jsontest.com/`;
    // this is where we'll call the server to see
    // if the user exists.
    axios.get(endpoint)
      .then(response => {
        const ip = response.data.ip;
        const user = {
          'username': 'foobar',
          'email': 'name@example.com',
          'ip': ip
        };
        if (noSuchUser === true) {
        } else {
          this.setState({'user': user});
        }
      });
  }

  render() {
    if (this.state.user === null) {
      return <UserNotFound />;
    } else {
      return <UserInfo user={this.state.user} pathname={location.pathname} />;
    }
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
