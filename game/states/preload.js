
'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
  this.backgroundColor = '57407C';
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.game.add.sprite(this.game.width/2,this.game.height/2,'preloader');
    this.asset.anchor.setTo(0.5,0.5);
    this.game.load.setPreloadSprite(this.asset);

    this.load.image('waveone','assets/waves.gif');
    this.load.image('wavetwo','assets/waves.gif');
    this.load.image('background','assets/background.png');
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
    this.game.stage.backgroundColor  = this.backgroundColor;

    this.asset.animations.add('loading');
    this.asset.animations.play('loading',10,true);
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
