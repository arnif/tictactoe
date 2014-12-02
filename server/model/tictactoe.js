module.exports = function(history){

  var tictactoeState = require('./tictactoeState');

  var gameState = tictactoeState(history);

  return {
    executeCommand: function(cmd){

      var cmdHandlers = {
        "CreateGame": function (cmd) {
          if (!cmd.name) {
            return [{
              event: "MissingGameName",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          if (!cmd.user.userName) {
            return [{
              event: "MissingUsername",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          return [{
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function (cmd) {
          if(gameState.gameFull()){
            console.log("Game full");
            return [{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          gameFull = true;
          return [{
            event: "GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        }
      };
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
