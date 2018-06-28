function Game(canvadId,width,height) {

    this.canvas = document.getElementById(canvadId);
    this.ctx = this.canvas.getContext("2d");
    this.width=width;
    this.height=height;
    this.lifes=3;
    this.diamondsLeft=3;
    this.items=[]; 
    this.map=[];  
    this.framesCounter=0;
    this.goal=new Goal (this,"images/goal.png",28*SIZE_BLOCK,10*SIZE_BLOCK);
    this.wall=new Wall(this,"images/wall.png");
    this.ground=new Ground(this,"images/ground.png");
    this.character=new Character(this,"images/maincharacter.png");
    this.noGround=new NoGround (this,"images/noground.png");
    this.generateMap();
}

Game.prototype.clear=function(){

    this.ctx.clearRect(0,0,this.width+120,this.height);
}

 
Game.prototype.setListeners = function() {

    document.onkeydown = function(event) {

        this.handleKeyDown(event.keyCode);
      
    }.bind(this);
}

Game.prototype.gameOver=function(){

    var img=new Image();
    img.src="images/gameover.png";
    this.ctx.drawImage(img,285,125,1200,700);
}


Game.prototype.keyUp=function(){


    this.character.img.src="images/moveup.png";
       this.character.typeMovement="UP";

    if((this.map[this.character.y/SIZE_BLOCK-1][this.character.x/SIZE_BLOCK]!=WALL_CELL)&&(this.map[this.character.y/SIZE_BLOCK-1][this.character.x/SIZE_BLOCK]!=ROCK_CELL)){

        if (this.map[this.character.y/SIZE_BLOCK-1][this.character.x/SIZE_BLOCK]==DIAMOND_CELL) {
            this.diamondsLeft--;this.deleteDiamond(this.character.x,this.character.y-SIZE_BLOCK);
        }     
        this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK]=NO_GROUND_CELL; 
        this.map[this.character.y/SIZE_BLOCK-1][this.character.x/SIZE_BLOCK]=CHARACTER_CELL;
        this.character.sY=-this.character.maxSpeed; 
        this.character.y+=this.character.sY;
       
     }

}

Game.prototype.keyDown=function(){

    this.character.img.src="images/movedown.png";
    this.character.typeMovement="DOWN";
    if((this.map[this.character.y/SIZE_BLOCK+1][this.character.x/SIZE_BLOCK]!=WALL_CELL)&&(this.map[this.character.y/SIZE_BLOCK+1][this.character.x/SIZE_BLOCK]!=ROCK_CELL)){
        if (this.map[this.character.y/SIZE_BLOCK+1][this.character.x/SIZE_BLOCK]==DIAMOND_CELL) {this.diamondsLeft--; this.deleteDiamond(this.character.x,this.character.y+SIZE_BLOCK);}
      this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK]=NO_GROUND_CELL; 
      
      this.map[this.character.y/SIZE_BLOCK+1][this.character.x/SIZE_BLOCK]=CHARACTER_CELL;
      this.character.sY=this.character.maxSpeed
      this.character.y+=this.character.sY
     

    }
}

Game.prototype.keyRight=function(){


    this.character.img.src="images/moveright.png"
       this.character.typeMovement="RIGHT";
    if((this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK+1]!=WALL_CELL)&&(this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK+1]!=ROCK_CELL)){
        if (this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK+1]==DIAMOND_CELL) {this.diamondsLeft--;this.deleteDiamond(this.character.x+SIZE_BLOCK,this.character.y);}
      this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK]=NO_GROUND_CELL; 
       this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK+1]=CHARACTER_CELL;
       this.character.sX =this.character.maxSpeed;
       this.character.x+=this.character.sX;
       
    }

}





Game.prototype.keyLeft=function(){


    this.character.img.src="images/moveleft.png";
       this.character.typeMovement="LEFT";
    if((this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK-1]!=WALL_CELL)&&(this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK-1]!=ROCK_CELL)){
        if (this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK-1]==DIAMOND_CELL) {this.diamondsLeft--; this.deleteDiamond(this.character.x-SIZE_BLOCK,this.character.y);}
      this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK]=NO_GROUND_CELL; 
       this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK-1]=CHARACTER_CELL;
       this.character.sX =-this.character.maxSpeed; 
      this.character.x+=this.character.sX;
       

    }
}


