import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Collection } from 'react-materialize';
import { photosessionPhotos, deletePhotosession } from '../../../api';

import Spinner from '../../spiner/Spinner';
import PhotoItem from '../photos/PhotoItem';


class EditPhotosession extends React.Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      loading: true
    };

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(id) {
    return deletePhotosession(id)
      .then(res => this.getPhotos())
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos() {
    photosessionPhotos()
      .then(({ text }) => {
        const photos = JSON.parse(text);
        const loading = photos.length == 0;

        this.setState({
          photos,
          loading
        })
      })
      .catch(err => console.log('Error: ', err));
  }

  renderPhotos() {
    const { photos } = this.state;

    return photos
      .map(photo => {
        const obj = {title: photo.cover, _id: photo._id};
        return <PhotoItem photo={obj} key={photo._id} onRemove={this.onRemove}/>
      });
  }

  render() {
    const { photos, loading } = this.state;

    return (
      <div className="container">
        <Spinner loading={loading}>
          <Collection>
            {
              photos.length > 0 && this.renderPhotos()
            }
          </Collection>
        </Spinner>
      </div>
    );
  }
}


export default EditPhotosession;
