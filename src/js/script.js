function jogar() {
    start();
}

function getURL() {
    const user = document.getElementById('user').value;
    const history = document.getElementById('historia').value;
    window.location.href = '/home-aluno/' + user + '/jogo/' + history;
}

function start() {
    var LEFT = 37,
        RIGHT = 39;
    var cnv = document.getElementById('canvas');
    var ctx = cnv.getContext("2d");

    var spriteSheet = new Image();
    spriteSheet.src = "assets/1/img/PersonagemMv.png";
    var player = new Sprite(spriteSheet);
    //cenario
    var cenario = new Image();
    cenario.src = "assets/1/img/cenario.png";

    //bau
    var sprite = new Image();
    sprite.src = "assets/1/img/bauMv.png";
    var bau = new SpriteBau(sprite);
    var audioBau = new Audio('assets/sounds/1 martelo.mp3')
    audioBau.loop = true;
    audioBau.volume = 1;

    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);
    cnv.addEventListener("mousedown", semexe, false)

    function semexe(e) {
        this.catX = e.offsetX;
        this.diretion = player.posX - this.catX + player.srcX / 2;
        if (this.diretion > 0) {
            player.mvRight = false;
            player.mvLeft = true;
        } else {
            player.mvRight = true;
            player.mvLeft = false;
        }
    }

    //funçao para movimentação
    function keydownHandler(e) {
        switch (e.keyCode) {
            case RIGHT:
                player.mvRight = true;
                player.mvLeft = false;
                break;
            case LEFT:
                player.mvRight = false;
                player.mvLeft = true;
                break;
        }

    }

    //função para evitar o conflito dos movimentos
    function keyupHandler(e) {
        switch (e.keyCode) {
            case RIGHT:
                player.mvRight = false;
                break;
            case LEFT:
                player.mvLeft = false;
                break;

        }
    }

    spriteSheet.onload = function() {

        init();
    }

    function init() {
        //função para iniciar
        loop();
    }

    function update() {
        player.move();
        player.posX = Math.max(0, Math.min(cnv.width - player.width, player.posX)); //colisões com a perede
        colision();
    }

    function colision() {
        if (player.posX + player.width >= bau.posX) {
            bau.srcX = bau.width + 0.58;
            bau.aberto = true;
            player.mvLeft = player.mvRight = false;
            if (audioBau.loop) {
                audioBau.play();
                setInterval(function() { getURL(); }, 500);
            }
            audioBau.loop = false;
        } else if (bau.aberto) {
            bau.srcX -= bau.width + 0.58;
            bau.aberto = false;
            audioBau.loop = true;
        }
    }


    function draw() {
        //função para desenhar
        ctx.clearRect(0, 0, cnv.width, cnv.height);
        ctx.drawImage(cenario, 0, 0, cenario.width, cenario.height, 0, 0, cnv.width, cnv.height);
        bau.draw(ctx);
        player.draw(ctx);
    }


    function loop() {
        //função de loop 
        window.requestAnimationFrame(loop, cnv);
        update();
        draw();
    }


}