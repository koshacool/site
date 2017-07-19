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
      text: '',
      date: '',
      photoType: '',
      loading: false,
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
    this.onChangeInput('photoType')(e);
  }

  onSave() {
    this.setState({loading: true});

      //let form = new FormData();
      //files.forEach(file => {
      //  form.append(file.name, file);
      //});
      //form.append('foo', 'bar');
      //axios.post('/api/art', form);


    const { files, text, date, photoType } = this.state;
    const about = {text, date, photoType};

    const req = request.post(`${apiPrefix}/upload`);

    files.forEach(file => {
      req.attach(randomSymbols(15), file);
    });
    req.query(about);

    req.end((err, res) => {
      this.setState({loading: false});
      if (err) {
        alert('Wrong saving. Try again');
        return console.log('returned error:', err);
      }
      alert('Data saved');
      return;
    });
  }


  render() {
    const { files, text, date, photoType, loading } = this.state;
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

            <select name='photoType' id='photoType' onChange={this.onSelectValue}>
              <option selected value={false}>Select photo type</option>
              <option value="lovestory">LoveStore</option>
              <option value="wedding">Wedding</option>
              <option value="children">Children</option>
            </select>
            <input type="date" id="date" name="date" value={date} onChange={this.onChangeInput('date')}/>
            <input type="text" id="text" name="text" value={text} onChange={this.onChangeInput('text')}/>

            <PhotoCollections images={files} onRemove={() => console.log('try remove') } />
          </aside>

        </section>
      </Spinner>

    );
  }
}


export default Upload;
