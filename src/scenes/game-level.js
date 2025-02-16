import {Scene} from "./scene";
import {SpriteSheet} from "../sprite-sheet";

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
        this.orcTiles = new SpriteSheet({
            imageName: 'orc',
            imageWidth: 1664,
            imageHeight: 4992
        });

        this.orc = this.orcTiles.getAnimation([1,2,3,4,5,6,7], 300);
        this.orc.setXY(1, 3);


    }

    init() {
        super.init();
    }
    update(time) {
        this.orc.update(time);
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        //this.game.screen.drawSprite(this.stone);
        this.game.screen.drawSprite(this.orc);
        super.render(time);
    }
}
