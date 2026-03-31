'use client'

import React, { useRef, useContext, useState, useEffect } from 'react';
import { m, useInView } from 'motion/react';
import { transitions } from '@/lib/motion';
import { TransitionPhaseContext } from './PageTransition';

interface SectionHeaderProps {
  title: React.ReactNode;
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '100px 0px -50px 0px' });
  const phase = useContext(TransitionPhaseContext);
  const [locked, setLocked] = useState(false);

  // Latch: once visible, stay visible forever
  useEffect(() => {
    if (isInView && phase === 'idle' && !locked) {
      setLocked(true);
    }
  }, [isInView, phase, locked]);

  return (
    <div ref={ref} className={`mb-12 ${className}`}>
      {badge && (
        <m.span
          className="inline-block text-xs uppercase tracking-widest text-white/40 border border-white/10 rounded-sm px-3 py-1 mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={locked ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ ...transitions.appear, delay: 0 }}
        >
          {badge}
        </m.span>
      )}
      <m.h1
        className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-tight prismatic-glow"
        initial={{ opacity: 0, y: 24 }}
        animate={locked ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ ...transitions.appear, delay: badge ? 0.1 : 0 }}
      >
        {title}
      </m.h1>
      {subtitle && (
        <m.p
          className="mt-4 text-base text-white/50 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={locked ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ ...transitions.appear, delay: badge ? 0.2 : 0.1 }}
        >
          {subtitle}
        </m.p>
      )}
    </div>
  );
};

export default SectionHeader;
