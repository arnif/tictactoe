'use strict';

/*jshint ignore:start*/

describe('Controller: TicTacToeCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TicTacToeCtrl, scope, httpBackend, http;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector, $controller, $rootScope, $http) {
    http = $http;
    httpBackend = $injector.get('$httpBackend');
    //httpBackend.whenGET('app/tictactoe/tictactoe.play.html').respond(200);
    httpBackend.whenGET('/api/events/undefined').respond(200);

    scope = $rootScope.$new();
    TicTacToeCtrl = $controller('PlayTicTacToeCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get list of zero events', function () {

    scope.uuid = '123';
    httpBackend.whenGET('/api/events/undefined').respond({
      id: '123'
    });

    httpBackend.flush();
    expect(scope.events.length).toBe(0);

  });

  it('should join a game', function() {
    scope.uuid = '123';

    httpBackend.expectPOST('/api/joinGame/', {
      id : '123',
      cmd: 'JoinGame',
      user: {
        userName: 'Bruce'
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{
      }]
    );

    httpBackend.expectGET('/api/events/123').respond({
      data: {
        event: 'GameJoined',
        user: {
          userName: 'Bruce'
        }
      }
    });

    scope.joinGame('Bruce');
    httpBackend.flush();

    expect(scope.events.length).toBe(1);
    expect(scope.userName).toBe('Bruce');
    expect(scope.joinName).toBe('Bruce');
    expect(scope.gameStart).toBe(true);

  });

  it('should join a game that has been created by another user', function() {
    scope.uuid = '123';

    httpBackend.expectPOST('/api/joinGame/', {
      id : '123',
      cmd: 'JoinGame',
      user: {
        userName: 'Bruce'
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{
      }]
    );

    httpBackend.expectGET('/api/events/123').respond({
      data: {
        event: 'GameCreated',
        user: {
          userName: 'Clark'
        },
        name: 'FirstGame'
      }
    });

    scope.joinGame('Bruce');

    httpBackend.flush();

    expect(scope.events.length).toBe(1);
    expect(scope.gameName).toBe('FirstGame');
    expect(scope.creatorName).toBe('Clark');
    expect(scope.gameStart).toBe(false);

  });

  it('should try to join a game but fail', function() {
    scope.uuid = '123';

    scope.joinGame();
    httpBackend.flush();

    expect(scope.events.length).toBe(0);
    expect(scope.error).toBe(true);

  });

  it('should make a move', function() {
    scope.uuid = '123';

    httpBackend.expectPOST('/api/placeMove/', {
      id : '123',
      cmd: 'PlayerPlacedMove',
      user: {
      },
      move: {
        coordinates: [0,1]
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{
      }]
    );

    httpBackend.expectGET('/api/events/123').respond({
      data: {
        event: 'PlayerMoved',
        move: {
          coordinates: [0,1],
          type: 'X'
        },
        user: {
          userName: 'Bruce'
        }
      }
    });

    scope.move(0,1);
    httpBackend.flush();

    expect(scope.board[0][1]).toBe('X');
    expect(scope.events.length).toBe(1);

  });

  it('should make the winning move', function() {
    scope.uuid = '123';

    httpBackend.expectPOST('/api/placeMove/', {
      id : '123',
      cmd: 'PlayerPlacedMove',
      user: {
      },
      move: {
        coordinates: [0,1]
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{
      }]
    );

    httpBackend.expectGET('/api/events/123').respond({
      data: {
        event: 'GameWon',
        move: {
          coordinates: [0,1],
          type: 'X'
        },
        user: {
          userName: 'Bruce'
        }
      }
    });

    scope.move(0,1);
    httpBackend.flush();

    expect(scope.gameOver).toBe(true);
    expect(scope.winner).toBe('Bruce');
    expect(scope.board[0][1]).toBe('X');
    expect(scope.events.length).toBe(1);

  });

  it('should make the draw move', function() {
    scope.uuid = '123';

    httpBackend.expectPOST('/api/placeMove/', {
      id : '123',
      cmd: 'PlayerPlacedMove',
      user: {
      },
      move: {
        coordinates: [0,1]
      },
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{
      }]
    );

    httpBackend.expectGET('/api/events/123').respond({
      data: {
        event: 'GameDraw',
        move: {
          coordinates: [0,1],
          type: 'X'
        },
        user: {
          userName: 'Bruce'
        }
      }
    });

    scope.move(0,1);
    httpBackend.flush();

    expect(scope.gameOver).toBe(true);
    expect(scope.winner).toBe('Draw!');
    expect(scope.board[0][1]).toBe('X');
    expect(scope.events.length).toBe(1);

  });

});

/*jshint ignore:end*/
