import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';

import Spinner from '../spiner/Spinner';
import { listPhotos } from '../../api';
import PhotoItem from './PhotoItem';

class PhotosList extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: []
    };

    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { photos } = this.state;
    console.log(photos);

    return photos
      .map(photo => <PhotoItem src={photo.title} key={photo._id}/>);
  }

  componentDidMount() {
    listPhotos()
      .then(({ text }) => this.setState({photos: JSON.parse(text)}));
  }

  componentDidUpdate() {
    const grid = document.getElementById('grid');
    const msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: 200,
      gutter: 10
    });
  }

  render() {
    const { photos } = this.state;
    const loading = photos.length === 0;

    return (
      <Spinner loading={loading} className="grid" id="grid">

        { !loading && this.renderPhotos() }

      </Spinner>
    );
  }
}


export default PhotosList;
