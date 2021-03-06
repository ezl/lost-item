import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import values from "object.values";
import { getFirebaseApp } from "./db/FirebaseApp";
import Loading from "./Loading";

const propTypes = {
  location: PropTypes.object.isRequired,
};

const getSlug = () => location.pathname.slice(1);

class UserContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      what: "",
      where: "",
      slug: getSlug(),
      how: "",
      sending: false,
      messageSent: false,
      file: {},
      downloadURL: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  uploadImage(e) {
    this.setState(
      {
        file: e.target.files[0],
      },
      async () => {
        const storageRef = await getFirebaseApp()
          .app()
          .storage("gs://found-item-images")
          .ref();
        const thisRef = await storageRef.child(this.state.file.name);

        await thisRef.put(this.state.file).then(async (snapshot) => {
          const url = await snapshot.ref.getDownloadURL();

          this.setState({
            downloadURL: url,
          });
        });
      }
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      sending: true,
    });
    fetch("https://us-central1-lost-item-ba357.cloudfunctions.net/notifyUser", {
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
    }).then((response) => {
      if (response.status === 200) {
        this.setState({
          messageSent: true,
        });

        // We found the item, scroll to top!
        window.scrollTo(0, 0);
      }

      this.setState({
        sending: false,
      });
    }); // parses response to JSON
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }
  render() {
    const buttonText = "Send";

    return (
      <div className="container">
        {this.state.messageSent && (
          <div>
            <div className="row">
              <div className="col-md-8 offset-md-2 shadow nomargin">
                <img src="images/moon.svg" />

                <div className="content">
                  <h2 className="big-title color-blue">
                    <span>Hooray!</span>
                  </h2>

                  <br />

                  <p>
                    <strong>
                      Thanks for helping get that item back to{" "}
                      {this.props.user.name}!
                    </strong>
                  </p>

                  <p>
                    By the way, do you want your own link that you can put on
                    any of your items in case you ever lose them?
                  </p>

                  <p>
                    It's free, easy, and safer than writing your personal
                    information on items!
                  </p>

                  <p className="cta">
                    <Link className="btn btn-primary" to="/signup">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!this.state.messageSent && (
          <div>
            <div className="row">
              <div className="col-md-10 offset-md-1 shadow">
                <h2 className="big-title color-blue">
                  Yay! <span>You found something</span> that belongs to{" "}
                  {this.props.user.name}!
                </h2>

                <br />

                <div className="row">
                  <div className="col-md-8 offset-md-2">
                    <div className="intro">
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${this.props.pic})` }}
                      ></div>
                      <br />
                      <p>
                        <strong>{this.props.user.name}</strong> will be very
                        happy to hear that! Please help get this item returned!
                      </p>
                    </div>

                    <form method="POST" onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <label>What did you find?</label>
                        <input
                          className="form-control"
                          type="text"
                          name="what"
                          onChange={this.handleChange.bind(this, "what")}
                          required
                        />
                        <small className="form-text text-muted">
                          e.g. an android phone, a credit card, a large sack of
                          potatoes
                        </small>
                      </div>
                      <div className="form-group">
                        <label>Where did you find it?</label>
                        <input
                          className="form-control"
                          type="text"
                          name="where"
                          onChange={this.handleChange.bind(this, "where")}
                          required
                        />
                        <small className="form-text text-muted">
                          e.g. at Burger King on Clark Street, at Jenny&apos;s
                          house, on Richard Branson&apos;s jet
                        </small>
                      </div>
                      <div className="form-group">
                        <label>
                          What&#39;s the best way for {this.props.user.name} to
                          get this item back?
                        </label>
                        <textarea
                          className="form-control"
                          type="text"
                          name="how"
                          onChange={this.handleChange.bind(this, "how")}
                          required
                        />
                        <small className="form-text text-muted">
                          Leave your contact email or phone here, or a message
                          for how {this.props.user.name} can retrieve it, like
                          &quot;I left it with the front desk at the ACME Hotel
                          at Colombus and 4th Street.&quot;
                        </small>
                      </div>
                      <div className="form-group">
                        <label>Leave an image of what you found</label>
                        <div className="upload-container">
                          <button className="btn btn-primary">
                            UPLOAD IMAGE
                          </button>
                          <p className="selected-file">
                            {this.state.file.name
                              ? this.state.file.name
                              : "No file selected"}
                          </p>
                          <input
                            type="file"
                            name="upload-item-pic"
                            onChange={this.uploadImage.bind(this)}
                          />
                        </div>
                        <small className="form-text text-muted">
                          Leave an image proof of the item you found for{" "}
                          {this.props.user.name}. <br />
                          (NOT REQUIRED)
                        </small>
                      </div>

                      {this.state.sending ? (
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled
                        >
                          <i className="fa fa-spinner fa-spin" />
                          &nbsp;&nbsp;Please wait a moment
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary">
                          <i className="fa fa-send" />
                          &nbsp;&nbsp;{buttonText}
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

UserContactForm.propTypes = {
  user: PropTypes.object,
  pic: PropTypes.string,
};

const UserInfo = (props) => (
  <UserContactForm user={props.user} pic={props.pic} />
);

UserInfo.propTypes = {
  user: PropTypes.object,
  pic: PropTypes.string,
};

const UserNotFound = () => (
  <div className="hero container big">
    <div className="item">
      <h2 className="big-title color-blue">Oh my...</h2>

      <p>It looks like this page has been lost</p>

      <p className="cta">
        <Link className="btn btn-primary" to="/signup">
          Take me back home
        </Link>
      </p>
    </div>
    <div className="item">
      <img src="images/404.svg" />
    </div>
  </div>
);

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      profilePictureURL: "images/profile.jpg",
    };

    this.loadImage = this.loadImage.bind(this);
  }

  componentDidMount() {
    const slug = getSlug();

    getFirebaseApp()
      .database()
      .ref("/users")
      .orderByChild("slug")
      .equalTo(slug)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() === null) {
          this.setState({ user: null, loading: false });
        } else {
          // do something else;
          const user = values(snapshot.val())[0];
          this.loadImage(user);
        }
      });
  }

  loadImage(user) {
    try {
      const storage = getFirebaseApp().storage().ref();

      // After we get the user data, we try to get the profile picture
      let profilePictureRef = storage.child(`images/${user.email}`);

      // Get user data
      profilePictureRef
        .getDownloadURL()
        .then((url) => {
          // Assign the image to the state
          this.setState({
            user,
            loading: false,
            profilePictureURL: url,
          });
        })
        .catch(() => {
          // If no profile picture is found in firebase, we keep the default one set in initial state
          this.setState({
            user,
            loading: false,
          });
        });
    } catch (err) {
      // We could keep this console.log but I'll comment it for now
      // console.log('no profile picture, loading default');
      this.setState({
        user,
        loading: false,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.user === null) {
      return <UserNotFound />;
    }
    return (
      <UserInfo user={this.state.user} pic={this.state.profilePictureURL} />
    );
  }
}

UserPage.propTypes = propTypes;

export default UserPage;
