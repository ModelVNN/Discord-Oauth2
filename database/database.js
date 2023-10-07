const { mongoUrl } = require('../config.json')
const mongoose = require('mongoose')

module.exports = mongoose.connect(mongoUrl)