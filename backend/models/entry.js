const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entry = Schema({
    original_url: String,
    short_id: String,
});

module.exports = mongoose.model('Entry', entry);