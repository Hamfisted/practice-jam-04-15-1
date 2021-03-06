window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  var game = new Phaser.Game(256, 240, Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render });
  var pixel = { scale: 3, canvas: null, context: null, width: 0, height: 0 };

  // World
  var worldMap;

  var cursors;
  var player;
  var sword;
  var enemyGroup;
  var swordButton;
  var heartRender;
  var overworld;

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
    game.load.spritesheet('hearts', 'assets/sprites/hearts.png', 7, 7);
    game.load.image('sword', 'assets/sprites/sword.png')

    game.load.audio('overworld', 'assets/audio/02-overworld.mp3');
    game.load.audio('slash', 'assets/audio/LOZ_Sword_Slash.wav');

    // Tilemaps
    game.load.tilemap('tilemap', 'assets/tilemaps/maps/level.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/zelda_tileset.png');
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    worldMap = new myGame.WorldMap(game, 'zelda_tileset', 'tiles', 'tilemap');

    var playerGroup = game.add.group();
    sword = new myGame.Sword(game);
    player = new myGame.Player(game, sword);
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


    heartRender = myGame.Hud.initializeHud(game, player)
    overworld = game.add.audio('overworld');

    overworld.loopFull(0.6);
  }

  function hitWorldBounds(sprite) {
    // logic for player hitting edge of screen here.
    // TODO: screen transition
  }

  function update() {
    player.updateMovement(cursors);
    // when button pressed, show sword
    if (swordButton.downDuration(300)){
      player.swingSword();
    }
    game.physics.arcade.overlap(player, enemyGroup, enemyCollisionHandler, null, this);

    game.physics.arcade.overlap(sword, enemyGroup, swordCollisionHandler, null, this);

    game.physics.arcade.collide(player, worldMap.getGroundLayer());
    game.physics.arcade.collide(enemyGroup, worldMap.getGroundLayer());
  }

  function enemyCollisionHandler (player, enemy) {
    player.health -= 0.5;
    console.log("OW: " + player.health);
    if (player.health <= 0) {
      console.log("dead :(");
      player.kill();
    }
  }

  function swordCollisionHandler (sword, enemy) {
    enemy.health -= 0.5;
    console.log("Dammit: " + enemy.health);
    if (enemy.health <= 0) {
      console.log("dead :(");
      enemy.kill();
    }
  }

  function render() {
    //  Every loop we need to render the un-scaled game canvas to the displayed scaled canvas:
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
    heartRender.drawHearts(player);
  }
})(window.Phaser, window.myGame);
