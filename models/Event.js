const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const eventSchema = new Schema({
  creatorId: String,
  creatorName: String,
  creatorPicPath: String,
  description: String,
  name: String,
  startTime: Number,
  endTime: Number,
  picPath: String,
  max: Number,
  participants: [],
  applicants: [],
  contribution: Number,
  location: { type: { type: String }, coordinates: [Number] },
});


module.exports = mongoose.model('Event', eventSchema);