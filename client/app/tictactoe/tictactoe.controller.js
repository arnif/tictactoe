'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http, $state, TicTacToeService) {
    $scope.message = 'Welcome';
    $scope.error = false;
    $scope.processedEvents = [];

    /* jshint ignore:start */
    $scope.uuid = generateUUID();
      //Math.floor((Math.random() * 1000) + 1);
    /* jshint ignore:end */

    $scope.processEvents = function(events) {
      $scope.processedEvents.push(events);
      angular.forEach(events, function(event) {
        if (event.event ===  'GameJoined' || event.event === 'GameCreated') {
          //move user to play area
          TicTacToeService.setMyType('X');
          $state.go('play', {'uuid': event.id});
        }
      });
    };

    $scope.createGame = function() {
      if ($scope.userName && $scope.gameName) {
        $scope.error = false;

        var postPromise = $http.post('/api/createGame/',{
            'id':$scope.uuid,
            'cmd':'CreateGame',
            'user':{'userName':$scope.userName},
            'name': $scope.gameName,
            'timeStamp':'2014-12-02T11:29:29'
          }
        );
        postPromise.then(function(data){

          TicTacToeService.setUserName($scope.userName);
          TicTacToeService.setGameName($scope.gameName);
          TicTacToeService.setCreator(true);

          $scope.processEvents(data.data);


        });

      } else {
        $scope.error = true;
      }
    };

      /* jshint ignore:start */
    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    }
     /* jshint ignore:end */


  });
