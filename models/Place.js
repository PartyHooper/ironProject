const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  description: String,
  reactions:[],
  type: String,
  pricing:[],
  participants: []
});

placeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', placeSchema);
