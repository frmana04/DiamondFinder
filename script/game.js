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
    this.goal=new Goal (this,"images/goal.png");
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
  };

  Game.prototype.gameOver=function(){

    

    var img=new Image();
    img.src="images/gameover.png";
    this.ctx.drawImage(img,285,125,1200,700);


  }


  
  Game.prototype.handleKeyDown = function(key){
    

    
    if ((this.character.x%60==0)&&(this.character.y%60==0)&&(this.character.isDead==false)){// si el muñeco está quieto en una celda (no se está desplazando)
    
    switch(key){
      
        
        case 38: // Up

      if((this.map[this.character.y/60-1][this.character.x/60]!="W")&&(this.map[this.character.y/60-1][this.character.x/60]!="R")){

        if (this.map[this.character.y/60-1][this.character.x/60]=="D") {this.diamondsLeft--;this.deleteDiamond(this.character.x,this.character.y-60);}
        this.map[this.character.y/60][this.character.x/60]="N"; 
    
        this.map[this.character.y/60-1][this.character.x/60]="C";
       
        this.character.sY=-this.character.maxSpeed; 
        this.character.y+=this.character.sY;
    
    }
        
       break;

      case 40: // down

      if((this.map[this.character.y/60+1][this.character.x/60]!="W")&&(this.map[this.character.y/60+1][this.character.x/60]!="R")){
        if (this.map[this.character.y/60+1][this.character.x/60]=="D") {this.diamondsLeft--; this.deleteDiamond(this.character.x,this.character.y+60);}
      this.map[this.character.y/60][this.character.x/60]="N"; 
      
      this.map[this.character.y/60+1][this.character.x/60]="C";
      this.character.sY=this.character.maxSpeed
      this.character.y+=this.character.sY
    }
       break; 

       case 39: //Right
       if((this.map[this.character.y/60][this.character.x/60+1]!="W")&&(this.map[this.character.y/60][this.character.x/60+1]!="R")){
        if (this.map[this.character.y/60][this.character.x/60+1]=="D") {this.diamondsLeft--;this.deleteDiamond(this.character.x+60,this.character.y);}
      this.map[this.character.y/60][this.character.x/60]="N"; 
       this.map[this.character.y/60][this.character.x/60+1]="C";
       this.character.sX =this.character.maxSpeed;
       this.character.x+=this.character.sX;
    }
       break;

       case 37: //Left
       if((this.map[this.character.y/60][this.character.x/60-1]!="W")&&(this.map[this.character.y/60][this.character.x/60-1]!="R")){
        if (this.map[this.character.y/60][this.character.x/60-1]=="D") {this.diamondsLeft--; this.deleteDiamond(this.character.x-60,this.character.y);}
      this.map[this.character.y/60][this.character.x/60]="N"; 
       this.map[this.character.y/60][this.character.x/60-1]="C";
       this.character.sX =-this.character.maxSpeed; 
       this.character.x+=this.character.sX;
    }
       break;
      
    }
}
   
    else if ((this.character.isDead==true)&&(key==13)){
            this.character.isDead=false;
            this.character.img.src="images/maincharacter.png";
            this.map[1][1]="C";
            this.map[this.character.y/60][this.character.x/60]="N";
            this.character.x=60;
            this.character.y=60;
    }
  }

Game.prototype.deleteDiamond=function (x,y){

    for (var i=0;i<this.items.length;i++){
        if ((this.items[i].x==x)&&(this.items[i].y==y)&&(this.items[i].type=="diamond")){
            this.items.splice(i,1);

        }

    }

}

Game.prototype.moveAll= function(){

    this.character.move();
    
    for (var i=0;i<this.items.length;i++)
    this.items[i].move();

    

 

}



  
Game.prototype.generateMap=function(){

   
  for (var i=0;i<this.height/SIZE_BLOCK;i++) { //create the empty grid
     this.map[i] = [];
  }



    for (var i=0;i<this.width/SIZE_BLOCK;i++){  // generate horizontal around wall
        this.map[0][i]="W";
        this.map[this.height/SIZE_BLOCK-1][i]="W"
    }

    for (var i=1;i<this.height/SIZE_BLOCK;i++){ // generate vertical around wall
        this.map[i][0]="W"
        this.map[i][this.width/SIZE_BLOCK-1]="W" 

    }


    for (var i=1;i<this.height/SIZE_BLOCK-1;i++){ //generate inner ground
        for (var j=1;j<this.width/SIZE_BLOCK-1;j++){
            this.map[i][j]="G" //new Ground(this,j*SIZE_BLOCK,i*SIZE_BLOCK,"/home/javier/Documentos/ironhack/Project1/diamondsFinder/images/ground.png");
       
        }     
    }
        // generate character
        this.map[1][1]="C"//new Character(this,60,60,"/home/javier/Documentos/ironhack/Project1/diamondsFinder/images/maincharacter.png");
        
    

        this.items.push(new Item (this,"images/diamond.png",360,300,"diamond"));
        this.items.push(new Item (this,"images/diamond.png",180,600,"diamond"));
        this.items.push(new Item (this,"images/diamond.png",540,840,"diamond"));
        
        this.map[5][6]="D";
        this.map[10][3]="D";
        this.map[14][9]="D";



    
    this.items.push(new Item (this,"images/rock.png",120,120,"rock"));
    this.items.push(new Item (this,"images/rock.png",180,180,"rock"));
    this.items.push(new Item (this,"images/rock.png",300,300,"rock"));

    this.map[2][2]="R";
    this.map[3][3]="R";
    this.map[5][5]="R";
    

    




    //////////////////////////////////////////////// CHARACTER /////////////////////////////////////


}


Game.prototype.drawInformation=function(){

    for (var i=1; i<=this.character.lifes;i++)
        this.ctx.drawImage(this.character.img2,1750,50+60*i, SIZE_BLOCK,SIZE_BLOCK);


    for (var i=1; i<=this.diamondsLeft;i++)
        this.ctx.drawImage(this.items[0].img,1750,300+40*i, 40,40);


}



Game.prototype.drawAll= function(){

   



for (i=0;i<this.height/SIZE_BLOCK;i++)
    for (j=0;j<this.width/SIZE_BLOCK;j++){
        
        
        this.noGround.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);
        this.character.draw();
        this.drawInformation();


    
      
      
        switch (this.map[i][j]){
            
            case "W":this.wall.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;
            case "G":this.ground.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;


            
            case "GO":this.goal.draw(j*SIZE_BLOCK,i*SIZE_BLOCK);break;
            
            
            
        }


    }
    
    for (k=0;k<this.items.length;k++)
    this.items[k].draw();

   
    
   
}
Game.prototype.stageClear= function(){

   
    this.map[10][28]="GO";
    
    if ((this.character.x==28*60)&&(this.character.y==10*60)){
    var img=new Image();
    img.src="images/stageclear.png";
    this.ctx.drawImage(img,285,125,1200,700);}
    

}

Game.prototype.start= function(){

    
    
   this.interval = setInterval(function() {

 
 if (this.character.isDead==false){
    this.clear();
    this.moveAll();
 }
 
    
    this.setListeners();
    
   
if (this.character.lifes==0)
    this.gameOver();
else
this.drawAll();

if (this.diamondsLeft==0)
    this.stageClear();    
   

   
   
  }.bind(this), 1000/80);






  }

  
  

const SIZE_BLOCK=60;



////////////////////////////////////////////////////////////////////////////





