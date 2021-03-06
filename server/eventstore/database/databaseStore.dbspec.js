
var dataStore = require('./databaseStore');
var should = require('should');

var storeSchema = require('./schema/eventSchema');

describe('Database store', function() {

  /*jshint ignore:start */
  beforeEach(function(){
    storeSchema.remove().exec();
  });

  it('Should return empty array for unknown id', function() {

    var store = dataStore();

    store.loadEvents('123').then(function(err, loadedEvents) {
      should(loadedEvents.length).be.exactly(0);
      should(loadedEvents).be.instanceof(Array);
      should(loadedEvents).eql(['A']);
    }, function(err) {
      assert.fail('Load event by id faild', err);
    });

  });

  it('Should return events previously stored', function() {

    var store = dataStore();

    store.storeEvents('123', [{'id': '1'}]).then(function() {
      store.loadEvents('123').then(function(loadedEvents) {
        should(loadedEvents).eql([{'id':'1'}]);

      });
    });

  });


  it('should append stored events to events previously stored',function(){

    var store = dataStore();

    store.storeEvents('123', [{'id': '1'}]).then(function() {
      store.storeEvents('123', [{'id': '2'}]).then(function() {
        store.loadEvents('123').then(function(loadedEvents) {
          should(loadedEvents).eql([{"id":"1"},{"id":"2"}]);
        });
      });
    });

  });

  it('should have played 2 games', function() {
    var store = dataStore();

    store.storeEvents('1234', [{"id":"1"}]).then(function() {
      store.storeEvents('12345', [{"id":"2"}]).then(function() {
        store.numberOfEvents().then(function(nr) {
          should(nr).be.exactly(2);
        })
      });
    });

  });
  /*jshint ignore:end */
});
