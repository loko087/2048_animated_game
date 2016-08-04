
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.stage.backgroundColor = '57407c';

    this.title = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-50,'title');
    this.title.anchor.setTo(0.5,0.5);
    this.title.scale.setTo(0.8,0.8);

    this.startButton = this.game.add.button(this.game.world.centerX,this.game.world.centerY+50,'startButton', this.startButton, this);
    this.startButton.anchor.setTo(0.5,0.5);

    this.title.animations.add('waving');
    this.title.animations.play('waving',24,true);

    // jump to play stage for development
    // this.game.state.start('gameover');

  },
  update: function() {
    
  },
  startButton: function() {
  	// start play state
  	this.game.state.start('play');
  }
};

module.exports = Menu;
