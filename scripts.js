  const canvas= document.getElementById("tetris");
 let ctx = canvas.getContext("2d");
 let width=150;
 let height=400;
 let rad=25;
 let gaps= rad*2;
 let col = parseInt(width/gaps); //3
 let row = parseInt(height/gaps); //5
 let vacant="white";
 let board=[];
 let score=0;
 let inp_level=1;
 let level=1000;

 let scoreCard=document.getElementById("input_score");
 scoreCard.value=score;

 // getting HTML elements
  let descLevel=document.getElementById("desc_level");
  let incLevel=document.getElementById("inc_level");
  let inputlevel=document.getElementById("input_level");
  let move_left=document.getElementById("move_left");
  let move_right=document.getElementById("move_right");
  let move_vertical=document.getElementById("vertical");
  inputlevel.value=inp_level
  
  //adding event lister to component
  descLevel.addEventListener("click",desc);
  incLevel.addEventListener("click",inc);
  move_left.addEventListener("click",leftMoveButton);
  move_right.addEventListener("click",rightMoveButton);
  move_vertical.addEventListener("click",verticalMoveButton);
  document.addEventListener("keydown",press);


//function to  Increasing Level 
  function inc(event){
   if(inp_level>0 && inp_level<5){
   inputlevel.value=++inp_level;
   level=level/inp_level;

    }
    else{
        inputlevel.value=inp_level;
        
         level=level/inp_level;
         console.log(inp_level,level)   
    }
  }

// function to decrease level
  function desc(event){

    if(inp_level>1 && inp_level<5){

 inputlevel.value=--inp_level;

 level=inp_level*level;
 console.log(inp_level,level)
    }
    else{
        inputlevel.value=inp_level;
    
         level=level/inp_level;
         console.log(inp_level,level)
      
    }
}

// function to move left of click
function leftMoveButton(){
p.moveLeft();
}

// function to move down of click
function verticalMoveButton(){
    p.moveDown();
}

// function to move right of click
function rightMoveButton(){
p.moveRight();
}

// Draw white canvas
 ctx.clearRect(0,0,width,height);
 ctx.fillStyle = "white";
 ctx.fillRect(0,0,width,height);

 //function to key press events
function press(event){
if(event.keyCode==37){
p.moveLeft();
time=Date.now();
}
if(event.keyCode==39){
    p.moveRight();
    time=Date.now(); 
}
if(event.keyCode==40){
    p.moveDown();
time=Date.now();
}
}

// grid Array
for(r=0;r<8;r++){
    board[r]=[];
    for(c=0; c<3; c++){
        board[r][c]="white";
    
    }
}

// function to form grid on board
const drawboard=()=>{
  
    for(var r=0; r<row;r++){
        for(var c=0; c<col;c++){
        
           drawCircle(c,r,board[r][c]);
        }
    }
}
// function to draw circle
const drawCircle=(x,y,vacant)=>{
    
    ctx.fillStyle=vacant;
    ctx.beginPath();
    ctx.arc(rad+gaps*x,rad+ gaps*y, rad, 0, Math.PI*2, false); 
    ctx.closePath();
    ctx.fill()
    ctx.strokeStyle = "white";
    ctx.stroke();

}

drawboard();
 // random selecting ball
 function random(){

     let colorSelect = Math.floor(Math.random()*4);
     let rowSelect= Math.floor(Math.random()*2);
   return new Peice(rowSelect,- 1,colors[colorSelect]);
}
// constructor function
let colors=["purple", "green", "yellow", "Skyblue"]
 function Peice(x,y,color){
    this.x=x;
    this.y=y;
    this.color=color;
}

let p= random();
// draw ball
Peice.prototype.draw =function(){
    drawCircle(this.x,this.y,this.color);
}
 
//draw ball with white color
Peice.prototype.undraw =function(){
    drawCircle(this.x,this.y,vacant);
}

//Move ball Down
Peice.prototype.moveDown=function(){

   if(!this.collision(0,1)){

    this.undraw();
    this.y++;
    this.draw();
}
else{
    this.lock();
    p=random();
}  
}

//Move ball Left
Peice.prototype.moveLeft=function(){
   
    if(!this.collision(-1,0)){
    this.undraw();
    this.x--;
    this.draw();
    }
    
}

//Move ball Left
Peice.prototype.moveRight=function(){
    if(!this.collision(1,0)){
    this.undraw();
    this.x++;
    this.draw();
    }
}

// function to check wheater ball is inside boundary
Peice.prototype.collision= function(x,y){
    let rowNo=this.y+y;
    let colNo=this.x+x;


    if(colNo<0 || colNo>2 || rowNo>7){

        return true;
    }
    if(rowNo<0){
        return false;
    }
    if(!(board[rowNo][colNo]=="white")){

        return true;
     }
    return false;
   
  }

  // function to lock the ball when reaches bottom
  Peice.prototype.lock=function(){
   
        
        for(let i=0; i<2; i++){
        if(!(board[0][i]=="white") ){
            window.alert("Game Over");
            gameOver=true;
        }
    }
    if(this.y!=-1){
    board[this.y][this.x]=this.color;
}
  
    for(let r=0; r<row;r++){
  //     debugger
            if(board[r][0]==board[r][1] && board[r][1]==board[r][2] && board[r][0]!="white"){
    
                for(let r1=r; r1>0; r1--){

                  for(let c=0; c<=col; c++){
                
                      console.log(r1,c);
                      board[r1][c]=board[r1-1][c];
                      drawboard();
            
                }
            }
              scoreCard.value=++score;
            }
        }
            
            for(let c=0; c<col; c++){
                
                  for(let r=0; r<=5; r++){
                
            
                      if(board[r][c]===board[r+1][c] && board[r][c]===board[r+2][c] && board[r][c]!=="white"){
                  console.log(r,c,board[r][c]);
                        board[r][c]="white";
                        board[r+1][c]="white";
                        board[r+2][c]="white";
                        drawboard();
                        scoreCard.value=++score;
                      }
                    
                }
            }
              
              

}
        

let time= Date.now();
let gameOver=false;

// function for continues animation
function drop(){
    let timeLater=Date.now();
    let timer=timeLater-time;
  
    if(timer>level){
    
    p.moveDown()
 
    time=Date.now();
    }
    if(!gameOver){
    requestAnimationFrame(drop);
    }
}

drop();
