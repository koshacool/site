import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Home from './components/Home';
import Add from './components/Add';


const renderRoutes = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Home}>
      <IndexRoute component={Add}/>

    </Route>
  </Router>
);

export default renderRoutes;
