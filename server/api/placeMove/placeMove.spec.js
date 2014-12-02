var should = require('should');
var _ = require('lodash');

var tictactoe = require('../../model/tictactoe');

var createGame = {
  event: "GameCreated",
  user: {
    userName: "Bruce"
  },
  name: "TheFirstGame",
  timeStamp: "2014-12-02T11:29:29"
};
var joinGame = {
  event: "GameJoined",
  user: {
    userName: "Clark"
  },
  name: "TheFirstGame",
  timeStamp: "2014-12-02T11:29:29"
};
var makeMove = function(coord, type ){
    return {
      cmd: "PlayerPlacedMove",
      user: {
        userName: "Bruce"
      },
      move: {
        coordinates: coord,
        type: type
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };
};
var playerMoved = function(coord, type) {
  return {
    event: "PlayerMoved",
      user: {
    userName: "Bruce"
  },
    move: {
      coordinates: coord,
        type: type
    },
    name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
  };
};

describe('create game command', function() {

  it('should emit PlayerPlacedMove event', function(){

    var given = [
      createGame,
      joinGame
    ];

    var when =  makeMove([1,2], "X");

    var then = [{
      event: "PlayerMoved",
      user: {
        userName: "Bruce"
      },
      move: {
        coordinates: [1,2],
        type: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit InvalidMove event', function(){

    var given = [
      createGame,
      joinGame
    ];

    var when =  makeMove([3,3], "X");

    var then = [{
      event: "InvalidMove",
      user: {
        userName: "Bruce"
      },
      move: {
        coordinates: [3,3],
        type: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit GameWon event', function(){

    var given = [
      createGame,
      joinGame,
      playerMoved([0,0], "X"),
      playerMoved([1,0], "O"),
      playerMoved([0,1], "X"),
      playerMoved([1,1], "O")
    ];

    var when =  makeMove([0,2], "X");

    var then = [{
      event: "GameWon",
      user: {
        userName: "Bruce"
      },
      move: {
        coordinates: [0,2],
        type: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });

  it('should emit GameWon (diagonal) event', function(){

    var given = [
      createGame,
      joinGame,
      playerMoved([0,0], "X"),
      playerMoved([1,0], "O"),
      playerMoved([1,1], "X"),
      playerMoved([2,1], "O")
    ];

    var when =  makeMove([2,2], "X");

    var then = [{
      event: "GameWon",
      user: {
        userName: "Bruce"
      },
      move: {
        coordinates: [2,2],
        type: "X"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
  });


});
