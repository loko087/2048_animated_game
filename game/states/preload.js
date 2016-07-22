
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

    this.load.image('background','assets/background.bng');
    this.load.image('startButton','assets/start-button.png');
    this.load.image('title','assets/title.png');
  },
  create: function() {
    
  },
  update: function() {
    
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
