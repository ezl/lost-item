import React from 'react';
import {
  Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest} render={props => (
    user !== null ? (
      <Component {...props} user={user} />
    ) : (
      <div className="hero container big">
        <div className="item">
          <h2 className="big-title color-blue">Oh my...</h2>

          <p>You need to be logged in to view this page</p>

          <p className="cta">
            <Link className="btn btn-primary" to="/signup">Take me back home</Link>
          </p>
        </div>
        <div className="item">
          <img src="images/404.svg" />
        </div>
      </div>
    )
  )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default PrivateRoute;
