'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/events', function () {

  it('should respond with JSON array with created events for game', function (done) {

    var command =     {
      id : '1234',
      cmd: 'CreateGame',
      user: {
        userName: 'Bruce'
      },
      name: 'TheFirstGame',
      timeStamp: '2014-12-02T11:29:29'
    };
    var req = request(app);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .get('/api/events/uuid/1234')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                'event': 'GameCreated',
                'id': '1234',
                'name': 'TheFirstGame',
                'timeStamp': '2014-12-02T11:29:29',
                'type': 'X',
                'user': {
                  'userName': 'Bruce'
                }
              }
              ]);
            done();
          });
      });

  });
});
