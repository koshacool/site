import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
//import { Icon } from 'react-materialize';
import { createPhotos } from '../../../api';
import { apiPrefix } from '../../../../etc/config.json';
import Spinner from '../../spiner/Spinner';
import UploadPhotosList from '../photos/UploadPhotosList';
import SaveParams from './SaveParams';


class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      files: [],
      description: '',
      type: 'wedding'
    };

    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }

  onDropRejected() {
    alert('recieved');
  }

  onChangeInput(field) {
    return e => this.setState({[field]: e.target.value});
  }

  onSelectValue(e) {
    this.onChangeInput('type')(e);
  }

  onSave() {
    this.setState({loading: true});
    const { files, description, type } = this.state;
    let savedPhotosId = [];

    createPhotos(files, type)
      .then((res) => {
        //savedPhotosId = JSON.parse(text);
        alert('saved');
        console.log(res)
        this.setState({
          loading: false,
          files: []
        });
      })
      .catch(err => {
        console.log(err);
        alert('Wrong saving. Try again');
      });
  }

  onRemove(id) {
    return () => {
      const { files } = this.state;

      files.splice(files.findIndex((item) => item.lastModified === id), 1);
      this.setState({files});
    }


  }


  render() {
    const { files, description, type, loading } = this.state;

    return (
      <div className="container">
        <div className="dropzone">
          <h2>drop files here</h2>
          <Dropzone onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple accept="image/jpeg">
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>

        <Spinner loading={loading}>
          {files.length > 0 && (
            <div className="container">
              <SaveParams onSave={this.onSave} onChangeInput={this.onChangeInput} type={type}/>
              <UploadPhotosList images={files} onRemove={this.onRemove}/>
            </div>
          )}
        </Spinner>

      </div>


    );
  }
}


export default Upload;
