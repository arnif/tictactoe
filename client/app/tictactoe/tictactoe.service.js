'use strict';

angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var myType;
    var userName;
    var gameName;
    var creatorName;
    var joinName;
    var creator = false;

    // Public API here
    return {
      setMyType: function(type) {
        myType = type;
      },
      getMyType: function(){
        return myType;
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
      },
      setCreator: function(value) {
        creator = value;
      },
      getCreator: function() {
        return creator;
      }
    };
  });
