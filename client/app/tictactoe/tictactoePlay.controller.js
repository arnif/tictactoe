'use strict';

angular.module('tictactoeApp')
  .controller('PlayTicTacToeCtrl', function ($scope, $stateParams, $http, $interval, TicTacToeService) {

    $scope.gameStart = false;

    $scope.uuid = $stateParams.uuid;

    $scope.userName = TicTacToeService.getUserName() || '';

    $scope.myType = TicTacToeService.getMyType();

    $scope.myTurn = false;

    $scope.creator = TicTacToeService.getCreator();

    $scope.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];

    $scope.events = [];

    $scope.updateEvents = function() {
      var getPromise = $http.get('/api/events/' + $scope.uuid);

      getPromise.then(function(data) {
        $scope.processEvents(data.data);
      });
    };

    $scope.updateEvents();


    $scope.processEvents = function(events) {
      $scope.events = [];
      angular.forEach(events, function(event) {
        $scope.events.push(event);
        if (event.event === 'GameCreated') {
          $scope.gameName = event.name;
          $scope.creatorName = event.user.userName;
          if (events.length <= 2) {
            $scope.nextUp = event.user.userName;
          }
        }
        if (event.event === 'GameJoined') {
          $scope.gameStart = true;
          $scope.joinName = event.user.userName;
        }

        if (event.event === 'PlayerMoved' || event.event === 'GameWon' || event.event === 'GameDraw') {
          var x = event.move.coordinates[0];
          var y = event.move.coordinates[1];
          $scope.board[x][y] = event.move.type;

          $scope.nextUp = $scope.getNext(event.user.userName);

          if (event.event === 'GameWon' || event.event === 'GameDraw') {
            $scope.gameOver = true;
            if (event.event !== 'GameDraw') {
              $scope.winner = event.user.userName;
            } else {
              $scope.winner = 'Draw!';
            }
          }
        }
      });
      $scope.events.reverse();
    };

    $scope.getNext = function(userName) {
      if ($scope.joinName === userName) {
        return $scope.creatorName;
      } else {
        return $scope.joinName;
      }
    };


    $scope.joinGame = function(userName) {

      if (userName) {
        $scope.error = false;
        $scope.userName = userName;
        var postPromise = $http.post('/api/joinGame/',{
            'id':$scope.uuid,
            'cmd':'JoinGame',
            'user':{'userName':userName},
            'name': $scope.gameName,
            'timeStamp':'2014-12-02T11:29:29'
          }
        );
        postPromise.then(function(){
          //console.log(data);
          $scope.updateEvents();
          TicTacToeService.setMyType('O');
          TicTacToeService.setUserName($scope.userName);
          $scope.myType = TicTacToeService.getMyType();
        });
      } else {
        $scope.error = true;
      }
    };

    $scope.move = function(x, y) {
      console.log(x + ' ' + y);

      var myType = TicTacToeService.getMyType();
      var user = TicTacToeService.getUserName();

      var moveCmd = {
        id: $scope.uuid,
        cmd: 'PlayerPlacedMove',
        user: {
          userName: user
        },
        move: {
          coordinates: [x,y],
          type: myType
        },
        name: $scope.gameName,
        timeStamp: '2014-12-02T11:29:29'
      };


      var postPromise = $http.post('/api/placeMove/', moveCmd);
      postPromise.then(function(){
        $scope.updateEvents();
      });
    };

    $interval(function() {
      $scope.updateEvents();
    }, 2000);

  });
