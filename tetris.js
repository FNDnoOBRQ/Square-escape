function enter(){
    const canvas  = document.getElementById("game");
    const ctx = canvas.getContext("2d");

    addEventListener('keydown', function(event){

        if (event.code === "Enter"){
            // Начальная координата квадрата
            let score = 0;
            document.getElementById("score").innerText = score;
            let square = { x: 150, y: 0, color: "yellow" };
            let speed = 2.5;

            function drawSquare(newColor){
                ctx.fillStyle = newColor;
                ctx.fillRect(square.x, square.y, 100, 100);
            }
            function drawEnemies(){
                ctx.fillStyle = "red";
                enemies.forEach(enemy =>{
                    ctx.fillRect(enemy.x, enemy.y, 50,50);
                    ctx.strokeRect(enemy.x, enemy.y,50,50);
                });
            }
            let enemies = [
                { x: getRandomCoordinate(8), y: getRandomCoordinate(17) },
                { x: getRandomCoordinate(8), y: getRandomCoordinate(17) },
                { x: getRandomCoordinate(8), y: getRandomCoordinate(17) }
            ];
            function getRandomCoordinate(max) {
                return Math.floor(Math.random() * (max-3 + 1) + 3) * 50;
            }

            function checkCollisions() {
                return enemies.some(enemy =>
                    square.x < enemy.x + 50 &&
                    square.x + 100 > enemy.x &&
                    square.y < enemy.y + 50 &&
                    square.y + 100 > enemy.y
                );
            }
            let colors = ["#652A0E","#FF2800",'yellow','yellowgreen',"#3A5311",'aqua','blue','darkblue','purple','pink','teal', "#2E5894", "#9E7BB5",'brown','black',"#7E2811",'gold', "#FAE29C","#E4D00A"];
            let xC = Math.floor(Math.random() * colors.length+1);
            let newColor = colors[xC];

            function update() {

                ctx.clearRect(0, 0, canvas.width, canvas.height);


                ctx.fillStyle = colors[xC+2];
                ctx.fillRect(0,0, 500,900);
                drawSquare(newColor);
                drawEnemies();
                square.y += speed;
                if (checkCollisions()){
                    alert("Game over!");
                    score = 0;
                    return;
                }

                if (square.y > canvas.height-100){
                    resetGame();
                }
                if (square.x < 0) square.x = 0;
                if (square.x > canvas.width - 100) square.x = canvas.width - 100;

                requestAnimationFrame(update);
            }


            function resetGame(){
                speed = 2.5+score;
                square.y = 0;
                score += 1;
                document.getElementById("score").innerHTML = score;
                enemies = [
                    {x: getRandomCoordinate(8), y: getRandomCoordinate(17) },
                    {x: getRandomCoordinate(8), y: getRandomCoordinate(17) },
                    {x: getRandomCoordinate(8), y: getRandomCoordinate(17) }
                ];
                if(score === 10){
                    confirm("You win!");
                    throw(Error);
                }
            }

            addEventListener('keydown', (event)=>{
                if (event.code === "KeyD") square.x += 50;
                if (event.code === "KeyA") square.x -= 50;
            });
            update();
        }
    });

}
window.addEventListener("load", enter);