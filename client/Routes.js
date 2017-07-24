import React from 'react';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppLayout from './components/layouts/AppLayout';
import Home from './components/Home';
import PhotosList from './components/photos/PhotosList';
import Wedding from './components/photos/Wedding';
import LoveStory from './components/photos/LoveStory';
import Children from './components/photos/Children';

import Admin from './components/admin/Admin';
import Upload from './components/admin/upload/Upload';
import EditWedding from './components/admin/edit/EditWedding';
import EditLovestory from './components/admin/edit/EditLovestory';
import EditChildren from './components/admin/edit/EditChildren';


const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppLayout}>
      <IndexRoute component={Home}/>
      <Route path="photos" component={PhotosList}/>
      <Route path="wedding" component={Wedding}/>
      <Route path="lovestory" component={LoveStory}/>
      <Route path="children" component={Children}/>
    </Route>

    <Route path="/admin" component={Admin}>
      <IndexRoute component={Upload} />
      <Route path="wedding" component={EditWedding}/>
      <Route path="lovestory" component={EditLovestory}/>
      <Route path="children" component={EditChildren}/>
    </Route>
  </Router >
);

export default renderRoutes;
