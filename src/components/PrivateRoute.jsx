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
      <div><h2>You must be logged in to view this page</h2><Link to="/">Click here to back to the home page.</Link></div>
    )
  )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default PrivateRoute;
