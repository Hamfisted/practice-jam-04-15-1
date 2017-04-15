window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    const { width, height }  = SCALE.calculageWindowDimensions(256, 240);
    var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var tileMapper;

    function preload() {
    }

    function create() {
        tileMapper = new myGame.TileMapper();
        tileMapper.foo();
    }

    function update() {
    }

    function render() {
    }
})(window.Phaser, window.myGame);
