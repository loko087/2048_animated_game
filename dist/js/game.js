(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
	var gameWidth = 428;
	var gameHeight= window.innerHeight;
	var game = new Phaser.Game(gameWidth,gameHeight, Phaser.AUTO, 'phaser');

	// Game States
	game.state.add('boot', require('./states/boot'));
	game.state.add('gameover', require('./states/gameover'));
	game.state.add('menu', require('./states/menu'));
	game.state.add('play', require('./states/play'));
	game.state.add('preload', require('./states/preload'));
	game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){
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
  }
};

module.exports = Boot;
},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

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
    this.game.state.start('play');
  },
  update: function() {
    
  },
  startButton: function() {
  	console.log('ssd')
  	// start play state
  	this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {
    this.fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    this.tileSize = 107;
    this.canMove  = false;
    this.tileSprites;
    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;
    this.backgroundColor = '57407c';
    this.font = "flappyfont";
    this.score= 0;
    this.scoreString = "SCORE \n";
  }
  Play.prototype = {
    preload: function() {
      
    },
    create: function() {

      // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      // this.scale.pageAlignHorizontally = true;
      // this.scale.pageAlignVertically = true;
      // this.scale.forcePortrait = true;
      // this.scale.updateLayout(true);
      
      // background color
      this.game.stage.backgroundColor  = this.backgroundColor;

      // add text      
      this.scoreText = this.game.add.bitmapText(this.game.width/2,60,"flappyfont",this.scoreString + this.score.toString(),24);
      this.scoreText.align = 'center';
      this.scoreText.anchor.setTo(0.5,0.5);

      // declare group of tiles
      this.tileSprites = this.game.add.group();
      this.tileSprites.align(4,4,this.tileSize, this.tileSize, Phaser.CENTER);

      this.tileSprites.x = 0;
      this.tileSprites.y = 120;

      this.addTwo();
      this.addTwo();

      // audio added
      this.scoreSound = this.game.add.audio('score');
    },
    update: function() {
      
      // listeners for WASD keys
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
      this.upKey.onDown.add(this.moveUp,this);

      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
      this.downKey.onDown.add(this.moveDown,this);

      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
      this.leftKey.onDown.add(this.moveLeft,this);

      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
      this.rightKey.onDown.add(this.moveRight,this);
    },
    victory: function() {

      this.tileSprites.destroy();

      this.won = this.game.add.sprite(0,120,'2048');
      this.won.animations.add('victory');
      this.won.animations.play('victory',24,true);
      this.won.scale.setTo(428/500,428/500);

    },
    moveUp: function() {
      var self = this;
      if (self.canMove) {

        self.canMove  = false;
        var moved     = false;

        self.tileSprites.sort("y",Phaser.Group.SORT_ASCENDING);
        self.tileSprites.forEach(function(item) {
          var row = self.toRow(item.pos);
          var col = self.toCol(item.pos);

          if(row>0){  
            var remove=false;
            for(var i=row-1;i>=0;i--){
              if(self.fieldArray[i*4+col]!=0){
                if(self.fieldArray[i*4+col]== self.fieldArray[row*4+col]){
                  remove = true;
                  i--;                                             
                }
                break
              }
            }
            if(row!=i+1){
             moved=true;
             self.moveTile(item,row*4+col,(i+1)*4+col,remove);
           }
         }


        })

        self.endMove(moved);
      }
    },
    moveDown: function() {
      var self = this;
      if (self.canMove) {
        self.canMove = false;
        var moved        = false;

        self.tileSprites.sort("y", Phaser.Group.SORT_DESCENDING);
        self.tileSprites.forEach(function(item) {
          var row = self.toRow(item.pos);
          var col = self.toCol(item.pos);

          if (row < 3) {
            var remove = false;
            for (var i = row+1; i <=3; i++) {
              if (self.fieldArray[i*4+col]!= 0) {
                if (self.fieldArray[i*4+col] == self.fieldArray[row*4+col]) {
                  remove = true;
                  i++;
                }
                break;
              }
            }
            if (row != i-1) {
              moved = true;
              self.moveTile(item, row*4+col,(i-1)*4+col,remove);
            }
          }
        })
        self.endMove(moved);
      }
    },
    moveLeft: function() {
      var self = this;
      if (self.canMove) {
        self.canMove = false;
        var moved    = false;

        self.tileSprites.sort("x", Phaser.Group.SORT_ASCENDING);
        self.tileSprites.forEach(function(item) {
          var row = self.toRow(item.pos);
          var col = self.toCol(item.pos);

          if (col > 0) {
            var remove = false;
            for(var i = col-1; i >= 0; i--) {
              if (self.fieldArray[row*4+i]!= 0) {
                if (self.fieldArray[row*4+i] == self.fieldArray[row*4+col] ) {
                  remove = true;
                  i--;
                }
                break;
              }
            }
            if (col != i + 1) {
              moved = true;
              self.moveTile(item,row*4+col,row*4+i+1,remove);
            }
          }
        })
        self.endMove(moved);
      }
    },
    moveRight: function() {
      var self = this;
      if (self.canMove) {
        self.canMove = false;
        var moved = false;

        self.tileSprites.sort("x",Phaser.Group.SORT_DESCENDING);
        self.tileSprites.forEach(function(item) {
          var row = self.toRow(item.pos);
          var col = self.toCol(item.pos);

          if (col < 3) {
            var remove = false;
            for (var i = col + 1; i <=3; i++) {
              if (self.fieldArray[row*4+i] != 0) {
                if (self.fieldArray[row*4+i] == self.fieldArray[row*4+col]) {
                  remove = true;
                  i++;
                }
                break;
              }
            }
            if (col != i-1) {
              moved = true;
              self.moveTile(item,row*4+col,row*4+i-1,remove);
            }
          }
        })
        self.endMove(moved);
      }
    },

    addTwo: function() {

      do {
        var randomValue = Math.floor(Math.random()*16);
      } while(this.fieldArray[randomValue] != 0)

      var number = [2,4];

      this.fieldArray[randomValue] = number[this.game.rnd.integerInRange(0,1)];

      var tileSize = this.tileSize;
      var scale  = (this.world.width/4/this.tileSize);
      var tile   = this.add.sprite(this.toCol(randomValue)*tileSize,this.toRow(randomValue)*tileSize,'tile');
      
      tile.pos   = randomValue;
      tile.alpha = 0;
      tile.frame = 624;
      console.log(scale)
      tile.scale.setTo(1,1);

      var two         = this.createTileList(1,39);
      var four        = this.createTileList(40,79);
      var eight       = this.createTileList(120,68);
      var sixteen     = this.createTileList(189,29);
      var thirtytwo   = this.createTileList(219,62);
      var sixtyfour   = this.createTileList(282,74);
      var onetwoeight = this.createTileList(357,88);
      var twofivesix  = this.createTileList(446,59);
      var fiveonetwo  = this.createTileList(506,25);
      var onethousand = this.createTileList(532,92);

      tile.animations.add('two',two,24,true);
      tile.animations.add('four',four,24,true);
      tile.animations.add('eight',eight,24,true);
      tile.animations.add('sixteen',sixteen,15,true);
      tile.animations.add('thirtytwo',thirtytwo,24,true);
      tile.animations.add('sixtyfour',sixtyfour,24,true);
      tile.animations.add('onetwoeight',onetwoeight,24,true);
      tile.animations.add('twofivesix',twofivesix,24,true);
      tile.animations.add('fiveonetwo',fiveonetwo,15,true);
      tile.animations.add('onethousand',onethousand,24,true);
      
      this.tileSprites.add(tile);

      var fadeIn = this.add.tween(tile);
      var self   = this;
      fadeIn.to({alpha:1},250);

      fadeIn.onComplete.add(function(){
        self.updateNumbers();
        self.canMove = true;
      });
      fadeIn.start();
    },
    toRow: function(n) {
      return Math.floor(n/4);
    },
    toCol: function(n) {
      return n%4;
    },
    createTileList: function(start,number) {
      var tileArr = [];
      for (var i = 0; i < number; i++) {
        tileArr.push(start+i);
      }

      return tileArr;
    },
    // FUNCTION TO COMPLETE THE MOVE AND PLACE ANOTHER "2" IF WE CAN
    endMove: function(m){
      // if we move the tile...
      if(m){
        // add another "2"
        this.addTwo();
      } else{
        // otherwise just let the player be able to move again
        this.canMove=true;
      }
    },

    moveTile: function(tile,from, to, remove) {
      var self = this;

      // update position
      self.fieldArray[to]   = self.fieldArray[from];
      self.fieldArray[from] = 0;

      tile.pos = to;
      var movement = self.add.tween(tile);
      movement.to({x:self.tileSize*(self.toCol(to)),y:self.tileSize*(self.toRow(to))},150);
      if (remove) {
        self.fieldArray[to]*=2;

        movement.onComplete.add(function(){
          tile.destroy();
          self.checkScore(self.fieldArray[to]);
        });
      }

      movement.start();
    },
    checkScore: function(score) {
      this.score = this.score + score;
      this.scoreText.setText(this.scoreString + this.score.toString());
      this.scoreSound.play();
    },
    updateNumbers: function() {
      var self = this;

      self.tileSprites.forEach(function(item) {
        var value = self.fieldArray[item.pos];

        if (value == 2048) {
          self.victory();
          return;
        }

        switch(value) {
          case 4:
            item.play('four');
            break;
          case 8:
            item.play('eight');
            break;

          case 16:
            item.play('sixteen');
            break;

          case 32:
            item.play('thirtytwo');
            break;

          case 64:
            item.play('sixtyfour');
            break;

          case 128:
            item.play('onetwoeight');
            break;

          case 256:
            item.play('twofivesix');
            break;

          case 512:
            item.play('fiveonetwo');
            break;

          case 1024:
            item.play('onethousand');
            break;

          default:
            item.play('two');
            break;
        }
        //item.text = value;
      })
    }
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

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

    this.load.image('startButton','assets/start-button.png');
    
    this.load.spritesheet('title','assets/title.png',500,115,50);
    this.load.spritesheet('2048','assets/2048.png',500,500,121);

    this.load.spritesheet('tile','assets/tilesprite.png',107,107);

    this.load.bitmapFont('flappyfont','assets/fonts/flappyfont/flappyfont.png','assets/fonts/flappyfont/flappyfont.fnt');
  
    // loading audio files
    this.load.audio('score', 'assets/score.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
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

},{}]},{},[1]);
