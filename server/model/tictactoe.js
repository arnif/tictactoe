module.exports = function(history){

  var tictactoeState = require('./tictactoeState');

  var gameState = tictactoeState(history);

  var MAX_SIZE = 2;

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
          if (!cmd.user.userName) {
            return [{
              event: "MissingUsername",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          if(gameState.gameFull()){
            return [{
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          return [{
            event: "GameJoined",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        },
        "PlayerPlacedMove": function(cmd) {
          if (cmd.move.coordinates[0] > MAX_SIZE || cmd.move.coordinates[1] > MAX_SIZE) {
            return [{
              event: "InvalidMove",
              user: cmd.user,
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }]
          }
          if (gameState.gameFull()) {
            //game has started so player can make move

              var won = gameState.makeMove(cmd.move);
              if (won) {
                return [{
                  event: "GameWon",
                  user: cmd.user,
                  move: cmd.move,
                  name: cmd.name,
                  timeStamp: cmd.timeStamp
                }]
              }
              return [{
                event: "PlayerMoved",
                user: cmd.user,
                move: cmd.move,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]

          } else {
            return [{
              event: "NotEnoughPlayers",
              user: cmd.user,
              name: cmd.name,
              move: cmd.move,
              timeStamp: cmd.timeStamp
            }];
          }
        }
      };
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
