import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collection, CollectionItem } from 'react-materialize';


class UploadPhotosList extends React.Component {
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
    console.log(this.props.location)
    return (
      <Collection header='Photos List'>
        { this.renderPhotos() }
      </Collection>
    )

  }

}


UploadPhotosList.propTypes = {
  images: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default UploadPhotosList;
