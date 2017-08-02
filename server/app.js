import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

import multipart from 'connect-multiparty';
import { serverPort } from '../etc/config.json';
import * as db from './utils/DataBaseUtils';

var multipartMiddleware = multipart();


// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('dist'));
app.use(express.static('public'));

// Allow requests from any origin
app.use(cors({origin: '*'}));


// RESTful api handlers
app.get('/get/all', (req, res) => {
  db.listPhotos().then(data => res.send(data));
});

app.get('/get/wedding', (req, res) => {
  db.photosByType('wedding').then(data => res.send(data));
});

app.get('/get/lovestory', (req, res) => {
  db.photosByType('lovestory').then(data => res.send(data));
});

app.get('/get/children', (req, res) => {
  db.photosByType('children').then(data => res.send(data));
})

app.get('/get/photosession', (req, res) => {
  db.listPhotosession().then(data => res.send(data));
});

app.get('/get/photosession/:id', (req, res) => {
  const id = req.params.id;
  db.PhotoByPhotosessionId(id).then(data => res.send(data));
});


app.delete('/photo/:id', (req, res) => {
  db.PhotoById(req.params.id)
    .then(res => fs.unlink(path.join(__dirname, `../public/${res.title}`)))//delete foto in folder
    .then(() => db.deletePhoto(req.params.id))//delete note in db
    .then(data => res.send(data))//return result
    .catch(err => console.log('Error: ', err));
});

app.delete('/photosession/:id', (req, res) => {
  const id = req.params.id;
  db.deletePhotosession(id)
    .then(() => db.PhotoByPhotosessionId(id))
    .then((data) => {
      let arrOfPromisses = data.map(photo => {
        return db.PhotoById(photo._id)
          .then(res => fs.unlink(path.join(__dirname, `../public/${res.title}`)))//delete foto in folder
          .then(() => db.deletePhoto(photo._id))//delete note in db
          .then(data => res.send(data))//return result
          .catch(err => console.log('Error: ', err));
      })
     return Promise.all(arrOfPromises);
    })
    .then(data => res.send(data))//return result
  .catch(err => console.log('Error: ', err));
});

app.post('/upload', multipartMiddleware, function (req, res) {
  const { files, query } = req;
  const photosNames = Object.keys(files);

  const moveFile = function (from, to) {
    const source = fs.createReadStream(from);
    const dest = fs.createWriteStream(to);

    return new Promise((resolve, reject) => {
      source.on('end', resolve);
      source.on('error', reject);
      source.pipe(dest);
    })
  };


  new Promise((resolve, reject) => {
    let arrOfPromises = photosNames.map((photo, i) => {
      return moveFile(files[photo].path, path.join(__dirname, `../public/images/${files[photo].fieldName}.jpg`))//move file
        .then(fs.unlink(files[photo].path))//remove file
        .then(() => {
          return db.createPhoto({
            title: `images/${files[photo].fieldName}.jpg`,
            type: query.type,
            photosessionId: query.photosessionId,
            date: new Date()
          })
        })//Save foto in db
        .catch(reject)
    });

    resolve(Promise.all(arrOfPromises));
  })
    .then(arrOfResult => {
      return arrOfResult.map(obj => obj._id);
    })
    .then(arr => res.send(arr))
    .catch(console.log.bind(console))
});

app.post('/photosession', multipartMiddleware, function (req, res) {
  new Promise((resolve, reject) => {
    db.createPhotosession(req.query)
      .then(result => resolve(result))
      .catch(err => reject(err));
  })
    .then(result => res.send(result))
    .catch(console.log.bind(console));
});


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = app.listen(serverPort, function () {
  console.log(`Server is up and running on port ${serverPort}`);
});
