import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

import Spinner from './spiner/Spinner';

const randomSymbols = (n) => Math.random().toString(36).slice(2, 2 + Math.max(1, Math.min(n, 25)));

class Add extends React.Component {
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

    const { files, text, date, photoType } = this.state;
    const about = {text, date, photoType};

    const req = request.post('/upload');

    files.forEach(file => {
      req.attach(randomSymbols(15), file);
    });
    req.query(about);

    req.end((err, res) => {
      this.setState({loading: false});
      if (err) {
        alert('Wrong saving. Tru again');
        return console.log('returned error:', err);
      }
      alert('Data saved');
      return;
    });
  }


  render() {
    const { files, text, date, photoType, loading } = this.state;
    console.log('work')

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

            <ul>
              {
                files.map(f =>
                  (<li key={f.lastModified}>
                    <img src={f.preview} alt="test" width="400px"/>
                    {f.name} - {f.size} bytes
                  </li>)
                )
              }

            </ul>
          </aside>

        </section>
      </Spinner>

    );
  }
}


export default Add;
