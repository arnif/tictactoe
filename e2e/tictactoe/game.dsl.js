module.exports = function(page){
  var tictactoe;

  function nameOfGame(gameName) {
    page.gameName.sendKeys(gameName);
  }

  function nameOfUser(userName) {
    page.userName.sendKeys(userName);
  }

  function createGame() {
    page.createGameButton.click();
  }

  function waitForTictactoePage() {
    browser.waitForAngular();
    tictactoe = require('./tictactoe.po');
  }

  function expectWaitingMessage() {
    expect(page.h1El.getText()).toBe('Waiting for player!');
  }

  /*

  function expectGameBoardShowing() {
    expect(tictactoe.board).toBeDefined();
  }

  function expectFirstCellShowing() {
    expect(tictactoe.x0y0).toBeDefined();
  }

  */
  return {
    nameOfGame: nameOfGame,
    nameOfUser: nameOfUser,
    createGame: createGame,
    waitForTictactoePage: waitForTictactoePage,
    expectWaitingMessage: expectWaitingMessage
    /*
    expectGameBoardShowing: expectGameBoardShowing,
    expectFirstCellShowing: expectFirstCellShowing */
  }
};
