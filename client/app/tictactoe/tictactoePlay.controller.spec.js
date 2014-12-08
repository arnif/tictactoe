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
    httpBackend.whenGET('app/tictactoe/tictactoe.play.html').respond(200);
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
    /*
    scope.uuid = '123';

    httpBackend.expectPOST('/api/createGame/', {
      id : '123',
      cmd: 'CreateGame',
      user: {
        userName: 'Bruce'
      },
      name: 'TheSecondGame',
      timeStamp: '2014-12-02T11:29:29'
    }).respond(
      [{}]
    );

    scope.gameName ='TheSecondGame';

    scope.userName = 'Bruce';

    scope.createGame();
    httpBackend.flush();

    expect(scope.processedEvents.length).toBe(1); */

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

    scope.joinGame('Bruce');
    httpBackend.flush();

    expect(scope.events.length).toBe(1);

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
        }
      }
    });

    scope.move(0,1);
    httpBackend.flush();

    expect(scope.events.length).toBe(1);

  });

});

/*jshint ignore:end*/
