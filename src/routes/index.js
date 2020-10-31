var express = require('express')
var router = express.Router();
var cors = require('cors')
var bodyParser = require('body-parser')
var moniker = require('moniker');
var jwt = require('jsonwebtoken');

const { Model, Pizza, Resource, CalendarItem }   = require('../models')

const SECRET_CODE = "RAINBOWPERSON";

module.exports = () => {
  router.use(bodyParser.json())
  router.use(cors({origin: ['http://localhost:3000', 'https://rainbowkereru.com']}))

  router.get('/', (req, res) => {
    res.send({msg: "Rainbow Kereru"})
  })

  router.post('/kindy', (req, res) => {
    if(req.body.code == SECRET_CODE){
      let payload = {
        name: req.body.name,
        dt: new Date().getTime()
      }
      res.send({result: jwt.sign(payload, SECRET_CODE)})
    }else{
      res.send({error: "Access denied, please ask a friend"})
    }
  })



  router.route('/kindy/tools')
    .post((req, res) => {
      let resource = new Resource({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        bookable: true
      })

      resource.save((err, _res) => {
        res.send((err) ? {error: err} : _res)
      })
    })
    .get((req, res) => {
      Resource.find({bookable: true}).exec((err, resources) => {
        res.send((err) ? {error: err} : resources)
      })
    })

  router.route('/kindy/models')
    .post((req, res) => {
      let model = new Model({
        name: req.body.name,
        fields: req.body.fields,
        consumable: req.body.consumable || true
      })

      model.save((err, _model) => {
        res.send((err) ? {error: err} : _model)
      })
    })
    .get((req, res) => {
      Model.find({}).exec((err, models) => {
        res.send((err) ? {error: err} : models)
      })
    })
    .put((req, res) => {
      Model.updateOne({_id: req.body._id}, {
        name: req.body.name,
        fields.req.body.fields
      }, {omitUndefined: true}, (err) => {
        res.send((err) ? {error: err} : {success: true})
      })    
    })

  router.route('/kindy/resources')
    .post((req, res) => {
      let resource = new Resource({
        name: req.body.name,
        location: req.body.location,
        type: req.body.type,
        bookable: false
      })

      resource.save((err, _res) => {
        res.send((err) ? {error: err} : _res)
      })
    })
    .get((req, res) => {
      Resource.find({bookable: false}).exec((err, resources) => {
        res.send((err) ? {error: err} : resources)
      })
    })

  router.route('/kindy/calendar')
    .put((req, res) => {
      CalendarItem.updateOne({_id: req.body.id}, {
        start: new Date(req.body.start).getTime(),
        end: new Date(req.body.end).getTime(),
        data: req.body.data,
        resources: req.body.resources
      }, {omitUndefined: true}, (err) => {
        res.send((err) ? {error: err}: {success: true})
      })
    })
    .delete((req, res) => {
      CalendarItem.deleteOne({_id: req.body.id}, (err) => {
        res.send((err) ? {error: err} : {success: true})
      })
    })
    .post((req, res) => {

      let start = new Date(req.body.start);
      let end = new Date(req.body.end);

      let item = new CalendarItem({
        start: start.getTime(),
        end: end.getTime(),
        data: req.body.data,
        resources: req.body.resources
      })

      item.save((err, calendarItem) => {
        res.send((err) ? {error: err} : calendarItem)
      })
    })
    .get((req, res) => {
      CalendarItem.find().exec((err, items) => {
        res.send((err) ? {error: err} : items)
      })
    })

  router.route('/kindy/gallery')
    .post((req, res) => {

    })
    .get((req, res) => {

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
