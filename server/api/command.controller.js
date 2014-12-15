'use strict';

var _ = require('lodash');
var boundedContext = require('../model/tictactoeBoundedContext');
var tictactoeHandler = require('../model/tictactoe');
var app = require('../app');

exports.executeCommand = function(req, res) {


  if(!app.eventStore){
    app.eventStore = require('../eventstore/memory/memoryStore')();
  }

  var store = app.eventStore;

  var context = boundedContext(store, tictactoeHandler);

  var result = context.handleCommand(req.body);

  res.json(result);
};
