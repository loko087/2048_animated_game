'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.spritesheet('preloader', 'assets/preloader.png',220,20,10);
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.scaleStage();

    this.game.state.start('preload');
  },
  scaleStage: function() {
    this.gameWidth = 428;
    this.gameHeight= 700;

    if (this.game.device.desktop || this.game.width > 500) {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    } else {
      this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
      this.scale.forceOrientation(true, true);
    }
    
    this.scale.minWidth = this.gameWidth/2;
    this.scale.minHeight = this.gameHeight/2;
    this.scale.maxWidth = this.gameWidth;
    this.scale.maxHeight = this.gameHeight;
  
    // document.getElementById("phaser").style.height = window.innerHeight-30+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
    // document.getElementById("phaser").style.overflow = "hidden";
  }, 
};

module.exports = Boot;