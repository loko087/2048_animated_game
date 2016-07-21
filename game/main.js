'use strict';

//global variables
window.onload = function () {
	var targetWidth = 428;
    var targetHeight= 428;
    var deviceRatio = (window.innerWidth/window.innerHeight);
    var newRatio 	= (targetHeight/targetWidth)*deviceRatio;
    var newWidth 	= targetWidth;
	var newHeight 	= targetHeight;
	var gameWidth 	= newWidth;
	var gameHeight 	= newHeight;

	var game = new Phaser.Game(gameWidth,gameHeight, Phaser.AUTO, 'phaser');

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('gameover', require('./states/gameover'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));


	game.state.start('play');
};