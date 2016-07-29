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
  	// start play state
  	this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {
    this.init();
    this.tileSize = 107;
    this.tileSprites;
    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;
    this.backgroundColor  = '57407c';
    this.font             = "flappyfont";
    this.scoreString      = "SCORE \n";
    
    // variables used to detect and manage swipes
    this.startX, this.startY, this.endX, this.endY;
  }
  Play.prototype = {
    preload: function() {
      
    },
    create: function() {
      this.tileSpriteY      = this.game.width*1/3;
      // background color
      this.game.stage.backgroundColor  = this.backgroundColor;

      this.waveone = this.game.add.sprite(this.game.width/2,120, 'waveone');
      this.waveone.anchor.setTo(0.5,0.5);

      // this.wavetwo = this.game.add.sprite(this.game.width/2,592, 'wavetwo');
      // this.wavetwo.anchor.setTo(0.5,0.5);

      // add text      
      this.scoreText = this.game.add.bitmapText(this.game.width*3/4,60,"flappyfont",this.scoreString + this.score.toString(),24);
      this.scoreText.align = 'center';
      this.scoreText.anchor.setTo(0.5,0.5);

      // declare group of tiles
      var tileSize = window.innerWidth/4;
      this.tileSprites = this.game.add.group();
      this.tileSprites.align(4,4,tileSize,tileSize, Phaser.CENTER);

      this.tileSprites.x = 0;
      this.tileSprites.y = this.tileSpriteY;

      this.addTwo();
      this.addTwo();

      // audio added
      this.scoreSound = this.game.add.audio('score');

      this.replayButton = this.game.add.button(this.game.width*1/4,60,'replayButton', this.newGame, this);
      this.replayButton.anchor.setTo(0.5,0.5);

      this.game.input.onDown.add(this.beginSwipe, this);
    },
    update: function() {
      	
      	// if (this.game.device.desktop) {
	      // listeners for WASD keys
		this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.upKey.onDown.add(this.moveUp,this);

		this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.downKey.onDown.add(this.moveDown,this);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.leftKey.onDown.add(this.moveLeft,this);

		this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.rightKey.onDown.add(this.moveRight,this);

		// once the level has been created, we wait for the player to touch or click, then we call
		// beginSwipe function
		this.game.input.onDown.add(this.beginSwipe, this);
    },
    beginSwipe: function() {
    	console.log('swipe')
    	var self = this;
    	self.startX = self.game.input.worldX;
    	self.startY = self.game.input.worldY;

    	self.game.input.onDown.remove(self.beginSwipe, this);
    	self.game.input.onUp.add(self.endSwipe, this);
    },
    endSwipe: function() {
    	var self = this;
    	
    	// saving mouse/finger coordinates
    	self.endX = self.game.input.worldX;
    	self.endY = self.game.input.worldY;

    	//detect distance of begin/end of x/y
    	var distX = self.endX - self.startX;
    	var distY = self.endY - self.startY;

    	// horizontal swipe
    	// x distance is at least twice the y distance 
    	// and the amount of horizontal distance is at least 10 pixels
    	if (Math.abs(distX) > Math.abs(distY)*2 && Math.abs(distX) > 10) {
    		(distX > 0) ? self.moveRight():self.moveLeft();
    	}

    	// vertical swipe
    	if (Math.abs(distY) > Math.abs(distX)*2 && Math.abs(distY) > 10) {
    		(distY > 0) ? self.moveDown():self.moveUp();
    	}

    	self.game.input.onDown.add(self.beginSwipe, self);
    	self.game.input.onUp.remove(self.endSwipe, self);
    },
    init: function() {
      this.fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
      this.score= 0;
      this.canMove  = false;
    },
    newGame: function() {
      this.init();
      this.game.state.start('play');
    },

    victory: function() {

      this.tileSprites.destroy();

      this.won = this.game.add.sprite(0,this.tileSpriteY,'2048');
      this.won.animations.add('victory');
      this.won.animations.play('victory',24,true);
      this.won.scale.setTo(428/500,428/500);

    },
    gameOver: function() {
      this.canMove = false;
      this.tileSprites.destroy();
      
      this.lost = this.game.add.sprite(0,this.tileSpriteY,'gameover');
      this.lost.animations.add('gameover');
      this.lost.animations.play('gameover',24,true);
      this.lost.scale.setTo(428/500,428/500);

      console.log("Game Over");
      
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
      console.log(this.fieldArray)
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
    tileAvailable: function() {
      var self = this;
      var avai = false;

      self.fieldArray.forEach(function(item) {
        if (item == 0) {
          avai = true;
          return avai;
        }
      })

      return avai;
    },

    tileMatchesAvailable: function() {

      var self = this;
      var size = self.fieldArray.length;
      var tilePerRow = 4;
      var left, right, top, bottom;
      var checkPos = [-1,1,-4,4];
      var match    = true;

      for (var i = 0; i < size; i++) {
        for (var j = 0; j < checkPos.length; j++) {
          var pos = checkPos[j] +  i;
          if ( pos > 0 ) {
            
            if ((self.fieldArray[i] == self.fieldArray[pos])) {
              match = false;
              return;
            } 
            
          }
        }
      }

      return match;
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

      console.log(self.tileAvailable())
      if (!self.tileAvailable()) {
        if (!self.tileMatchesAvailable()) self.gameOver();
      }
    }
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

'use strict';

function Preload() {
  this.asset = null;
  this.ready = false;
  this.backgroundColor = '57407C';
}

Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.game.add.sprite(this.game.width/2,this.game.height/2,'preloader');
    this.asset.anchor.setTo(0.5,0.5);
    this.game.load.setPreloadSprite(this.asset);

    this.load.image('waveone','assets/waves.gif');
    this.load.image('wavetwo','assets/waves.gif');
    this.load.image('background','assets/background.png');
    this.load.image('startButton','assets/start-button.png');
    this.load.image('replayButton','assets/replay-button.png');
    
    this.load.spritesheet('title','assets/title.png',500,115,50);
    this.load.spritesheet('2048','assets/2048.png',500,500,121);
    this.load.spritesheet('gameover','assets/game-over.png',500,500,98);

    this.load.spritesheet('tile','assets/tilesprite.png',107,107);

    this.load.bitmapFont('flappyfont','assets/fonts/flappyfont/flappyfont.png','assets/fonts/flappyfont/flappyfont.fnt');
  
    // loading audio files
    this.load.audio('score', 'assets/score.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
    this.game.stage.backgroundColor  = this.backgroundColor;

    this.asset.animations.add('loading');
    this.asset.animations.play('loading',10,true);
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
