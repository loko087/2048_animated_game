'use strict';

//global variables
window.onload = function () {
<<<<<<< HEAD
	var gameWidth = 428;
    var gameHeight= 600;
=======
	var targetWidth = 428;
    var targetHeight= 428;
    var deviceRatio = (window.innerWidth/window.innerHeight);
    var newRatio 	= (targetHeight/targetWidth)*deviceRatio;
    var newWidth 	= targetWidth;
	var newHeight 	= targetHeight;
	var gameWidth 	= newWidth;
	var gameHeight 	= newHeight;

>>>>>>> e9983492c2e33ecd08687fd1404193961b91c42c
	var game = new Phaser.Game(gameWidth,gameHeight, Phaser.AUTO, 'phaser');

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('gameover', require('./states/gameover'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));
	game.state.start('boot');
};