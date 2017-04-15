window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  var game = new Phaser.Game(256, 240, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  var tileMapper;

  function preload() {
    // debugger
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  }

  function create() {
    const TileMapper = myGame.TileMapper.TileMapper();
    TileMapper.bar()
  }

  function update() {
  }

  function render() {
  }
})(window.Phaser, window.myGame);
