import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spiner/Spinner';
import { apiPrefix } from '../../../etc/config.json';


class PhotoItem extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };

  }

  componentDidMount() {
    this.setState({loading: false});
  }

  render() {
    const { loading } = this.state;
    const { src, onLoad } = this.props;

    return (
      <Spinner loading={loading} className="grid-item">

        <img src={`${apiPrefix}/${src}`} onLoad={onLoad}/>

      </Spinner>
    );
  }
}

PhotoItem.propTypes = {
  src: PropTypes.string.isRequired
};


export default PhotoItem;
