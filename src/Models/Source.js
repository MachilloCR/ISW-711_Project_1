const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const source = new Schema({
    
    id: { type: String },
    url: { type: String },
    name: { type: String },
    category_id: { type: Number },
    user_id: { type: Number }
});

const SourceModel = mongoose.model('Sources', source);

module.exports = {
  schema: source,
  model: SourceModel
}