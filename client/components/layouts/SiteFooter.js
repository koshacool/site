import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from 'react-materialize';

const SiteFooter = () => (
  <Footer
    className="grey lighten-3 page-footer"
    copyrights="&copy 2015 Copyright Text"

    moreLinks={
		  <a className="grey-text text-darken-4 right" href="#!">More Links</a>
	  }
  >

    <h5 className="grey-text text-darken-4">Footer Content</h5>
    <p className="grey-text text-darken-4">You can use rows and columns here to organize your footer content.</p>

  </Footer>
);

export default SiteFooter;