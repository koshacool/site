import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';

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
//app.use(cors({ origin: '*' }));

// RESTful api handlers
//app.get('/photos', (req, res) => {
//    db.listNotes().then(data => res.send(data));
//});
//
//app.post('/photos', (req, res) => {
//    db.createNote(req.body).then(data => res.send(data));
//});
//
//app.delete('/photos/:id', (req, res) => {
//    db.deleteNote(req.params.id).then(data => res.send(data));
//});



/*
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
        });
    }

    photosNames.forEach((photo) => {
        console.log(files[photo].fieldName);
        moveFile(files[photo].path, path.join(__dirname, `/images/${files[photo].fieldName}.jpg`))
          .then(fs.unlink(files[photo].path));


    });

    res.send({test: 123});

});
*/

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});

