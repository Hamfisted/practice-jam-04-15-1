window.myGame = window.myGame || {};

(function(Phaser, myGame) {
    var game = new Phaser.Game(256, 240, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
    var tileMapper;

    function preload() {
      // debugger
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    function create() {
      const Foo = myGame.TileMapper.foo();
      Foo.bar()
    }

    function update() {
    }

    function render() {
    }
})(window.Phaser, window.myGame);
