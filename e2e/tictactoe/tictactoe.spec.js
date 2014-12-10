'use strict';

var gameDSL = require('./game.dsl');
var playDSL = require('./play.game.dsl');

describe('TicTacToe Create View', function() {
  var page, game, play, playPage;

  beforeEach(function() {
    browser.get('/');
    page = require('./tictactoe.po');
    playPage = require('./tictactoe.play.po');
    game = gameDSL(page);
    play = playDSL(playPage);
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
  });

  it('should create a game and another user will join', function() {

    game.nameOfGame("FirstGame");
    game.nameOfUser("Bruce");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(url) {

      browser.getAllWindowHandles().then(function (handles) {

        // handle of first window
        var originalHandle = handles[0];

        // open new window
        browser.executeScript('window.open("'+ url +'", "second-window")');

        // switch to new window
        browser.switchTo().window('second-window');

        // do something within context of new window
        game.nameOfJoinUser('Clark');
        game.joinGame();
        game.waitForTictactoePage();

        browser.driver.wait(function(){
          return    browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function(el){
            return el === true;
          });
        }).
          then(function(){
            game.expectEnjoyTheGameMessage();
            game.expectGameBoardShowing();
          });


        // switch to original window
        browser.switchTo().window(originalHandle);

        // do something within context of original window
        game.waitForTictactoePage();

        browser.driver.wait(function(){
          return    browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function(el){
            return el === true;
          });
        }).
          then(function(){
            game.expectEnjoyTheGameMessage();
            game.expectGameBoardShowing();
          });
        //game.expectGameBoardShowing();

        // closes the current window
        browser.executeScript('window.close()');

      });


    });



  });

  it('should play a game of TicTacToe', function() {

    game.nameOfGame("FirstGame");
    game.nameOfUser("Bruce");
    game.createGame();
    game.waitForTictactoePage();

    browser.getCurrentUrl().then(function(url) {

      browser.getAllWindowHandles().then(function (handles) {

        // handle of first window
        var originalHandle = handles[0];

        // open new window
        browser.executeScript('window.open("'+ url +'", "second-window")');

        // switch to new window
        browser.switchTo().window('second-window');

        // do something within context of new window
        game.nameOfJoinUser('Clark');
        game.joinGame();
        game.waitForTictactoePage();


        // switch to original window
        browser.switchTo().window(originalHandle);

        // do something within context of original window

        browser.driver.wait(function(){
          return    browser.driver.isElementPresent(by.css('#tictactoeBoard')).then(function(el){
            return el === true;
          });
        }).
          then(function(){
            game.expectEnjoyTheGameMessage();
            game.expectGameBoardShowing();
            game.waitForTictactoePage();

            play.x0y0('X');

            browser.switchTo().window('second-window');
            play.x1y0('O');

            browser.switchTo().window(originalHandle);
            play.x0y1('X');

            browser.switchTo().window('second-window');
            play.x1y1('O');

            browser.switchTo().window(originalHandle);
            play.x0y2('X');

            game.waitForTictactoePage();

            play.expectGameMessage('Game OVER! - Winner: Bruce');


          });
        //game.expectGameBoardShowing();

        // closes the current window
        browser.executeScript('window.close()');

      });


    });



  });

});
