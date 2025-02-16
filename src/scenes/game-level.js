import {Scene} from "./scene";
import {SpriteSheet} from "../sprite-sheet";
import {CharacterSheet} from "../character-sheet";

export class GameLevel extends Scene {
    constructor(game) {
        super(game);
        this.tiles = new SpriteSheet({
            imageName: 'tile',
            imageWidth: 640,
            imageHeight: 640,
        });

        // this.stone = this.tiles.getSprite(9);
        // this.stone.setXY(10, 10);
        this.orcTiles = new CharacterSheet({imageName: 'orc'});

        this.orc = this.orcTiles.getAnimation('walk_right');
       // this.orc = this.orcTiles.getAnimation([25,25,25], 300);
        this.orc.setXY(10, 340);
    }

    init() {
        super.init();
        const mapData = require('../maps/level1.json');
        this.map = this.game.screen.createMap('level1', mapData, this.tiles)
    }
    update(time) {
        this.orc.update(time);
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        this.game.screen.drawSprite(this.map);
        //this.game.screen.drawSprite(this.stone);
        this.game.screen.drawSprite(this.orc);
        super.render(time);
    }
}
