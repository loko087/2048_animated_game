
'use strict';

var fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var tileSprites;
var canMove = false;

function Preload() {
  this.asset = null;
  this.ready = false;
  this.background = '57407C';
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.spritesheet("tile", "assets/2_small.png",107,107,40);
  },
  create: function() {
    this.asset.cropEnabled = false;
    this.stage.backgroundColor = this.background;

    var sprite = this.add.sprite(40,100,'ms');
    sprite.animations.add('animated');
    sprite.animations.play('animated',50,true);
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
