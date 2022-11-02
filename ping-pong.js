 var canvas=document.getElementById('canvas');
    var context=canvas.getContext("2d");

let hit=document.getElementById("music");



    const user = {                          
    x:canvas.width/2-90/2,
    y:canvas.height-10,
    height:10,
    width:90,
    score:0,
    color:"white"

}

const com = {                              
    x:canvas.width/2-90/2,
    y:0,
    height:10,
    width:90,
    score:0,
    color:"white"
}

const ball = {
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    s_angel:0,
    e_angel:2*Math.PI,
    color:"white",
    velocityX:5,
    velocityY:5,
    speed:7

}

function line(){
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0,canvas.height/2);
    context.lineTo(canvas.width,canvas.height/2);
    context.strokeStyle="white";
    context.stroke();

}



    function drawRect(x,y,width,height,color){
    context.fillStyle=color;
    context.fillRect(x,y,width,height);

}
function drawCircle(x,y,radius,s_angel,e_angel,color){
    context.beginPath();
    context.arc(x,y,radius,s_angel,e_angel,false); //false refer to clockwise direction
  context.fillStyle=color;
      context.fill();
    context.stroke();
}
function text(text,x,y,color){
    context.font="25px josefin sans";
    context.fillStyle= color ;
    context.fillText(text,x,y);
}


//move paddel;

canvas.addEventListener('mousemove',movepaddle);
 function movepaddle(event){
    let rect=canvas.getBoundingClientRect();
    user.x= event.clientX-rect.left-user.width/2;
 }

function render(){

drawRect(0,0,600,600,"black");
drawRect(user.x, user.y, user.width, user.height, user.color);
drawRect(com.x, com.y, com.width, com.height, com.color);
drawCircle(ball.x, ball.y, ball.radius, ball.s_angel, ball.e_angel, ball.color);
text(com.score,30,canvas.height/2 - 30,"white");
text(user.score,30,canvas.height/2 + 50,"white");
line();
}

canvas.addEventListener("mousemove", movepaddle);
function movepaddle(e){
    let rect = canvas.getBoundingClientRect();
     user.x = e.clientX - rect.left - user.width/2;
}


 




//keyboard event
window.addEventListener("keydown",(e)=>{
    let keycode=e.key;
     //keyboard press event such as paddel move left right and restart game start on press enter
    if(keycode=="ArrowLeft"){
     user.x-=50;
      if(user.x<0){
         user.x=0
     }

    }

    else if(keycode=="ArrowRight"){   
   user.x+=50;
   if(user.x>=canvas.width-user.width){
     user.x=canvas.width-user.width;
     }
    
    }
  
  if(keycode=="Enter"){
   start();
  }


})


// collision detection
function collision(b,p){ //b-ball , p -player
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom;
}

// reset ball
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;

    ball.speed = 1;
    ball.velocityY = -ball.velocityY;
}

// Game over function
function ShowGameOver(e){
    // Hide canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display = "none";
    // container
    const result = document.getElementById("result");
    result.style.display = "block";


 // press Enter to play again
if( result.style.display == "block"){
window.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
      console.log(e.key);
    location.reload();
    }
})
}


}

// update 
function update(){

  if(ball.y+ball.radius>user.y||ball.y-ball.radius<com.height){
   hit.play();
}
 
    ball.x += ball.velocityX*ball.speed;
    ball.y += ball.velocityY*ball.speed;

    // control the computer paddle
   
    com.x += (ball.x - (com.x + com.width/2));


  

    // reflect from wall
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    
    }

    // if colliosion happens
    let player = (ball.y < canvas.height/2) ? com : user;
    if(collision(ball,player)){
        ball.velocityY = -ball.velocityY;
        ball.speed += 0.1;
         hit.play();
    }

    // points
    if(ball.y - ball.radius < 0){
        user.score++
        resetBall()
    }else if(ball.y + ball.radius > canvas.height){
        com.score++;
        resetBall()
    }


    //Game over
    if(user.score >5 || com.score >5){
        clearInterval(loop);
        ShowGameOver();

        localStorage.setItem("score_user",user.score);
localStorage.setItem("score_com",com.score);
  
        if(JSON.parse(localStorage.getItem("score_user"))==0 && JSON.parse(localStorage.getItem("score_com"))==0){
   alert("this is your first time");
   console.log(alert("this is your first time"));
  }
     
      
 
    }


}



//  start the game
function start(){
    update();
    render()
}

// loop
const loop = setInterval(start, 1000/50);







