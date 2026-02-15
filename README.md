# Valerio On The Stars

Un platform 2D side-scrolling realizzato in HTML5 Canvas e JavaScript vanilla, pensato per bambini dai 4 agli 8 anni.

## Come giocare

Apri `index.html` in un browser moderno (Chrome, Firefox, Edge). Non serve alcun server o installazione.

### Controlli

| Azione | Tasti |
|--------|-------|
| Muovi | `← →` oppure `A D` |
| Salta | `↑` oppure `W` oppure `Spazio` |
| Pausa | `P` |
| Conferma / Avanti | `Invio` |
| Indietro | `Esc` |

## Contenuto

### 3 Mondi
- **Foresta Incantata** — sentieri tra gli alberi e creature del bosco
- **Castello Oscuro** — mura antiche, trappole di lava e nemici corazzati
- **Mondo LEGO Spaziale** — costruzioni tra le stelle con acqua e piattaforme

### 9 Livelli
Ogni mondo ha 2 livelli regolari e 1 battaglia contro il boss. I boss si sbloccano raccogliendo tutte le 6 stelle del mondo.

### Boss
- **Grande Slime** — salta verso il giocatore e genera mini-slime
- **Poker Infuocato** — spara palle di fuoco, carica e resta stordito
- **Megatron Corrotto** — 3 fasi con teletrasporto, fuoco rapido e carica

### Nemici
Slime, lumaca, mosca, blocker, poker e pesce — ognuno con comportamento unico.

### Power-up
- **Magnete LEGO** — attrae mattoncini e monete vicine
- **Salto Stellare** — doppio salto (fino al prossimo danno)
- **Scudo Robotico** — invincibilità temporanea con aura cyan
- **Gravità Ridotta** — salti più alti e caduta lenta

### Collezionabili
- **Stelle** — 3 per livello, necessarie per aprire l'uscita e sbloccare i boss
- **Monete** — oro, argento e bronzo per aumentare il punteggio
- **Mattoncini LEGO** — 50 mattoncini = 1 vita extra

## Tecnologia

- HTML5 Canvas (960×640)
- JavaScript vanilla, nessuna dipendenza esterna
- Tile-based con tile da 70×70 pixel
- Sprite animation, parallax scrolling, particle system
- High score salvato in localStorage

## Struttura del progetto

```
├── index.html          # Entry point
├── css/style.css       # Stile minimale (centrato, pixel art)
├── js/                 # 22 moduli JavaScript
│   ├── utils.js        # Costanti, asset loader, helper
│   ├── input.js        # Gestione tastiera
│   ├── audio.js        # Musica e effetti sonori
│   ├── camera.js       # Camera con screen shake
│   ├── background.js   # Parallax per mondo
│   ├── tilemap.js      # Tile system e collisioni
│   ├── physics.js      # Gravità e risoluzione collisioni
│   ├── player.js       # Valerio (movimento, animazione, danni)
│   ├── enemies.js      # 6 tipi di nemici + proiettili
│   ├── collectibles.js # Stelle, monete, LEGO, checkpoint, uscita
│   ├── hazards.js      # Trampolini
│   ├── platforms.js    # Piattaforme mobili
│   ├── powerups.js     # 4 power-up con timer
│   ├── particles.js    # Sistema particellare
│   ├── transitions.js  # Fade to black
│   ├── boss.js         # 3 boss con AI e fasi
│   ├── worldmap.js     # Mappa mondi e progressione
│   ├── hud.js          # Vite, punteggio, stelle, LEGO
│   ├── levels.js       # 9 livelli + level loader
│   ├── ui.js           # Schermate (titolo, intro, vittoria)
│   ├── game.js         # State machine principale
│   └── main.js         # Boot e game loop
└── assets/             # Sprite, tile, audio, sfondi
```
