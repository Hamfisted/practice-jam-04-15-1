window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {

  const heartSize = 16
  const heartsLocation = { x: 128, y: 32 };

  function initializeHud(game, player) {
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x0000FF);

    // draw a shape
    graphics.moveTo(-48,0);
    graphics.lineTo(256, 0);
    graphics.lineTo(256, 48);
    graphics.lineTo(0, 48);
    graphics.lineTo(0, 0);
    graphics.endFill();

    const halfHeart = game.make.sprite(0,0, 'octorok', 22);
    const fullHeart = game.make.sprite(0,0, 'octorok', 23);
    const emptyHeart = game.make.sprite(0,0, 'octorok', 3);
    let bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    bmd.smoothed = false;

    function drawHeartAtOffsets(heart, offset, end) {
      myGame.Utils.range(offset, end).map(function (o) {
        bmd.draw(heart, heartsLocation.x + o * heartSize, heartsLocation.y);
      });
    }

    function drawHearts({ health, maxHealth }) {
      drawHeartAtOffsets(fullHeart, 0, Math.floor(health));
      drawHeartAtOffsets(halfHeart, Math.floor(health), Math.ceil(health));
      drawHeartAtOffsets(emptyHeart, Math.ceil(health), maxHealth);
    }

    drawHearts(player);

    return { drawHearts };
  }

  myGame.Hud = { initializeHud };
})(window.myGame);
