var express = require('express')
var router = express.Router();
var cors = require('cors')
var bodyParser = require('body-parser')
var moniker = require('moniker');

const Pizza = require('../models/pizza')

module.exports = () => {
  router.use(bodyParser.json())
  router.use(cors({origin: 'https://rainbowkereru.com'}))

  router.get('/', (req, res) => {
    res.send({msg: "Rainbow Kereru"})
  })

  router.get('/pizza/:name', (req, res) => {
    Pizza.findOne({name: req.params.name}, (err, pizza) => {
      if(err) return res.status(500).send({error: err})
      res.send(pizza)
    })
  })

  router.post('/pizza', (req, res) => {
    let order = {
      name: moniker.choose(),
      ingredients: req.body.order,
      customer: req.body.details
    }
    let p = new Pizza(order)
    p.save((err, pizza) => {
      if(err) return res.status(500).send({error: err}) 
      res.send(pizza)
    })
  })
  return router;
}
