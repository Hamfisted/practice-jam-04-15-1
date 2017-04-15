window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  const Sword = function(game) {
    var x = 100;
    var y = 100;
    Phaser.Sprite.call(this, game, x, y, 'sword');
    game.physics.arcade.enable(this);
  };

  Sword.prototype = Object.create(Phaser.Sprite.prototype);
  Sword.prototype.constructor = Sword;

  myGame.Sword = Sword;
})(window.Phaser, window.myGame);
