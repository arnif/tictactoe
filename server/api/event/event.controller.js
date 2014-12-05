'use strict';

var _ = require('lodash');
var app = require('../../app');

exports.getEvents = function(req, res) {

  if(!app.eventStore){
    app.eventStore = require('../../eventstore/memoryStore')();
  }

  var store = app.eventStore;

  res.json(store.loadEvents(req.params.uuid));
};
