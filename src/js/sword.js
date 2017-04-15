window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  const Sword = function(game) {
    var x = 100;
    var y = 100;
    Phaser.Sprite.call(this, game, x, y, 'sword');
    this.alpha = 0;
    this.anchor.setTo(0, 0.5);
    game.physics.arcade.enable(this);
  };

  Sword.prototype = Object.create(Phaser.Sprite.prototype);
  Sword.prototype.constructor = Sword;
  Sword.prototype.setDirection = function(x, y){
    if (x > 0){
      this.angle = 0;
    }
    if (x < 0){
      this.angle = 180;
    }
    if (y > 0){
      this.angle = 90;
    }
    if (y < 0){
      this.angle = 270;
    }
  };
  myGame.Sword = Sword;
})(window.Phaser, window.myGame);
