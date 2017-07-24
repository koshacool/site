import React from 'react';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from './components/layouts/AppLayout';
import Home from './components/Home';
import Upload from './components/upload/Upload';
import PhotosList from './components/photos/PhotosList';
import Wedding from './components/photos/Wedding';
import LoveStory from './components/photos/LoveStory';
import Children from './components/photos/Children';


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={Home}/>
      <Route path="photos" component={PhotosList} />
      <Route path="wedding" component={Wedding} />
      <Route path="lovestory" component={LoveStory} />
      <Route path="children" component={Children} />
      <Route path="admin" component={Upload} />
    </Route>
  </Router>
);

export default renderRoutes;
