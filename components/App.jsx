import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

function App({ children, routes }) {
  class Links extends React.Component {
    render() {
      return(
        <ul>
          <li><a href="https://wwww.google.com">Google</a></li>
          <li><a href="https://wwww.yahoo.com">Yahoo</a></li>
        </ul>
      )
    }
  }
  class Nav extends React.Component {
    render() {
      return (
        <nav>
          {generateMapMenu()}
          <Links />
        </nav>
      )
    }
  }
  function generateMapMenu() {
    let path = '';

    function nextPath(route) {
      path += (
        (path.slice(-1) === '/' ? '' : '/') +
        (route.path === '/' ? '' : route.path)
      );
      return path;
    }

    return (
      routes.filter(route => route.mapMenuTitle)
        .map((route, index, array) => (
          <span key={index}>
            <Link to={nextPath(route)}>{route.mapMenuTitle}</Link>
            {(index + 1) < array.length && ' / '}
          </span>
        ))
    );
  }

  return (
    <div>
      <h1>Lost Items</h1>
      <h2>Never Lose Your Stuff Again</h2>
      <Nav />
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
