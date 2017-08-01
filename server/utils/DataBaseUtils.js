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

export function createPhoto({ title, type, photosessionId }) {
  const photo = new Photo({
    title,
    type,
    photosessionId,
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

export function PhotoByPhotosessionId(id) {
  return Photo.find({ photosessionId: id});
}




export function createPhotosession({ cover, description }) {
  const photosession = new Photosession({
    cover,
    description,
    createdAt: new Date()
  });

  return photosession.save();
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

