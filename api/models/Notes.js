const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    text: String
});

module.exports = mongoose.model('Notes', NotesSchema);