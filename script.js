window.onload = () => {
    
    // Constantes e variáveis

    const tp = 20;                              // Tamanho de uma peça
    const tg = 25;                              // Tamanho do grid em peças
    const vel = 1;                              // Velocidade global em peças
    var score = 0;                              // Pontos

    // Classes

    class Snake {
        constructor(x, y, vx, vy, tail){
            this.pos = {x:x, y:y};              // Posição da cabeça
            this.tail = tail;                   // Tamanho da calda
            this.trail = [];                    // Array do corpo
            this.vx = vx;                       // Movimento em x
            this.vy = vy;                       // Movimento em y
        }

        desenhar(){                             // Também verifica se perdeu
            ctx.shadowColor = '#F83A3D';
            ctx.shadowBlur = 4;
            ctx.fillStyle = '#C43D3D';
            for(let i = 0; i < this.trail.length; i++){
                ctx.fillRect(this.trail[i].x*tp, this.trail[i].y*tp, tp-1, tp-1);
                if(this.trail[i].x == this.trail[0].x && this.trail[i].y == this.trail[0].y && i != 0){
                    this.vx = this.vy = 0;
                    this.tail = 5;
                    score = 0;
                }
            }
        }

        attpos(){ 
            this.pos.x += this.vx;
            this.pos.y += this.vy;
        }

        attcorpo(){
            this.trail.unshift({x:this.pos.x, y:this.pos.y});
            while(this.trail.length > this.tail){
                this.trail.pop();
            }
        }
    }
    

    class Apple {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    
        desenhar(){
            ctx.shadowColor = 'darkred';
            ctx.shadowBlur = 25;
            ctx.fillStyle = '#F99898';
            ctx.fillRect(this.x*tp, this.y*tp, tp-1, tp-1);
        }
    }




    // Objetos

    snake = new Snake(10, 10, 1, 0, 5);
    apple = new Apple(15, 15);
    
    // Stage e Contexto
    
    stage = document.getElementById('Stage');
    ctx = stage.getContext('2d');
    

    // Comando que "chama" o loop e o comando que captura as teclas

    setInterval(game, 70);
    document.addEventListener('keydown', keyPush);

    // Main loop
    
    function game(){
        
        // Atualizar a posição da cobra

        snake.attpos();

        // Verificando se está nas bordas

        if (snake.pos.x < 0) {
            snake.pos.x = tg-1;
        }
        if (snake.pos.y < 0) {
            snake.pos.y = tg-1;
        }
        if (snake.pos.x > tg-1) {
            snake.pos.x = 0;
        }
        if (snake.pos.y > tg-1) {
            snake.pos.y = 0;
        }

        // Atualizar o corpo da cobra

        snake.attcorpo();

        // Desenhar

        //// Stage
        ctx.fillStyle = '#F05F51';
        ctx.fillRect(0, 0, stage.width, stage.height);

        //// Maça
        apple.desenhar();

        //// Cobra
        snake.desenhar();

        //// Score
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#F99898';
        ctx.font = 'bold 22px Arial';
        ctx.fillText(`Score: ${score}`, 375, 30);
        ctx.fillStyle = 'darkred';
        ctx.strokeText(`Score: ${score}`, 375, 30);

        // Colisão entre a cobra e a maça

        if(snake.pos.x == apple.x && snake.pos.y == apple.y){
            apple.x = Math.floor(Math.random()*tg);
            apple.y = Math.floor(Math.random()*tg);
            snake.tail++;
            score += 10;
        }
    }

    function keyPush(event) {
        switch(event.keyCode) {

            case 37: // Esquerda
                if(snake.vx != vel) {
                    snake.vx = -vel;
                    snake.vy = 0;
                    break;
                } else {
                    break;
                }

            case 38: // Cima
                if(snake.vy != vel) {
                    snake.vx = 0;
                    snake.vy = -vel;
                    break;
                } else {
                    break;
                }

            case 39: // Direita
                if(snake.vx != -vel) {
                    snake.vx = vel;
                    snake.vy = 0;
                    break;
                } else {
                    break;
                }

            case 40: // Baixo
                if(snake.vy != -vel) {
                    snake.vx = 0;
                    snake.vy = vel;
                    break;
                } else {
                    break;
                }

            default:
                break;
        }
    }
}

