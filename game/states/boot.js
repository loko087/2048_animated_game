'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.spritesheet('preloader', 'assets/preloader.png',220,20,10);
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');

    var gameWidth = 428;
    var gameHeight= 650;

    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;            
    this.game.scale.minWidth = gameWidth/2;            
    this.game.scale.minHeight = gameHeight/2;
    this.game.scale.pageAlignHorizontally = true;            
    this.game.scale.pageAlignVertically = true; 

    if (this.game.device.desktop || window.innerWidth < 500) {
                   
       this.game.scale.maxWidth = gameWidth;            
       this.game.scale.maxHeight = gameHeight;             

    } else {   
                       
    	this.game.scale.maxWidth = gameWidth; 
    	//You can change this to gameWidth*2.5 if needed            
    	this.game.scale.maxHeight = gameWidth*1.5; 
    	//Make sure these values are proportional to the gameWidth and gameHeight            
           
    	this.game.scale.forceOrientation(true, false);            
    	this.game.scale.hasResized.add(this.gameResized, this);            
    	this.game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);            
    	this.game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);            
    }

    this.game.scale.parentIsWindow = true;        
    this.game.scale.refresh();

  }
};

module.exports = Boot;