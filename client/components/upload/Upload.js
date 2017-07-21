import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

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
      type: '',
      loading: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectValue = this.onSelectValue.bind(this);
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
      this.setState({ loading: false });
      if (err) {
        alert('Wrong saving. Try again');
        return console.log('returned error:', err);
      }
      this.setState({ files: [] });
      alert(res.text);

      return;
    });
  }


  render() {
    const { files, description, photoType, loading } = this.state;
    console.log('work');

    return (
      <Spinner loading={loading}>
        <section>
          <div className="dropzone">
            <Dropzone onDrop={this.onDrop} onDropRejected={this.onDropRejected} multiple accept="image/jpeg">
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>

            <button onClick={this.onSave}>Save</button>

            <select name='type' id='type' onChange={this.onSelectValue}>
              <option selected value={false}>Select photo type</option>
              <option value="lovestory">LoveStore</option>
              <option value="wedding">Wedding</option>
              <option value="children">Children</option>
            </select>

            <input type="text" id="description" name="description" value={description} onChange={this.onChangeInput('description')}/>

            <PhotoCollections images={files} onRemove={() => console.log('try remove') } />
          </aside>

        </section>
      </Spinner>

    );
  }
}


export default Upload;
