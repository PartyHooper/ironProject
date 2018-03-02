const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const userSchema = new Schema({
  provider_id: String,
  provider_name: String,
  picPath: String,
  events: [],
  password: String, 
  friends: []
});


module.exports = mongoose.model('User', userSchema);
