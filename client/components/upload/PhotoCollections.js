import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collection, CollectionItem } from 'react-materialize';


class PhotoCollections extends React.Component {
  constructor() {
    super();

    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { images, onRemove } = this.props;

    return images.map(f =>
      (
        <CollectionItem key={f.lastModified}>
          <img width="150px" src={f.preview} />
          {f.name} - {f.size} bytes
          <Button flat  waves='light' icon='clear' onClick={onRemove(f.lastModified)} />

        </CollectionItem>
      ));
  }


  render() {
    return (
      <Collection header='Photos List'>
        { this.renderPhotos() }
      </Collection>
    )

  }

}


PhotoCollections.propTypes = {
  images: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default PhotoCollections;
