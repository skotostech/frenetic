export default (() => {
    class Map {
        mapSegments = [];
        context = undefined;
        element = undefined;

        constructor(selector) {
            this.element = document.querySelector(selector);
            if (this.element === null) {
                throw 'Could not find target element.';
            }
            this.context = this.element.getContext('2d');
        }

        get center() {
            return {
                x: parseInt(this.element.width / 2),
                y: parseInt(this.element.height / 2)
            };
        }

        drawMap(data) {
            this.mapSegments = data ? data.match(new RegExp(/[-\w]+,[-\w]+,[-\w]+,[#\w]+,[-\w.]+/g)) : this.mapSegments;
            this.context.clearRect(0, 0, this.element.width, this.element.height);
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.element.width, this.element.height);

            this.mapSegments.forEach(item => {
                let parts = item.split(',');
                this.context.fillStyle = parts[3];
                let size = parseInt(parts[2]) - 2;
                this.context.fillRect(parseInt(parts[0]) + this.center.x, parseInt(parts[1]) + this.center.y, size, size);
            });
        }

        drawLinks(data) {
            // TODO I believe the links can be a separate canvas layer to make this unnecessary.
            this.drawMap();
            data.match(new RegExp(/[-\d]+,[-\d]+,[\w]+,[10]+/g)).forEach(link => {
                let parts = link.split(',');

                this.context.lineWidth = 3;
                this.context.strokeStyle = parts[3] === '1' ? 'blue' : 'black';
                this.context.beginPath();
                let lineCenter = {
                    x: this.center.x + parseInt(parts[0]),
                    y: this.center.y + parseInt(parts[1])
                };

                switch (parts[2]) {
                    case 'hor':
                        this.context.moveTo(lineCenter.x - 5, lineCenter.y);
                        this.context.lineTo(lineCenter.x + 5, lineCenter.y);
                        break;
                    case 'ver':
                        this.context.moveTo(lineCenter.x, lineCenter.y - 5);
                        this.context.lineTo(lineCenter.x, lineCenter.y + 5);
                        break;
                    case 'se':
                    case 'nw':
                        this.context.moveTo(lineCenter.x - 3, lineCenter.y - 4);
                        this.context.lineTo(lineCenter.x + 3, lineCenter.y + 4);
                        break;
                    case 'ne':
                    case 'sw':
                        this.context.moveTo(lineCenter.x - 3, lineCenter.y + 4);
                        this.context.lineTo(lineCenter.x + 3, lineCenter.y - 4);
                        break;
                }

                this.context.stroke();
            });
        }
    }

    return Map;
})();

