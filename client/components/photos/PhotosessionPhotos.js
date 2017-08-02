import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';

import { apiPrefix } from '../../../etc/config.json';
import Spinner from '../spiner/Spinner';
import { photosessionPhotos } from '../../api';
import PhotoItem from './PhotoItem';
import MasanryConfig from '../MasanryConfig';
//import { Carousel  } from 'react-materialize';
import Carusel1 from '../carusel/Carusel1';

class PhotosessionPhotos extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      showCarusel: false
    };

    this.startMasonry = this.startMasonry.bind(this, this.counter());
    this.renderPhotos = this.renderPhotos.bind(this);
    this.showCarusel = this.showCarusel.bind(this);
  }

  renderPhotos() {
    const { photos } = this.state;

    return photos
      .map(photo => <PhotoItem src={photo.title} key={photo._id} onLoad={this.startMasonry}
                               showCarusel={this.showCarusel}/>);
  }

  componentDidMount() {
    const { params: { _id } } = this.props;

    photosessionPhotos(_id)
      .then(({ text }) => this.setState({photos: JSON.parse(text)}));

  }

  startMasonry(counter) {
    const { photos } = this.state;
    let count = counter();

    if (count === photos.length) {
      const msnry = new Masonry('.grid', MasanryConfig);
    }
  }

  counter() {
    let currentCount = 0;

    return () => {
      currentCount++;
      return currentCount;
    }
  }

  showCarusel() {
    const { showCarusel } = this.state;
    this.setState({
      showCarusel: !showCarusel
    });
  }

  getPhotos() {
    const { photos } = this.state;

    return photos.map(photo => `${apiPrefix}/${photo.title}`);
  }

  render() {
    const { photos, showCarusel } = this.state;
    const loading = photos.length === 0;

    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          { !loading && this.renderPhotos() }

          { !loading && <Carusel1 photos={photos} /> }
        </Spinner>
      </div>
    );
  }
}


export default PhotosessionPhotos;
