'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CanvasSettings {
  heroBlur: number;
  heroContrast: number;
  heroThreshold: number;
  heroOpacity: number;
  heroCellSize: number;
  heroDensity: number;
  footerBlur: number;
  footerContrast: number;
  footerThreshold: number;
  footerOpacity: number;
  footerCellSize: number;
  footerDensity: number;
}

const defaults: CanvasSettings = {
  heroBlur: 8.5,
  heroContrast: 48,
  heroThreshold: -37,
  heroOpacity: 0.7,
  heroCellSize: 62,
  heroDensity: 0.9,
  footerBlur: 8.5,
  footerContrast: 48,
  footerThreshold: -36,
  footerOpacity: 0.63,
  footerCellSize: 62,
  footerDensity: 1.3,
};

const CanvasSettingsContext = createContext<{
  settings: CanvasSettings;
  setSettings: React.Dispatch<React.SetStateAction<CanvasSettings>>;
}>({ settings: defaults, setSettings: () => {} });

export const useCanvasSettings = () => useContext(CanvasSettingsContext);

export function CanvasSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CanvasSettings>(defaults);
  return (
    <CanvasSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </CanvasSettingsContext.Provider>
  );
}

export default function CanvasDebugPanel() {
  const { settings, setSettings } = useCanvasSettings();
  const [open, setOpen] = useState(false);

  const update = (key: keyof CanvasSettings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const w = window as any;
    if (w.__sdxInitialized) return;
    w.__sdxInitialized = true;

    // Track active modes
    const modes: Record<string, boolean> = {
      party: false,
      matrix: false,
      light: false,
      flip: false,
      ascii: false,
    };
    let partyInterval: NodeJS.Timeout | null = null;
    let savedTexts: { el: HTMLElement; html: string }[] = [];

    const getAllElements = () => document.querySelectorAll('nav, main, footer, section, div[class*="fixed"]');

    const setFilterAll = (filter: string) => {
      getAllElements().forEach(el => {
        const h = el as HTMLElement;
        h.style.filter = filter;
      });
    };

    const clearAllFilters = () => {
      getAllElements().forEach(el => {
        const h = el as HTMLElement;
        h.style.filter = '';
      });
    };

    const injectCSS = (id: string, css: string) => {
      let style = document.getElementById(id);
      if (!style) {
        style = document.createElement('style');
        style.id = id;
        document.head.appendChild(style);
      }
      style.textContent = css;
    };

    const removeCSS = (id: string) => {
      document.getElementById(id)?.remove();
    };

    w.sdx = {
      tweak: () => {
        setOpen(true);
        console.log('%c✨ Canvas panel enabled', 'color: #03C661; font-weight: bold');
      },
      hidePanel: () => setOpen(false),
      getSettings: () => ({ ...settings }),
      setSettings: (overrides: Partial<CanvasSettings>) => {
        setSettings(prev => ({ ...prev, ...overrides }));
        console.log('%c🎨 Settings updated', 'color: #11BBCD; font-weight: bold');
      },
      reset: () => {
        setSettings(defaults);
        // Turn off all active modes
        if (modes.party) w.sdx.party();
        if (modes.matrix) w.sdx.matrix();
        if (modes.light) w.sdx.lightmode();
        if (modes.flip) w.sdx.flip();
        console.log('%c🔄 Everything reset', 'color: #fac205; font-weight: bold');
      },

      party: () => {
        modes.party = !modes.party;
        if (modes.party) {
          let deg = 0;
          // CSS to make text and backgrounds cycle too
          injectCSS('sdx-party', `
            @keyframes sdx-party-text {
              0% { color: #d92c2d; }
              16% { color: #fc5715; }
              33% { color: #fac205; }
              50% { color: #03C661; }
              66% { color: #11BBCD; }
              83% { color: #035593; }
              100% { color: #d92c2d; }
            }
            h1, h2, h3 {
              animation: sdx-party-text 4s linear infinite !important;
            }
            .btn-secondary, .btn-outline-glow {
              animation: sdx-party-text 3s linear infinite !important;
              border-color: currentColor !important;
            }
            .fixed [style*="border"] {
              border-color: currentColor !important;
            }
          `);
          partyInterval = setInterval(() => {
            deg = (deg + 8) % 360;
            document.documentElement.style.filter = `hue-rotate(${deg}deg) saturate(1.5)`;
            // Tint the goo containers so white squares pick up the hue-rotate
            document.querySelectorAll('[style*="filter: url(#goo)"], [style*="filter: url(#goo-footer)"]').forEach(el => {
              (el as HTMLElement).style.background = `hsl(${deg}, 80%, 60%)`;
            });
          }, 40);
          console.log('%c🎉 PARTY MODE ON — run sdx.party() again to stop', 'color: #fc5715; font-weight: bold; font-size: 14px');
        } else {
          if (partyInterval) clearInterval(partyInterval);
          partyInterval = null;
          document.documentElement.style.filter = '';
          // Reset goo container backgrounds
          document.querySelectorAll('[style*="filter: url(#goo)"], [style*="filter: url(#goo-footer)"]').forEach(el => {
            (el as HTMLElement).style.background = '';
          });
          removeCSS('sdx-party');
          console.log('%c🎉 Party over. Back to work.', 'color: rgba(255,255,255,0.5)');
        }
      },

      matrix: () => {
        modes.matrix = !modes.matrix;
        if (modes.matrix) {
          // No filter on html — it desaturates the green. Use pure CSS color overrides instead.
          injectCSS('sdx-matrix', `
            body, html {
              background-color: #000800 !important;
            }
            *, *::before, *::after {
              color: #01FF00 !important;
              border-color: rgba(1, 255, 0, 0.3) !important;
              --foreground: 120 100% 50% !important;
            }
            .bg-white, .bg-white\\/10, [class*="bg-white"] {
              background-color: rgba(1, 255, 0, 0.08) !important;
            }
            .btn-secondary {
              background: rgba(1, 255, 0, 0.15) !important;
              color: #01FF00 !important;
            }
            canvas {
              filter: saturate(0) brightness(0.8) sepia(1) hue-rotate(70deg);
            }
            [style*="background: white"], [style*="background:white"] {
              background: #01FF00 !important;
            }
            [style*="border: 1px solid white"] {
              border-color: rgba(1, 255, 0, 0.4) !important;
            }
            svg text, .font-display {
              color: #01FF00 !important;
            }
          `);
          console.log('%c🖥️  MATRIX MODE ON — run sdx.matrix() to unplug', 'color: #01FF00; font-weight: bold; font-size: 14px; background: black; padding: 4px 8px');
        } else {
          removeCSS('sdx-matrix');
          console.log('%c🖥️  Unplugged from the Matrix.', 'color: rgba(255,255,255,0.5)');
        }
      },

      lightmode: () => {
        modes.light = !modes.light;
        if (modes.light) {
          console.log('%c☀️  Oh god... you actually did it', 'color: #fac205; font-weight: bold; font-size: 14px');
          console.log('%c   You absolute masochist. You WANT to burn your retinas?', 'color: #fc5715');
          console.log('%c   Fine. Toggle it off when you\'ve had enough pain.', 'color: #d92c2d');

          injectCSS('sdx-light', `
            html {
              filter: invert(1) hue-rotate(180deg) !important;
            }
          `);

          // Save and replace ALL text on the page
          savedTexts = [];
          const insults = [
            'MY EYES!', 'WHY WOULD YOU DO THIS', 'LIGHT MODE ENJOYER 💀',
            'You monster.', 'This is a cry for help', 'AAAAAHHH',
            'Touch grass instead', 'Who hurt you?', 'Certified masochist',
            'Dark mode exists for a reason', 'My retinas are suing you',
            'Even the sun is embarrassed', 'This is violence', 'MAKE IT STOP',
            'You call this a feature?', 'Error: too much brightness',
            'Warning: permanent eye damage incoming', '🔥 This is fine 🔥',
            'The light... it burns', 'I can\'t believe you\'ve done this',
          ];

          document.querySelectorAll('h1, h2, h3, p, span, a, button, label').forEach((el) => {
            const h = el as HTMLElement;
            if (h.children.length > 0 && h.tagName !== 'A' && h.tagName !== 'BUTTON') return;
            if (!h.innerText || h.innerText.trim().length < 2) return;
            if (h.closest('[aria-hidden="true"]')) return;
            savedTexts.push({ el: h, html: h.innerHTML });
            h.innerText = insults[Math.floor(Math.random() * insults.length)];
          });
        } else {
          removeCSS('sdx-light');
          savedTexts.forEach(({ el, html }) => { el.innerHTML = html; });
          savedTexts = [];
          console.log('%c😮‍💨 Dark mode restored. You\'re safe now.', 'color: #03C661; font-weight: bold');
        }
      },

      flip: () => {
        modes.flip = !modes.flip;
        if (modes.flip) {
          document.documentElement.style.transition = 'transform 1s cubic-bezier(1,0,0.31,1.39)';
          document.documentElement.style.transform = 'rotate(180deg)';
          console.log('%c🙃 Australian mode ON', 'color: #11BBCD; font-weight: bold; font-size: 14px');
        } else {
          document.documentElement.style.transform = '';
          setTimeout(() => { document.documentElement.style.transition = ''; }, 1100);
          console.log('%c🙂 Right side up again.', 'color: rgba(255,255,255,0.5)');
        }
      },

      wtf: () => {
        console.log(`%c
  uh oh...
`, 'color: #d92c2d; font-weight: bold; font-size: 20px');
        console.log(`%c
  ┌──────────────────────────────────────────────────┐
  │                                                  │
  │   sdx.tweak()        🎛️  Canvas controls         │
  │   sdx.party()        🎉  Rainbow rave  [toggle]  │
  │   sdx.matrix()       🖥️   The Matrix    [toggle]  │
  │   sdx.lightmode()    ☀️  Pain mode     [toggle]  │
  │   sdx.flip()         🙃  Australian    [toggle]  │
  │   sdx.reset()        🔄  Reset canvas            │
  │   sdx.wtf()          📖  You are here            │
  │                                                  │
  └──────────────────────────────────────────────────┘
`, 'color: #11BBCD; font-family: monospace; font-size: 11px');
      },
    };

    // ASCII splash — S D x with fire char fills, spaced out, lowercase x
    const fill = '.`-\'_,^:;~=><+!?*/\\)s(d{x}[S]D|X#%&@';
    const rc = () => fill[Math.floor(Math.random() * fill.length)];

    // S, D, and lowercase x — bigger, more horizontal space
    const rawLines = [
      '   ████████╗   ███████╗                      ',
      '   ██╔═════╝   ██╔═══██╗                     ',
      '   ██║         ██║   ██║   ╔═╗     ╔═╗      ',
      '   ████████╗   ██║   ██║    ╚██╗  ██╔╝       ',
      '   ╚═════██║   ██║   ██║     ╚████╔╝         ',
      '         ██║   ██║   ██║     ███╔═██╗        ',
      '   ████████║   ███████╔╝   ███╔╝   ╚██╗      ',
      '   ╚═══════╝   ╚══════╝    ╚══╝    ╚══╝       ',
    ];

    const textured = rawLines.map(line =>
      line.split('').map(ch => {
        if (ch === ' ') return ' ';
        if (ch === '█') return rc();
        return ch;
      }).join('')
    ).join('\n');

    console.log(`%c${textured}`, 'color: white; font-family: monospace; font-size: 14px; line-height: 1.35');
    console.log('');
    console.log('%c  San Diego\'s builder-first technology community', 'color: rgba(255,255,255,0.4); font-size: 11px');
    console.log('');
    console.log('%c  hint: %csdx.%c???() — what the...?', 'color: rgba(255,255,255,0.2); font-size: 10px; font-style: italic', 'color: rgba(255,255,255,0.35); font-weight: bold; font-style: normal; font-size: 10px', 'color: rgba(255,255,255,0.2); font-size: 10px; font-style: italic');
    console.log('');
  }, [settings, setSettings]);

  if (!open) return null;

  const Slider = ({ label, k, min, max, step }: { label: string; k: keyof CanvasSettings; min: number; max: number; step: number }) => (
    <div className="flex items-center gap-2">
      <label className="text-[10px] text-white/60 w-20 shrink-0">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={settings[k]}
        onChange={e => update(k, parseFloat(e.target.value))}
        className="flex-1 h-1 accent-white cursor-pointer"
        style={{ touchAction: 'none', pointerEvents: 'auto' }}
      />
      <span className="text-[10px] text-white/80 w-10 text-right font-mono">{settings[k]}</span>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-[99999]" style={{ pointerEvents: 'auto' }} onPointerDown={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(false)}
        className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-sm mb-1 block ml-auto"
      >
        Hide
      </button>
      <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-sm p-3 w-72 space-y-3">
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Hero</p>
          <div className="space-y-1.5">
            <Slider label="Blur" k="heroBlur" min={0} max={20} step={0.5} />
            <Slider label="Contrast" k="heroContrast" min={1} max={100} step={1} />
            <Slider label="Threshold" k="heroThreshold" min={-50} max={0} step={1} />
            <Slider label="Opacity" k="heroOpacity" min={0} max={1} step={0.01} />
            <Slider label="Cell Size" k="heroCellSize" min={10} max={80} step={2} />
            <Slider label="Density" k="heroDensity" min={0.1} max={2} step={0.05} />
          </div>
        </div>
        <div className="border-t border-white/10 pt-2">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Footer</p>
          <div className="space-y-1.5">
            <Slider label="Blur" k="footerBlur" min={0} max={20} step={0.5} />
            <Slider label="Contrast" k="footerContrast" min={1} max={100} step={1} />
            <Slider label="Threshold" k="footerThreshold" min={-50} max={0} step={1} />
            <Slider label="Opacity" k="footerOpacity" min={0} max={1} step={0.01} />
            <Slider label="Cell Size" k="footerCellSize" min={10} max={80} step={2} />
            <Slider label="Density" k="footerDensity" min={0.1} max={2} step={0.05} />
          </div>
        </div>
      </div>
    </div>
  );
}
