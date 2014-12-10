module.exports = function(page){

  function nameOfGame(gameName) {
    page.gameName.sendKeys(gameName);
  }

  function nameOfUser(userName) {
    page.userName.sendKeys(userName);
  }

  function nameOfJoinUser(joinName) {
    page.joinName.sendKeys(joinName);
  }

  function createGame() {
    page.createGameButton.click();
  }

  function joinGame() {
    page.joinGameButton.click();
  }

  function waitForTictactoePage() {
    browser.waitForAngular();
  }

  function expectWaitingMessage() {
    expect(page.h1El.getText()).toBe('Waiting for player!');
  }

  function expectEnjoyTheGame() {
    expect(page.h1El.getText()).toBe('Enjoy TicTacToe!');
  }

  function expectGameBoardShowing() {
    expect(page.board).toBeDefined();
  }

  /*
  function expectFirstCellShowing() {
    expect(tictactoe.x0y0).toBeDefined();
  }

  */
  return {
    nameOfGame: nameOfGame,
    nameOfUser: nameOfUser,
    nameOfJoinUser: nameOfJoinUser,
    createGame: createGame,
    joinGame: joinGame,
    waitForTictactoePage: waitForTictactoePage,
    expectEnjoyTheGameMessage: expectEnjoyTheGame,
    expectWaitingMessage: expectWaitingMessage,
    expectGameBoardShowing: expectGameBoardShowing
    /*
    expectFirstCellShowing: expectFirstCellShowing */
  }
};
