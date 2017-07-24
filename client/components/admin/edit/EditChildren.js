import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Collection } from 'react-materialize';
import { childrenPhotos, deletePhotos } from '../../../api';

import Spinner from '../../spiner/Spinner';
import PhotoItem from '../photos/PhotoItem';


class EditChildren extends React.Component {
  constructor() {
    super();

    this.state = {
      photos: [],
      loading: true
    };

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove(id) {
    return () => {
      deletePhotos(id)
        .then(res => this.getPhotos())
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos() {
    childrenPhotos()
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
      .map(photo => <PhotoItem photo={photo} key={photo._id} onRemove={this.onRemove}/>);
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


export default EditChildren;
