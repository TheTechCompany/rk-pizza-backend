const express = require('express');
const greenlock = require('greenlock-express')
const router = require('./src/routes')
const mongoose = require('mongoose')

var app = express();

mongoose.connect('mongodb://localhost/rainbowkereru', {useNewUrlParser: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('=> Connection to Mongo')
  app.use(router(db))

  greenlock.init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    maintainerEmail: 'professional.balbatross@gmail.com',
    cluster: false
  }).serve(app)
})
