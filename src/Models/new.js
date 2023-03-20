const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const New = new Schema({
    title: { type: String },
    short_description: { type: String },
    permalink: { type: String },
    date: { type: String },
    news_source_id: { type: String },
    category_id: { type: String },
    user_id: { type: String }
});

const NewModel = mongoose.model('News', New);

module.exports = {
    schema: New,
    model: NewModel
}