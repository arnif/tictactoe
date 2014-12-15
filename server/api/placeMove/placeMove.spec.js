'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/placeMove', function() {
  it('should respond with event in JSON array', function(done) {
    var command =     {
      id : "123",
      cmd: "PlayerPlacedMove",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29",
      move:{
        coordinates:[0,0],
        type: 'X'
      }
    };

    var req = request(app);
    req
      .post('/api/placeMove')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
