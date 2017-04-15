window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  const Sword = function(game) {
    var x = 100;
    var y = 100;
    Phaser.Sprite.call(this, game, x, y, 'sword');
    this.isActive = false;
    this.alpha = 0;
    game.physics.arcade.enable(this);
  };

  Sword.prototype = Object.create(Phaser.Sprite.prototype);
  Sword.prototype.constructor = Sword;

  Sword.prototype.swingSword = function(player){
    if (this.isActive) {
      return
    }
    this.alpha = 1;
    this.alignIn(player, Phaser.CENTER_RIGHT);
    this.game.time.events.add(300, this.hide, this)
    this.isActive = true;
  };

  Sword.prototype.hide = function(){
    this.isActive = false;
    this.alpha = 0.;
  };

  myGame.Sword = Sword;
})(window.Phaser, window.myGame);
