import React from 'react';
import PropTypes from 'prop-types';
import { CollectionItem, Button } from 'react-materialize';

import Spinner from '../../spiner/Spinner';
import { apiPrefix } from '../../../../etc/config.json';

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
    const { photo, onRemove } = this.props;

    return (
      <Spinner loading={loading}>
        <CollectionItem>
          <div className="container">
            <img width="150px" src={`${apiPrefix}/${photo.title}`}/>
            <Button flat waves="light"  icon='clear' onClick={onRemove(photo._id)}/>
          </div>
        </CollectionItem>
      </Spinner>
    );
  }
}

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};


export default PhotoItem;
