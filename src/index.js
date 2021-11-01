

import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH*.1, y: HEIGHT*.5};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const config = {
  //WebGL
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    //Arcade physics plug
    default: 'arcade',
    arcade: {
      
    },
    
  },
    scene: [ new PlayScene(SHARED_CONFIG)],
}

new Phaser.Game(config);

