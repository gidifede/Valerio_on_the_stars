const Camera = {
    x: 0,
    y: 0,
    worldW: 0,
    worldH: 0,
    shakeTimer: 0,
    shakeIntensity: 0,
    shakeDuration: 0,

    init(worldW, worldH) {
        this.worldW = worldW;
        this.worldH = worldH;
        this.x = 0;
        this.y = 0;
        this.shakeTimer = 0;
        this.shakeIntensity = 0;
        this.shakeDuration = 0;
        this._initialized = false;
    },

    shake(intensity, duration) {
        this.shakeIntensity = intensity;
        this.shakeDuration = duration;
        this.shakeTimer = duration;
    },

    follow(targetX, targetY, dt) {
        // Target position (center on player)
        const tx = targetX - CANVAS_W / 2;
        const ty = targetY - CANVAS_H / 2;

        if (!this._initialized) {
            // First frame: snap directly to avoid lerp from (0,0)
            this.x = tx;
            this.y = ty;
            this._initialized = true;
        } else {
            // Smooth lerp follow
            const speed = 8;
            this.x += (tx - this.x) * speed * dt;
            this.y += (ty - this.y) * speed * dt;
        }

        // Clamp to world bounds
        this.x = clamp(this.x, 0, Math.max(0, this.worldW - CANVAS_W));
        this.y = clamp(this.y, 0, Math.max(0, this.worldH - CANVAS_H));

        // Screen shake
        if (this.shakeTimer > 0 && dt) {
            this.shakeTimer -= dt;
            const factor = this.shakeTimer / this.shakeDuration;
            const ox = (Math.random() - 0.5) * this.shakeIntensity * factor * 2;
            const oy = (Math.random() - 0.5) * this.shakeIntensity * factor * 2;
            this.x += ox;
            this.y += oy;
        }
    },
};
