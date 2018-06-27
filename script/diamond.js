function Diamond(game,pathImag,x,y){
  
    this.game=game;
    this.img=new Image();
    this.img.src=pathImag;
    this.x=x
    this.y=y

}


Diamond.prototype.draw=function(){


   
    
                this.game.ctx.drawImage(this.img,this.x,this.y, SIZE_BLOCK,SIZE_BLOCK);


}

Diamond.prototype.move=function(){


    if(this.y%60==0){
        if ((this.game.map[this.y/60+1][this.x/60]=="N")&&(this.game.character.x%60==0)&&(this.game.character.y%60==0)){ //Si se acaba de quitar tierra bajo la roca
            this.game.map[this.y/60+1][this.x/60]="D";
            this.game.map[this.y/60][this.x/60]="N";
            this.y+=3;
        
        }
    }
    else if ((this.y%60)!=0){

        this.y+=3
        if ((this.y+60==this.game.character.y)&&(this.x==this.game.character.x))
                this.game.character.dead();
    }

    
   
   
} 