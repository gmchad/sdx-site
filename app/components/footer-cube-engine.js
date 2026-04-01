/**
 * footer-cube-engine.js
 *
 * Self-contained implementation of the SDx footer "fire cube" effect.
 * No framework dependencies — drop into any environment with a DOM.
 *
 * Effect overview:
 *   1. A grid of white square blobs is placed over a black background.
 *   2. An SVG goo filter (Gaussian blur + high-contrast color matrix) merges
 *      nearby blobs into organic, lava-lamp-like shapes.
 *   3. Each blob animates along random waypoints (CSS keyframe animation).
 *   4. On mouse hover, blobs repel from the cursor.
 *   5. An ASCII fire canvas sits on top in "multiply" blend mode —
 *      colour only shows through where the white blobs are.
 *
 * Usage:
 *   const engine = createFooterCubeEngine(containerElement, options);
 *   engine.destroy(); // clean up RAF + listeners
 */

// ---------------------------------------------------------------------------
// DEFAULT SETTINGS
// All values are tweakable at runtime via the `options` argument.
// ---------------------------------------------------------------------------
const DEFAULTS = {
  // SVG goo filter
  blur: 8.5,          // feGaussianBlur stdDeviation — higher = softer blobs
  contrast: 48,       // feColorMatrix alpha multiplier — higher = sharper edges
  threshold: -36,     // feColorMatrix alpha bias — negative clips semi-transparent pixels

  // Blob grid
  opacity: 0.63,      // overall goo layer opacity
  cellSize: 62,       // blob square size in px
  density: 1.3,       // spawn probability scalar (higher = more blobs, especially near bottom)

  // Mouse interaction
  mouseRadius: 280,   // px — repulsion sphere radius
  mouseStrength: 80,  // max px displacement at cursor centre
  mouseLag: 0.99,     // smooth-mouse lerp factor (closer to 1 = more lag/smoothness)
  cellLag: 0.08,      // per-blob lerp factor toward target offset

  // ASCII fire
  charFontSize: 11,   // px — monospace character height
};

// ---------------------------------------------------------------------------
// CHARACTER SET
// Ordered sparse → dense. The fire algorithm maps intensity to an index.
// Sparse chars appear at the top / centre of blobs; dense at the bottom.
// ---------------------------------------------------------------------------
const FIRE_CHARS = ' .`-\'_,^:;~=><+!?*/\\)s(d{x}[S]D|X#%&@';

// ---------------------------------------------------------------------------
// COLOUR PALETTE
// One colour per character index. Maps char density → fire hue:
//   blue (sparse / top) → cyan → green → yellow → orange (dense / bottom)
// Array length matches FIRE_CHARS.length — index them in parallel.
// ---------------------------------------------------------------------------
const FIRE_COLORS = [
  '#035593', // blue — sparsest chars (indices 0-4)
  '#035593',
  '#035593',
  '#035593',
  '#035593',
  '#11BBCD', // cyan (indices 5-11)
  '#11BBCD',
  '#11BBCD',
  '#11BBCD',
  '#11BBCD',
  '#11BBCD',
  '#11BBCD',
  '#03C661', // green (indices 12-18)
  '#03C661',
  '#03C661',
  '#03C661',
  '#03C661',
  '#03C661',
  '#03C661',
  '#fac205', // yellow (indices 19-28)
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fac205',
  '#fc5715', // orange — densest chars (indices 29-35)
  '#fc5715',
  '#fc5715',
  '#fc5715',
  '#fc5715',
  '#fc5715',
  '#fc5715',
];

// ---------------------------------------------------------------------------
// SEEDED PSEUDO-RANDOM
// Deterministic noise so the grid is reproducible across rebuilds.
// Uses sin(seed)*10000 fractional part — simple but sufficient.
// ---------------------------------------------------------------------------
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// 2-D SMOOTH NOISE (bilinear interpolation over a 512-entry random table)
// Used in the ASCII fire algorithm to add turbulence variation.
// ---------------------------------------------------------------------------
function buildNoiseTable() {
  const t = new Float32Array(512);
  for (let i = 0; i < 512; i++) t[i] = Math.random();
  return t;
}

