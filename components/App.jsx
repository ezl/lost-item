import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const propTypes = {
  children: PropTypes.element.isRequired,
  routes: PropTypes.array.isRequired,
};

class Links extends React.Component {
  render() {
    return(
      <ul className="nav navbar-nav">
        <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
        <li className="nav-item"><a className="nav-link" href="/signup">Get Your Own Link (It&#39;s Free)</a></li>
        <li className="nav-item"><a className="nav-link" href="/how-it-works">How Does It Work?</a></li>
        <li className="nav-item"><a className="nav-link" href="/shop">Buy Labels</a></li>
      </ul>
    )
  }
}

class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">Lost-Item.Com</a>
        <Links />
      </nav>
    )
  }
}

function App({ children, routes }) {
  return (
    <div>
      <Nav />
      <div className="container">
        {children}
      </div>
    </div>
  );
}

App.propTypes = propTypes;

export default App;
