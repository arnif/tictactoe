'use strict';

var _ = require('lodash');
var app = require('../../app');

module.exports = function (eventStore) {
  return {
    getEvents: function (req, res) {
      eventStore.loadEvents(req.params.uuid).then(function (events) {
        res.json(events);
      }, function (err) {
        res.json(err);
      });
    },
    getTotalGamesCreated: function(req, res) {
      eventStore.loadAllEvents().then(function(events) {
        res.json(events.length);
      });
    }
  }
};
