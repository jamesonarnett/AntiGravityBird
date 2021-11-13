

import Phaser, { Scene } from 'phaser';
import MainScene from './scenes/mainScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';
import ScoreScene from './scenes/ScoreScene';
import PauseScene from './scenes/PauseScene';

const WIDTH = 400;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH*.1, y: HEIGHT*.5};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const Scenes = [PreloadScene, MainScene, PlayScene, ScoreScene, PauseScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);


const config = {
  //WebGL
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    //Arcade physics plug
    default: 'arcade',
    arcade: {
      
    },
    
  },
    scene: initScenes()
}

new Phaser.Game(config);

