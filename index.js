const  canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');
pen.fillStyle = 'red'

const cs = 67;
const W = 1200;
const H = 735;
let gameOver = false;

let food = null;

let score = 0;

const snake = {
    init_len : 5,
    direction : 'right',
    cells : [] , 

    createSnake : function(){
        for(let i = 0 ;  i < this.init_len ; i++){
            this.cells.push({
                x : i,
                y : 0
            });
        }
    },

    drawSnake : function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs, cell.y*cs, cs-1 , cs-1);
        }
    },

    updateSnake : function(){

        // GETTING THE VALUE OF HEAD OF SNAKE
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;

        if(headX === food.x && headY === food.y){
            food = getRandomFood();
            score++;
        }
        else{
        // REMOVE FIRST CELL
            this.cells.shift();
        }

        let nextX ;
        let nextY ;

        if(this.direction === 'down'){
            nextX = headX;
            nextY = headY + 1;

            if(nextY*cs >= H-cs){
                gameOver = true;
                pen.fillStyle = 'white';
                pen.fillText('Game Over' ,  100 , 100);
                // clearInterval(id);
            }
        }
        else if(this.direction === 'up'){
            nextX = headX;
            nextY = headY - 1;

            if(nextY*cs <= 0){
                
                gameOver = true;
                pen.fillStyle = 'white';
                pen.fillText('Game Over' ,  100 , 100);
            }
        }
        else if(this.direction === 'right'){
            nextX = headX + 1;
            nextY = headY;

            if(nextX*cs >= W-cs){
                
                gameOver = true;
                pen.fillStyle = 'white';
                pen.fillText('Game Over' ,  100 , 100);
            }
        }
        else if(this.direction === 'left'){
            nextX = headX - 1;
            nextY = headY;
            if(nextX*cs <= 0){
                
                gameOver = true;
                pen.fillStyle = 'white';
                pen.fillText('Game Over' ,  100 , 100);
            }
        }
        else{
            nextX = headX + 1;
            nextY = headY;

            if(nextX*cs >= W-cs){
                
                gameOver = true;
                pen.fillStyle = 'white';
                pen.fillText('Game Over' ,  100 , 100);
            }
        }

        // PUSH THE NEW CELL AFTER THE HEAD INSIDE THE CELLS
        this.cells.push({
            x : nextX,
            y : nextY
        })

        
    }
}

// THIS IS GOING TO INITIALIZE THE GAME
function init(){
    snake.createSnake();
    food =  getRandomFood();

    function keyPressed(e){

        if(e.key === 'ArrowDown'){
            
            snake.direction = 'down';
        }
        else if(e.key === 'ArrowLeft'){
            snake.direction = 'left';
        }
        else if(e.key === 'ArrowRight'){
            snake.direction = 'right';
        }
        else if(e.key === 'ArrowUp'){
            snake.direction = 'up';
        }

        console.log(snake.direction);

    }

    document.addEventListener('keydown' , keyPressed);
}

// UPDATE THE PROPERTIES OF A GAME
function update(){
    if(gameOver === true){
        clearInterval(id);
    }
    snake.updateSnake();
}

// DRAW SOMETHING ON THE CANVAS
function draw(){
    pen.clearRect(0, 0, W , H);
    pen.font = '40px san-serif';
    pen.fillText(`Score ${score}` , 100 , 50);
    // GENERATE RANDOM FRUIT
    pen.fillStyle = 'blue';
    pen.fillRect(food.x*cs, food.y*cs , cs , cs);

    // GENERATE SNAKE
    pen.fillStyle = 'red';
    snake.drawSnake();
    
    
}

// GAME-LOOP
function gameLoop(){
    draw();
    update();
}


function getRandomFood(){
    const foodX = Math.round(Math.random() * (W-cs) / cs);
    const foodY = Math.round(Math.random() * (H-cs) / cs);

    food = {
        x : foodX,
        y : foodY
    }

    return food;
}

init();
const id = setInterval(gameLoop , 150);