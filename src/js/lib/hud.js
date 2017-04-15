window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {
  function display(game) {
    // debugger;
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x0000FF);

    // draw a shape
    graphics.moveTo(0,0);
    graphics.lineTo(256, 0);
    graphics.lineTo(256, 48);
    graphics.lineTo(0, 48);
    graphics.lineTo(0, 0);
    graphics.endFill();
  }
  myGame.Hud = { display };
})(window.myGame);
