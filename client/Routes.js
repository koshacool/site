import React from 'react';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from './components/layouts/AppLayout';
import Home from './components/Home';
import Upload from './components/upload/Upload';


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={Home}/>
      <Route path="admin" component={Upload} />
    </Route>
  </Router>
);

export default renderRoutes;
