import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';

import Spinner from '../spiner/Spinner';
import { listPhotos } from '../../api';
import PhotoItem from './PhotoItem';

class Photosession extends React.Component {
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


  startMasonry(counter) {
    const { photos } = this.state;
    let count = counter();

    if (count === photos.length) {
      const msnry = new Masonry('.grid', {
        itemSelector: '.grid-item',
        columnWidth: 350,
        gutter: 10
      });
    }
  }

  counter() {
    let currentCount = 0;

    return () => {
      currentCount++;
      return currentCount;
    }
  }

  componentDidMount() {
    listPhotos()
      .then(({ text }) => this.setState({photos: JSON.parse(text)}));

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


export default Photosession;
