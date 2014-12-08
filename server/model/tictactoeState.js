var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;

  var moveCount = 0;
  var board = [[],[],[]];
  var lastType;

  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
    if (event.event === "PlayerMoved") {
      makeMove(event.move);
      lastType = event.move.type;
    }
  });

  function checkWin(move) {
    //check col
    for(var i = 0; i < 3; i++) {
      if (!isOccupiedWith(move.coordinates[0], i, move.type)) {
        break;
      }
      if (i === 2) {
        return "WIN";
      }
    }

    //check rows
    for(i = 0; i < 3; i++) {
      if (!isOccupiedWith(i, move.coordinates[i], move.type)) {
        break;
      }
      if (i === 2) {
        return "WIN";
      }
    }

    //diagonal
    if (move.coordinates[0] === move.coordinates[1]) {
      for(i = 0; i < 3; i++) {
        if (!isOccupiedWith(i, i, move.type)) {
          break;
        }
        if (i === 2) {
          return "WIN";
        }
      }
    }

    //anti diag
    for(i = 0;i < 3; i++){
      if (!isOccupiedWith(i, (3-1)-i, move.type)) {
        break;
      }
      if (i === 2) {
        return "WIN";
      }
    }

    //draw
    if (moveCount === 9) {
      return "DRAW";
    }

    return false;
  }

  function isItMyTurn(move) {
    if (moveCount === 0 && move.type === 'O'){
      return false;
    }
    return lastType !== move.type;
  }

  function isOccupiedWith(x, y, type) {
    return board[x][y] === type;
  }

  function makeMove(move) {
    if (isItMyTurn(move)) {
      board[move.coordinates[0]][move.coordinates[1]] = move.type;
      moveCount++;
      return checkWin(move);
    }
  }
  return {
    gameFull : function(){
      return gameFull;
    },
    makeMove : function(move) {
      return makeMove(move);
    },
    getTypeAt : function(move) {
      return board[move.coordinates[0]][move.coordinates[1]];
    },
    isItMyTurn : function(move) {
      return isItMyTurn(move)
    }
  }
};
