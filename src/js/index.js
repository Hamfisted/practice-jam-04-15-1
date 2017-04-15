window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render });
  var pixel = { scale: 4, canvas: null, context: null, width: 0, height: 0 }

  var tileMapper;
  var cursors;
  var player;

  function init() {
    //  Hide the un-scaled game canvas
    game.canvas.style['display'] = 'none';
    
    //  Create our scaled canvas. It will be the size of the game * whatever scale value you've set
    pixel.canvas = Phaser.Canvas.create(game, game.width * pixel.scale, game.height * pixel.scale);
 
    //  Store a reference to the Canvas Context
    pixel.context = pixel.canvas.getContext('2d');
 
    //  Add the scaled canvas to the DOM
    Phaser.Canvas.addToDOM(pixel.canvas);
 
    //  Disable smoothing on the scaled canvas
    Phaser.Canvas.setSmoothingEnabled(pixel.context, false);
 
    //  Cache the width/height to avoid looking it up every render
    pixel.width = pixel.canvas.width;
    pixel.height = pixel.canvas.height;
  }

  function preload() {
    // debugger
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.load.spritesheet('player', 'assets/sprites/MC_Link.gif', 16, 16);
    game.load.spritesheet('octorok', 'assets/sprites/octorok.png', 16, 16, -1, 1, 5);
  }

  function create() {
    tileMapper = myGame.TileMapper.TileMapper();
    tileMapper.bar()

    game.physics.startSystem(Phaser.Physics.ARCADE);
    var playerGroup = game.add.group();
    player = new Player(game);
    playerGroup.add(player);
    var enemyGroup = game.add.group();
    octorok = new myGame.Octorok(game);
    enemyGroup.add(octorok);
    cursors = game.input.keyboard.createCursorKeys();

    // add entities to physics engine.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    // player collide
    player.body.collideWorldBounds = true;
    player.body.onWorldBounds = new Phaser.Signal();
    player.body.onWorldBounds.add(hitWorldBounds, this);
  }

  function hitWorldBounds(sprite) {
    // logic for player hitting edge of screen here.
    // TODO: screen transition
  }

  function update() {
    player.updateMovement(cursors);
  }

  function render() {
    //  Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
})(window.Phaser, window.myGame);
