const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
  name: String,
  fields: [Object],
  actions: [Object],
  consumable: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Model', modelSchema)
