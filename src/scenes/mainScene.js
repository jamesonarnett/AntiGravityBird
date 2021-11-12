import Phaser from 'phaser';
import BaseScene from './BaseScene';
import { config } from 'process';

class MainScene extends BaseScene {

    constructor(config) {
        super('MainScene', config);
       
    }

    create() {
    super.create();
    this.scene.start('PlayScene');
        
       
    }

}

export default MainScene
