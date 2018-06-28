function Character(game,pathImag){

    this.game=game;
    this.img=new Image();
    this.img.src=pathImag; 
    this.img2=new Image();
    this.img2.src="images/maincharacter.png"
    this.x=SIZE_BLOCK;
    this.y=SIZE_BLOCK;
    this.sX=5;
    this.sY=5;
    this.maxSpeed=5;
    this.lifes=3;
    this.isDead=false;
    this.typeMovement="NO_MOVE";
    
}


Character.prototype.dead=function(){

    this.img.src="images/dead.png";
    this.lifes--;
    if (this.lifes==0) this.game.gameOver();
    else this.isDead=true;
}


Character.prototype.draw=function(){

    

    if ((this.typeMovement=="RIGHT")||(this.typeMovement=="LEFT")){

        if (this.x%60<=SIZE_BLOCK/3)
         this.game.ctx.drawImage(this.img,0,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);

        else if ((this.x%60>SIZE_BLOCK/3)&&(this.x%60<=2*SIZE_BLOCK/3))
         this.game.ctx.drawImage(this.img,16,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);

         else 
         this.game.ctx.drawImage(this.img,32,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);
    }  
    else if ((this.typeMovement=="UP")||(this.typeMovement=="DOWN")){

        if (this.y%60<=SIZE_BLOCK/3)
         this.game.ctx.drawImage(this.img,0,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);

        else if ((this.y%60>SIZE_BLOCK/3)&&(this.y%60<=2*SIZE_BLOCK/3))
         this.game.ctx.drawImage(this.img,16,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);

         else 
         this.game.ctx.drawImage(this.img,32,0,16,16,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);
    }  

   else  this.game.ctx.drawImage(this.img,this.x,this.y,SIZE_BLOCK,SIZE_BLOCK);

}

Character.prototype.move=function(){

    if (this.x%SIZE_BLOCK!=0) this.x+=this.sX;
    else this.sX=0;

    if((this.y%SIZE_BLOCK!=0)) this.y+=this.sY;
    else this.sY=0;

}

