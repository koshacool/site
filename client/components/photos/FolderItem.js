import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spiner/Spinner';


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
    const { src, onLoad } = this.props;

    return (
      <Spinner loading={loading}>
        <div className="image grid-item" id="image">
          <img src={src}  onLoad={onLoad}/>
        </div>
      </Spinner>
    );
  }
}

FolderItem.propTypes = {
  src: PropTypes.string.isRequired
};


export default FolderItem;
