import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem } from 'react-materialize';
import {Link} from 'react-router';
import Logo from './Logo';

const SiteFooter = () => (
  <Navbar
    brand="HOME"
    className="grey lighten-3 grey-text text-darken-4 "
  >
    <NavItem  className="grey-text text-darken-4 right" href='/admin'><Link to="/admin" >Getting started</Link></NavItem>
    <NavItem className="grey-text text-darken-4 right">Components</NavItem>
  </Navbar>
);

export default SiteFooter;