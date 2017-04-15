window.myGame = window.myGame || {};

(function(Phaser, myGame) {
  const WorldMap = function(game, tileset, tiles, tilemap) {
    this.map = game.add.tilemap(tilemap);
    this.map.addTilesetImage(tileset, tiles);
    this.backgroundlayer = this.map.createLayer('BackgroundLayer');
    this.groundLayer = this.map.createLayer('GroundLayer');
    this.map.setCollisionByExclusion([], true, 'GroundLayer');
    //Change the world size to match the size of this layer
    this.groundLayer.resizeWorld();
  };

  WorldMap.prototype.getGroundLayer = function(){
    return this.groundLayer;
  }

  WorldMap.prototype.constructor = WorldMap;

  myGame.WorldMap = WorldMap;
})(window.Phaser, window.myGame);
