'use client'

import React, { useEffect, useRef } from 'react';

const MetaballCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
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
  const borderRadius = 0;
  const cellSize = 42;
  const mouseRadius = 280;
  const mouseStrength = 80;
  const mouseLag = 0.99;
  const clearRadius = 0.45;

  const buildGrid = () => {
    const el = gooRef.current;
    if (!el) return;

    while (el.firstChild) el.removeChild(el.firstChild);
    cellsRef.current = [];

    const sr = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const rect = el.getBoundingClientRect();
    const w = rect.width || 1200;
    const h = rect.height || 800;
    const gap = cellSize + 12;
    const cols = Math.ceil(w / gap) + 2;
    const rows = Math.ceil(h / gap) + 2;
    const offsetX = (w - (cols - 1) * gap) / 2;
    const offsetY = (h - (rows - 1) * gap) / 2;

    const centerX = w / 2;
    const centerY = h / 2;
    const clearW = w * clearRadius;
    const clearH = h * 0.4;

    const frag = document.createDocumentFragment();
    let css = '';
    let idx = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const s = r * cols + c + 7;
        if (sr(s) > 0.55) continue;

        const cx = offsetX + c * gap;
        const cy = offsetY + r * gap;

        const ex = (cx - centerX) / clearW;
        const ey = (cy - centerY) / clearH;
        const ellipseDist = ex * ex + ey * ey;

        if (ellipseDist < 1) {
          if (ellipseDist < 0.4) continue;
          if (sr(s + 20) > 0.15) continue;
        }

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
          borderRadius: `${borderRadius}%`,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          animation: `md${idx} ${dur.toFixed(1)}s cubic-bezier(1,0,0.31,1.39) ${delay.toFixed(1)}s infinite`,
        });

        css += `@keyframes md${idx}{
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
    if (!built.current) {
      built.current = true;
      requestAnimationFrame(() => buildGrid());
    }

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        built.current = false;
        buildGrid();
      }, 200);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse interaction + ASCII swirl rendering
  useEffect(() => {
    const container = gooRef.current?.parentElement;
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

    const asciiChars = '@#%&*+=-:·.';
    const charFontSize = 11;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Mouse interaction
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

      // Draw ASCII swirl — use same rect as container for exact match
      const cw = Math.ceil(w);
      const ch = Math.ceil(h);
      if (asciiCanvas.width !== cw || asciiCanvas.height !== ch) {
        asciiCanvas.width = cw;
        asciiCanvas.height = ch;
      }

      const ctx = asciiCanvas.getContext('2d');
      if (!ctx) { rafRef.current = requestAnimationFrame(tick); return; }

      // Black background is essential — multiply blend: black × anything = black
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, cw, ch);
      ctx.font = `${charFontSize}px "Space Mono", monospace`;
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'top';

      // Measure actual character width once instead of guessing
      const charWidth = ctx.measureText('@').width || charFontSize * 0.6;
      const cols = Math.ceil(cw / charWidth) + 5; // extra buffer
      const rows = Math.ceil(ch / charFontSize) + 2;
      const t = performance.now() * 0.0003;

      for (let r = 0; r < rows; r++) {
        let line = '';
        for (let c = 0; c < cols; c++) {
          const px = c * charWidth;
          const py = r * charFontSize;
          const dx = px - cw / 2;
          const dy = py - ch / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);
          const swirl = Math.sin(dist * 0.015 - t * 3 + angle * 2) * 0.5 + 0.5;
          const idx = Math.floor(swirl * (asciiChars.length - 1));
          line += asciiChars[idx];
        }
        ctx.fillText(line, 0, r * charFontSize);
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
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* SVG Goo Filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
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

      {/*
        Compositing: goo blobs (white on black bg) + ASCII on top with multiply blend.
        Multiply: white × white = white (ASCII visible where blobs are),
                  black × white = black (ASCII hidden where no blobs).
      */}
      <div className="absolute inset-0" style={{ isolation: 'isolate' }}>
        {/* Goo-filtered blobs on black background */}
        <div className="absolute inset-0 bg-black">
          <div
            ref={gooRef}
            className="absolute inset-0"
            style={{ filter: 'url(#goo)', opacity }}
          />
        </div>

        {/* ASCII swirl on top — multiply blend clips it to the white blob areas */}
        <canvas
          ref={asciiCanvasRef}
          className="absolute top-0 left-0"
          style={{ mixBlendMode: 'multiply', width: '100%', height: '100%' }}
        />
      </div>

      {/* Radial fade around center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 35% at 50% 48%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[50%] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 40%, black 75%)' }}
      />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-[10%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.3) 100%)' }}
      />

    </div>
  );
};

export default MetaballCanvas;
