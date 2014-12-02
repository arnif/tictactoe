var _ = require('lodash');

module.exports = function(history){
  var gameFull = false;

  var board = [[],[],[]];

  _.each(history, function(event){
    if(event.event === "GameJoined"){
      gameFull = true;
    }
    if (event.event === "PlayerMoved") {
      makeMove(event.move);
    }
  });

  function checkWin(move) {
    //check col
    for(var i = 0; i < 3; i++) {
      if (!isOccupiedWith(move.coordinates[0], i, move.type)) {
        break;
      }
      if (i === 2) {
        return true;
      }
    }

    //check rows
    for(i = 0; i < 3; i++) {
      if (!isOccupiedWith(i, move.coordinates[i], move.type)) {
        break;
      }
      if (i === 2) {
        return true;
      }
    }

    //diagonal
    if (move.coordinates[0] === move.coordinates[1]) {
      for(i = 0; i < 3; i++) {
        if (!isOccupiedWith(i, i, move.type)) {
          break;
        }
        if (i === 2) {
          return true;
        }
      }
    }

    return false;
  }

  function isOccupiedWith(x, y, type) {
    return board[x][y] === type;
  }

  function makeMove(move) {
    board[move.coordinates[0]][move.coordinates[1]] = move.type;
    return checkWin(move);
  }
  return {
    gameFull : function(){
      return gameFull;
    },
    makeMove : function(move) {
      return makeMove(move);
    }
  }
};
