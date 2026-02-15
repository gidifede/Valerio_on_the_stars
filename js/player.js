const Player = {
    x: 0, y: 0,
    w: 40, h: 70,           // collision box (smaller than sprite)
    vx: 0, vy: 0,
    onGround: false,
    fellOffWorld: false,
    facingRight: true,
    speed: 250,
    jumpForce: -520,
    lives: 5,
    score: 0,
    starsCollected: 0,
    starsTotal: 3,
    legoCount: 0,

    // Double jump
    maxJumps: 1,        // 2 when salto_stellare active
    jumpsLeft: 1,

    // Animation
    anim: 'idle',
    animTimer: 0,
    animFrame: 0,

    // Invincibility
    invincible: false,
    invTimer: 0,
    blinkTimer: 0,

    // Checkpoint
    checkpointX: 0,
    checkpointY: 0,

    // Drawing offset (center sprite on collision box)
    drawOffX: -13,
    drawOffY: -22,

    // Water slowdown
    inWater: false,

    init(spawnX, spawnY) {
        this.x = spawnX;
        this.y = spawnY;
        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.fellOffWorld = false;
        this.facingRight = true;
        this.lives = 5;
        this.score = 0;
        this.starsCollected = 0;
        this.legoCount = 0;
        this.maxJumps = 1;
        this.jumpsLeft = 1;
        this.invincible = false;
        this.invTimer = 0;
        this.inWater = false;
        this.anim = 'idle';
        this.animTimer = 0;
        this.animFrame = 0;
        this.checkpointX = spawnX;
        this.checkpointY = spawnY;
    },

    update(dt) {
        // Check water/hazard at player feet
        this._checkEnvironment();

        // Horizontal movement
        const moveDir = (Input.right() ? 1 : 0) - (Input.left() ? 1 : 0);
        let currentSpeed = this.speed;
        if (this.inWater) currentSpeed *= 0.5;
        this.vx = moveDir * currentSpeed;
        if (moveDir !== 0) this.facingRight = moveDir > 0;

        // Jump (supports double jump with salto_stellare)
        if (Input.jump()) {
            if (this.onGround) {
                this.vy = this.jumpForce;
                this.onGround = false;
                this.jumpsLeft = this.maxJumps - 1;
            } else if (this.jumpsLeft > 0) {
                this.vy = this.jumpForce;
                this.jumpsLeft--;
            }
        }

        // Reset jumps when on ground
        if (this.onGround) {
            this.jumpsLeft = this.maxJumps;
        }

        // Physics (gravity may be modified by powerup)
        Physics.update(this, dt);

        // Fell off world
        if (this.fellOffWorld) {
            this.takeDamage();
            return;
        }

        // Clamp to left world edge
        if (this.x < 0) { this.x = 0; this.vx = 0; }

        // Animation
        this.updateAnimation(dt, moveDir);

        // Invincibility timer (skip if shield manages it)
        if (this.invincible && !(typeof Powerups !== 'undefined' && Powerups.isActive('scudo_robotico'))) {
            this.invTimer -= dt;
            this.blinkTimer += dt;
            if (this.invTimer <= 0) {
                this.invincible = false;
                this.invTimer = 0;
            }
        } else if (this.invincible) {
            this.blinkTimer += dt;
        }
    },

    _checkEnvironment() {
        // Check tiles at player's feet
        const feetRow = Math.floor((this.y + this.h) / TILE);
        const bodyRow = Math.floor((this.y + this.h / 2) / TILE);
        const leftCol = Math.floor(this.x / TILE);
        const rightCol = Math.floor((this.x + this.w - 1) / TILE);

        this.inWater = false;
        for (let col = leftCol; col <= rightCol; col++) {
            // Hazard check (spikes, lava)
            if (Tilemap.isHazard(col, feetRow) || Tilemap.isHazard(col, bodyRow)) {
                this.takeDamage();
                return;
            }
            // Water check
            if (Tilemap.isLiquid(col, feetRow) || Tilemap.isLiquid(col, bodyRow)) {
                const tile = Tilemap.getTile(col, feetRow) || Tilemap.getTile(col, bodyRow);
                if (tile === 'W' || tile === 'w') {
                    this.inWater = true;
                }
            }
        }
    },

    updateAnimation(dt, moveDir) {
        let newAnim = 'idle';
        if (!this.onGround) {
            newAnim = 'jump';
        } else if (moveDir !== 0) {
            newAnim = 'walk';
        }

        if (newAnim !== this.anim) {
            this.anim = newAnim;
            this.animFrame = 0;
            this.animTimer = 0;
        }

        const animDef = VALERIO[this.anim];
        if (!animDef) return;

        this.animTimer += dt;
        const frameDur = 1 / animDef.fps;
        if (this.animTimer >= frameDur) {
            this.animTimer -= frameDur;
            this.animFrame = (this.animFrame + 1) % animDef.count;
        }
    },

    takeDamage() {
        if (this.invincible) return;

        // Notify powerup system
        if (typeof Powerups !== 'undefined') Powerups.onPlayerDamage();

        this.lives--;
        Audio_.playSfx('hit');

        if (this.lives <= 0) {
            Audio_.playSfx('death');
            Game.setState('gameover');
            return;
        }

        // Respawn at checkpoint
        this.x = this.checkpointX;
        this.y = this.checkpointY;
        this.vx = 0;
        this.vy = 0;
        this.fellOffWorld = false;
        this.invincible = true;
        this.invTimer = 3;
        this.blinkTimer = 0;
    },

    bounce() {
        this.vy = this.jumpForce * 0.6;
    },

    draw(ctx) {
        // Blink when invincible (not for shield powerup)
        if (this.invincible) {
            const isShield = typeof Powerups !== 'undefined' && Powerups.isActive('scudo_robotico');
            if (!isShield && Math.floor(this.blinkTimer * 10) % 2 === 0) return;
        }

        const animDef = VALERIO[this.anim];
        if (!animDef) return;

        const frameIndex = animDef.start + this.animFrame;
        const dx = Math.round(this.x + this.drawOffX - Camera.x);
        const dy = Math.round(this.y + this.drawOffY - Camera.y);

        // Shield glow effect
        if (typeof Powerups !== 'undefined' && Powerups.isActive('scudo_robotico')) {
            ctx.save();
            ctx.shadowColor = '#00FFFF';
            ctx.shadowBlur = 15 + Math.sin(this.blinkTimer * 6) * 5;
            drawFrame(ctx, Images.valerio_sheet, VALERIO.frameW, VALERIO.frameH,
                      frameIndex, dx, dy, !this.facingRight);
            ctx.restore();
        } else {
            drawFrame(ctx, Images.valerio_sheet, VALERIO.frameW, VALERIO.frameH,
                      frameIndex, dx, dy, !this.facingRight);
        }
    },

    centerX() { return this.x + this.w / 2; },
    centerY() { return this.y + this.h / 2; },
};
