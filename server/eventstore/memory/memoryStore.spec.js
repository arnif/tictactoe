var memoryStore = require('./memoryStore');
var should = require('should');

describe('In memory event store', function() {

  it('Should return empty array for unknown id', function() {

    var store = memoryStore();

    store.loadEvents('1234').then(function(loadedEvents) {
      should(loadedEvents.length).be.exactly(0);
      should(loadedEvents).be.instanceof(Array);
    });


  });

  it('Should return events previously stored', function() {

    var store = memoryStore();

    store.storeEvents('1234', [{"id":"1"}]).then(function(){
      store.loadEvents('1234').then(function(loadedEvents) {
        should(loadedEvents).eql([{"id":"1"}]);
      });
    });


  });


  it('should append stored events to events previously stored',function(){
    var store = memoryStore();

    store.storeEvents('1234', [{"id":"1"}]).then(function() {
      store.storeEvents('1234', [{"id":"2"}]).then(function() {
        store.loadEvents('1234').then(function(loadedEvents) {
          should(loadedEvents).eql([{"id":"1"},{"id":"2"}]);
        });
      });
    });
  });

  it('should have played 2 games', function() {
    var store = memoryStore();

    store.storeEvents('1234', [{"id":"1"}]).then(function() {
      store.storeEvents('12345', [{"id":"2"}]).then(function() {
        store.numberOfEvents().then(function(nr) {
          should(nr).be.exactly(2);
        })
      });
    });

  });

});
