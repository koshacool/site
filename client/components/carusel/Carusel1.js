import React from 'react';
import PropTypes from 'prop-types';
import { apiPrefix } from '../../../etc/config.json';
import { Carousel  } from 'react-materialize';


class Carusel1 extends React.Component {
  constructor() {
    super();

    this.renderPhotos = this.renderPhotos.bind(this);
  }

  renderPhotos() {
    const { photos } = this.props;


    return photos.map(photo => <img src={`${apiPrefix}/${photo.title}`}/>);
  }

  render() {
    return (
      <div className="container">
        <Carousel images={[
	'https://lorempixel.com/250/250/nature/1',
	'https://lorempixel.com/250/250/nature/2',
	'https://lorempixel.com/250/250/nature/3',
	'https://lorempixel.com/250/250/nature/4',
	'https://lorempixel.com/250/250/nature/5'
]}/>
      </div>
    );
  }
}

Carusel1.propTypes = {
  photos: PropTypes.array.isRequired
};


export default Carusel1;
