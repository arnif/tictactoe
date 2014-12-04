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
              id: cmd.id,
              event: "MissingGameName",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          if (!cmd.user || !cmd.user.userName ) {
            return [{
              id: cmd.id,
              event: "MissingUserInfo",
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          return [{
            id: cmd.id,
            event: "GameCreated",
            user: cmd.user,
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function (cmd) {
          if (!cmd.user || !cmd.user.userName) {
            return [{
              event: "MissingUserInfo",
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
              if (!gameState.isItMyTurn(cmd.move)) {
                return [{
                  event: "IllegalMove",
                  reason: {
                    msg: "Not Your Turn",
                    type: cmd.move.type
                  },
                  user: cmd.user,
                  move: cmd.move,
                  name: cmd.name,
                  timeStamp: cmd.timeStamp
                }]
              }
              var typeAt = gameState.getTypeAt(cmd.move);
              if (typeAt) {
                return [{
                  event: "IllegalMove",
                  reason: {
                    msg: "Occupied",
                    type: typeAt
                  },
                  user: cmd.user,
                  move: cmd.move,
                  name: cmd.name,
                  timeStamp: cmd.timeStamp
                }]
              }
              var moveResult = gameState.makeMove(cmd.move);
              if (moveResult) {
                if (moveResult === "DRAW") {
                  return [{
                    event: "GameDraw",
                    user: cmd.user,
                    move: cmd.move,
                    name: cmd.name,
                    timeStamp: cmd.timeStamp
                  }]
                }
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
              move: cmd.move,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
        }
      };
      return cmdHandlers[cmd.cmd](cmd);
    }
  }
};
