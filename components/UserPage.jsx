import React, { PropTypes } from 'react';
import axios from 'axios';

const propTypes = {
  location: PropTypes.object.isRequired,
};

class UserContactForm extends React.Component {
  render() {
    const buttonText = `Let ${this.props.name} know you found something!`;
    return (
      <form action="https://formspree.io/{this.props.email}" method="POST">
        <div>
          <label>What item did you find?</label>
          <input type="text" name="what" />
        </div>
        <div>
          <label>Where did you find it?</label>
          <input type="text" name="where" />
        </div>
        <div>
          <label>What&#39;s the best way for {this.props.name} to get this item back?</label>
          <textarea name="how" placeholder=""/>
          <p>For example, you can leave your contact email or phone here, or just say: I left it with the front desk at the ACME Hotel at Colombus and 4th Street..</p>
        </div>
        <div>
          <input disabled type="submit" value={buttonText} />
        </div>
      </form>
    )
  }
}

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <p>
          Page For User: <code>{this.props.pathname}</code>.
        </p>
        <hr />
        <strong>Yay! You found something that belongs to {this.props.user.name}!</strong>
        <p>{this.props.user.name} will be very happy to hear that!</p>
        <p>Will you help get this item returned?</p>

        <UserContactForm name={this.props.user.name} email={this.props.user.email} />
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
          'name': 'James',
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
