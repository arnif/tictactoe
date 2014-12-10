/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var PlayGame = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.x0y0 = element(by.css('#x0y0'));
  this.x0y1 = element(by.css('#x0y1'));
  this.x0y2 = element(by.css('#x0y2'));
  this.x1y0 = element(by.css('#x1y0'));
  this.x1y1 = element(by.css('#x1y1'));
  this.x1y2 = element(by.css('#x1y2'));
  this.x2y0 = element(by.css('#x2y0'));
  this.x2y1 = element(by.css('#x2y1'));
  this.x2y2 = element(by.css('#x2y2'));

  this.gameText = element(by.css('.gameover-alert'));
};

module.exports = new PlayGame();

