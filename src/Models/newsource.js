const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const source = new Schema({
  url: { type: String },
  name: { type: String },
  category_id: { type: String },
  user_id: { type: String }
});

const SourceModel = mongoose.model('Sources', source);

module.exports = {
  schema: source,
  model: SourceModel
}