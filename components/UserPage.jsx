import React from 'react';
import PropTypes from 'prop-types';
import values from 'object.values';
import { getFirebaseApp } from './db/FirebaseApp';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const getSlug = () =>
  // Just cut off the preceding '/'
   location.pathname.slice(1);

const UserContactForm = (props) => {
  const buttonText = 'Send';
  const action = `https://formspree.io/${props.email}`;
  return (
    <form action={action} method="POST">
      <div className="form-group">
        <label>What did you find?</label>
        <input className="form-control" type="text" name="what" />
        <small className="form-text text-muted">e.g. an android phone, a credit card, a large sack of potatoes</small>
      </div>
      <div className="form-group">
        <label>Where did you find it?</label>
        <input className="form-control" type="text" name="where" />
        <small className="form-text text-muted">e.g. at Burger King on Clark Street, at Jenny's house, on Richard Branson's jet</small>
      </div>
      <div className="form-group">
        <label>What&#39;s the best way for {props.name} to get this item back?</label>
        <textarea className="form-control" type="text" name="where" />
        <small className="form-text text-muted">Leave your contact email or phone here, or a message for how {props.name} can retrieve it, like "I left it with the front desk at the ACME Hotel at Colombus and 4th Street."</small>
      </div>
      <button type="submit" className="btn btn-primary"><i className="fa fa-send" /> {buttonText}</button>
    </form>
  );
};

UserContactForm.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
};

const UserInfo = (props) =>
  <div>
    <div className="row">
      <div className="col-md-12">
        <h2>Yay! You found something that belongs to {props.user.name}!</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <br />
        <p>{props.user.name} will be very happy to hear that! Please help get this item returned!</p>
        <UserContactForm name={props.user.name} email={props.user.email} />
        <hr />
      </div>
    </div>
  </div>;

UserInfo.propTypes = {
  user: PropTypes.object,
};


const UserNotFound = () =>
  <div>
    <strong>No Such Page</strong>
    <p>Hmmm... We do not have a page for this link. Did you find an item with this link on it?</p>
  </div>;

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    const slug = getSlug();

    getFirebaseApp().database()
      .ref('/users')
      .orderByChild('slug')
      .equalTo(slug)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          // not exists;
        } else {
          // do something else;
          const user = values(snapshot.val())[0];
          this.setState({ user });
        }
      });
  }

  render() {
    if (this.state.user === null) {
      return <UserNotFound />;
    }
    return <UserInfo user={this.state.user} />;
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
