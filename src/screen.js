import {ImageLoader} from "./image-loader";
import {TileMap} from "./tile-map";

export class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.canvas = this.createCanvas(width, height);
        this.context = this.canvas.getContext('2d');
        this.images = {};
        this.isImagesLoaded = false;
    }

    loadImages(imageFiles) {
        const loader = new ImageLoader(imageFiles);
        loader.load().then((names) => {
            this.images = Object.assign(this.images, loader.images);
            this.isImagesLoaded = true;
            console.log(names);
        });
    }

    createCanvas(width, height) {
        let elements = document.getElementsByTagName('canvas');
        let canvas = elements[0] || document.createElement('canvas');

        document.body.appendChild(canvas);
        canvas.width = width;
        canvas.height = height;

        return canvas;
    }

    createMap(name, mapData, tileset) {
        const mapImage = document.createElement('canvas');
        mapImage.width = mapData.width * mapData.tilewidth;
        mapImage.height = mapData.height * mapData.tileheight;
        const mapContext = mapImage.getContext('2d');
        const hitboxes = [];
        let row, col;
        mapData.layers.forEach(layer => {
            if (layer.type === 'tilelayer') {
                row = 0;
                col = 0;
                layer.data.forEach((index) => {
                    if (index > 0) {
                        mapContext.drawImage(this.images[tileset.imageName],
                            tileset.getSourceX(index), tileset.getSourceY(index),
                            mapData.tilewidth, mapData.tileheight,
                            col * mapData.tilewidth, row * mapData.tileheight,
                            mapData.tilewidth, mapData.tileheight
                        );
                    }

                    col++;

                    if(col > (mapData.width - 1)) {
                        col = 0;
                        row++;
                    }
                });
            }

            if (layer.type === 'objectgroup') {
                hitboxes.push(...layer.objects.map(obj => ({x1: obj.x, x2: obj.x + obj.width,
                    y1: obj.y, y2: obj.y + obj.height})));
            }
        });

        this.images[name] = mapImage;
        return new TileMap({
            imageName: name,
            sourceX: 0,
            sourceY: 0,
            width: mapImage.width,
            height: mapImage.height,
            hitboxes: hitboxes
        });
    }

    fill(color) {
        this.context.fillStyle = color;
        this.context.fillRect(0, 0, this.width, this.height);
    }

    print(x, y, text) {
        this.context.fillStyle = '#FFFFFF';
        this.context.font = '22px Georgia';
        this.context.fillText(text, x, y);
    }

    drawImage(x, y, imageName) {
        this.context.drawImage(this.images[imageName], x, y)
    }

    drawSprite(sprite) {
        this.context.drawImage(
            this.images[sprite.imageName],
            sprite.sourceX,
            sprite.sourceY,
            sprite.width,
            sprite.height,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height
        );
    }
}
