window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const { width, height }  = SCALE.calculateWindowDimensions(256, 240);
    var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var tileMapper;

    function preload() {
    }

    function create() {
      myGame.TileMapper.foo();
    }

    function update() {
    }

    function render() {
    }
})(window.Phaser, window.myGame);
