const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name: { type: String },
});

const CategoryModel = mongoose.model('Categories', category);

module.exports = {
    schema: category,
    model: CategoryModel
}