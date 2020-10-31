const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
  name: String,
  fields: [{
    key: String,
    type: String
  }],
  actions: [{
    key: String,
    action: String
  }],
  consumable: Boolean
}, {
  timestamps: true
})

module.exports = mongoose.model('Model', modelSchema)
