import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
//import { Icon } from 'react-materialize';

import { apiPrefix } from '../../../../etc/config.json';
import Spinner from '../../spiner/Spinner';
import UploadPhotosList from '../photos/UploadPhotosList';
import SaveParams from './SaveParams';

const randomSymbols = (n) => Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 25)));

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
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
    const about = {description, type};

    const req = request.post(`${apiPrefix}/upload`);
    req.query(about);

    files.forEach(file => {
      req.attach(randomSymbols(15), file);
    });

    req.end((err, res) => {
      this.setState({loading: false});
      if (err) {
        alert('Wrong saving. Try again');
        return console.log('returned error:', err);
      }
      this.setState({files: []});
      alert(res.text);

      return;
    });
  }

  onRemove(id) {
    return () => {
      const { files } = this.state;
      //const req = request.delete(`${apiPrefix}/photo/${id}`);

      files.splice(files.findIndex((item) => item.lastModified === id), 1);
      this.setState({ files });


      //req.end((err, res) => {
      //  if (err) {
      //    //alert('Wrong remove. Try again');
      //    return console.log('returned error:', err);
      //  }


      //});

      console.log('Photo removed.');

      console.log(files, id)
    }


  }


  render() {
    const { files, description, type } = this.state;

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


export default Upload;
