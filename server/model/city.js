const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/citys', { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema

const citySchema = new Schema({
  name: String,
  index: String
})

const City = mongoose.model('City', citySchema, 'city')

module.exports = City





