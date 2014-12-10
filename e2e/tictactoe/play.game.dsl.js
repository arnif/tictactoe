module.exports = function(page){

  function x0x0() {
    page.x0y0.click();
  }

  function expectx0y0ToBeOccupiedWith(value) {
    expect(page.x0y0.getText()).toBe(value);
  }


  return {
    x0y0: x0x0,
    expectx0y0ToBeOccupiedWith: expectx0y0ToBeOccupiedWith

  }
};
