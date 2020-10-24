/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2 shadow nomargin">
            <img src="images/moon.svg" />

            <div className="content">
              <h2 className="big-title color-blue"><span>Hooray!</span></h2>

              <br />

              <p><strong>Your new link is on the way!</strong></p>

              <p>You can go back to your dashboard, click on change link and enter your new desired url!</p>

              <p className="cta">
                <Link className="btn btn-primary" to="/settings">Go to the dashboard</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ThankYou);