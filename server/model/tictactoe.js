module.exports = function(history){

  var tictactoeState = require('./tictactoeState');

  console.log('history', history);
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
            id: String(cmd.id),
            event: "GameCreated",
            user: cmd.user,
            type: 'X',
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }]
        },
        "JoinGame": function (cmd) {
          if (!cmd.user || !cmd.user.userName) {
            return [{
              id: String(cmd.id),
              event: "MissingUserInfo",
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          if(gameState.gameFull()){
            return [{
              id: String(cmd.id),
              event: "FullGameJoinAttempted",
              user: cmd.user,
              name: cmd.name,
              timeStamp: cmd.timeStamp
            }];
          }
          return [{
            id: String(cmd.id),
            event: "GameJoined",
            user: cmd.user,
            type: 'O',
            name: cmd.name,
            timeStamp: cmd.timeStamp
          }];
        },
        "PlayerPlacedMove": function(cmd) {
          if (cmd.move.coordinates[0] > MAX_SIZE || cmd.move.coordinates[1] > MAX_SIZE) {
            return [{
              id: String(cmd.id),
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
                  id: String(cmd.id),
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
                  id: String(cmd.id),
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
                    id: String(cmd.id),
                    event: "GameDraw",
                    user: cmd.user,
                    move: cmd.move,
                    name: cmd.name,
                    timeStamp: cmd.timeStamp
                  }]
                }
                return [{
                  id: String(cmd.id),
                  event: "GameWon",
                  user: cmd.user,
                  move: cmd.move,
                  name: cmd.name,
                  timeStamp: cmd.timeStamp
                }]
              }
              return [{
                id: String(cmd.id),
                event: "PlayerMoved",
                user: cmd.user,
                move: cmd.move,
                name: cmd.name,
                timeStamp: cmd.timeStamp
              }]

          } else {
            return [{
              id: String(cmd.id),
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
