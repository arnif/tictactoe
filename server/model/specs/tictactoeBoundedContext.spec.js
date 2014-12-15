var should = require('should');
var _ = require('lodash');
var q = require('q');


function resolvedPromise(value) {
  var deferred = q.defer();
  deferred.resolve(value);
  return deferred.promise;
}


describe('tictactoe game context', function() {

  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.',function(done){

    /* jshint ignore:start */
    var jm = require('jsmockito').JsMockito;
    jm.Integration.importTo(global);

    var mockStore = spy({
      loadEvents : function(){
        return resolvedPromise([]);
      },
      storeEvents : function(events){
        return resolvedPromise(events);
      }
    });


    var mockTickTackToe = spy({
      executeCommand : function(){
        return resolvedPromise([]);

      }
    });


    var commandHandlers =function(){
      return mockTickTackToe
    };
    var boundedContext = require('./../tictactoeBoundedContext')(mockStore, commandHandlers);

    var emptyCommand = {
      id: "123"
    };

    boundedContext.handleCommand(emptyCommand).then(function(){

      jm.verify(mockStore).loadEvents('123');
      jm.verify(mockStore).storeEvents('123');

      jm.verify(mockTickTackToe).executeCommand(emptyCommand);

      done();
    });

    /* jshint ignore:end */

  });

});
