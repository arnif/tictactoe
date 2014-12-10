'use strict';

var gameDSL = require('./game.dsl');

describe('TicTacToe Create View', function() {
  var page, game;

  beforeEach(function() {
    browser.get('/');
    page = require('./tictactoe.po');
    game = gameDSL(page);
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Welcome to TicTacToe!');
  });

  it('should accept game name and username and create game', function() {
    game.nameOfGame("FirstGame");
    game.nameOfUser("Bruce");
    game.createGame();
    game.waitForTictactoePage();
    game.expectWaitingMessage();
    //game.expectGameBoardShowing();
    //game.expectFirstCellShowing();
  });
});
