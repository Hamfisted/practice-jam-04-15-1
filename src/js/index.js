window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render });
  var pixel = { scale: 3, canvas: null, context: null, width: 0, height: 0 };

  var tileMapper;
  var cursors;
  var player;
  var sword;
  var enemyGroup;
  var swordButton;

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
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.load.spritesheet('player', 'assets/sprites/link.png', 15, 16, -1, 0, 15);
    game.load.spritesheet('octorok', 'assets/sprites/octorok.png', 16, 16, -1, 1, 5);
    game.load.image('sword', 'assets/sprites/sword.png')
  }

  function create() {
    tileMapper = myGame.TileMapper.TileMapper();
    tileMapper.bar()

    game.physics.startSystem(Phaser.Physics.ARCADE);
    var playerGroup = game.add.group();
    player = new myGame.Player(game);
    player.maxHealth = 5;
    player.health = 3.5
    playerGroup.add(player);
    sword = new myGame.Sword(game);
    playerGroup.add(player);
    playerGroup.add(sword);

    // this dirty hack of avoiding game.world.setBounds(), to avoid moving the camera, may bite us long term
    game.world.bounds.setTo(0, 48, 256, 192);
    this.game.physics.setBoundsToWorld();

    player.body.onWorldBounds = new Phaser.Signal();
    player.body.onWorldBounds.add(hitWorldBounds, this);

    enemyGroup = game.add.group();
    octorok = new myGame.Octorok(game);
    enemyGroup.add(octorok);
    cursors = game.input.keyboard.createCursorKeys();
    swordButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    myGame.Hud.display(game, player);
  }

  function hitWorldBounds(sprite) {
    // logic for player hitting edge of screen here.
    // TODO: screen transition
  }

  function update() {
    player.updateMovement(cursors);
    // when button pressed, show sword
    if (swordButton.downDuration(300)){
      sword.swingSword(player);
    }
    game.physics.arcade.overlap(player, enemyGroup, enemyCollisionHandler, null, this);
  }

  function enemyCollisionHandler (player, enemy) {
    // TODO (greg): make this decrement our health
    console.log("OW");
    enemy.kill();
  }

  function render() {
    //  Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
  }
})(window.Phaser, window.myGame);
