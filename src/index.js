

import Phaser, { Scene } from 'phaser';
import MainScene from './scenes/mainScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH*.1, y: HEIGHT*.5};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const Scenes = [PreloadScene, MainScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);


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
    scene: initScenes()
}

new Phaser.Game(config);

