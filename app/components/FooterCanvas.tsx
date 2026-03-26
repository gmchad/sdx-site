'use client'

import React, { useEffect, useRef } from 'react';

const FooterCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const gooRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const built = useRef(false);

  const opacity = 0.50;
  const blur = 5;
  const contrast = 40;
  const threshold = -15;
  const cellSize = 42;
  const mouseRadius = 280;
  const mouseStrength = 80;
  const mouseLag = 0.99;

  // Characters ordered by density: sparse → dense
  const fireChars = ' .`-\'_,^:;~=><+!?*/\\)s(d{x}[S]D|X#%&@';

  // Rainbow colors mapped to character density: blue (sparse/top) → orange (dense/bottom)
  const fireColors = [
    '#035593', // blue — sparsest
    '#035593',
    '#035593',
    '#035593',
    '#035593',
    '#11BBCD', // cyan
    '#11BBCD',
    '#11BBCD',
    '#11BBCD',
    '#11BBCD',
    '#11BBCD',
    '#11BBCD',
    '#03C661', // green
    '#03C661',
    '#03C661',
    '#03C661',
    '#03C661',
    '#03C661',
    '#03C661',
    '#fac205', // yellow
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fac205',
    '#fc5715', // orange — densest
    '#fc5715',
    '#fc5715',
    '#fc5715',
    '#fc5715',
    '#fc5715',
    '#fc5715',
  ];

  // Simple seeded noise for fire turbulence
  const noiseTable = useRef<Float32Array | null>(null);
  if (!noiseTable.current) {
    const t = new Float32Array(512);
    for (let i = 0; i < 512; i++) t[i] = Math.random();
    noiseTable.current = t;
  }
  const noise = (x: number, y: number): number => {
    const t = noiseTable.current!;
    const ix = ((Math.floor(x) % 256) + 256) % 256;
    const iy = ((Math.floor(y) % 256) + 256) % 256;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const a = t[ix + (iy & 255)];
    const b = t[(ix + 1) % 256 + (iy & 255)];
    const c = t[ix + ((iy + 1) & 255)];
    const d = t[(ix + 1) % 256 + ((iy + 1) & 255)];
    const lx1 = a + (b - a) * fx;
    const lx2 = c + (d - c) * fx;
    return lx1 + (lx2 - lx1) * fy;
  };

  const buildGrid = () => {
    const el = gooRef.current;
    const root = rootRef.current;
    if (!el || !root) return;

    while (el.firstChild) el.removeChild(el.firstChild);
    cellsRef.current = [];

    const sr = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const rect = root.getBoundingClientRect();
    const w = rect.width || 1200;
    const h = rect.height || 600;
    const gap = cellSize + 12;
    const cols = Math.ceil(w / gap) + 2;
    const rows = Math.ceil(h / gap) + 2;
    const offsetX = (w - (cols - 1) * gap) / 2;
    const offsetY = (h - (rows - 1) * gap) / 2;

    const frag = document.createDocumentFragment();
    let css = '';
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const s = r * cols + c + 7;
        // Density: thick at bottom, thinning toward top
        const rowNorm = r / (rows - 1);
        const spawnChance = rowNorm * rowNorm * 0.7;
        if (sr(s) > spawnChance) continue;

        const cx = offsetX + c * gap;
        const cy = offsetY + r * gap;

        const wp = [];
        for (let i = 0; i < 4; i++) {
          const angle = Math.floor(sr(s + 10 + i * 3) * 4);
          const dirs = [[1, -1], [-1, -1], [1, 1], [-1, 1]];
          const [dx, dy] = dirs[angle];
          const dist = 8 + sr(s + 11 + i * 3) * 14;
          wp.push({ x: Math.round(dx * dist), y: Math.round(dy * dist) });
        }

        const dur = 8 + sr(s + 3) * 10;
        const delay = sr(s + 4) * 6;

        const div = document.createElement('div');
        div.dataset.homeX = String(cx);
        div.dataset.homeY = String(cy);
        div.dataset.offX = '0';
        div.dataset.offY = '0';
        Object.assign(div.style, {
          position: 'absolute',
          left: `${cx}px`,
          top: `${cy}px`,
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          background: 'white',
          borderRadius: '0%',
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          animation: `fd${idx} ${dur.toFixed(1)}s cubic-bezier(1,0,0.31,1.39) ${delay.toFixed(1)}s infinite`,
        });

        css += `@keyframes fd${idx}{
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
        cellsRef.current.push(div);
        idx++;
      }
    }

    css += `@media(prefers-reduced-motion:reduce){div[style*="animation"]{animation:none!important}}\n`;

    const style = document.createElement('style');
    style.textContent = css;
    el.appendChild(style);
    el.appendChild(frag);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const doBuild = () => {
      const rect = root.getBoundingClientRect();
      if (rect.height > 10) {
        buildGrid();
      }
    };

    const ro = new ResizeObserver(() => {
      built.current = false;
      doBuild();
    });
    ro.observe(root);

    // Multiple attempts — footer may not have laid out on first frame
    requestAnimationFrame(doBuild);
    setTimeout(doBuild, 100);
    setTimeout(doBuild, 500);

    return () => {
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse interaction + ASCII fire rendering
  useEffect(() => {
    const container = rootRef.current;
    const asciiCanvas = asciiCanvasRef.current;
    if (!container || !asciiCanvas) return;

    const onDocMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      if (
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom
      ) {
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      } else {
        mouseRef.current = { x: -1000, y: -1000 };
      }
    };
    document.addEventListener('mousemove', onDocMove);

    const charFontSize = 11;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Mouse interaction — same as hero
      const target = mouseRef.current;
      const smooth = smoothMouseRef.current;
      smooth.x += (target.x - smooth.x) * mouseLag;
      smooth.y += (target.y - smooth.y) * mouseLag;

      for (const cell of cellsRef.current) {
        const hx = parseFloat(cell.dataset.homeX || '0');
        const hy = parseFloat(cell.dataset.homeY || '0');
        const ddx = hx - smooth.x;
        const ddy = hy - smooth.y;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

        let targetOffX = 0;
        let targetOffY = 0;
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * mouseStrength;
          targetOffX = -(ddx / dist) * force;
          targetOffY = -(ddy / dist) * force;
        }

        const curOffX = parseFloat(cell.dataset.offX || '0');
        const curOffY = parseFloat(cell.dataset.offY || '0');
        const newOffX = curOffX + (targetOffX - curOffX) * 0.08;
        const newOffY = curOffY + (targetOffY - curOffY) * 0.08;
        cell.dataset.offX = String(newOffX);
        cell.dataset.offY = String(newOffY);

        cell.style.left = `${hx + newOffX}px`;
        cell.style.top = `${hy + newOffY}px`;
      }

      // Draw ASCII fire — procedural, scrolling upward
      const cw = Math.ceil(w);
      const ch = Math.ceil(h);
      if (asciiCanvas.width !== cw || asciiCanvas.height !== ch) {
        asciiCanvas.width = cw;
        asciiCanvas.height = ch;
      }

      const ctx = asciiCanvas.getContext('2d');
      if (!ctx) { rafRef.current = requestAnimationFrame(tick); return; }

      // Black background essential for multiply blend
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, cw, ch);
      ctx.font = `${charFontSize}px "Space Mono", monospace`;
      ctx.textBaseline = 'top';

      const charWidth = ctx.measureText('@').width || charFontSize * 0.6;
      const cols = Math.ceil(cw / charWidth) + 5;
      const rows = Math.ceil(ch / charFontSize) + 2;
      const t = performance.now() * 0.001;

      // Draw character by character with color mapped to density
      let lastColor = '';
      for (let r = 0; r < rows; r++) {
        const py = r * charFontSize;
        const heightNorm = py / ch; // 0 at top, 1 at bottom
        const scroll = r * 0.4 + t * 8;

        for (let c = 0; c < cols; c++) {
          const colPhase = Math.sin(c * 2.1 + 0.5) * 3 + Math.sin(c * 0.7 + 1.3) * 5;

          const v1 = Math.sin(scroll + colPhase) * 0.5 + 0.5;
          const v2 = Math.sin(scroll * 2.3 + colPhase * 0.7 + 10) * 0.25 + 0.25;
          const v3 = Math.sin(scroll * 4.1 + colPhase * 0.3 + 20) * 0.125 + 0.125;
          const combined = v1 + v2 + v3;

          const intensity = combined * heightNorm * 0.85;
          const charIdx = Math.min(fireChars.length - 1, Math.floor(intensity * fireChars.length));
          const ch2 = fireChars[charIdx];

          if (ch2 === ' ') continue; // skip spaces for performance

          // Color based on character density index
          const color = fireColors[Math.min(charIdx, fireColors.length - 1)];
          if (color !== lastColor) {
            ctx.fillStyle = color;
            lastColor = color;
          }

          ctx.fillText(ch2, c * charWidth, py);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onDocMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [mouseRadius, mouseStrength, mouseLag, cellSize, opacity]);


  return (
    <div
      ref={rootRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG Goo Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo-footer">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${threshold}`}
            />
          </filter>
        </defs>
      </svg>

      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize + 12}px ${cellSize + 12}px`,
          backgroundPosition: 'center center',
        }}
      />

      {/* Compositing layers */}
      <div className="absolute inset-0" style={{ isolation: 'isolate' }}>
        {/* Goo-filtered blobs on black background */}
        <div className="absolute inset-0 bg-black">
          <div
            ref={gooRef}
            className="absolute inset-0"
            style={{ filter: 'url(#goo-footer)', opacity }}
          />
        </div>

        {/* ASCII fire on top — multiply blend clips it to the white blob areas */}
        <canvas
          ref={asciiCanvasRef}
          className="absolute top-0 left-0"
          style={{ mixBlendMode: 'multiply', width: '100%', height: '100%' }}
        />
      </div>

      {/* Top fade — gentle, lets most of the fire through */}
      <div
        className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}
      />

      {/* Side fades */}
      <div
        className="absolute inset-y-0 left-0 w-[10%] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-[10%] pointer-events-none"
        style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
      />
    </div>
  );
};

export default FooterCanvas;
