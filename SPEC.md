# Valerio On The Stars — Game Specification

## Panoramica

**Genere:** Platform 2D side-scrolling
**Target:** Bambini 4–8 anni
**Tecnologia:** HTML5 Canvas + JavaScript vanilla
**Risoluzione:** 960×640 (canvas), tile size 70×70
**Input:** Tastiera (WASD / Frecce + Spazio)

---

## Trama

Valerio costruisce un robot chiamato **Megatron Felice**.
Durante la notte il robot apre un portale verso mondi fantastici.
Le **Stelle dell'Energia** si disperdono nei vari mondi.
Valerio deve attraversare 3 mondi, recuperare le stelle e sconfiggere i guardiani per riattivare Megatron.

---

## Struttura del Gioco

### 3 Mondi × 2 Livelli + 1 Boss per mondo = 9 stage totali

| Mondo | Livello | Nome | Background | Nemici Principali |
|-------|---------|------|------------|-------------------|
| 1 — Foresta Incantata | 1-1 | Sentiero delle Lucciole | forest | Slime, Snail |
| | 1-2 | Cuore della Foresta | forest | Slime, Snail, Fly |
| | 1-B | Boss: Il Grande Slime | forest | Boss Slime |
| 2 — Castello Oscuro | 2-1 | Le Mura Esterne | castle | Blocker, Fly |
| | 2-2 | La Torre del Fantasma | castle | Blocker, Poker, Snail |
| | 2-B | Boss: Il Poker Infuocato | castle | Boss Poker |
| 3 — Mondo LEGO Spaziale | 3-1 | Costruzioni tra le Stelle | space + lego_world | Fish, Fly |
| | 3-2 | La Base Galattica | space + lego_world | Fish, Blocker, Fly |
| | 3-B | Boss Finale: Megatron Corrotto | space | Boss Megatron |

---

## Meccaniche

### Movimento
- **Sinistra/Destra:** Frecce o A/D — velocità 250 px/s
- **Salto:** Spazio o W o Freccia Su — impulso verticale, gravità 1200 px/s²
- **Doppio Salto:** Sbloccabile via power-up "Salto Stellare"

### Vite e Danno
- **5 vite** (cuori HUD)
- Toccare un nemico = -1 vita + 3s invincibilità con blink
- Cadere nel vuoto = -1 vita + respawn a ultimo checkpoint
- 0 vite = Game Over (Retry livello / Torna al menu)

### Salto sui Nemici
- Saltare sulla testa di un nemico lo elimina
- Il giocatore rimbalza leggermente verso l'alto dopo l'eliminazione

### Punteggio
| Azione | Punti |
|--------|-------|
| Stella dell'Energia | 500 |
| Pezzo LEGO | 100 |
| Moneta Oro | 50 |
| Moneta Argento | 25 |
| Moneta Bronzo | 10 |
| Nemico eliminato | 200 |
| Boss sconfitto | 2000 |

---

## Oggetti Collezionabili

### Stelle dell'Energia (obbligatorie)
- Ogni livello contiene **3 stelle** da raccogliere
- Bisogna raccoglierle tutte per sbloccare il boss del mondo
- Spritesheet animato (8 frame rotazione)

### Pezzi LEGO (bonus)
- Sparsi nei livelli, bonus punteggio
- Raccogliere 50 pezzi = 1 vita extra

### Monete
- Oro, Argento, Bronzo — sparse nei livelli
- Solo punteggio

---

## Power-up

| Nome | Sprite | Effetto | Durata |
|------|--------|---------|--------|
| Magnete LEGO | `powerups/magnete_lego.png` | Attira oggetti vicini (raggio 150px) | 10 s |
| Salto Stellare | `powerups/salto_stellare.png` | Abilita doppio salto | Fino a danno |
| Scudo Robotico | `powerups/scudo_robotico.png` | Invincibilità, glow ciano | 5 s |
| Gravità Ridotta | `powerups/gravita_ridotta.png` | Gravità dimezzata (salti più alti) | 8 s |

I power-up appaiono in posizioni fisse nel livello, dentro blocchi "?" (button sprites).

---

## Nemici

