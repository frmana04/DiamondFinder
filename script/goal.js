function Goal(game,pathImag,x,y){
  
    this.game=game;
    this.img=new Image();
    this.img.src=pathImag;
    this.x=x;
    this.y=y;
}


Goal.prototype.draw=function(x,y){

    this.game.ctx.drawImage(this.img,x,y, SIZE_BLOCK,SIZE_BLOCK);

}