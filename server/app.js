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
require('./routes')(app, config);

// Connect to database
if(config.mongo.uri){
  console.log("Connecting to mongoDb ", config.mongo.uri, config.mongo.options);
  mongoose.connect(config.mongo.uri, config.mongo.options,function(err) {
    if(err){
      console.error("Error connecting to Mongo", err);
      process.exit(1);
    }
  });
} else {
  console.log("No mongo.uri configured, not connecting");
}


// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

});


// Expose app
module.exports = module.exports = app;
