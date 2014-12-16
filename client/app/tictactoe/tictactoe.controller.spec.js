'use strict';

/*jshint ignore:start*/

describe('Controller: TicTacToeCtrl', function () {

  // load the controller's module
  beforeEach(module('tictactoeApp'));

  var TicTacToeCtrl, scope, httpBackend, http, state, ticTacToeService,
    myType, userName, gameName, creatorName, joinName, creator;

  // Initialize the controller and a mock scope
  beforeEach(function() {
    ticTacToeService = {
      getMyType: function() {
        return myType;
      },
      setMyType: function(type) {
        myType = type;
      },
      setUserName: function(name) {
        userName = name;
      },
      getUserName: function() {
        return userName;
      },
      setGameName: function(name) {
        gameName = name;
      },
      getGameName: function(){
        return gameName;
      },
      setCreatorName: function(name) {
        creatorName = name;
      },
      getCreatorName: function() {
        return creatorName;
      },
      setJoinName: function(name) {
        joinName = name;
      },
      getJoinName: function(){
        return joinName;
      },
      setCreator: function(value) {
        creator = value;
      },
      getCreator: function() {
        return creator;
      }
    };

    module(function($provide){
      $provide.value('TicTacToeService', ticTacToeService);
    });


    inject(function ($injector, $controller, $rootScope, $http, $state) {
      http = $http;
      httpBackend = $injector.get('$httpBackend');
      httpBackend.whenGET('app/tictactoe/tictactoe.html').respond(200);
      httpBackend.expectGET('/api/events/total').respond(200);
      state = $state;

      scope = $rootScope.$new();
      TicTacToeCtrl = $controller('TicTacToeCtrl', {
        $scope: scope
      });
      scope.$digest();
    });

  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should post variables from scope for name and userName and process resulting events', function () {

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

    expect(scope.processedEvents.length).toBe(1);
    expect(ticTacToeService.getGameName()).toBe('TheSecondGame');
    expect(ticTacToeService.getUserName()).toBe('Bruce');
    expect(ticTacToeService.getCreator()).toBe(true);

  });


  it('should try to create a game with no username', function() {
    scope.uuid = '123';

    scope.createGame();
    httpBackend.flush();

    expect(scope.error).toBe(true);

  });

  it('should process event with GameCreated and send user to that game', function() {
    var event = [{
      uuid: '123',
      event: 'GameCreated'
    }];

    scope.processEvents(event);
    expect(ticTacToeService.getMyType()).toBe('X');
    httpBackend.expectGET('app/tictactoe/tictactoe.play.html').respond(200);
    httpBackend.flush();

  });

  it('should not allow to hard code total games', function() {

    scope.getTotal();
    httpBackend.expectGET('/api/events/total').respond({total: 3});
    httpBackend.flush();
    expect(scope.totalGamesCreated).toEqual({ total : 3 });


  });
});

/*jshint ignore:end*/
