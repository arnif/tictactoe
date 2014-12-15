'use strict';

var express = require('express');
var controller = require('./event.controller.js');

var router = express.Router();

router.get('/total', controller.getTotalGamesCreated);
router.get('/uuid/:uuid', controller.getEvents);

module.exports = router;
