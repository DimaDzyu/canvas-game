import { Scene } from "./scene";

export class Loading extends Scene
{
    constructor(game) {
        super(game);
        this.loadeAt = 0;
    }

    init() {
        super.init();
        this.loadeAt = 0;
    }

    update(time) {
        if (this.loadeAt === 0 && this.game.screen.isImagesLoaded === true) {
            this.loadeAt = time;
        }

        if (this.loadeAt !== 0 && (time - this.loadeAt) > 500) {
            this.finish(Scene.LOADED);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.fill('#000000');
        this.game.screen.print(50, 70, 'Loading ...');
        super.render(time);
    }
}
