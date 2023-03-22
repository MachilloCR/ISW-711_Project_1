const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({

  email: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  role_id: { type: Number }

});


const UserModel = mongoose.model('Users', user);

module.exports = {
  schema: user,
  model: UserModel
}