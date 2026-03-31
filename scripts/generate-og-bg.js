// Generates OG background matching the site's footer effect exactly
// Usage: node scripts/generate-og-bg.js

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const WIDTH = 1200;
const HEIGHT = 630;

// Footer settings (from CanvasDebugPanel defaults)
const CELL_SIZE = 62;
const BLUR = 8.5;
const CONTRAST = 48;
const THRESHOLD = -36;
const OPACITY = 0.63;
const DENSITY = 1.3;
const CHAR_FONT_SIZE = 11;

const fireChars = " .`-'_,^:;~=><+!?*/\\)s(d{x}[S]D|X#%&@";
const fireColors = [
  '#035593', '#035593', '#035593', '#035593', '#035593',
  '#11BBCD', '#11BBCD', '#11BBCD', '#11BBCD', '#11BBCD', '#11BBCD', '#11BBCD',
  '#03C661', '#03C661', '#03C661', '#03C661', '#03C661', '#03C661', '#03C661',
  '#fac205', '#fac205', '#fac205', '#fac205', '#fac205', '#fac205', '#fac205', '#fac205', '#fac205', '#fac205',
  '#fc5715', '#fc5715', '#fc5715', '#fc5715', '#fc5715', '#fc5715', '#fc5715',
];

const sr = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- Step 1: Generate square positions (matching footer buildGrid exactly) ---
const gap = CELL_SIZE + 12; // footer uses cellSize + 12 as the step
const cols = Math.ceil(WIDTH / gap) + 2;
const rows = Math.ceil(HEIGHT / gap) + 2;
const offsetX = (WIDTH - (cols - 1) * gap) / 2;
const offsetY = (HEIGHT - (rows - 1) * gap) / 2;

const squares = [];
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const s = r * cols + c + 7;
    const rowNorm = r / (rows - 1);
    const spawnChance = rowNorm * rowNorm * DENSITY;
    if (sr(s) > spawnChance) continue;
    const cx = offsetX + c * gap;
    const cy = offsetY + r * gap;
    squares.push({ cx, cy });
  }
}

// --- Step 2: Draw squares (white on black), centered like footer's translate(-50%,-50%) ---
const sqCanvas = createCanvas(WIDTH, HEIGHT);
const sqCtx = sqCanvas.getContext('2d');
sqCtx.fillStyle = 'black';
sqCtx.fillRect(0, 0, WIDTH, HEIGHT);
sqCtx.fillStyle = 'white';

