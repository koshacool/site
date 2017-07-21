import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spiner/Spinner';


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
      <Spinner loading={loading} >
        <img src={src}  className="grid-item" onLoad={onLoad} />
      </Spinner>
    );
  }
}

PhotoItem.propTypes = {
  src: PropTypes.string.isRequired
};


export default PhotoItem;
