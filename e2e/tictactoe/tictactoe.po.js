/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var CreateGamePage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.gameName = element(by.css('#inputGameName'));
  this.userName = element(by.css('#inputUserName'));
  this.createGameButton = element(by.css('#createGame'));

};

module.exports = new CreateGamePage();

