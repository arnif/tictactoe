/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var mongoose = require('mongoose');
var _ = require('lodash');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

app.eventStore = require('./eventstore/memoryStore')();
var dataStore = require('./eventstore/databaseStore');

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

  /*dataStore.loadAllEvents().then(function(data) {
    //console.log(data);
    for(var i = 0; i < data.length; i++) {
      console.log(data[i].events);
      app.eventStore.storeEvents(data[i].events.id, data[i].events);
    }
  }); */
});


// Expose app
module.exports = module.exports = app;
