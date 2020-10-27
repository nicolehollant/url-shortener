const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const text = Schema({
    text: String,
    short_id: String,
});

module.exports = mongoose.model('Text', text);