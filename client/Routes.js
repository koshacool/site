import React from 'react';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from './components/layouts/AppLayout';
import Home from './components/Home';
import Add from './components/Add';


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={Home}/>
      <Route path="admin" component={Add} />
    </Route>
  </Router>
);

export default renderRoutes;
