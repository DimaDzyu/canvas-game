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

        this.playerTiles = new CharacterSheet({imageName: 'player'});
        this.player = this.playerTiles.getAnimation('thrust_left');
        this.player.setXY(353, 340);

        this.orcTiles = new CharacterSheet({imageName: 'orc'});
        this.orc = this.orcTiles.getAnimation('protection_right');
        this.orc.setXY(310, 340);

        this.orcTiles2 = new CharacterSheet({imageName: 'orc'});
        this.orc2 = this.orcTiles2.getAnimation('walk_right');
        this.orc2.setXY(10, 320);

        this.orcTiles3 = new CharacterSheet({imageName: 'orc'});
        this.orc3 = this.orcTiles3.getAnimation('walk_right');
        this.orc3.setXY(80, 360);
    }

    init() {
        super.init();
        const mapData = require('../maps/level1.json');
        this.map = this.game.screen.createMap('level1', mapData, this.tiles)
    }
    update(time) {
        this.orc.update(time);
        this.orc2.update(time);
        this.orc3.update(time);
        this.player.update(time);
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        this.game.screen.drawSprite(this.map);
        //this.game.screen.drawSprite(this.stone);
        this.game.screen.drawSprite(this.orc);
        this.game.screen.drawSprite(this.orc2);
        this.game.screen.drawSprite(this.orc3);
        this.game.screen.drawSprite(this.player);
        super.render(time);
    }
}
