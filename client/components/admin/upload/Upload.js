import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
//import { Icon } from 'react-materialize';
import { createPhotos, createPhotosession } from '../../../api';
import { apiPrefix } from '../../../../etc/config.json';
import Spinner from '../../spiner/Spinner';
import UploadPhotosList from '../photos/UploadPhotosList';
import SaveParams from './SaveParams';


const randomSymbols = (n) => Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 25)));


class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      files: [],
      description: '',
      type: 'wedding',
      cover: '',
      renamedCover: ''
    };

    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.changeNames = this.changeNames.bind(this);
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
    const { filesObj, coverName } = this.changeNames();
    const { files, description, type } = this.state;
    let photosessionId = '';

    if (type == 'photosession') {
      createPhotosession(coverName, description)
        .then(res => {
          photosessionId = res.body._id;
          return this.savePhotos(filesObj, type, photosessionId);
        })
        .catch(err => {
          console.log(err);
          alert('Wrong saving. Try again');
        });
    } else {
     this.savePhotos(filesObj, type, photosessionId);
    }
  }

  savePhotos(filesObj, type, photosessionId) {
    createPhotos(filesObj, type, photosessionId)
      .then((res) => {
        return res.body;
      })
      .then(res => {
        alert('saved');
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

  changeNames() {
    const { files, type, cover } = this.state;
    let filesObj = {};
    let coverName = '';

    files.forEach(file => {
      let name = randomSymbols(15);
      filesObj[name] = file;

      if (type == 'photosession' && file.lastModified == cover) {
        coverName = name;
      }
    });

    return {filesObj, coverName};
  }


  render() {
    const { files, description, type, loading, cover } = this.state;

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
              <UploadPhotosList
                images={files}
                onRemove={this.onRemove}
                type={type}
                onCheckbox={this.onChangeInput}
                cover={cover}
              />
            </div>
          )}
        </Spinner>

      </div>


    );
  }
}


export default Upload;
