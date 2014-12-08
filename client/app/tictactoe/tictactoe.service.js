'use strict';

angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var myType;
    var alone = false;
    var userName = 'Nafnlaus';
    var gameName;
    var creatorName;
    var joinName;

    // Public API here
    return {
      setMyType: function(type) {
        myType = type;
      },
      getMyType: function(){
        return myType;
      },
      setAlone: function(value) {
        alone = value;
      },
      getAlone: function() {
        return alone;
      },
      setUserName: function(name) {
        userName = name;
      },
      getUserName: function() {
        return userName;
      },
      setGameName: function(name) {
        gameName = name;
      },
      getGameName: function(){
        return gameName;
      },
      setCreatorName: function(name) {
        creatorName = name;
      },
      getCreatorName: function() {
        return creatorName;
      },
      setJoinName: function(name) {
        joinName = name;
      },
      getJoinName: function(){
        return joinName;
      }
    };
  });