| Nemico | Sprite | Comportamento | Presente in |
|--------|--------|---------------|-------------|
| Slime | `slimeWalk1/2.png` | Cammina avanti-indietro su piattaforma | Mondo 1 |
| Snail | `snailWalk1/2.png` | Cammina lentamente, si ritira nel guscio se colpito | Mondo 1, 2 |
| Fly | `flyFly1/2.png` | Vola pattern sinusoidale | Mondo 1, 2, 3 |
| Blocker | `blockerMad.png` | Stazionario, si attiva quando il player è vicino | Mondo 2, 3 |
| Poker | `pokerMad.png` | Stazionario, lancia fireballs periodicamente | Mondo 2 |
| Fish | `fishSwim1/2.png` | Salta fuori da zone liquide | Mondo 3 |

### Boss

| Boss | Mondo | HP | Pattern |
|------|-------|----|---------|
| Grande Slime | 1 | 5 | Salta verso il player, genera mini-slime. Vulnerabile all'atterraggio. |
| Poker Infuocato | 2 | 8 | Lancia fireballs in pattern, carica periodicamente. Colpire con salto sulla testa. |
| Megatron Corrotto | 3 | 12 | 3 fasi: spara, carica, vulnerabile. Velocità aumenta per fase. |

---

## UI / HUD

| Elemento | Asset | Posizione |
|----------|-------|-----------|
| Vite | `hud/hud_heartFull.png`, `hud_heartEmpty.png` | Alto-sinistra |
| Punteggio | `hud/hud_0..9.png` | Alto-centro |
| Stelle raccolte | `collectibles/stars/energy_star_gold.png` | Alto-destra (X/3) |
| Pezzi LEGO | Contatore numerico | Sotto le stelle |
| Power-up attivo | Icona + timer bar | Sotto le vite |

### Schermate

- **Title Screen:** "VALERIO THE LITTLE BOY ON THE STARS" + Megatron Felice + "PREMI INVIO"
- **World Map:** Selezione mondo (sbloccati progressivamente)
- **Level Intro:** "Mondo X - Livello Y" + nome livello (2s)
- **Pause:** P per pausa, overlay semi-trasparente
- **Game Over:** Punteggio, "RIPROVA" / "MENU"
- **Victory:** Megatron riattivato, punteggio finale, "GRAZIE VALERIO!"

---

## Mappa degli Asset

### Sprites — Personaggio
| File | Dimensioni | Uso |
|------|-----------|-----|
| `sprites/valerio/valerio_spritesheet.png` | 924×92 (14 frame × 66×92) | Spritesheet principale |
| `sprites/valerio/valerio_idle_0..1.png` | 66×92 | Idle (2 frame) |
| `sprites/valerio/valerio_walk_0..7.png` | 66×92 | Camminata (8 frame) |
| `sprites/valerio/valerio_jump_0..1.png` | 66×92 | Salto (2 frame) |
| `sprites/valerio/valerio_hurt.png` | 66×92 | Danno |
| `sprites/valerio/valerio_duck.png` | 66×92 | Abbassato |

### Sprites — Megatron
| File | Uso |
|------|-----|
| `sprites/megatron/Megatron_Felice_robot-spritesheet.png` | NPC + Boss fase 3 (recolor) |

### Sprites — Nemici
| File | Uso |
|------|-----|
| `sprites/enemies/slimeWalk1.png`, `slimeWalk2.png`, `slimeDead.png` | Slime |
| `sprites/enemies/snailWalk1.png`, `snailWalk2.png`, `snailShell.png` | Snail |
| `sprites/enemies/flyFly1.png`, `flyFly2.png`, `flyDead.png` | Fly |
| `sprites/enemies/blockerBody.png`, `blockerMad.png`, `blockerSad.png` | Blocker |
| `sprites/enemies/pokerMad.png`, `pokerSad.png` | Poker |
| `sprites/enemies/fishSwim1.png`, `fishSwim2.png`, `fishDead.png` | Fish |

### Tiles (70×70 px)
| File Pattern | Uso |
|-------------|-----|
| `tiles/grass*.png` | Piattaforme Mondo 1 |
| `tiles/stone*.png`, `tiles/castle*.png` | Piattaforme Mondo 2 |
| `tiles/sand*.png` | Piattaforme Mondo 3 (mescolate con LEGO) |
| `tiles/door*.png`, `tiles/lock*.png` | Porte e lucchetti fine livello |
| `tiles/ladder*.png`, `tiles/fence*.png` | Scale e recinti |
| `tiles/liquid*.png`, `tiles/lava*.png` | Zone pericolose |
| `tiles/bridge*.png`, `tiles/sign*.png` | Ponti e cartelli decorativi |

