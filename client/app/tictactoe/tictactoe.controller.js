'use strict';

angular.module('tictactoeApp')
  .controller('TicTacToeCtrl', function ($scope, $http, $state) {
    $scope.message = 'Welcome';
    $scope.awesomeThings = ['yee'];
    $scope.error = false;
    $scope.processedEvents = [];

    $scope.uuid = Math.floor((Math.random() * 1000) + 1);

    $scope.processEvents = function(events) {
      $scope.processedEvents.push(events);
      angular.forEach(events, function(event) {
        if (event.event ===  'GameJoined' || event.event === 'GameCreated') {
          //move user to play area

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
            'timeStamp':'2014-12-02T11:29:29'}
        );
        postPromise.then(function(data){

          $scope.processEvents(data.data);

          if ($scope.playAlone) {
            //join game also

            var postPromise = $http.post('/api/joinGame/',{
                'id':$scope.uuid,
                'cmd':'JoinGame',
                'user':{'userName':$scope.userName},
                'name': $scope.gameName,
                'timeStamp':'2014-12-02T11:29:29'}
            );
            postPromise.then(function(data){

              $scope.processEvents(data.data);
            });

            //end if
          }

        });

      } else {
        $scope.error = true;
      }
    };

      /*
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c==='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
      */


  });