Game.prototype.keySpace=function(){

    if ((this.character.typeMovement=="RIGHT")&&(this.character.x%60==0)&&
    (this.map[this.character.y/60][this.character.x/60+1]==ROCK_CELL)&&
    (this.map[this.character.y/60][this.character.x/60+2]==NO_GROUND_CELL)){

        this.map[this.character.y/60][this.character.x/60+1]=NO_GROUND_CELL;
        this.map[this.character.y/60][this.character.x/60+2]=ROCK_CELL;
        for(var i=0;i<this.items.length;i++){

            if ((this.items[i].x==this.character.x+60)&&(this.items[i].y==this.character.y))
                this.items[i].x+=60;
        }
    

    }
    else if ((this.character.typeMovement=="LEFT")&&(this.character.x%60==0)&&
    (this.map[this.character.y/60][this.character.x/60-1]==ROCK_CELL)&&
    (this.map[this.character.y/60][this.character.x/60-2]==NO_GROUND_CELL)){

        this.map[this.character.y/60][this.character.x/60-1]=NO_GROUND_CELL;
        this.map[this.character.y/60][this.character.x/60-2]=ROCK_CELL;
        for(var i=0;i<this.items.length;i++){

            if ((this.items[i].x==this.character.x-60)&&(this.items[i].y==this.character.y))
                this.items[i].x-=60;
        }
    

    }

}


Game.prototype.resetCharacter=function(){

    this.character.isDead=false;
    this.character.img.src="images/maincharacter.png";
    this.map[1][1]=CHARACTER_CELL;
    this.map[this.character.y/SIZE_BLOCK][this.character.x/SIZE_BLOCK]=NO_GROUND_CELL;
    this.character.x=SIZE_BLOCK;
    this.character.y=SIZE_BLOCK;
   

}

Game.prototype.handleKeyDown = function(key){
    
// if the character is stopped in a cell and is alive we listen the cursors keys
    if ((this.character.x%SIZE_BLOCK==0)&&(this.character.y%SIZE_BLOCK==0)&&(this.character.isDead==false)){
    
        switch(key){
      
            case KEY_UP: this.keyUp(); break;
            case KEY_DOWN: this.keyDown(); break;
            case KEY_RIGHT: this.keyRight(); break;
            case KEY_LEFT: this.keyLeft(); break; 
            case KEY_SPACE: this.keySpace(); break;    
        }
    }
   
    // if the character is dead and we push ENTER the character is putted in the init cell with their image
    else if ((this.character.isDead==true)&&(key==KEY_ENTER)){

        this.resetCharacter();
   }
}



Game.prototype.deleteDiamond=function (x,y){

    for (var i=0;i<this.items.length;i++){
        if ((this.items[i].x==x)&&(this.items[i].y==y)&&(this.items[i].type==DIAMOND_CELL)){
            this.items.splice(i,1);
        }
    }
}

Game.prototype.moveAll= function(){

    this.character.move();
    for (var i=0;i<this.items.length;i++)
         this.items[i].move();
}



Game.prototype.generateWalls=function(){

    for (var i=0;i<this.width/SIZE_BLOCK;i++){  // generate horizontal around wall
        this.map[0][i]=WALL_CELL;
        this.map[this.height/SIZE_BLOCK-1][i]=WALL_CELL;
    }

    for (var i=1;i<this.height/SIZE_BLOCK;i++){ // generate vertical around wall
        this.map[i][0]=WALL_CELL;
        this.map[i][this.width/SIZE_BLOCK-1]=WALL_CELL; 
    }


}

Game.prototype.generateGround=function(){

    for (var i=1;i<this.height/SIZE_BLOCK-1;i++) 
        for (var j=1;j<this.width/SIZE_BLOCK-1;j++)
            this.map[i][j]=GROUND_CELL;      

}

Game.prototype.generateCharacter=function(){

    this.map[1][1]=CHARACTER_CELL;

}

