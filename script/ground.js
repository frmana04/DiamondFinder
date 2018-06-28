function Ground(game,pathImag){
    
    this.game=game;
    this.img=new Image();
    this.img.src=pathImag;
}

Ground.prototype.draw=function(x,y){

    this.game.ctx.drawImage(this.img,x,y, SIZE_BLOCK,SIZE_BLOCK);

}