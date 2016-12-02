var ctx = document.getElementById("canvas");
var context =  ctx.getContext("2d");

var snake = [{x: 50, y: 100}];
var goWhere = "right";
var length = 10;
let pressLeft = false;
let pressRight = false;
let pressUp = false;
let pressDown = false;
var snakeFood;
var grade = 0;

function judgeKeyEvent() {
    if(pressRight && goWhere != "right" && goWhere != "left") {

        goWhere = "right";
    } else if(pressLeft && goWhere != "left" && goWhere != "right") {
        goWhere = "left";
    } else if(pressUp && goWhere != "down" && goWhere != "up") {
        goWhere = "up";
    } else if(pressDown && goWhere !="up" && goWhere != "down") {
        goWhere = "down"
    }
    var x = snake[snake.length - 1].x;
    var y = snake[snake.length - 1].y;
    if(goWhere === "right") {
        if(x < 195) {
            x+=5;
        } else {
            printGameOver();
            return;
        }
    } else if(goWhere === "left") {
        if(x <= 0){
            printGameOver();
            return;
        }
        x -= 5;
    } else if(goWhere === "up") {
        if(y <= 0) {
            printGameOver();
            return;
        }
        y -= 5;
    } else if(goWhere === "down"){
        if(y >= 245) {
            printGameOver();
            return;
        }
        y += 5;
    }
    context.fillStyle = "red";
    context.fillRect(x, y,5,5);
    snake.push({x:x,y:y});
}

function printGameOver() {
    clearInterval(m);
    context.fillStyle = "blue";
    context.font = "30px Arial";
    context.fillText("Game Over!", 15,110);
    context.fillText("得分: " + grade, 40, 150);
}

function move() {
    document.getElementById("grade").innerHTML = "得分： " + grade;
    if(snake.length > length){
        context.clearRect(snake[0].x, snake[0].y, 5, 5);
        snake.splice(0,1);
    }
    judgeKeyEvent();
    eatFood();
    bumpYourself();
}

function bumpYourself() {
    for(let i = 0; i < snake.length; i++) {
        for(let j = snake.length - 1; j >= 0; j--) {
            if(snake[i].x === snake[j].x && snake[i].y === snake[j].y) {
                if(i != j) {
                    printGameOver();
                    return
                }
            }
        }
    }
}

function keyEvent(event) {
    if(event.keyCode === 39) {
        pressRight = true;
        pressLeft = false;
        pressUp = false;
        pressDown = false;
    } else if(event.keyCode === 38) {
        pressUp = true;
        pressLeft = false;
        pressRight = false;
        pressDown = false;
    } else if(event.keyCode === 37) {
        pressLeft = true;
        pressRight = false;
        pressDown = false;
        pressUp = false;
    } else if(event.keyCode === 40) {
        pressDown = true;
        pressLeft = false;
        pressRight = false;
        pressUp = false;
    }
}

function generateFood() {
    var x = parseInt((Math.random()*200) / 5) * 5;
    var y = parseInt((Math.random()*250) / 5) * 5;
    snakeFood = {x: x, y: y};
    context.fillStyle = "red"
    context.fillRect(snakeFood.x, snakeFood.y, 5, 5);
}

generateFood();
function eatFood() {
    snake.map(s => {
        if(s.x === snakeFood.x && s.y === snakeFood.y) {
            generateFood();
            length ++;
            grade += 10;
        }
    });
}

var m = setInterval(move, 100);
