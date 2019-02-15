const mongoose = require('mongoose')

const Purchase = new mongoose.Schema({
  ad: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  buyer: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Purchase', Purchase)
