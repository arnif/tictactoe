'use strict';

var _ = require('lodash');
var app = require('../../app');

exports.getEvents = function(req, res) {
  if(!app.eventStore){
    app.eventStore = require('../../eventstore/memory/memoryStore')();
  }

  var store = app.eventStore;

  store.loadEvents(req.params.uuid).then(function(result) {
    res.json(result);
  });
};


exports.getTotalGamesCreated = function(req, res) {
  var store = require('../../eventstore/database/databaseStore');

  store.loadAllEvents().then(function(events) {
    res.json(events.length);
  });
};
