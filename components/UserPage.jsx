import React, { PropTypes } from 'react';
import axios from 'axios';

const propTypes = {
  location: PropTypes.object.isRequired,
};

var getSlug = function() {
  // Just cut off the preceding '/'
  return location.pathname.slice(1);
};

class UserContactForm extends React.Component {
  render() {
    const buttonText = `Let ${this.props.name} know you found something!`;
    const action = "https://formspree.io/" + `${this.props.email}`;
    return (
      <form action={action} method="POST">
        <div className="form-group">
          <label>What did you find?</label>
          <input className="form-control" type="text" name="what" />
        </div>
        <div className="form-group">
          <label>Where did you find it?</label>
          <input className="form-control" type="text" name="where" />
        </div>
        <div className="form-group">
          <label>What&#39;s the best way for {this.props.name} to get this item back?</label>
          <textarea className="form-control" type="text" name="where" />
          <small className="form-text text-muted">For example, you can leave your contact email or phone here, or just say: I left it with the front desk at the ACME Hotel at Colombus and 4th Street..</small>
        </div>
        <button type="submit" className="btn btn-primary">{buttonText}</button>
      </form>
    )
  }
}

class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2>Yay! You found something that belongs to {this.props.user.name}!</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <br />
            <p>{this.props.user.name} will be very happy to hear that! Please help get this item returned!</p>
            <UserContactForm name={this.props.user.name} email={this.props.user.email} />
            <hr />
          </div>
        </div>
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
    var slug = getSlug();

    firebase.database()
      .ref('/users')
      .orderByChild('slug')
      .equalTo(slug)
      .once('value')
      .then(function(snapshot) {
        if (snapshot.val() === null) {
          // not exists;
        } else {
          // do something else;
          var user = Object.values(snapshot.val())[0];
          this.setState({'user': user});
        };
       }.bind(this));
  }

  render() {
    if (this.state.user === null) {
      return <UserNotFound />;
    } else {
      return <UserInfo user={this.state.user} />;
    }
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