Game.prototype.generateDiamonds=function(){

    this.map[5][6]=DIAMOND_CELL;
    this.map[10][3]=DIAMOND_CELL;
    this.map[14][9]=DIAMOND_CELL;
    this.map[14][10]=DIAMOND_CELL;
    this.map[8][9]=DIAMOND_CELL;
    this.map[8][10]=DIAMOND_CELL;
    this.map[12][20]=DIAMOND_CELL;
    this.map[8][1]=DIAMOND_CELL;

    this.items.push(new Item (this,"images/diamond.png",6*SIZE_BLOCK,5*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",3*SIZE_BLOCK,10*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",9*SIZE_BLOCK,14*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",10*SIZE_BLOCK,14*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",9*SIZE_BLOCK,8*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",10*SIZE_BLOCK,8*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",20*SIZE_BLOCK,12*SIZE_BLOCK,DIAMOND_CELL));
    this.items.push(new Item (this,"images/diamond.png",1*SIZE_BLOCK,8*SIZE_BLOCK,DIAMOND_CELL));
    this.diamondsLeft=8;
    

}
  
Game.prototype.generateRocks=function(){

    this.map[2][2]=ROCK_CELL;
    this.map[3][3]=ROCK_CELL;
    this.map[5][5]=ROCK_CELL;
    this.map[6][6]=ROCK_CELL;
    this.map[7][7]=ROCK_CELL;
    this.map[7][8]=ROCK_CELL;
    this.map[7][9]=ROCK_CELL;
    this.map[7][10]=ROCK_CELL;
    this.map[6][11]=ROCK_CELL;

   
    this.items.push(new Item (this,"images/rock.png",2*SIZE_BLOCK,2*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",3*SIZE_BLOCK,3*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",5*SIZE_BLOCK,5*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",6*SIZE_BLOCK,6*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",7*SIZE_BLOCK,7*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",8*SIZE_BLOCK,7*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",9*SIZE_BLOCK,7*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",10*SIZE_BLOCK,7*SIZE_BLOCK,ROCK_CELL));
    this.items.push(new Item (this,"images/rock.png",11*SIZE_BLOCK,6*SIZE_BLOCK,ROCK_CELL));

    

}

Game.prototype.generateMap=function(){

   
  for (var i=0;i<this.height/SIZE_BLOCK;i++) 
     this.map[i] = [];
  
   this.generateWalls();
   this.generateGround();
   this.generateCharacter();
   this.generateDiamonds();
   this.generateRocks();

}


Game.prototype.drawInformation=function(){

    for (var i=1; i<=this.character.lifes;i++)
        this.ctx.drawImage(this.character.img2,1750,50+SIZE_BLOCK*i, SIZE_BLOCK,SIZE_BLOCK);


    for (var i=1; i<=this.diamondsLeft;i++)
        this.ctx.drawImage(this.items[0].img,1750,300+40*i, 40,40);

}



Game.prototype.drawAll= function(){
   
    this.drawInformation();
    for (var i=0;i<this.height/SIZE_BLOCK;i++)
        for (var j=0;j<this.width/SIZE_BLOCK;j++){
        
            this.noGround.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);
           

            switch (this.map[i][j]){
            
                case WALL_CELL:this.wall.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;
                case GROUND_CELL:this.ground.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;
                case GOAL_CELL:this.goal.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;                 
             }
    }
    for (k=0;k<this.items.length;k++)
    this.items[k].draw();    
    this.character.draw();
}


Game.prototype.stageClear= function(){

    this.map[this.goal.y/SIZE_BLOCK][this.goal.x/SIZE_BLOCK]=GOAL_CELL;
    if ((this.character.x==this.goal.x)&&(this.character.y==this.goal.y)){

        var img=new Image();
        img.src="images/stageclear.png";
        this.ctx.drawImage(img,285,125,1200,700);
    }   
}

Game.prototype.start= function(){
   
   this.interval = setInterval(function() {

        if (this.character.isDead==false){
        
            this.clear();
            this.moveAll();
        }
    
        this.setListeners();

        if (this.character.lifes==0) this.gameOver();
        else this.drawAll();

        if (this.diamondsLeft==0) this.stageClear();     
  }.bind(this), 1000/80);

}

  
  

const SIZE_BLOCK=60;
const KEY_UP=38;
const KEY_DOWN=40;
const KEY_LEFT=37;
const KEY_RIGHT=39;
const KEY_ENTER=13;
const KEY_SPACE=32;
const WALL_CELL="W";
const GROUND_CELL="G";
const DIAMOND_CELL="D";
const CHARACTER_CELL="C";
const GOAL_CELL="GO";
const ROCK_CELL="R";
const NO_GROUND_CELL="N";

////////////////////////////////////////////////////////////////////////////





