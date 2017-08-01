import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collection, CollectionItem, Input, Row } from 'react-materialize';


class UploadPhotosList extends React.Component {
  constructor() {
    super();

    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { images, onRemove, type, cover, onCheckbox } = this.props;
    const showCheckbox = type == 'photosession';

    return images.map(f =>
      (
        <CollectionItem key={f.lastModified}>
          <img width="150px" src={f.preview}/>
          <div>
            {f.name} - {f.size} bytes

            <Button flat waves='light' icon='clear' onClick={onRemove(f.lastModified)}/>

            {showCheckbox && (<Input
              name='cover'
              type='checkbox'
              value={`${f.lastModified}`}
              label='Cover'
              checked={cover == f.lastModified ? true : false}
              onChange={onCheckbox('cover')}
            />)}


          </div>
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
  images:     PropTypes.array.isRequired,
  onRemove:   PropTypes.func.isRequired,
  type:       PropTypes.string.isRequired,
  cover:      PropTypes.string.isRequired,
  onCheckbox: PropTypes.func.isRequired
};

export default UploadPhotosList;
