Player = function(game) {
  var x = 100;
  var y = 100;
  this.speed = 96;
  Phaser.Sprite.call(this, game, x, y, 'player', 28);
  game.physics.arcade.enable(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.updateMovement = function(cursors){

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    if (cursors.left.isDown)
    {
        this.body.velocity.x = -this.speed;
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = this.speed;
    }

    if (cursors.up.isDown)
    {
        this.body.velocity.y = -this.speed;
    }
    else if (cursors.down.isDown)
    {
        this.body.velocity.y = this.speed;
    }

};
