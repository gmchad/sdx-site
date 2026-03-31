import React from 'react';
import PrismaticCanvas from './PrismaticCanvas';

interface BackgroundEffectsProps {
  showLetterforms?: boolean;
  showGrid?: boolean;
  showHolographic?: boolean;
  showPrismatic?: boolean;
  prismaticIntensity?: 'subtle' | 'medium' | 'vivid';
  prismaticPalette?: 'full' | 'cool' | 'warm';
  className?: string;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  showLetterforms = true,
  showGrid = true,
  showHolographic = true,
  showPrismatic = false,
  prismaticIntensity = 'subtle',
  prismaticPalette = 'full',
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

      {/* Prismatic canvas layer */}
      {showPrismatic && (
        <PrismaticCanvas intensity={prismaticIntensity} palette={prismaticPalette} />
      )}

      {/* Holographic texture overlay */}
      {showHolographic && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                #d92c2d,
                #fc5715,
                #fac205,
                #03C661,
                #11BBCD,
                #d92c2d
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
