import mongoose from "mongoose";
import config from '../../etc/config.json';
import '../models';

const Photo = mongoose.model('Photos');

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

export function createPhoto({ title, description, type }) {
  const photo = new Photo({
    title,
    description,
    type,
    createdAt: new Date()
  });

  return photo.save()
    .then(console.log('db saved'))
    .catch(err => console.log('error:', err));
}

export function deletePhoto(id) {
  return Photo.findById(id).remove();
}

