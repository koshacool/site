import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
//import { Icon } from 'react-materialize';

import { apiPrefix } from '../../../../etc/config.json';
import Spinner from '../../spiner/Spinner';
import UploadPhotosList from '../photos/UploadPhotosList';
import SaveParams from './SaveParams';

class Description extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
      description: '',
      type: 'wedding'
    };


  }



  render() {

    return (
      <div className="container">
        <div className="dropzone">
          <h2>drop files here</h2>
          <Dropzone onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple accept="image/jpeg">
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>

        {files.length > 0 && (
          <div className="container">
            <SaveParams onSave={this.onSave} onChangeInput={this.onChangeInput} type={type}/>
            <UploadPhotosList images={files} onRemove={this.onRemove}/>
          </div>
        )}

      </div>


    );
  }
}


export default Description;
