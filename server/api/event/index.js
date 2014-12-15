'use strict';

var express = require('express');
var router = express.Router();

module.exports = function(eventStore){
  var controller = require('./event.controller.js')(eventStore);

  router.get('/total', controller.getTotalGamesCreated);
  router.get('/uuid/:uuid', controller.getEvents);

  return {
    router: router
  }
};
