const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  location: { type: { type: String }, coordinates: [Number] },
  description: String,
  reviews:[],
  type: String,
  pricing:[],
  participants: [],
  picPath: String
});

placeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Place', placeSchema);
