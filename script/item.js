function Item(game,pathImag,x,y,type){
  
    this.game=game;
    this.img=new Image();
    this.img.src=pathImag;
    this.x=x;
    this.y=y;

    this.type=type;
}

Item.prototype.draw=function(){
 
    this.game.ctx.drawImage(this.img,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);
}


Item.prototype.move=function(){


    if(this.y%SIZE_BLOCK==0){
        
        
        if ((this.game.map[this.y/60+1][this.x/60]==ENEMY_CELL))
           { this.game.enemy.dead();}
     
        else {
        if ((this.game.map[this.y/SIZE_BLOCK+1][this.x/SIZE_BLOCK]==NO_GROUND_CELL)&&(this.game.character.x%SIZE_BLOCK==0)&&(this.game.character.y%SIZE_BLOCK==0)){ //Si se acaba de quitar tierra bajo la roca
            
            
            if (this.type==DIAMOND_CELL)
            this.game.map[this.y/SIZE_BLOCK+1][this.x/SIZE_BLOCK]=DIAMOND_CELL;
            
            else
            this.game.map[this.y/SIZE_BLOCK+1][this.x/SIZE_BLOCK]=ROCK_CELL;

            this.game.map[this.y/SIZE_BLOCK][this.x/SIZE_BLOCK]=NO_GROUND_CELL;
            this.y+=3;

        }
        
        }
    }
    else if ((this.y%SIZE_BLOCK)!=0){

        this.y+=3
        if ((this.y+SIZE_BLOCK==this.game.character.y)&&(this.x==this.game.character.x))
                this.game.character.dead();
       
    }
    

   
} 