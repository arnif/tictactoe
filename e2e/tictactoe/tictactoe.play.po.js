/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var PlayGame = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.x0y0 = element(by.css('#0'));
  this.x0y1 = element(by.css('#1'));
  this.x0y2 = element(by.css('#2'));
  this.x1y0 = element(by.css('#3'));
  this.x1y1 = element(by.css('#4'));
  this.x1y2 = element(by.css('#5'));
  this.x2y0 = element(by.css('#6'));
  this.x2y1 = element(by.css('#7'));
  this.x2y2 = element(by.css('#8'));
};

module.exports = new PlayGame();