function sampleNoise(table, x, y) {
  const ix = ((Math.floor(x) % 256) + 256) % 256;
  const iy = ((Math.floor(y) % 256) + 256) % 256;
  const fx = x - Math.floor(x);
  const fy = y - Math.floor(y);
  const a = table[ix + (iy & 255)];
  const b = table[(ix + 1) % 256 + (iy & 255)];
  const c = table[ix + ((iy + 1) & 255)];
  const d = table[(ix + 1) % 256 + ((iy + 1) & 255)];
  const lx1 = a + (b - a) * fx;
  const lx2 = c + (d - c) * fx;
  return lx1 + (lx2 - lx1) * fy;
}

// ---------------------------------------------------------------------------
// MAIN FACTORY
// ---------------------------------------------------------------------------
/**
 * @param {HTMLElement} container  - The element that hosts the effect.
 *                                   Must have position: absolute/relative and
 *                                   a defined size (width × height).
 * @param {Partial<typeof DEFAULTS>} options
 * @returns {{ destroy: () => void }}
 */
function createFooterCubeEngine(container, options = {}) {
  const cfg = { ...DEFAULTS, ...options };
  const noiseTable = buildNoiseTable();

  // -------------------------------------------------------------------------
  // DOM STRUCTURE
  // -------------------------------------------------------------------------
  //
  //  container (position: absolute, inset: 0, overflow: hidden)
  //  ├── <svg>  (goo filter definition, 0×0, invisible)
  //  ├── gridLines (background grid lines, opacity 4%)
  //  └── isolationLayer (isolation: isolate)
  //      ├── gooBackground (bg black)
  //      │   └── gooLayer (filter: url(#goo-footer-engine))
  //      │       └── ... blob <div>s ...
  //      ├── asciiCanvas (mix-blend-mode: multiply)
  //      ├── topFade
  //      ├── leftFade
  //      └── rightFade

  container.style.position = 'absolute';
  container.style.inset = '0';
  container.style.overflow = 'hidden';
  container.style.pointerEvents = 'none';

  // SVG goo filter
  const FILTER_ID = 'goo-footer-engine';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  Object.assign(svg.style, { position: 'absolute', width: '0', height: '0' });
  svg.innerHTML = `
    <defs>
      <filter id="${FILTER_ID}">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${cfg.blur}" result="blur"/>
        <feColorMatrix
          in="blur" type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${cfg.contrast} ${cfg.threshold}"
        />
      </filter>
    </defs>
  `;
  container.appendChild(svg);

  // Background grid lines — subtle reference grid aligned to cell gap
  const gap = cfg.cellSize + 12;
  const gridLines = document.createElement('div');
  Object.assign(gridLines.style, {
    position: 'absolute', inset: '0',
    opacity: '0.04',
    backgroundImage: [
      'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
    ].join(','),
    backgroundSize: `${gap}px ${gap}px`,
    backgroundPosition: 'center center',
  });
  container.appendChild(gridLines);

  // Isolation layer (critical — keeps multiply blend scoped)
  const isolationLayer = document.createElement('div');
  Object.assign(isolationLayer.style, { position: 'absolute', inset: '0', isolation: 'isolate' });
  container.appendChild(isolationLayer);

  // Black bg + goo layer
  const gooBackground = document.createElement('div');
  Object.assign(gooBackground.style, { position: 'absolute', inset: '0', background: 'black' });
  isolationLayer.appendChild(gooBackground);

  const gooLayer = document.createElement('div');
  Object.assign(gooLayer.style, {
    position: 'absolute', inset: '0',
    filter: `url(#${FILTER_ID})`,
    opacity: String(cfg.opacity),
  });
  gooBackground.appendChild(gooLayer);

  // ASCII fire canvas
  const asciiCanvas = document.createElement('canvas');
  Object.assign(asciiCanvas.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%',
    mixBlendMode: 'multiply',
  });
  isolationLayer.appendChild(asciiCanvas);

  // Edge fades
  const topFade = document.createElement('div');
  Object.assign(topFade.style, {
    position: 'absolute', insetInline: '0', top: '0', height: '40%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
    pointerEvents: 'none',
  });
  container.appendChild(topFade);

  const leftFade = document.createElement('div');
  Object.assign(leftFade.style, {
    position: 'absolute', insetBlock: '0', left: '0', width: '10%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)',
    pointerEvents: 'none',
  });
  container.appendChild(leftFade);

  const rightFade = document.createElement('div');
  Object.assign(rightFade.style, {
    position: 'absolute', insetBlock: '0', right: '0', width: '10%',
    background: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)',
    pointerEvents: 'none',
  });
  container.appendChild(rightFade);

  // -------------------------------------------------------------------------
  // BLOB GRID CONSTRUCTION
  // -------------------------------------------------------------------------
  // Each call tears down old blobs and rebuilds from scratch.
  // Called initially and on resize.

  let cells = [];    // { el, homeX, homeY, offX, offY }
  let styleEl = null;

  function buildGrid() {
    // Remove previous blobs + keyframe styles
    while (gooLayer.firstChild) gooLayer.removeChild(gooLayer.firstChild);
    cells = [];

    const rect = container.getBoundingClientRect();
    const w = rect.width || 1200;
    const h = rect.height || 600;
    const cols = Math.ceil(w / gap) + 2;
    const rows = Math.ceil(h / gap) + 2;
    const offsetX = (w - (cols - 1) * gap) / 2;
    const offsetY = (h - (rows - 1) * gap) / 2;

    const frag = document.createDocumentFragment();
    let css = '';
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const seed = r * cols + c + 7;

        // Spawn probability: quadratic ramp from top (sparse) to bottom (dense).
        // cfg.density scales the overall fill — 1.0 is balanced, 1.3 is fuller.
        const rowNorm = r / (rows - 1);
        const spawnChance = rowNorm * rowNorm * cfg.density;
        if (seededRandom(seed) > spawnChance) continue;

        const cx = offsetX + c * gap;
        const cy = offsetY + r * gap;

        // 4 animation waypoints — each moves the blob outward from centre,
        // then snaps back 80% before the next outward excursion.
        const wp = [];
        for (let i = 0; i < 4; i++) {
          const angle = Math.floor(seededRandom(seed + 10 + i * 3) * 4);
          const dirs = [[1, -1], [-1, -1], [1, 1], [-1, 1]];
          const [dx, dy] = dirs[angle];
          const dist = 8 + seededRandom(seed + 11 + i * 3) * 14;
          wp.push({ x: Math.round(dx * dist), y: Math.round(dy * dist) });
        }

        const dur = 8 + seededRandom(seed + 3) * 10;
        const delay = seededRandom(seed + 4) * 6;

        const div = document.createElement('div');
        Object.assign(div.style, {
          position: 'absolute',
          left: `${cx}px`,
          top: `${cy}px`,
          width: `${cfg.cellSize}px`,
          height: `${cfg.cellSize}px`,
          background: 'white',
          borderRadius: '0%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          // Each blob gets its own uniquely named keyframe so durations/delays vary
          animation: `fce${idx} ${dur.toFixed(1)}s cubic-bezier(1,0,0.31,1.39) ${delay.toFixed(1)}s infinite`,
        });

        // Keyframe: 0%/100% = home. 18% = peak. 25% = 20% of peak (snap back).
        // Pattern repeats for all 4 waypoints across 0→93% of the timeline.
        css += `@keyframes fce${idx}{
  0%,100%{transform:translate(-50%,-50%)}
  18%{transform:translate(calc(-50% + ${wp[0].x}px),calc(-50% + ${wp[0].y}px))}
  25%{transform:translate(calc(-50% + ${Math.round(wp[0].x * 0.2)}px),calc(-50% + ${Math.round(wp[0].y * 0.2)}px))}
  43%{transform:translate(calc(-50% + ${wp[1].x}px),calc(-50% + ${wp[1].y}px))}
  50%{transform:translate(calc(-50% + ${Math.round(wp[1].x * 0.2)}px),calc(-50% + ${Math.round(wp[1].y * 0.2)}px))}
  68%{transform:translate(calc(-50% + ${wp[2].x}px),calc(-50% + ${wp[2].y}px))}
  75%{transform:translate(calc(-50% + ${Math.round(wp[2].x * 0.2)}px),calc(-50% + ${Math.round(wp[2].y * 0.2)}px))}
  93%{transform:translate(calc(-50% + ${wp[3].x}px),calc(-50% + ${wp[3].y}px))}
}\n`;

        frag.appendChild(div);
        cells.push({ el: div, homeX: cx, homeY: cy, offX: 0, offY: 0 });
        idx++;
      }
    }

    // Accessibility: disable animation for users who prefer reduced motion
    css += `@media(prefers-reduced-motion:reduce){[style*="animation"]{animation:none!important}}\n`;

    styleEl = document.createElement('style');
    styleEl.textContent = css;
    gooLayer.appendChild(styleEl);
    gooLayer.appendChild(frag);
  }

  // -------------------------------------------------------------------------
  // MOUSE INTERACTION
  // -------------------------------------------------------------------------
  // Smooth (lagged) mouse tracking → repulsion force on each blob.
  // Blobs are pushed outward from cursor when within mouseRadius.
  // They lerp back toward their CSS animation position when cursor leaves.

  const mouse = { x: -1000, y: -1000 };
  const smoothMouse = { x: -1000, y: -1000 };

  function onMouseMove(e) {
    const rect = container.getBoundingClientRect();
    if (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = -1000;
      mouse.y = -1000;
    }
  }
  document.addEventListener('mousemove', onMouseMove);

  // -------------------------------------------------------------------------
  // ANIMATION LOOP
  // -------------------------------------------------------------------------

  let rafId = null;

  function tick() {
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (w === 0 || h === 0) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    // Smooth mouse lerp
    smoothMouse.x += (mouse.x - smoothMouse.x) * cfg.mouseLag;
    smoothMouse.y += (mouse.y - smoothMouse.y) * cfg.mouseLag;

    // Apply mouse repulsion to each blob
    for (const cell of cells) {
      const ddx = cell.homeX - smoothMouse.x;
      const ddy = cell.homeY - smoothMouse.y;
      const dist = Math.sqrt(ddx * ddx + ddy * ddy);

      let targetOffX = 0;
      let targetOffY = 0;
      if (dist < cfg.mouseRadius && dist > 0) {
        // Linear falloff: full strength at dist=0, zero at dist=mouseRadius
        const force = (1 - dist / cfg.mouseRadius) * cfg.mouseStrength;
        // Repel outward (negate → push away from cursor)
        targetOffX = -(ddx / dist) * force;
        targetOffY = -(ddy / dist) * force;
      }

      // Lerp current offset toward target
      cell.offX += (targetOffX - cell.offX) * cfg.cellLag;
      cell.offY += (targetOffY - cell.offY) * cfg.cellLag;

      // Overwrite left/top (the CSS animation drives transform; we adjust position)
      cell.el.style.left = `${cell.homeX + cell.offX}px`;
      cell.el.style.top  = `${cell.homeY + cell.offY}px`;
    }

    // -----------------------------------------------------------------------
    // ASCII FIRE RENDERING
    // -----------------------------------------------------------------------
    // The canvas is sized to match the container, drawn each frame.
    // mix-blend-mode: multiply means black=transparent, white=passthrough.
    // Coloured ASCII characters on a black canvas → colour appears only
    // where the goo blobs (white, behind) exist.

    const cw = Math.ceil(w);
    const ch = Math.ceil(h);
    if (asciiCanvas.width !== cw || asciiCanvas.height !== ch) {
      asciiCanvas.width = cw;
      asciiCanvas.height = ch;
    }

    const ctx = asciiCanvas.getContext('2d');
    if (!ctx) { rafId = requestAnimationFrame(tick); return; }

    // Black fill — essential for multiply blend to clip colour to blob regions
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    const charFontSize = cfg.charFontSize;
    ctx.font = `${charFontSize}px "Space Mono", monospace`;
    ctx.textBaseline = 'top';

    const charWidth = ctx.measureText('@').width || charFontSize * 0.6;
    const numCols = Math.ceil(cw / charWidth) + 5;
    const numRows = Math.ceil(ch / charFontSize) + 2;
    const t = performance.now() * 0.001;

    let lastColor = '';
    for (let r = 0; r < numRows; r++) {
      const py = r * charFontSize;
      // heightNorm: 0 at top, 1 at bottom. Fire is denser at the bottom.
      const heightNorm = py / ch;
      // scroll drives the upward-flowing animation
      const scroll = r * 0.4 + t * 8;

      for (let c = 0; c < numCols; c++) {
        // Per-column phase creates horizontal variation (wavy columns)
        const colPhase = Math.sin(c * 2.1 + 0.5) * 3 + Math.sin(c * 0.7 + 1.3) * 5;

        // Three harmonics summed for turbulent, organic motion
        const v1 = Math.sin(scroll + colPhase) * 0.5 + 0.5;
        const v2 = Math.sin(scroll * 2.3 + colPhase * 0.7 + 10) * 0.25 + 0.25;
        const v3 = Math.sin(scroll * 4.1 + colPhase * 0.3 + 20) * 0.125 + 0.125;
        const combined = v1 + v2 + v3;

        // Scale by height (bottom = intense) and a 0.85 ceiling to prevent
        // the very densest chars from dominating the colour palette
        const intensity = combined * heightNorm * 0.85;
        const charIdx = Math.min(FIRE_CHARS.length - 1, Math.floor(intensity * FIRE_CHARS.length));
        const ch2 = FIRE_CHARS[charIdx];

        if (ch2 === ' ') continue; // space → black → multiply → invisible (skip for perf)

        const color = FIRE_COLORS[Math.min(charIdx, FIRE_COLORS.length - 1)];
        if (color !== lastColor) {
          ctx.fillStyle = color;
          lastColor = color;
        }

        ctx.fillText(ch2, c * charWidth, py);
      }
    }

    rafId = requestAnimationFrame(tick);
  }

  // -------------------------------------------------------------------------
  // INIT + RESIZE
  // -------------------------------------------------------------------------

  function init() {
    const rect = container.getBoundingClientRect();
    if (rect.height > 10) buildGrid();
  }

  const ro = new ResizeObserver(() => {
    buildGrid();
  });
  ro.observe(container);

  // Multiple deferred attempts — container may not have laid out on first frame
  requestAnimationFrame(init);
  setTimeout(init, 100);
  setTimeout(init, 500);

  rafId = requestAnimationFrame(tick);

  // -------------------------------------------------------------------------
  // PUBLIC API
  // -------------------------------------------------------------------------

  return {
    /**
     * Tear down all DOM nodes, event listeners, and the RAF loop.
     * Call this when removing the container from the DOM.
     */
    destroy() {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
      while (container.firstChild) container.removeChild(container.firstChild);
    },

    /**
     * Force a grid rebuild (e.g. after cfg changes).
     */
    rebuild() {
      buildGrid();
    },

    /**
     * Update a single config value and rebuild/rerender as needed.
     * @param {Partial<typeof DEFAULTS>} overrides
     */
    setConfig(overrides) {
      Object.assign(cfg, overrides);

      if ('blur' in overrides || 'contrast' in overrides || 'threshold' in overrides) {
        // Patch SVG filter in-place
        const blur = svg.querySelector('feGaussianBlur');
        const matrix = svg.querySelector('feColorMatrix');
        if (blur) blur.setAttribute('stdDeviation', String(cfg.blur));
        if (matrix) matrix.setAttribute('values',
          `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${cfg.contrast} ${cfg.threshold}`);
      }
      if ('opacity' in overrides) {
        gooLayer.style.opacity = String(cfg.opacity);
      }
      if ('cellSize' in overrides || 'density' in overrides) {
        buildGrid();
      }
    },
  };
}

// ---------------------------------------------------------------------------
// EXPORTS (CommonJS + ESM-compatible via dual pattern)
// ---------------------------------------------------------------------------
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createFooterCubeEngine, DEFAULTS, FIRE_CHARS, FIRE_COLORS };
} else if (typeof window !== 'undefined') {
  window.FooterCubeEngine = { createFooterCubeEngine, DEFAULTS, FIRE_CHARS, FIRE_COLORS };
}
