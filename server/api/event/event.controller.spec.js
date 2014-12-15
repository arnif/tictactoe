'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/events', function () {

  beforeEach(function(){
    var storeSchema = require('../../eventstore/database/schema/eventSchema');
    storeSchema.remove().exec();
  });

  it('should respond with JSON array with created events for game', function (done) {

    var command =     {
      id : '123',
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
          .get('/api/events/uuid/123')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                'event': 'GameCreated',
                'id': '123',
                'name': 'TheFirstGame',
                'timeStamp': '2014-12-02T11:29:29',
                'type': 'X',
                'user': {
                  'userName': 'Bruce'
                }
              }]);
            done();
          });
      });

  });
});
