import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Button, Row, Input, Icon, } from 'react-materialize';

import { apiPrefix } from '../../../etc/config.json';
import Spinner from '../spiner/Spinner';
import PhotoCollections from './PhotoCollections';

const randomSymbols = (n) => Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 25)));

class Upload extends React.Component {
  constructor() {
    super();
    this.state = {
      files: [],
      description: '',
      type: 'wedding',
      loading: false
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
      const req = request.delete(`${apiPrefix}/photo/${id}`);

      files.splice(files.findIndex((item) => item._id === id), 1);
      this.setState({files});


      req.end((err, res) => {
        if (err) {
          //alert('Wrong remove. Try again');
          return console.log('returned error:', err);
        }

        return console.log('Photo removed.');
      });
    }


  }


  render() {
    const { files, description, type, loading } = this.state;

    return (
      <Spinner loading={loading}>
        <div className="container">
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple accept="image/jpeg">
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <div className="container">
            <h2>Dropped files</h2>

            <Button onClick={this.onSave}>Save</Button>

            <Row>
              <Input s={6} type="text" label="Description" id="description" onChange={this.onChangeInput('description')}
                     validate/>
            </Row>
            <Row>
              <Input
                name='type'
                type='checkbox'
                value='wedding'
                label='Wedding'
                checked={type == 'wedding' ? true : false}
                onChange={this.onChangeInput('type')}
              />
              <Input name='type'
                     type='checkbox'
                     value='lovestory'
                     label='Lovestory'
                     checked={type == 'lovestory' ? true : false}
                     onChange={this.onChangeInput('type')}
              />
              <Input
                name='type'
                type='checkbox'
                value='children'
                label='Children'
                checked={type == 'children' ? true : false}
                onChange={this.onChangeInput('type')}
              />
            </Row>

            <PhotoCollections images={files} onRemove={() => console.log('try remove') } />

          </div>
        </div>
      </Spinner>

    );
  }
}


export default Upload;
