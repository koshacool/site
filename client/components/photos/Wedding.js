import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';

import Spinner from '../spiner/Spinner';
import { weddingPhotos } from '../../api';
import PhotoItem from './PhotoItem';
import MasanryConfig from '../MasanryConfig';

class Wedding extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };

    this.startMasonry = this.startMasonry.bind(this, this.counter());
    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { photos } = this.state;

    return photos
      .map(photo => <PhotoItem src={photo.title} key={photo._id} onLoad={this.startMasonry}/>);
  }

  componentDidMount() {
    weddingPhotos()
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


  render() {
    const { photos } = this.state;
    const loading = photos.length === 0;

    return (
      <div className="container">
        <Spinner loading={loading} className="grid" id="grid">
          { !loading && this.renderPhotos() }
        </Spinner>
      </div>
    );
  }
}


export default Wedding;
