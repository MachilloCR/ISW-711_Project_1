const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const session = new Schema({
   token: { type: String },
});



const SessionModel = mongoose.model('Sessions', session);

module.exports = {
   schema: session,
   model: SessionModel
}