### Collezionabili
| File | Uso |
|------|-----|
| `collectibles/stars/energy_star_gold.png` | Stelle Energia (8 frame, 256×32) |
| `collectibles/stars/energy_star_blue.png` | Stelle bonus (opzionale) |
| `collectibles/lego/PNG/Default/*/brick_high_2.png` | Pezzi LEGO (7 colori) |
| `items/coinGold.png`, `coinSilver.png`, `coinBronze.png` | Monete |
| `items/gemBlue.png`, `gemGreen.png`, `gemRed.png`, `gemYellow.png` | Gemme (uso futuro) |

### Power-up (32×128, 4 frame ciascuno)
| File | Uso |
|------|-----|
| `powerups/magnete_lego.png` | Magnete LEGO |
| `powerups/salto_stellare.png` | Salto Stellare |
| `powerups/scudo_robotico.png` | Scudo Robotico |
| `powerups/gravita_ridotta.png` | Gravità Ridotta |

### Items — Elementi di Livello
| File | Uso |
|------|-----|
| `items/flagGreen.png`, `flagGreen2.png` | Checkpoint |
| `items/spikes.png` | Trappola (danno) |
| `items/springboardUp.png`, `springboardDown.png` | Trampolino |
| `items/buttonBlue.png` / `_pressed.png` | Interruttori / blocchi "?" |
| `items/fireball.png` | Proiettile Poker |
| `items/star.png` | Decorazione / particella |

### Backgrounds (480×320, 3 layer parallax ciascuno)
| Mondo | Layer | File |
|-------|-------|------|
| Foresta | back, mid, tiles | `backgrounds/forest/back.png`, `middle.png`, `tiles.png` |
| Castello | back, mid, front | `backgrounds/castle/castle_back.png`, `castle_mid.png`, `castle_front.png` |
| Spazio/LEGO | back, mid, front | `backgrounds/space/space_back.png`, `space_mid.png`, `space_front.png` |
| LEGO World | back, mid, front | `backgrounds/lego_world/lego_back.png`, `lego_mid.png`, `lego_front.png` |
| Generic | bg, bg_castle | `backgrounds/bg.png`, `backgrounds/castle/bg_castle.png` |

### HUD
| File | Uso |
|------|-----|
| `hud/hud_heartFull.png`, `hud_heartHalf.png`, `hud_heartEmpty.png` | Vite |
| `hud/hud_0.png` .. `hud_9.png` | Numeri punteggio |
| `hud/hud_coins.png` | Icona monete |
| `hud/hud_gem_*.png` | Icone gemme |
| `hud/hud_keyBlue.png` .. `hud_keyYellow.png` | Icone chiavi |
| `hud/hud_p1.png` | Indicatore player |

### Audio
| File | Uso |
|------|-----|
| `audio/music/title.wav` | Musica title screen |
| `audio/music/level1.wav` | Musica Mondo 1 |
| `audio/music/level2.wav` | Musica Mondo 2 |
| `audio/music/level3.wav` | Musica Mondo 3 |
| `audio/music/ending.wav` | Musica vittoria |
| `audio/sfx/hit.wav` | Nemico colpito / player colpito |
| `audio/sfx/explosion.wav` | Boss sconfitto |
| `audio/sfx/powerup.wav` | Power-up raccolto |
| `audio/sfx/player-death.wav` | Morte giocatore |

---

## Struttura File del Progetto

```
ValerioOnTheStars/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── utils.js          # Costanti, asset loader, helpers
│   ├── input.js           # Gestione tastiera
│   ├── audio.js           # SFX pool + musica
│   ├── camera.js          # Camera follow player + scrolling
│   ├── background.js      # Parallax rendering per mondo
│   ├── tilemap.js         # Caricamento e rendering tilemap
│   ├── physics.js         # Gravità, collisioni AABB con tiles
│   ├── player.js          # Valerio: movimento, animazioni, stato
│   ├── enemies.js         # AI nemici (patrol, fly, shoot)
│   ├── boss.js            # Boss fight logic (3 boss)
│   ├── collectibles.js    # Stelle, LEGO, monete, power-up
│   ├── hud.js             # HUD rendering
│   ├── levels.js          # Definizione livelli (tilemap + oggetti)
│   ├── ui.js              # Title, world map, game over, victory
│   ├── game.js            # Game state machine + loop
│   └── main.js            # Boot + entry point
└── new_assets/            # Tutti gli asset (vedi sopra)
```

