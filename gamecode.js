var canvas  = document.getElementById("mycanvas");
var pen = canvas.getContext("2d");
// x and y are width and hieght of canvas
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2; //dx and dy are the change we will make in ball every frame
var X = canvas.width;
var Y = canvas.height;
var ballRadius  = 10;
var paddleht = 15;
var paddlewd = 80;
var paddleX = (X-paddlewd) / 2;
var rightPressed = false;
var leftPressed = false;
var score = 0;

function drawPaddle() {
// Drawing the launcher rectangle
    pen.beginPath();
    pen.rect(paddleX, Y-paddleht, paddlewd, paddleht);
    pen.fillStyle = "rgba(0,0,255,0.5)";
    pen.fill();
    pen.closePath();
}
// Variables to Draw Bricks
var brickRowcnt = 3;
var brickcolumncnt = 6;
var brickWidth = 45;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// 2-d array to store Bricks
var bricks = [];
for(var c= 0;c<brickcolumncnt;c++){
    bricks[c] = [];
    for(var r = 0; r<brickRowcnt;r++){
        bricks[c][r] = {x:0,y:0,status: 1};
    }
}

document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}
function collisiondetection(){
    for(var c= 0;c<brickcolumncnt;c++){
        for(var r = 0;r<brickRowcnt;r++){
            var b = bricks[c][r];
            if(b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score+=5;
                    if(score == brickRowcnt*brickcolumncnt*5){
                        alert("YOU WIN CONGRATS");
                        document.location.reload();
                    }


                }
            }
        }
    }
}
function drawscore(){
    pen.font = "16px Arial";
    pen.fillStyle = "#0095DD";
    pen.fillText("Score : "+score,8,20)
}

function drawbricks() {
    for(var c = 0;c<brickcolumncnt;c++){
        for(var r = 0;r<brickRowcnt;r++){
            if(bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                pen.beginPath();
                pen.rect(brickX, brickY, brickWidth, brickHeight);
                pen.fillStyle = "#0095DD";
                pen.fill();
                pen.closePath();
            }
        }
    }
}
function drawball(){
    //Drawing the ball or a circle
    pen.beginPath()
    pen.arc(x,y,ballRadius,0,Math.PI*2,false);
    pen.fillStyle = "#0095DD";
    pen.fill();
    pen.closePath();
}

function draw() {
    // Clearing the canvas at each frame
    pen.clearRect(0,0,X,Y);
    drawbricks();
    drawball();
    drawPaddle();
    collisiondetection();
    drawscore();
    x+=dx;
    y+=dy;
    if( x+dx > X-ballRadius || x+dx<ballRadius){
        dx = -dx;
    }
    if(y+dy <ballRadius){
        dy = -dy;
    }
    else if(y+dy > Y-ballRadius){
        if(x>paddleX && x<paddleX + paddlewd){
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
        }
    }
    if(rightPressed && paddleX< X-paddlewd){
        paddleX +=7;
    }
    else if(leftPressed && paddleX>0){
        paddleX -=7;
    }

    requestAnimationFrame(draw);
}
draw();
