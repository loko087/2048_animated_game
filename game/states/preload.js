
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
  this.background = '57407C';
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2,this.height/2,'preloader');
    this.asset.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('startButton','assets/start-button.png');
    this.load.image('replayButton','assets/replay-button.png');
    
    this.load.spritesheet('title','assets/title.png',500,115,50);
    this.load.spritesheet('2048','assets/2048.png',500,500,121);
    this.load.spritesheet('gameover','assets/game-over.png',500,500,98);

    this.load.spritesheet('tile','assets/tilesprite.png',107,107);

    this.load.bitmapFont('flappyfont','assets/fonts/flappyfont/flappyfont.png','assets/fonts/flappyfont/flappyfont.fnt');
  
    // loading audio files
    this.load.audio('score', 'assets/score.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
