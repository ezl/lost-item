import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'current-input';

import App from './components/App';
import Home from './components/Home';

import SignUp from './components/SignUp';
import HowItWorks from './components/HowItWorks';
import Shop from './components/Shop';
import UserPage from './components/UserPage';


const routes = (
  <Route path="/" mapMenuTitle="Home" component={App}>
    <IndexRoute component={Home} />

    <Route path="signup" mapMenuTitle="Claim Your Lost-Item.Com Link" component={SignUp} />
    <Route path="how-it-works" mapMenuTitle="How It Works" component={HowItWorks} />
    <Route path="shop" mapMenuTitle="Buy Labels For Your Link" component={Shop} />

    <Route path="*" mapMenuTitle="User Page" component={UserPage} />
  </Route>
);


render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root')
);
