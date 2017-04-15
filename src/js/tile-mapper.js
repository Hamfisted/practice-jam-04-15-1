window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {
    function TileMapper() {
    }

    TileMapper.prototype.foo = function() {
        console.log("Bar");
    };

    myGame.TileMapper = TileMapper;
})(window.myGame);
