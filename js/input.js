const Input = {
    keys: {},
    justPressed: {},

    init() {
        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.code]) {
                this.justPressed[e.code] = true;
            }
            this.keys[e.code] = true;
            if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    },

    isDown(code) {
        return !!this.keys[code];
    },

    wasPressed(code) {
        return !!this.justPressed[code];
    },

    consumePress(code) {
        if (this.justPressed[code]) {
            this.justPressed[code] = false;
            return true;
        }
        return false;
    },

    clearJustPressed() {
        this.justPressed = {};
    },

    left()  { return this.isDown('ArrowLeft')  || this.isDown('KeyA'); },
    right() { return this.isDown('ArrowRight') || this.isDown('KeyD'); },
    up()    { return this.isDown('ArrowUp')    || this.isDown('KeyW'); },
    jump()  { return this.consumePress('Space') || this.consumePress('ArrowUp') || this.consumePress('KeyW'); },
    enter() { return this.consumePress('Enter'); },
    pause() { return this.consumePress('KeyP'); },
    escape(){ return this.consumePress('Escape'); },
};
