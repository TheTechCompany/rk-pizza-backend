const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  bookable: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Resource', resourceSchema)
