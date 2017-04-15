window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  Octorok = function(game) {
    let x = 120;
    let y = 120;
    this.speed = 96;
    Phaser.Sprite.call(this, game, x, y, 'octorok', 1);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  };

  Octorok.prototype = Object.create(Phaser.Sprite.prototype);
  Octorok.prototype.constructor = Octorok;

  myGame.Octorok = Octorok;
})(window.Phaser, window.myGame);
