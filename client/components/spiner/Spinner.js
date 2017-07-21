import PropTypes from 'prop-types';
import React from 'react';

import './Spinner.less';

/**
 *
 * @param {(boolean|undefined)} isLoading A boolean or a undefined
 *
 *  * @return {bool}
 */
const showLoader = isLoading => isLoading === true || isLoading === undefined;

const Loader = () => (
  <div className="progress-circle-indeterminate" />
);

const Spinner = ({ loading, children, className, id }) => (
  <div className={`spinner-wrapper ${className}`} id={id}>
    { showLoader(loading) ? <Loader /> : children }
  </div>
);

Spinner.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Spinner;
