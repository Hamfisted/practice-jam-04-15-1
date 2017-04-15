window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  const Player = function(game) {
    var x = 100;
    var y = 100;
    this.speed = 96;
    Phaser.Sprite.call(this, game, x, y, 'player', 1);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;
  };

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.updateMovement = function(cursors){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (cursors.left.isDown) {
        this.body.velocity.x = -this.speed;
        this.frame = 1;
    } else if (cursors.right.isDown) {
        this.body.velocity.x = this.speed;
        this.frame = 3;
    }

    if (cursors.up.isDown) {
        this.body.velocity.y = -this.speed;
        this.frame = 2;
    } else if (cursors.down.isDown) {
        this.body.velocity.y = this.speed;
        this.frame = 0;
    }
  };

  myGame.Player = Player;
})(window.Phaser, window.myGame);
