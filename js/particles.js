const Particles = {
    list: [],

    init() {
        this.list = [];
    },

    emit(x, y, count, color, speed) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = speed * (0.5 + Math.random() * 0.5);
            this.list.push({
                x, y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd - speed * 0.3,
                life: 0.6 + Math.random() * 0.4,
                maxLife: 0.6 + Math.random() * 0.4,
                color,
                size: 3 + Math.random() * 4,
            });
        }
    },

    update(dt) {
        for (let i = this.list.length - 1; i >= 0; i--) {
            const p = this.list[i];
            p.vx *= 0.98;
            p.vy += GRAVITY * 0.5 * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) {
                this.list.splice(i, 1);
            }
        }
    },

    draw(ctx) {
        for (const p of this.list) {
            const alpha = clamp(p.life / p.maxLife, 0, 1);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(
                Math.round(p.x - Camera.x),
                Math.round(p.y - Camera.y),
                p.size / 2, 0, Math.PI * 2
            );
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    },
};
