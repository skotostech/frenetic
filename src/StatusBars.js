export default (() => {
    class StatusBars {
        status = {
            health: {
                value: 100,
                color: '#ff0000',
                tag: 'H'
            },
            fatigue: {
                value: 100,
                color: '#ffff00',
                tag: 'F'
            },
            encumbrance: {
                value: 100,
                color: '#00ffff',
                tag: 'E'
            },
            satiation: {
                value: 100,
                color: '#00ff00',
                tag: 'S'
            },
        };
        context = undefined;
        element = undefined;

        constructor(selector) {
            this.element = document.querySelector(selector);
            if (this.element === null) {
                throw 'Could not find target element.';
            }
            this.context = this.element.getContext('2d');
        }

        update = function () {
            this.context.clearRect(0, 0, this.element.width, this.element.height);
            let barWidth = this.element.width / 4;
            let barNumber = 0;

            for (let bar in this.status) {
                this.context.fillStyle = this.status[bar].color;
                let barHeight = (this.status[bar].value / 100) * this.element.height;
                this.context.fillRect((barWidth * barNumber) + 5, this.element.height, barWidth, -barHeight);
                this.context.fillStyle = 'black';
                this.context.font = (barWidth / 2) + 'px sans-serif';
                this.context.fillText(this.status[bar].tag, (barWidth * barNumber) + (barWidth / 2) - (barWidth / 8), this.element.height - 5);
                barNumber++;
            }
        };

        barValue(bar, value) {
            this.status[bar].value = value;
            this.update();
        };
    }

    return StatusBars;
})();
