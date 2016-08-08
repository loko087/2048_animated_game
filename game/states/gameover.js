
'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {
    this.score = localStorage.getItem("gamescore");
    this.font             = "flappyfont";
    this.scoreString      = "SCORE \n";
  },
  create: function () {
    this.tileSpriteY           = this.game.width*1/3;
    this.waveone = this.game.add.sprite(this.game.width/2,120, 'waveone');
    this.waveone.anchor.setTo(0.5,0.5);

     // add text      
    this.scoreText = this.game.add.bitmapText(this.game.width*3/4,60,"flappyfont",this.scoreString + this.score.toString(),24);
    this.scoreText.align = 'center';
    this.scoreText.anchor.setTo(0.5,0.5);

    // declare group of tiles
    var tileSize = window.innerWidth/4;
    this.tileSprites = this.game.add.group();
    this.tileSprites.align(4,4,tileSize,tileSize, Phaser.CENTER);

    this.tileSprites.x = 0;
    this.tileSprites.y = this.tileSpriteY;

    this.replayButton = this.game.add.button(this.game.width*1/4,60,'replayButton', this.newGame, this);
    this.replayButton.anchor.setTo(0.5,0.5);

    (localStorage.getItem("gameresult") != "lost") ? this.victory:this.lose; 
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      //this.game.state.start('play');
    }
  },
  newGame: function() {
    this.game.state.start('play');
  },
  lose: function() {
    this.lose = this.game.add.sprite(0,this.tileSpriteY,'gameover');
    this.lose.animations.add('gameend');
    this.lose.animations.play('gameend',24,true);
    this.lose.scale.setTo(428/500,428/500);
  },
  victory: function() {
    this.won = this.game.add.sprite(0,this.tileSpriteY,'2048');
    this.won.animations.add('victory');
    this.won.animations.play('victory',24,true);
    this.won.scale.setTo(428/500,428/500);
  },
};
module.exports = GameOver;
