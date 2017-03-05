import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Details from './components/details';
import PageNotFound from './components/PageNotFound';

const routes = (
  <Route path={homeRoute} mapMenuTitle="Home" component={App}>
    <IndexRoute component={Home} />

    <Route path="package/:name" component={Details} />

    <Route path="*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);

render(
  <Router
    history={browserHistory}
    routes={routes}
  />,
  document.getElementById('root'),
);
