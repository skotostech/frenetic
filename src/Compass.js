export default (() => {
    class Compass {
        context = undefined;
        element = undefined;

        constructor(selector) {
            this.element = document.querySelector(selector);
            if (this.element === null) {
                throw 'Could not find target element.';
            }
            this.context = this.element.getContext('2d');
        }

        compass = {
            n: 'none',
            s: 'none',
            e: 'none',
            w: 'none',
            ne: 'none',
            se: 'none',
            sw: 'none',
            nw: 'none',
            d: 'none',
            u: 'none',
        };

        update() {
            this.element.width = this.element.parentNode.getBoundingClientRect().width;
            let drawWidth = this.element.width / 3;
            let drawHeight = this.element.height / 3;

            // TODO Calculate inner vertices to more easily fill and draw these portions.
            this.context.fillStyle = this.compass.nw === 'show' ? 'green' : 'grey';
            this.context.fillRect(0, 0, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.w === 'show' ? 'green' : 'grey';
            this.context.fillRect(0, drawHeight, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.sw === 'show' ? 'green' : 'grey';
            this.context.fillRect(0, drawHeight * 2, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.s === 'show' ? 'green' : 'grey';
            this.context.fillRect(drawWidth, drawHeight * 2, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.se === 'show' ? 'green' : 'grey';
            this.context.fillRect(drawWidth * 2, drawHeight * 2, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.e === 'show' ? 'green' : 'grey';
            this.context.fillRect(drawWidth * 2, drawHeight, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.ne === 'show' ? 'green' : 'grey';
            this.context.fillRect(drawWidth * 2, 0, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.n === 'show' ? 'green' : 'grey';
            this.context.fillRect(drawWidth, 0, drawWidth, drawHeight);
            this.context.fillStyle = this.compass.d === 'show' ? 'green' : 'grey';
            this.context.beginPath();
            this.context.moveTo(drawWidth, drawHeight * 2);
            this.context.lineTo(drawWidth * 2, drawHeight);
            this.context.lineTo(drawWidth * 2, drawHeight * 2);
            this.context.closePath();
            this.context.fill();
            this.context.fillStyle = this.compass.u === 'show' ? 'green' : 'grey';
            this.context.beginPath();
            this.context.moveTo(drawWidth, drawHeight * 2);
            this.context.lineTo(drawWidth * 2, drawHeight);
            this.context.lineTo(drawWidth, drawHeight);
            this.context.closePath();
            this.context.fill();

            this.context.strokeStyle = 'black';
            this.context.lineWidth = 2;
            this.context.beginPath();
            // Draw vertical lines
            this.context.moveTo(1, 1);
            this.context.lineTo(1, this.element.height);
            this.context.moveTo(drawWidth, 1);
            this.context.lineTo(drawWidth, this.element.height);
            this.context.moveTo(drawWidth * 2, 1);
            this.context.lineTo(drawWidth * 2, this.element.height);
            this.context.moveTo(this.element.width, 1);
            this.context.lineTo(this.element.width, this.element.height);
            // Draw horizontal lines
            this.context.moveTo(1, 1);
            this.context.lineTo(this.element.width, 1);
            this.context.moveTo(1, drawHeight);
            this.context.lineTo(this.element.width, drawHeight);
            this.context.moveTo(1, drawHeight * 2);
            this.context.lineTo(this.element.width, drawHeight * 2);
            this.context.moveTo(1, this.element.height);
            this.context.lineTo(this.element.width, this.element.height);
            this.context.moveTo(drawWidth, drawHeight * 2);
            this.context.lineTo(drawWidth * 2, drawHeight);
            this.context.stroke();
        };

        dim(direction) {
            this.compass[direction] = 'none';
            this.update();
        };

        light(direction) {
            this.compass[direction] = 'show';
            this.update();
        };
    }
    
    return Compass;
})();
