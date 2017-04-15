window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  var game = new Phaser.Game(256, 240, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  var tileMapper;
  var cursors;
  var player;

  function preload() {
    // debugger
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.load.spritesheet('player', 'assets/sprites/MC_Link.gif', 16, 16)
  }

  function create() {
    const TileMapper = myGame.TileMapper.TileMapper();
    TileMapper.bar()
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var playerGroup = game.add.group();
    player = new Player(game);
    playerGroup.add(player);
    cursors = game.input.keyboard.createCursorKeys();
  }

  function update() {
    player.update_movement(cursors);
  }

  function render() {
  }
})(window.Phaser, window.myGame);
