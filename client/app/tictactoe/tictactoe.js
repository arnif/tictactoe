'use strict';

angular.module('tictactoeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tictactoe', {
        url: '/',
        templateUrl: 'app/tictactoe/tictactoe.html',
        controller: 'TicTacToeCtrl'
      }).state('play', {
        url: '/play/{uuid}',
        templateUrl: 'app/tictactoe/tictactoe.play.html',
        controller: 'PlayTicTacToeCtrl'
      });
  });
