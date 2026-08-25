'use client'

import React from 'react';
import MotionSection from '@/app/components/motion/MotionSection';

interface SectionTagProps {
  index?: string;
  label?: string;
  heading?: string;
  className?: string;
}

/** Editorial micro-label row: "001 — Label" + hairline, with optional display heading. */
export default function SectionTag({ index, label, heading, className = '' }: SectionTagProps) {
  const showTag = Boolean(index || label);

  return (
    <MotionSection className={className}>
      {showTag && (
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] uppercase tracking-widest text-white/30 whitespace-nowrap">
            {index && (
              <>
                {index} <span className="text-white/15">—</span>{' '}
              </>
            )}
            {label}
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
        </div>
      )}
      {heading && (
        <h2 className="font-display text-3xl md:text-4xl text-white tracking-tight prismatic-glow-sm">
          {heading}
        </h2>
      )}
    </MotionSection>
  );
}
