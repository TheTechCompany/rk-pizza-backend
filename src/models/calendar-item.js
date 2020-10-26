const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const calendarSchema = new mongoose.Schema({
  start: Number,
  end: Number,
  data: Object,
  resources: [{type: Schema.Types.ObjectId, ref: 'Resource' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('CalendarItem', calendarSchema)
