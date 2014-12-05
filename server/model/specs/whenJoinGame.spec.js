var should = require('should');
var _ = require('lodash');

var tictactoe = require('../../model/tictactoe');

describe('join game command', function() {

  it('should emit game joined event', function(){

    var given = [{
      id: "123",
      event: "GameCreated",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var when = {
      id: "123",
      cmd: "JoinGame",
      user: {
        userName: "Clark"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      id: "123",
      event: "GameJoined",
      user: {
        userName: "Clark"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents).eql(then);
  });

  it('should emit FullGameJoinAttempted event when game full', function(){

    var given = [{
      id: "123",
      event: "GameCreated",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    },
      {
        id: "123",
        event: "GameJoined",
        user: {
          userName: "Clark"
        },
        name: "TheFirstGame",
        timeStamp: "2014-12-02T11:29:29"
      }];

    var when = {
      id: "123",
      cmd: "JoinGame",
      user: {
        userName: "Clark"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      id: "123",
      event: "FullGameJoinAttempted",
      user: {
        userName: "Clark"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents).eql(then);

  });

  it('should emit MissingUsername when joining a game', function(){

    var given = [{
      id: "123",
      event: "GameCreated",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var when = {
      id: "123",
      cmd: "JoinGame",
      user: {
        userName: ""
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var then = [{
      id: "123",
      event: "MissingUserInfo",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents).eql(then);
  });

});

