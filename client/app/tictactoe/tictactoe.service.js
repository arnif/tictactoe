'use strict';

angular.module('tictactoeApp')
  .factory('TicTacToeService', function () {

    var events = [];

    // Public API here
    return {
      getEvents: function() {
        return events;
      },
      addEvent: function(e) {
        events.push(e);
      }
    };
  });
