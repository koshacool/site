const mongoose = require('mongoose');

let ImageSchema = mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  modified: { type: Date, default: Date.now }
});


mongoose.model('Images', ImageSchema);