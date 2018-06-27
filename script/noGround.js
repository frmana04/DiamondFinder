function NoGround(game,pathImag){
    this.game=game;
    
    this.img=new Image();
    this.img.src=pathImag;


}

NoGround.prototype.draw=function(x,y){

    this.game.ctx.drawImage(this.img,x,y, SIZE_BLOCK,SIZE_BLOCK);
   
   
}

