'use strict';

var app = require('../../../app');
var should = require('should');

describe('event store', function() {
  /*jshint ignore:start */
  it('should store event history in database', function(done) {

    var Event = require('./eventSchema');

    var sampleGame = {
      _id:'12344',
      events:[{
        id: '1234',
        event: 'GameCreated'
      }]
    };

    Event.create(sampleGame, function(err, event) {
      if(err) {
        throw err;
      }
      event._id.should.not.be.empty;
      return done();
    });


  });
  /*jshint ignore:end */

});

