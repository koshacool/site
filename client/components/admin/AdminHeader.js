import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import { Navbar, NavItem } from 'react-materialize';


const AdminHeader = () => (
  <Navbar
    brand="HOME"
    className="grey lighten-3 grey-text text-darken-4 "
  >
    <NavItem  className="grey-text text-darken-4 right" href='/admin'>
      <Link to="/admin" >Upload</Link>
    </NavItem>


    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/children" >Children</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/lovestory" >Lovestory</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/wedding" >Wedding</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" >
      <Link to="/admin/photosession" >Photosession</Link>
    </NavItem>

  </Navbar>
);

export default AdminHeader;