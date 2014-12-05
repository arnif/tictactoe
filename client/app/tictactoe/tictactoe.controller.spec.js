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
    httpBackend.whenGET('app/tictactoe/tictactoe.html').respond(200);

    scope = $rootScope.$new();
    TicTacToeCtrl = $controller('TicTacToeCtrl', {
      $scope: scope
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post variables from scope for name and userName and process resulting events', function () {
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

    expect(scope.processedEvents.length).toBe(1);

  });
});

/*jshint ignore:end*/
