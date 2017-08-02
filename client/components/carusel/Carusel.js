import React from 'react';
import PropTypes from 'prop-types';
import { apiPrefix } from '../../../etc/config.json';
import Carousel from 'nuka-carousel';


class Carusel extends React.Component {
  constructor() {
    super();

    this.mixins = [Carousel.ControllerMixin];
    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { photos } = this.props;


    return photos.map(photo => <img src={`${apiPrefix}/${photo.title}`}/>);
  }

  render() {
    return (
      <div className="container" >
        <Carousel>
          { this.renderPhotos() }
        </Carousel>
      </div>
    );
  }
}

Carusel.propTypes = {
  photos: PropTypes.array.isRequired
};


export default Carusel;
