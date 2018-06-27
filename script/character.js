function Character(game,pathImag){

    this.game=game;
    this.img=new Image();
    this.img.src=pathImag; 
    this.img2=new Image();
    this.img2.src="images/maincharacter.png"
    this.x=60;
    this.y=60;
    this.sX=5;
    this.sY=5;
    this.maxSpeed=5;
    this.lifes=3;
    this.isDead=false;
    

}


Character.prototype.dead=function(){
    this.img.src="images/dead.png";
    this.lifes--;
    if (this.lifes==0) this.game.gameOver();
    else this.isDead=true;
}


Character.prototype.draw=function(){


   
    
                this.game.ctx.drawImage(this.img,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);


    


}

Character.prototype.move=function(){

if (this.x%60!=0)
    this.x+=this.sX;
    else this.sX=0;

if((this.y%60!=0))
    this.y+=this.sY;
    else this.sY=0;

}