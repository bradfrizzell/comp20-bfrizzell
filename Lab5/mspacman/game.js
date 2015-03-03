function init() {
    var canvas = document.getElementById("game_canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function(){
        ctx.drawImage(img,320,0, 550, 140, 0,0, 550, 140);
        ctx.drawImage(img,75,17, 25, 25, 30,25, 25, 25);
        }
    };
  img.src = 'pacman10-hp-sprite.png';
  }
     