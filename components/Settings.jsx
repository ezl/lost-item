import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        This will be a form, possibly even the same form as the signup form.
        <div className="form-group">
          <label>Foo</label>
          <input className="form-control" type="text" />
          <small className="form-text text-muted">Help text blah blah</small>
        </div>
        <div className="form-group">
          <label>Foo</label>
          <input className="form-control" type="text" />
          <small className="form-text text-muted">Help text blah blah</small>
        </div>
        <div className="form-group">
          <label>Foo</label>
          <input className="form-control" type="text" />
          <small className="form-text text-muted">Help text blah blah</small>
        </div>
        <button disabled className="btn btn-primary">Update Settings</button>
      </form>
    );
  }
}

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.user === null) {
      return (
        <div><h2>You must be logged in to view this page</h2></div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>Settings</h2>
              <p>For {this.props.user.email}</p>
              <br />
              <p>Settings page here. User should be authenticated to get here.</p>
              <SettingsForm />
            </div>
          </div>
        </div>
      );
    }
  }
}

Settings.propTypes = propTypes;

export default Settings;
