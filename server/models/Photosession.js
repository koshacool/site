const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let PhotosessionSchema = mongoose.Schema({
  cover: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Photosession', PhotosessionSchema);