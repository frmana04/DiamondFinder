function Enemy(game,pathImag){

    this.game=game;
    this.img=new Image();
    this.img.src=pathImag; 
    this.x=SIZE_BLOCK;
    this.y=SIZE_BLOCK;
    this.sX=5;
    this.sY=5;
    this.maxSpeed=5;
    this.typeMovement="UP";
    this.isDead=false;
    
}

Enemy.prototype.randomDecision=function(){

    var arr=["UP","DOWN","LEFT","RIGHT"];
    return arr[Math.floor(Math.random()*4)];

}

Enemy.prototype.move=function(){


    if (this.isDead==false){
    this.game.map[10][25]="N";
    switch (this.typeMovement){

      case "UP":
      
     if (this.y%60==0){
        if((this.game.map[this.y/60-1][this.x/60]==NO_GROUND_CELL)){
        
        this.game.map[this.y/60-1][this.x/60]=ENEMY_CELL;
        this.game.map[this.y/60][this.x/60]=NO_GROUND_CELL;    
        this.y-=3;
        }
        else this.typeMovement=this.randomDecision();
    }   
     else this.y-=3;   
     break;
       
     
     case "DOWN":
      
     if (this.y%60==0){
        if((this.game.map[this.y/60+1][this.x/60]==NO_GROUND_CELL)){
            this.game.map[this.y/60+1][this.x/60]=ENEMY_CELL;
            this.game.map[this.y/60][this.x/60]=NO_GROUND_CELL;     

            this.y+=3;
        
        }
        else this.typeMovement=this.randomDecision();
    }   
     else{ 
        
        this.y+=3;
         
     }   
     break;

     case "RIGHT":
      
     if (this.x%60==0){
        if((this.game.map[this.y/60][this.x/60+1]==NO_GROUND_CELL)){
        this.game.map[this.y/60][this.x/60+1]=ENEMY_CELL;
        this.game.map[this.y/60][this.x/60]=NO_GROUND_CELL;    
        this.x+=3;
        }
        else this.typeMovement=this.randomDecision();
    }   
     else{
       
        this.x+=3;  
     }
     break;
  
     case "LEFT":
      
     if (this.x%60==0){
        if((this.game.map[this.y/60][this.x/60-1]==NO_GROUND_CELL)){
            
            this.game.map[this.y/60][this.x/60-1]=ENEMY_CELL;
            this.game.map[this.y/60][this.x/60]=NO_GROUND_CELL;    
            this.x-=3;
        }
        else this.typeMovement=this.randomDecision();
    }   
     else this.x-=3;   
     break;
    
    }
}
}

Enemy.prototype.draw=function(){

    this.game.ctx.drawImage(this.img,this.x,this.y,SIZE_BLOCK,SIZE_BLOCK);
}

Enemy.prototype.dead=function(){

    this.isDead=true;

    
    this.game.map[(this.y-this.y%60)/60][(this.x-this.x%60)/60]=DIAMOND_CELL;
    this.game.items.push(new Item (this.game,"images/diamond.png",this.x-this.x%60,this.y-this.y%60,DIAMOND_CELL));
    
    this.game.drawAll();
   
}