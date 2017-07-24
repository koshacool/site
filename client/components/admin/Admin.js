import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-materialize';

import AdminHeader from './AdminHeader';

class Admin extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="container">

        <AdminHeader />

        { children }

      </div>
    );
  }
}

Admin.propTypes = {
  children: PropTypes.node.isRequired
};

export default Admin;
