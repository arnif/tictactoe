'use strict';

var app = require('../../../app');
var should = require('should');
var Game = require('./../schema/eventSchema');
var _ = require('lodash');


describe('coordinates migration', function () {

  beforeEach(function () {
    Game.remove().exec();
  });

  var sampleGame = {
    _id: '1234',
    events: [{
      "id": "1234",
      "event": "PlayerPlacedMove",
      "user": {
        "userName": "Bruce",
        "side": "X"
      },
      "name": "FirstGame",
      "timeStamp": "2014-12-02T11:29:29",
      "move": {
        "coordinates": [1, 1],
        "side": "X"
      }
    }]
  };


  it('should migrate up', function () {

    var migrateCoordinatesToXY = require('./migrateXandY').up;

    Game.create(sampleGame, function (err, game) {
      if (err) {
        return handleError(res, err);
      }
      migrateCoordinatesToXY(function (err, games) {
        _.each(games, function (game) {

          game.events[0].move.should.have.property('xy');
        });

      });
    });
  });
});
