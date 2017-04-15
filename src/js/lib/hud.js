window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {

  const heartSize = 16
  const heartsLocation = { x: 128, y: 32 };

  function drawHeartAtOffsets(bmd, heart, offset, end) {
    myGame.Utils.range(offset, end).map(function (offset) {
      bmd.draw(heart, heartsLocation.x + offset * heartSize, heartsLocation.y);
    });
  }

  function drawHearts(game, health, maxHealth) {
    const halfHeart = game.make.sprite(0,0, 'octorok', 22);
    const fullHeart = game.make.sprite(0,0, 'octorok', 23);
    const emptyHeart = game.make.sprite(0,0, 'octorok', 3);

    let bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();
    bmd.smoothed = false;

    drawHeartAtOffsets(bmd, fullHeart, 0, Math.floor(health));
    drawHeartAtOffsets(bmd, halfHeart, Math.floor(health), Math.ceil(health));
    drawHeartAtOffsets(bmd, emptyHeart, Math.ceil(health), maxHealth);
  }

  function display(game, player) {
    console.log("player = %j", player)
    var graphics = game.add.graphics(0, 0);

    graphics.beginFill(0x0000FF);

    // draw a shape
    graphics.moveTo(-48,0);
    graphics.lineTo(256, 0);
    graphics.lineTo(256, 48);
    graphics.lineTo(0, 48);
    graphics.lineTo(0, 0);
    graphics.endFill();

    drawHearts(game, player.health, player.maxHealth)
  }

  myGame.Hud = { display };
})(window.myGame);
