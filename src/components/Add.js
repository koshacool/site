import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';


class Add extends React.Component {
  constructor() {
    super();
    this.state = {files: []};
    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onDrop(files) {
    this.setState({
      files,
    });

    console.log(files);
    //
    // const req = request.post('/upload');
    // files.forEach(file => {
    //   req.attach(file.name, file);
    // });
    // req.end((err, res) => {
    //   if (err) {
    //     return console.log('returned error:', err);
    //   }
    //   return console.log('returned data', res.req._data);
    // });
  }

  onSave() {
    const photosArr = this.state.files;
    const req = request.post('/upload');

    photosArr.forEach(file => {
      console.log(file)
      req.attach(file.name, file);
    });
    req.end((err, res) => {
      if (err) {
        return console.log('returned error:', err);
      }
      return console.log('returned data', res.req._data);
    });

    /*request
     .post('/upload')
     .send({photo: photosArr[0]})
     .end((err, res) => {
     if (err) {
     return console.log('returned error:', err);
     }
     return console.log('returned data', res.req._data);
     });*/
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop} multiple>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            <form method="POST" action="/upload">
              <input type="file" />

              <input type="submit" />
            </form>
            {
              this.state.files.map(f =>
                (<li key={f.lastModified}>
                  <img src={f.preview} alt="test"/>
                  {f.name} - {f.size} bytes
                </li>)
              )
            }
            <button onClick={this.onSave}>save</button>
          </ul>
        </aside>
      </section>
    );
  }
}


export default Add;
