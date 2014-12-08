'use strict';

angular.module('tictactoeApp')
  .controller('PlayTicTacToeCtrl', function ($scope, $stateParams, $http, TicTacToeService) {
    $scope.awesomeThings = [];

    console.log($stateParams);
    $scope.gameStart = false;

    $scope.uuid = $stateParams.uuid;

    $scope.userName = TicTacToeService.getUserName();

    $scope.myType = TicTacToeService.getMyType();

    //$scope.board = [['X','O',''], ['O','O','O'], ['O','X','']];

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
      console.log(events);
      $scope.events = [];
      angular.forEach(events, function(event) {
        console.log(event);
        $scope.events.push(event);
        if (event.event === 'GameCreated') {
          $scope.gameName = event.name;
          $scope.creatorName = event.user.userName;
        }
        if (event.event === 'GameJoined') {
          $scope.gameStart = true;
          $scope.joinName = event.user.userName;
        }
        if (event.event === 'PlayerMoved' || event.event === 'GameWon' || event.event === 'GameDraw') {
          var x = event.move.coordinates[0];
          var y = event.move.coordinates[1];
          $scope.board[x][y] = event.move.type;
          console.log($scope.board);

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


    $scope.joinGame = function() {
      $scope.userName = 'Nafnlaus'; //TODO ask user!
      var postPromise = $http.post('/api/joinGame/',{
          'id':$scope.uuid,
          'cmd':'JoinGame',
          'user':{'userName':$scope.userName},
          'name': $scope.gameName,
          'timeStamp':'2014-12-02T11:29:29'
        }
      );
      postPromise.then(function(data){
        console.log(data);
        $scope.processEvents(data.data);
        TicTacToeService.setMyType('O');
        TicTacToeService.setUserName('Nafnlaus');
        $scope.userName = TicTacToeService.getUserName();
        $scope.myType = TicTacToeService.getMyType();
      });
    };

    $scope.move = function(x, y) {
      console.log(x + ' ' + y);

      var myType = TicTacToeService.getMyType();
      var user = TicTacToeService.getUserName();
      console.log(myType);
      console.log(user);

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
      console.log(moveCmd);


      var postPromise = $http.post('/api/placeMove/', moveCmd);
      postPromise.then(function(data){
        console.log(data);
        $scope.updateEvents();
        //$scope.processEvents(data.data);
      });


    };

    setInterval(function() {
      $scope.updateEvents();
    }, 5000);

  });
