import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import { getFirebaseApp } from './db/FirebaseApp'


class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      slug: '',
      profilePicture: '',
      profilePictureURL: 'images/profile.jpg',
      updatingSettings: false,
      updateSettingsSuccessMessageVisible: false,
      updateSettingsErrorMessageVisible: false,
      updateSettingsErrorMessageText: '',
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.changeProfilePicture = this.changeProfilePicture.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  componentDidMount() {
    const database = getFirebaseApp().database();

    // Get user data
    database.ref(`users/${this.props.user.uid}`).once('value').then((snapshot) => {
      const paidUntil = snapshot.val().paid_until;
      const currentDate = new Date().getTime();
      this.setState({
        name: snapshot.val().name,
        email: snapshot.val().email,
        slug: snapshot.val().slug,
        can_change_link: paidUntil !== undefined && paidUntil !== null && paidUntil >= currentDate,
      }, () => {
        this.loadImage(snapshot.val().email);
      });
    });
  }

  copyToClipboard(e) {
    e.preventDefault();

    // Play animation of the alert
    document.querySelector('.copied').classList.add('active');

    navigator.clipboard.writeText(`www.lost-item.com/${this.state.slug}`);

    setTimeout(() => {
      document.querySelector('.copied').classList.remove('active');
    }, 2000);
  }

  handleChange(name, e) {
    const change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  flashProfileUpdateSuccessMessage() {
    this.setState({ updateSettingsSuccessMessageVisible: true });
    setTimeout(
      () => {
        this.setState({ updateSettingsSuccessMessageVisible: false });
      }, 5000);
  }

  flashProfileUpdateErrorMessage(message) {
    this.setState({ updateSettingsErrorMessageText: message });
    this.setState({ updateSettingsErrorMessageVisible: true });
    setTimeout(
      () => {
        this.setState({ updateSettingsErrorMessageVisible: false });
      }, 5000);
  }

  // We use this function to store the file in the state before upload
  async changeProfilePicture(e) {
    if (e.target.files[0] !== null) {
      let preview = URL.createObjectURL(e.target.files[0]);
      
      this.setState({
        profilePictureURL: preview,
        profilePicture: e.target.files[0],
      });
    }
  }

  loadImage(email) {
    try {
      const storage = getFirebaseApp().storage().ref();

      // After we get the user data, we try to get the profile picture
      let profilePictureRef = storage.child(`images/${email}`);

      // Get user data
      profilePictureRef.getDownloadURL().then((url) => {
        // Assign the image to the state
        this.setState({ profilePictureURL: url });
      }).catch(function (error) {
        switch (error.code) {
          case 'storage/object-not-found': // File doesn't exist
          case 'storage/unauthorized': // User doesn't have permission to access the object
          case 'storage/canceled': // User canceled the upload
          case 'storage/unknown': // Unknown error occurred, inspect the server response
            console.error('cannot load profile image');
            break;
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  async updateProfile(e) {
    this.setState({ updatingSettings: true });
    e.preventDefault();
    const updates = {};
    updates[`users/${this.props.user.uid}/name`] = this.state.name;
    updates[`users/${this.props.user.uid}/email`] = this.state.email;
    if (this.state.can_change_link) {
      updates[`users/${this.props.user.uid}/slug`] = this.state.slug;
    }
    const user = this.props.user;
    if (user.email !== this.state.email) {
      try {
        await user.updateEmail(this.state.email)
      } catch (error) {
        this.flashProfileUpdateErrorMessage(error.message);
        this.setState({ updatingSettings: false });
        return;
      }
    }

    const database = getFirebaseApp().database();
    const storage = getFirebaseApp().storage().ref();

    database.ref().update(updates).then(() => {
      this.flashProfileUpdateSuccessMessage();

      if (this.state.profilePicture !== '') {
        // Upload file and metadata to the object 'images/mountains.jpg'
        let uploadPicture = storage.child(`images/${user.email}`).put(this.state.profilePicture);

        // Listen for state changes, errors, and completion of the upload.
        uploadPicture.on(getFirebaseApp().storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            // Upload in progress
            console.log('Upload in progress');
          }, function (error) {
            switch (error.code) {
              case 'storage/unauthorized':
              case 'storage/canceled':
              case 'storage/unknown':
                console.log('error uploading image');
                break;
            }
          });
      }

    }, (error) => {
      this.flashProfileUpdateErrorMessage(error.message)
    }).finally(() => {
      this.setState({ updatingSettings: false });
    });
  }

  render() {
    const url = `http://www.lost-item.com/${this.state.slug}`;

    return (
      <div>
        <div className="copied">Link copied to clipboard.</div>
        
        <form onSubmit={this.updateProfile}>
          <div className="form-group">
            <div className="copy">
              <a href="#" onClick={this.copyToClipboard}>
                <img src="images/copy.svg" />
                Copy to clipboard
              </a>

              <Link className="nav-link" to={{ pathname: "/payment", state: { slug: this.state.slug } }}>
                <img src="images/link.svg" />
                Change link
              </Link>
            </div>
            <span className="clipboard" onClick={this.copyToClipboard}>{`www.lost-item.com/${this.state.slug}`}</span>
            <small className="form-text text-muted">This is the link you&apos;ll label your stuff with. You can write it or print it on things you own like credit cards or cell phones, print labels and sew it to clothes.</small>
          </div>

          <div className="form-group">
            <label>Name</label>
            <input value={this.state.name} name="name" onChange={this.handleChange.bind(this, 'name')} className="form-control" type="text" />
            <small className="form-text text-muted">What name do you want displayed on your Lost Item page?</small>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={this.state.email} name="email" onChange={this.handleChange.bind(this, 'email')} className="form-control" type="text" />
            <small className="form-text text-muted">This is the email address we will use to contact you if your lost items are found</small>
          </div>

          <div className="form-group">
            <label>Profile picture</label>
            <div className="img" style={{ backgroundImage: `url(${this.state.profilePictureURL})` }}></div>
            <input type="file" onChange={this.changeProfilePicture} />
            <small className="form-text text-muted">This image will be shown to the people trying to give back your items.</small>
          </div>

          {this.state.updatingSettings ?
            <button type="submit" className="left btn btn-primary" disabled><i className="fa fa-spinner fa-spin" /> Updating Settings...</button>
            :
            <button type="submit" className="left btn btn-primary">Update Settings</button>
          }

          {this.state.updateSettingsErrorMessageVisible &&
            <span className="settingsFlashMessage settingsError">{this.state.updateSettingsErrorMessageText}</span>
          }
          {this.state.updateSettingsSuccessMessageVisible &&
            <span className="settingsFlashMessage settingsSuccess">Success!</span>
          }
        </form>
      </div>
    );
  }
}

SettingsForm.propTypes = {
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
const SettingsFormWithRouter = withRouter(SettingsForm);

const Settings = (props) => (
  <div>
    <div className="row">
      <div className="col-md-8 offset-md-2 shadow">
        <h2 className="big-title color-blue">Your <span>Link</span></h2>

        <br />

        <SettingsFormWithRouter user={props.user} />
      </div>
    </div>
  </div>
);

Settings.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Settings;