---

## Milestone

---

### Milestone 1 — "Primi Passi nella Foresta" (Giocabile)

**Obiettivo:** Un livello completo giocabile con le meccaniche base.

**Contenuto:**
- Title screen con "PREMI INVIO"
- Livello 1-1 (Sentiero delle Lucciole) completamente giocabile
- Valerio: idle, walk, jump + animazioni
- Fisica: gravità, collisioni con tiles, salto
- Camera che segue il player con scrolling orizzontale
- Parallax background foresta (3 layer)
- Tilemap rendering (piattaforme grass)
- Nemici: Slime (patrol) e Snail (patrol lento)
- Salto sui nemici per eliminarli
- Collezionabili: 3 Stelle Energia + monete
- HUD: vite (cuori), punteggio, stelle raccolte (X/3)
- Sistema vite: 3 vite, invincibilità post-danno, respawn
- Checkpoint (bandiera verde)
- Porta di uscita fine livello
- Game Over screen con "RIPROVA"
- Audio: musica level1 + SFX base (hit, death, powerup)

**Non incluso in M1:** Power-up, boss, mondi 2-3, world map, pezzi LEGO.

---

### Milestone 2 — "Tre Mondi, Un Eroe" (Giocabile)

**Obiettivo:** Tutti i livelli regolari + power-up + tutti i nemici.

**Contenuto (aggiunge a M1):**
- World Map: selezione mondo (sbloccati progressivamente)
- Level Intro screen (nome mondo + livello)
- Tutti i 6 livelli regolari (1-1, 1-2, 2-1, 2-2, 3-1, 3-2)
- Mondo 2: tiles castle/stone, background castello, nemici Blocker e Poker
- Mondo 3: tiles sand + LEGO, background spazio/LEGO, nemici Fish
- Poker lancia fireballs
- Blocker si attiva su prossimità
- Fish salta da zone liquide
- 4 Power-up funzionanti (Magnete, Salto Stellare, Scudo, Gravità)
- Blocchi "?" che rilasciano power-up
- Pezzi LEGO collezionabili (50 = 1 vita extra)
- Piattaforme mobili
- Trampolini (springboard)
- Spikes (trappole)
- Liquidi/Lava (zone di danno)
- Pause screen (P)
- Progressione: completare livelli sblocca il successivo

**Non incluso in M2:** Boss fight, schermata vittoria finale.

---

### Milestone 3 — "Il Ritorno di Megatron" (Gioco Completo)

**Obiettivo:** Gioco completo con boss, polish e finale.

**Contenuto (aggiunge a M2):**
- 3 Boss fight (Grande Slime, Poker Infuocato, Megatron Corrotto)
- Boss arena dedicata per ogni mondo
- Pattern di attacco unici per ogni boss (vedi sezione Boss)
- Requisito stelle: servono tutte le 6 stelle del mondo per accedere al boss
- Screen shake su hit e boss defeated
- Schermata vittoria: Megatron riattivato, punteggio finale, "GRAZIE VALERIO!"
- Musica ending sulla vittoria
- High score salvato in localStorage
- Transizioni fluide tra livelli (fade in/out)
- Particelle: raccolta stelle, morte nemici, respawn
- Polish: feedback visivi (flash danno, glow power-up attivo, rimbalzo monete)

---

## Note Tecniche

- **Tile size:** 70×70px (nativo dal Platformer Deluxe pack)
- **Player size:** 66×92px
- **Canvas:** 960×640, CSS scaled `image-rendering: pixelated`
- **Livelli:** Definiti come array 2D in `levels.js` (tilemap + spawn point oggetti)
- **Collisioni:** AABB tile-based (ogni tile è solido o attraversabile)
- **dt cap:** 0.05s max per evitare spiral of death
- **Audio:** Pool di 4 elementi per SFX sovrapposti, musica in loop
- **No dipendenze esterne:** Zero npm, zero framework
