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
          <Links />
        </nav>
      )
    }
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
