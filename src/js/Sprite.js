function Sprite(img) { // criação do personagem (Sprite, draw and animation)
    this.mvRight = this.mvLeft = false;
    this.srcX = this.srcY = 2;
    this.width = 30;
    this.height = 50;
    this.posX = 10;
    this.posY = 65;
    this.img = img;
    this.speed = 1.1;
    this.countAnimation = 0;


    this.draw = function(ctx) { //function Draw/ função para desenha
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.width, this.height);
        this.animation();
    }

    this.move = function() { // Movimentação do sprite player (pessonagem)
        if (this.mvRight) {
            this.posX += this.speed;
            this.srcY = this.height * 1;
        } else if (this.mvLeft) {
            this.posX -= this.speed;
            this.srcY = this.height * 0;
        }
    }

    this.animation = function() { //Function animation/ função animar
        if (this.mvLeft || this.mvRight) {
            this.countAnimation++;
            if (this.countAnimation >= 15) {
                this.countAnimation = 0;
            }
            this.srcX = Math.floor(this.countAnimation / 5) * this.width;
        }
    }
    Sprite.prototype.halfWidth = function() { //Function para pegar a largura de um sprite na posião X
        return this.width / 2;
    }
    Sprite.prototype.centerX = function(first_argument) { //para pegar a posição aparti do centro de um Sprite pela posição X
        return this.posX + this.halfWidth();
    }

}

// cod relevante ao sprite bau, Draw and animation
function SpriteBau(img) {
    this.srcX = this.srcY = 2;
    this.width = 60;
    this.height = 52;
    this.posX = 230;
    this.posY = 60;
    this.img = img;
    this.speed = 1;
    this.countAnimation = 1;
    this.aberto = false;

    this.draw = function(ctx) {
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.width, this.height);


    }
}