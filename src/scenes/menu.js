import {Scene} from "./scene";

export class Menu extends Scene {
    constructor(game) {
        super(game);
    }

    init() {
        super.init();
    }

    update() {
        if (this.game.control.fire) {
            this.finish(Scene.START_GAME);
        }
    }

    render(time) {
        this.update(time);
        this.game.screen.drawImage(0, 0, 'title');
        this.game.screen.print(250, 500, 'Press space');
        super.render(time);
    }
}
