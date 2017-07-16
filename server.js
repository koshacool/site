var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

app.get('/getdata', function (req, res) {
  res.send({test: 123});
});

app.post('/upload', multipartMiddleware, function (req, res) {
  const photos = req.files;
  console.log(photos)
  const photosNames = Object.keys(photos);
  photosNames.forEach((photo) => {
    fs
      .createReadStream(photos[photo].jpg.path)
      .pipe(fs.createWriteStream(path.join(__dirname, `/images/${photos[photo].jpg.name}`)));
  });


 /* fs.writeFile(path.join(__dirname, 'images/1.jpeg'), photos,  function(err) {
    if (err) throw err;
    console.log('File saved.');
  });*/

  // photos.forEach((photo) => {
  //   fs.writeFile(path.join(__dirname, 'images/img.1'), photo, 'binary', function(err) {
  //     if (err) throw err;
  //     console.log('File saved.');
  //   });
    // fs.createWriteStream(path.join(__dirname, 'images'));
    // fsUtil(
    //   photo.preview,
    //   path.join(__dirname, 'images'),
    //   function (state) {
    //     console.log("progress", state);
    //   },
    //   function (response) {
    //     console.log("status code", response.statusCode);
    //   },
    //   function (error) {
    //     console.log("error", error);
    //   },
    //   function () {
    //     console.log("done");
    //   }
    // )
  // })

});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var server = app.listen(3000, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('server run on port 3000');
});
