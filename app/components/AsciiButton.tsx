'use client'

import React, { useEffect, useRef } from 'react';

const AsciiButton: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = '.`-\'_,^:;=><+!*/?)s(d{x}[S]D|X#%&@';
    const fontSize = 9;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = Math.ceil(rect.width * dpr);
      canvas.height = Math.ceil(rect.height * dpr);
      ctx.scale(dpr, dpr);
    };

    resize();

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(tick); return; }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.scale(dpr, dpr);

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px "Space Mono", monospace`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
      ctx.textBaseline = 'top';

      const charW = ctx.measureText('@').width || fontSize * 0.6;
      const cols = Math.ceil(w / charW) + 1;
      const rows = Math.ceil(h / fontSize) + 1;
      const t = performance.now() * 0.001;

      for (let r = 0; r < rows; r++) {
        let line = '';
        for (let c = 0; c < cols; c++) {
          const colPhase = Math.sin(c * 1.7) * 2;
          const val = Math.sin(r * 0.5 - t * 6 + colPhase) * 0.5 + 0.5;
          const idx = Math.floor(val * (chars.length - 1));
          line += chars[idx];
        }
        ctx.fillText(line, 0, r * fontSize);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden rounded-sm ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      />
      <span className="relative z-10 block px-8 py-3 text-xs uppercase tracking-widest font-bold text-black">
        {children}
      </span>
    </div>
  );
};

export default AsciiButton;
