'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');

    var gameWidth = 428;
	var gameHeight= 650;

    if (this.game.device.desktop) {
       this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;            
       this.game.scale.minWidth = gameWidth/2;            
       this.game.scale.minHeight = gameHeight/2;            
       this.game.scale.maxWidth = gameWidth;            
       this.game.scale.maxHeight = gameHeight;            
       this.game.scale.pageAlignVertically = true;            
       this.game.scale.pageAlignVertically = true;    

    } else {            
    	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;            
    	this.game.scale.minWidth = gameWidth/2;            
    	this.game.scale.minHeight = gameHeight/2;            
    	this.game.scale.maxWidth = 428; 
    	//You can change this to gameWidth*2.5 if needed            
    	this.game.scale.maxHeight = window.innerHeight; 
    	//Make sure these values are proportional to the gameWidth and gameHeight            
    	this.game.scale.pageAlignHorizontally = true;            
    	this.game.scale.pageAlignVertically = true;            
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