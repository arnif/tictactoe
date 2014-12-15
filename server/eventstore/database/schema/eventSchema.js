'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EventSchema = new Schema({
  _id: String,
  events: []
});

module.exports = mongoose.model('Event', EventSchema);
