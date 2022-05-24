const express = require("express")
const mongoose = require('mongoose');
const config = require('../../config')

var app = express();

mongoose.connect(config.MONGO_URI,
     {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
    .then(() => {
        console.log('Database connected')
      }).catch(err => {
        console.error(err)
      })

process.on('uncaughtException', error => {
    console.error(error)
    mongoose.disconnect()
  })


module.exports = app;