var Event = require('../schema/eventSchema');
var _ = require('lodash');

var q = require('q');

module.exports = {

  loadAllEvents: function() {
    var deferred = q.defer();
    Event.find({}, function(err, results) {
      if (err) {
        throw err;
      }
      if (results) {
        deferred.resolve(results);
      }
    });
    return deferred.promise;
  },
  loadEventById: function(id) {
    var deferred = q.defer();
    Event.findById(id, function(err, results) {
      if (err) {
        throw err;
      }
      if (results) {
        deferred.resolve(results.events);
      }
    });
    return deferred.promise;
  },

  storeEvents: function(cmd_id, events) {
    Event.update( { "_id" : cmd_id }, { $push : { "events" : events[0]}}, { upsert: true }, function(err, result) {
      //console.log(result);
    });

  }
};
