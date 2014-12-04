var should = require('should');
var _ = require('lodash');

var tictactoe = require('../../model/tictactoe');

describe('create game command', function() {

  it('should emit game created event', function(){

    var given = [];
    var when =  {
      id: "123",
      cmd: "CreateGame",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };
    var then = [{
      id: "123",
      event: "GameCreated",
      user: {
        userName: "Bruce"
      },
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(actualEvents).eql(then);
  });

  it('should emit MissingUsername event because missing user', function(){

    var given = [];
    var when =  {
      id: "123",
      cmd: "CreateGame",
      user: "",
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
    should(actualEvents.length).be.exactly(1);

    should(actualEvents).eql(then);
  });

  it('should emit MissingGameName event because missing game name', function(){

    var given = [];
    var when =  {
      id: "123",
      cmd: "CreateGame",
      user: {
        userName: "Bruce"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29"
    };
    var then = [{
      id: "123",
      event: "MissingGameName",
      user: {
        userName: "Bruce"
      },
      name: "",
      timeStamp: "2014-12-02T11:29:29"
    }];

    var actualEvents = tictactoe(given).executeCommand(when);
    should(actualEvents.length).be.exactly(1);

    should(actualEvents).eql(then);
  });

});
