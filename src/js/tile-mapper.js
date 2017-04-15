window.myGame = myGame || {}; // Sets myGame to a blank object if it isn't already defined

(function(myGame) {
  function foo() {
    console.log("Bar");
  };

  myGame.TileMapper = { foo };
})(window.myGame);