for (const sq of squares) {
  sqCtx.fillRect(sq.cx - CELL_SIZE/2, sq.cy - CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
}

// --- Step 3: Simulate goo filter (blur + contrast threshold) ---
// Multi-pass blur: downscale to small, upscale back, repeat
function multiPassBlur(src, blurAmount) {
  // Scale factor based on blur amount — larger blur = smaller intermediate
  const scale = Math.max(0.05, 1 / (1 + blurAmount * 0.5));
  let current = src;

  for (let pass = 0; pass < 3; pass++) {
    const sw = Math.ceil(WIDTH * scale);
    const sh = Math.ceil(HEIGHT * scale);
    const small = createCanvas(sw, sh);
    small.getContext('2d').drawImage(current, 0, 0, sw, sh);
    const big = createCanvas(WIDTH, HEIGHT);
    big.getContext('2d').drawImage(small, 0, 0, WIDTH, HEIGHT);
    current = big;
  }
  return current;
}

const blurred = multiPassBlur(sqCanvas, BLUR);

// Apply feColorMatrix equivalent: output_alpha = contrast * input_alpha + threshold
// For grayscale: pixel = clamp(contrast * pixel/255 + threshold/255, 0, 1) * 255
const threshCanvas = createCanvas(WIDTH, HEIGHT);
const thCtx = threshCanvas.getContext('2d');
thCtx.drawImage(blurred, 0, 0);
const imgData = thCtx.getImageData(0, 0, WIDTH, HEIGHT);
const d = imgData.data;
for (let i = 0; i < d.length; i += 4) {
  const v = d[i] / 255;
  const out = Math.max(0, Math.min(1, CONTRAST * v + THRESHOLD / 255 * CONTRAST)) * 255;
  d[i] = d[i+1] = d[i+2] = Math.round(out);
  d[i+3] = 255;
}
thCtx.putImageData(imgData, 0, 0);

// --- Step 4: Draw colored ASCII (matching footer's charFontSize=11, same algorithm) ---
const asciiCanvas = createCanvas(WIDTH, HEIGHT);
const aCtx = asciiCanvas.getContext('2d');
aCtx.fillStyle = 'black';
aCtx.fillRect(0, 0, WIDTH, HEIGHT);
aCtx.font = `${CHAR_FONT_SIZE}px monospace`;
aCtx.textBaseline = 'top';

const charWidth = aCtx.measureText('@').width || CHAR_FONT_SIZE * 0.6;
const aCols = Math.ceil(WIDTH / charWidth) + 5;
const aRows = Math.ceil(HEIGHT / CHAR_FONT_SIZE) + 2;
const t = 3.5;

let lastColor = '';
for (let r = 0; r < aRows; r++) {
  const py = r * CHAR_FONT_SIZE;
  const heightNorm = py / HEIGHT;
  const scroll = r * 0.4 + t * 8;

  for (let c = 0; c < aCols; c++) {
    const colPhase = Math.sin(c * 2.1 + 0.5) * 3 + Math.sin(c * 0.7 + 1.3) * 5;
    const v1 = Math.sin(scroll + colPhase) * 0.5 + 0.5;
    const v2 = Math.sin(scroll * 2.3 + colPhase * 0.7 + 10) * 0.25 + 0.25;
    const v3 = Math.sin(scroll * 4.1 + colPhase * 0.3 + 20) * 0.125 + 0.125;
    const combined = v1 + v2 + v3;
    const intensity = combined * heightNorm * 0.85;
    const charIdx = Math.min(fireChars.length - 1, Math.floor(intensity * fireChars.length));
    const ch = fireChars[charIdx];
    if (ch === ' ') continue;

    const color = fireColors[Math.min(charIdx, fireColors.length - 1)];
    if (color !== lastColor) {
      aCtx.fillStyle = color;
      lastColor = color;
    }
    aCtx.fillText(ch, c * charWidth, py);
  }
}

// --- Step 5: Composite (matching footer's multiply blend) ---
// Footer: goo blobs (white on black) at OPACITY, then ASCII on top with multiply
// multiply: white×color = color, black×color = black
const final = createCanvas(WIDTH, HEIGHT);
const fCtx = final.getContext('2d');

// Black base
fCtx.fillStyle = 'black';
fCtx.fillRect(0, 0, WIDTH, HEIGHT);

// Draw goo blobs at opacity
fCtx.globalAlpha = OPACITY;
fCtx.drawImage(threshCanvas, 0, 0);
fCtx.globalAlpha = 1;

// Multiply ASCII on top
fCtx.globalCompositeOperation = 'multiply';
fCtx.drawImage(asciiCanvas, 0, 0);
fCtx.globalCompositeOperation = 'source-over';

// Vignette
const vignette = fCtx.createRadialGradient(WIDTH/2, HEIGHT*0.55, WIDTH*0.1, WIDTH/2, HEIGHT*0.55, WIDTH*0.6);
vignette.addColorStop(0, 'rgba(0,0,0,0)');
vignette.addColorStop(0.6, 'rgba(0,0,0,0.3)');
vignette.addColorStop(1, 'rgba(0,0,0,0.7)');
fCtx.fillStyle = vignette;
fCtx.fillRect(0, 0, WIDTH, HEIGHT);

const outPath = path.join(__dirname, '..', 'public', 'og-bg.png');
const buffer = final.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);
console.log(`Generated ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
