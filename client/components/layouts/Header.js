import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem } from 'react-materialize';
import {Link} from 'react-router';
import Logo from './Logo';

const Header = () => (
  <Navbar
    brand="HOME"
    className="grey lighten-3 grey-text text-darken-4 "
  >
    <NavItem  className="grey-text text-darken-4 right" href='/admin'>
      <Link to="/admin" >Upload</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" href='/photos'>
      <Link to="/photos" >Photos</Link>
    </NavItem>

    <NavItem className="grey-text text-darken-4 right" href='/photos'>
      <Link to="/lovestory" >Lovestory</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" href='/photos'>
      <Link to="/children" >Children</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" href='/photos'>
      <Link to="/wedding" >Wedding</Link>
    </NavItem>
    <NavItem className="grey-text text-darken-4 right" href='/photos'>
      <Link to="/photosession" >Photosession</Link>
    </NavItem>

  </Navbar>
);

export default Header;