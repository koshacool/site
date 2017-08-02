import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spiner/Spinner';
import {Link} from 'react-router';

class FolderItem extends React.Component {
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
    const { src, onLoad, photosessionId } = this.props;

    return (
      <Spinner loading={loading}>
        <div className="image grid-item" id="image">
          <Link to={`/photosession/${photosessionId}`} >
            <img src={src} onLoad={onLoad}/>
          </Link>

        </div>
      </Spinner>
    );
  }
}

FolderItem.propTypes = {
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  photosessionId: PropTypes.string.isRequired,
};


export default FolderItem;
