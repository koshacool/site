var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
app.use(express.static('dist'));
app.use(express.static('public'));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/getdata', function (req, res) {
  res.send({test: 123});
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
    });
  }

  photosNames.forEach((photo) => {
    console.log(files[photo].fieldName);
    moveFile(files[photo].path, path.join(__dirname, `/images/${files[photo].fieldName}.jpg`))
      .then(fs.unlink(files[photo].path));


  });

  res.send({test: 123});


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
