var memoryStore = require('./memoryStore');
var should = require('should');

describe('In memory event store', function() {

  it('Should return empty array for unknown id', function() {

    var store = memoryStore();

    var loadedEvents = store.loadEvents('1234');

    should(loadedEvents.length).be.exactly(0);
    should(loadedEvents).be.instanceof(Array);

  });

  it('Should return events previously stored', function() {

    var store = memoryStore();

    store.storeEvents('1234', [{"id":"1"}]);

    var loadedEvents = store.loadEvents('1234');

    should(loadedEvents).eql([{"id":"1"}]);
  });


  it('should append stored events to events previously stored',function(){
    var store = memoryStore();

    store.storeEvents('1234', [{"id":"1"}]);
    store.storeEvents('1234', [{"id":"2"}]);

    var loadedEvents = store.loadEvents('1234');

    should(loadedEvents).eql([{"id":"1"},{"id":"2"}]);
  });
});
