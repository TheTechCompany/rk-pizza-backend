const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema({
  name: String,
  ingredients: {
    sauce: Array,
    cheese: Array,
    toppings: Array
  },
  customer: {
    name: String,
    phone: String,
    address: Object,
    email: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Pizza', pizzaSchema)
