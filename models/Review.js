const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const reviewSchema = new Schema({
  creatorId: String,
  creatorName: String,
  creatorPicPath: String,
  rating: Number,
  music: String,
  crowded: String,
  picPath: String,
  date: Date
}, {
    timestamps:{
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});


module.exports = mongoose.model('Review', reviewSchema);