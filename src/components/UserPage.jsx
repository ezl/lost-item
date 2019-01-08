import React from 'react';
import PropTypes from 'prop-types';
import values from 'object.values';
import { getFirebaseApp } from './db/FirebaseApp';
import Loading from './Loading';

const propTypes = {
  location: PropTypes.object.isRequired,
};

const getSlug = () => location.pathname.slice(1);

const MessageSent = () =>
  <div>
    <strong>Message Was Sent</strong>
  </div>;


class UserContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      what: '',
      where: '',
      slug: getSlug(),
      contact: '',
      messageSent: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://us-central1-lost-item-ba357.cloudfunctions.net/notifyUser', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(this.state), // body data type must match "Content-Type" header
    })
    .then(response => {
      if (response.status === 200 ){
        this.setState({
           messageSent: true
        })
      }
    }); // parses response to JSON
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
  render() {
    const buttonText = 'Send';

    return (
      <div>
       {this.state.messageSent &&
          <span className="settingsFlashMessage settingsSuccess">Success!</span>
        }
        <form method="POST" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>What did you find?</label>
            <input className="form-control" type="text" name="what" onChange={this.handleChange.bind(this, 'what')}/>
            <small className="form-text text-muted">e.g. an android phone, a credit card, a large sack of potatoes</small>
          </div>
          <div className="form-group">
            <label>Where did you find it?</label>
            <input className="form-control" type="text" name="where" onChange={this.handleChange.bind(this, 'where')}/>
            <small className="form-text text-muted">e.g. at Burger King on Clark Street, at Jenny&apos;s house, on Richard
              Branson&apos;s jet
            </small>
          </div>
          <div className="form-group">
            <label>What&#39;s the best way for {this.state.name} to get this item back?</label>
            <textarea className="form-control" type="text" name="where" onChange={this.handleChange.bind(this, 'contact')}/>
            <small className="form-text text-muted">Leave your contact email or phone here, or a message for
              how {this.state.name} can retrieve it, like &quot;I left it with the front desk at the ACME Hotel at Colombus and
              4th Street.&quot;</small>
          </div>
          <button type="submit" className="btn btn-primary"><i className="fa fa-send"/>{buttonText}</button>
        </form>
      </div>
    );
  }
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
  state = {
    user: null,
    loading: true
  };
  componentDidMount() {
    const slug = getSlug();

    getFirebaseApp().database()
      .ref('/users')
      .orderByChild('slug')
      .equalTo(slug)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val() === null) {
          this.setState({ user: null, loading: false });
        } else {
          // do something else;
          const user = values(snapshot.val())[0];
          this.setState({ user, loading: false });
        }
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.user === null) {
      return <UserNotFound />;
    }
    return <UserInfo user={this.state.user} />;
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
