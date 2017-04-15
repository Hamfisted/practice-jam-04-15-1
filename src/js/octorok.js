window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  Octorok = function(game) {
    let x = 120;
    let y = 120;
    Phaser.Sprite.call(this, game, x, y, 'octorok', 1);
    game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.speed = 32;
    this.isShooting = false;
    this.isMoving = false;
    this.xDir = 1;
    this.yDir = 0;
    this.startMoving();
  };

  Octorok.prototype = Object.create(Phaser.Sprite.prototype);
  Octorok.prototype.constructor = Octorok;

  Octorok.prototype.timeToMoveFor = function () {
    // todo: randomly generated number
    return Phaser.Timer.SECOND * 1;
  };

  Octorok.prototype.timeToShootFor = function() {
    // todo: randomly generated number
    return Phaser.Timer.SECOND * 1;
  };

  Octorok.prototype.startMoving = function() {
    this.isShooting = false;
    this.isMoving = true;
    const randomSign = Math.round(Math.random()) * 2 - 1;
    if (Math.random() > 0.5) {
      this.xDir = 0;
      this.yDir = randomSign;
    } else {
      this.xDir = randomSign;
      this.yDir = 0;
    }
    this.game.time.events.add(this.timeToMoveFor(), this.startShooting, this);
  };

  Octorok.prototype.startShooting = function() {
    this.isShooting = true;
    this.isMoving = false;
    this.game.time.events.add(this.timeToShootFor(), this.startMoving, this);
  };

  Octorok.prototype.update = function() {
    if (this.isMoving) {
      this.body.velocity.x = this.speed * this.xDir;
      this.body.velocity.y = this.speed * this.yDir;
    } else {
      this.body.velocity.x = this.body.velocity.y = 0;
    }
  };

  myGame.Octorok = Octorok;
})(window.Phaser, window.myGame);
