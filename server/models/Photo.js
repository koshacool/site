const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let PhotoSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  photosessionId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Photos', PhotoSchema);