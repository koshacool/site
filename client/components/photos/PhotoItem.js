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
    const { src } = this.props;
    console.log(loading);

    return (
      <Spinner loading={loading} className="grid-item" id="grid-item">
        <img src={src} />
      </Spinner>
    );
  }
}

PhotoItem.propTypes = {
  src: PropTypes.string.isRequired
};


export default PhotoItem;
