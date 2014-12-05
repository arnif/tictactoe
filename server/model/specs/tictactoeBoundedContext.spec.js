var jm = require('jsmockito').JsMockito;
jm.Integration.importTo(global);
var _ = require('lodash');


describe('tictactoe game context using stubs.', function() {

  it('should route command to instantiated tictactoe game with event stream from store and return generated events, using mock style tests.',function(){

    /*jshint ignore:start*/
    var mockStore = spy({
      loadEvents : function(){
      },
      storeEvents : function(){
      }
    });

    when(mockStore).loadEvents('123').thenReturn([]);

    var mockTickTackToe = spy({
      executeCommand : function(){
      }
    });

    when(mockTickTackToe).executeCommand().thenReturn([]);


    var commandHandlers =function(){
      return mockTickTackToe
    };
    var boundedContext = require('./../tictactoeBoundedContext')(mockStore, commandHandlers);

    var emptyCommand = {
      id: "123"
    };

    boundedContext.handleCommand(emptyCommand);

    jm.verify(mockStore).loadEvents('123');
    jm.verify(mockStore).storeEvents('123');

    jm.verify(mockTickTackToe).executeCommand(emptyCommand);

    /*jshint ignore:end*/

  });

});
