const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    Id: String,
    Name: String
})

module.exports = mongoose.model('users', Schema)