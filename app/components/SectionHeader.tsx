import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${className}`}>
      {badge && (
        <span className="inline-block text-xs uppercase tracking-widest text-white/40 border border-white/10 rounded-sm px-3 py-1 mb-4">
          {badge}
        </span>
      )}
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
