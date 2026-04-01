'use client'

import React from 'react';
import ColorBends from '@/components/ColorBends';

interface PrismaticCanvasProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'vivid';
  palette?: 'full' | 'cool' | 'warm';
  glitchFrequency?: 'none' | 'rare' | 'occasional';
}

const INTENSITY_CONFIG = {
  subtle:  { opacity: 0.45 },
  medium:  { opacity: 0.65 },
  vivid:   { opacity: 0.85 },
};

const PALETTE_COLORS = {
  full: ['#d92c2d', '#fc5715', '#fac205', '#03C661', '#11BBCD', '#035593'],
  cool: ['#03C661', '#11BBCD', '#035593'],
  warm: ['#d92c2d', '#fc5715', '#fac205'],
};

const PrismaticCanvas: React.FC<PrismaticCanvasProps> = ({
  className = '',
  intensity = 'subtle',
  palette = 'full',
}) => {
  const config = INTENSITY_CONFIG[intensity];
  const colors = PALETTE_COLORS[palette];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity: config.opacity }}
    >
      <ColorBends
        className=""
        style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        rotation={45}
        speed={0.4}
        colors={colors as any}
        transparent={false}
        autoRotate={1}
        scale={1.6}
        frequency={1.3}
        warpStrength={0}
        mouseInfluence={1}
        parallax={0}
        noise={0}
      />
    </div>
  );
};

export default PrismaticCanvas;
