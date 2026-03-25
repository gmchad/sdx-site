import React from 'react';

interface BackgroundEffectsProps {
  showLetterforms?: boolean;
  showGrid?: boolean;
  showHolographic?: boolean;
  className?: string;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  showLetterforms = true,
  showGrid = true,
  showHolographic = true,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {/* Ghosted SDx letterforms */}
      {showLetterforms && (
        <>
          <div className="absolute -left-[5vw] top-[10%] font-display text-[30vw] font-bold text-white/[0.015] select-none leading-none">
            SDx
          </div>
          <div className="absolute -right-[10vw] bottom-[5%] font-display text-[25vw] font-bold text-white/[0.01] select-none leading-none rotate-12">
            SDx
          </div>
        </>
      )}

      {/* Technical grid */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      )}

      {/* Holographic texture overlay */}
      {showHolographic && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                hsl(175, 70%, 40%),
                hsl(220, 75%, 55%),
                hsl(270, 65%, 60%),
                hsl(330, 75%, 55%),
                hsl(35, 85%, 55%),
                hsl(175, 70%, 40%)
              )
            `,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
};

export default BackgroundEffects;
