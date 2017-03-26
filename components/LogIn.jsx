import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: PropTypes.element,
};

class LogInForm extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" />
        </div>
        <button disabled className="btn btn-primary">Disabled Log In Button Here!</button>
      </form>
    );
  }
}

function LogIn() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Log In Not Yet Implemented</h2>
          <p>Sorry, right now this site only works for Eric. One day soon, I'll make it work for other people too.</p>
          <br />
          <LogInForm />
        </div>
      </div>
    </div>
  );
}

LogIn.propTypes = propTypes;

export default LogIn;
