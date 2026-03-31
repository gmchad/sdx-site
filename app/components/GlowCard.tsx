import React from 'react';

type GlowColor = 'teal' | 'blue' | 'magenta' | 'violet' | 'amber';

interface GlowCardProps {
  color?: GlowColor;
  children: React.ReactNode;
  className?: string;
}

const glowMap: Record<GlowColor, string> = {
  teal: 'shadow-glow-teal',
  blue: 'shadow-glow-blue',
  magenta: 'shadow-glow-magenta',
  violet: 'shadow-glow-violet',
  amber: 'shadow-glow-amber',
};

const GlowCard: React.FC<GlowCardProps> = ({
  color = 'teal',
  children,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white/[0.02] border border-white/[0.06] rounded-lg p-6 backdrop-blur-sm
        hover:border-white/[0.15] hover:${glowMap[color]}
        transition-[border-color,box-shadow] duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlowCard;
