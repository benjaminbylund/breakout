var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//bilder
let paddleImg = document.getElementById("paddleImg");
let brickImg = document.getElementById("brickImg");
let ballImg = document.getElementById("ballImg");
let bgImg = document.getElementById("bgImg");

//ball and canvas variablar
var ballRadius = 20;
var ballW = 40;
var ballH = 40;
var ballSpeed = 4;
var ballAcceleration = 0.5;
var x = canvas.width/2;
var y = canvas.height-ballH;
var dx = 1;
var dy = -1;

var score = 0;
var lives = 3;

//paddle variablar
var paddleHeight = 20;
var paddleWidth = 150;
var paddleX = (canvas.width - paddleWidth) / 2; // 480 - 75 / 2 = 235
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//brick variablar
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 150;
var brickHeight = 40;
var brickPadding = 20;
var brickOffsetTop = 60;
var brickOffsetLeft = 60;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	}else if(e.keyCode == 37){
		leftPressed = true;
	}
	if(e.keyCode == 32){
		ballSpeed *= 2;
 	}
}

function keyUpHandler(e){
	if(e.keyCode == 39){
		rightPressed = false;
	}else if(e.keyCode == 37)  {
		leftPressed = false;
	}
}

function drawPaddle(){
	ctx.beginPath();
	//ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.drawImage(paddleImg, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall(){
	ctx.beginPath();
	 //Arc takes 6 parameters, x, y, arc radius, start angle and end, direction fof drawing.
	//ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.drawImage(ballImg, x, y, ballW, ballH);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
        	if(bricks[c][r].status == 1) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.drawImage(brickImg, brickX, brickY, brickWidth, brickHeight);
           // ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        	}
        }
    }
}

function drawScore(){
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("ScoreBaby: " + score, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}

function drawBg() {
	ctx.drawImage(bgImg,0,0,canvas.width, canvas.height);
}

function collisionDetection(){
	for(var c=0; c<brickColumnCount; c++) {
		for(var r=0; r<brickRowCount; r++){
			var b = bricks [c][r];
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y +brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
				 	if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
				}
			}
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBg();
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();

	//om värdet blir lägre än 0 så ändrar den riktning 
	if(x + (dx * ballSpeed) > canvas.width - ballW || x + (dx * ballSpeed) < 0) {
		dx = -dx;
	}

	//Gör så att jag får fram en ruta där det står Game Over
	if(y + (dy * ballSpeed) < 0) {
   		 dy = -dy;
	} else if(y + (dy * ballSpeed) > canvas.height - ballH) {
  	  	if(x > paddleX && x < paddleX + paddleWidth) {
        	dy = -dy;
        	ballSpeed += ballAcceleration;
    	} 
	    else {
	        lives--;
	        if(!lives){
	        	alert("Game Over");
	        	document.location.reload();
	        }
	        else {
		        x = canvas.width/2;
		        y = canvas.height-30;
		        dx = 1;
		        dy = -1;
		        paddleX = (canvas.width-paddleWidth)/2;
	     	}	
    	}
	}
	if(rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 14;
	}
	else if (leftPressed && paddleX > 0){
		paddleX -= 14;
	}
	
	x += dx* ballSpeed;
	y += dy* ballSpeed;

	requestAnimationFrame(draw);
}

draw();




