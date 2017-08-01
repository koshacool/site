import mongoose from "mongoose";
import config from '../../etc/config.json';
import '../models';

const Photo = mongoose.model('Photos');
const Photosession = mongoose.model('Photosession');

export function setUpConnection() {
  const { host, port, name } = config.db;
  mongoose.connect(`mongodb://${host}:${port}/${name}`, {
    useMongoClient: true
    /* other options */
  });
}

export function listPhotos() {
  return Photo.find();
}

export function photosByType(type) {
  return Photo.find({type});
}

export function createPhoto({ title, type }) {
  const photo = new Photo({
    title,
    type,
    createdAt: new Date()
  });

  return photo.save();
    //.then(console.log('db saved'))
    //.catch(err => console.log('error:', err));
}

export function deletePhoto(id) {
  return Photo.findById(id).remove();
}

export function PhotoById(id) {
  return Photo.findOne({ _id: id});
}




export function createPhotosession({ cover, description, photos }) {
  const photosession = new Photosession({
    cover,
    description,
    photos,
    createdAt: new Date()
  });

  return photosession.save()
    .then(console.log('photosession saved'))
    .catch(err => console.log('error:', err));
}

export function listPhotosession() {
  return Photosession.find();
}

export function PhotosessionById(id) {
  return Photosession.find({ _id: id });
}

export function deletePhotosession(id) {
  return Photosession.findById(id).remove();
}

