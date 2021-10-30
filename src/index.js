

import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';



const config = {
  //WebGL
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    //Arcade physics plug
    default: 'arcade',
    arcade: {
      
    },
    
  },
    scene: [PlayScene]
}


let bird = null;
let pipes = null;
let pipeHorizontalDistance = 0;


const VELOCITY = 200;
const PIPES_TO_RENDER = 4;
const flapVelocity = 250;
const initialBirdPosition = {x: config.width /10, y: config.height /2}; 
const pipeVerticalDistanceRange = [100, 250];
const pipeHorizontalDistanceRange = [450, 550];


//Loading assets
function preload() {
  this.load.image('sky', 'assets/sky.png')
  this.load.image('bird', 'assets/bird.png')
  this.load.image('pipe', 'assets/pipe.png')
}


// Init objects
function create() {
  this.add.image(0, 0, 'sky').setOrigin(0,0);
  bird =  this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();

  for(let i = 0; i < PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0,1);
    const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0);
    
    placePipe(upperPipe, lowerPipe)
  }

    pipes.setVelocityX(-200);


  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);


}

//Parameters for out of bounds/lost the game. (Damn... I lost the game.)
function update(time, delta) {

 if (bird.y > config.height || bird.y < -bird.height) {
   restartBirdPostion();
   bird.body.velocity.y = 0;
 }

 recyclePipes();
}

function placePipe(uPipe, lPipe) {
   
    const rightMostX = getRightMostPipe();
    let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    let pipeVerticalPosition = Phaser.Math.Between(0 +  20, config.height - 20 - pipeVerticalDistance); 
    let pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
}

function recyclePipes() {
  const tempPipes = [];
    pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right <= 0) {
          //recycle pipe
          tempPipes.push(pipe);
          if(tempPipes.length === 2) {
            placePipe(...tempPipes);
          }
      }
    })
}

function getRightMostPipe() {
    let rightMostX = 0;

    pipes.getChildren().forEach(function(pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    })
    return rightMostX;
}

// Restart
function restartBirdPostion() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);

