function Enemy(game,pathImag){

    this.game=game;
    this.img=new Image();
    this.img.src=pathImag; 
    this.img2.src="images/enemy.png"
    this.x=SIZE_BLOCK;
    this.y=SIZE_BLOCK;
    this.sX=5;
    this.sY=5;
    this.maxSpeed=5;
    this.typeMovement="NO_MOVE";
    
}