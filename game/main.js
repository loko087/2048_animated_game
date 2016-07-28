'use strict';

//global variables
window.onload = function () {
	var gameWidth = 428;
	var gameHeight= 650;
	var game = new Phaser.Game(gameWidth,gameHeight, Phaser.AUTO, 'phaser');

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('gameover', require('./states/gameover'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));
	game.state.start('boot');
};