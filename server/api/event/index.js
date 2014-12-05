'use strict';

var express = require('express');
var controller = require('./event.controller.js');

var router = express.Router();

router.get('/:uuid', controller.getEvents);

module.exports = router;
