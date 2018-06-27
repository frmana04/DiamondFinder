
window.onload = function() {
    
    var width=parseInt($("#game-board").attr("width"));
    var height=parseInt($("#game-board").attr("height"));
    var game = new Game("game-board",width-120,height);
  
    game.start();
  };