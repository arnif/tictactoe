'use strict';

angular.module('tictactoeApp')
  .controller('PlayTicTacToeCtrl', function ($scope, $stateParams, $http) {
    $scope.awesomeThings = [];

    console.log($stateParams);
    $scope.gameStart = false;

    $scope.uuid = $stateParams.uuid;

    $scope.gameName = '';

    var getPromise = $http.get('/api/events/' + $scope.uuid);

    getPromise.then(function(data) {
      $scope.processEvents(data.data);
    });

    $scope.processEvents = function(events) {
      console.log(events);
      angular.forEach(events, function(event) {
        console.log(event);
        if (event.event === 'GameCreated') {
          $scope.gameName = event.name;
        }
        if (event.event === 'GameJoined') {
          $scope.gameStart = true;
        }
      });
    };

    $scope.joinGame = function() {
      var postPromise = $http.post('/api/joinGame/',{
          'id':$scope.uuid,
          'cmd':'JoinGame',
          'user':{'userName':'Nafnlaus'},
          'name': $scope.gameName,
          'timeStamp':'2014-12-02T11:29:29'}
      );
      postPromise.then(function(data){
        console.log(data);
        $scope.processEvents(data.data);
      });
    };


  });
