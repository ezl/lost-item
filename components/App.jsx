import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

class Links extends React.Component {
  render() {
    return(
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/signup">Get Your Own Link (It&#39;s Free)</a></li>
        <li><a href="/how-it-works">How Does It Work?</a></li>
        <li><a href="/shop">Buy Labels</a></li>
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

function App({ children, routes }) {
  return (
    <div>
      <h1>Lost-Item.Com</h1>
      <h2>Never Lose Your Stuff Again</h2>
      <Nav />
      {children}
    </div>
  );
}

App.propTypes = propTypes;

export default App;
