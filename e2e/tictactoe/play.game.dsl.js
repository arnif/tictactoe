module.exports = function(page){

  function x0y0(type) {
    page.x0y0.click();
    expect(page.x0y0.getText()).toBe(type);
  }

  function x0y1(type) {
    page.x0y1.click();
    expect(page.x0y1.getText()).toBe(type);
  }

  function x0y2(type) {
    page.x0y2.click();
    expect(page.x0y2.getText()).toBe(type);
  }

  function x1y0(type) {
    page.x1y0.click();
    expect(page.x1y0.getText()).toBe(type);
  }

  function x1y1(type) {
    page.x1y1.click();
    expect(page.x1y1.getText()).toBe(type);
  }

  function x1y2(type) {
    page.x1y2.click();
    expect(page.x1y2.getText()).toBe(type);
  }

  function x2y0(type) {
    page.x2y0.click();
    expect(page.x2y0.getText()).toBe(type);
  }

  function x2y1(type) {
    page.x2y1.click();
    expect(page.x2y1.getText()).toBe(type);
  }

  function x2y2(type) {
    page.x2y2.click();
    expect(page.x2y2.getText()).toBe(type);
  }

  function expectGameMessage(msg) {
    expect(page.gameText.getText()).toBe(msg);
  }


  return {
    x0y0: x0y0,
    x0y1: x0y1,
    x0y2: x0y2,
    x1y0: x1y0,
    x1y1: x1y1,
    x1y2: x1y2,
    x2y0: x2y0,
    x2y1: x2y1,
    x2y2: x2y2,
    expectGameMessage: expectGameMessage

  }
};
