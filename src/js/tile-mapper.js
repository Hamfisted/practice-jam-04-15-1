window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {
  function foo(tileMapperParams) {
    console.log("constructor Foo");
    // constructor

    return {
      bar: function() {
        // function stuff
        console.log("bar");
      }
    }
  };

  myGame.TileMapper = { foo };
})(window.myGame);
