'use client'

import React, { useRef } from 'react';
import { m, useInView } from 'motion/react';
import { EASE_SOFT } from '@/lib/motion';
import MotionSection from '@/app/components/motion/MotionSection';

/** Judgment-style animated strikethrough — a bar sweeps across on scroll into view. */
function Strike({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap text-white/40">
      {children}
      <m.span
        aria-hidden="true"
        className="absolute left-0 top-1/2 block h-[0.055em] w-full -translate-y-1/2"
        style={{ backgroundColor: 'rgba(217, 44, 45, 0.75)', originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.7, ease: EASE_SOFT, delay: 0.5 }}
      />
    </span>
  );
}

export default function Manifesto() {
  return (
    <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ghosted letterform — UCSD bleeding off the right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-[60vw] md:w-[45vw] overflow-hidden" aria-hidden="true">
        <div className="absolute -right-[12%] md:-right-[18%] top-1/2 -translate-y-1/2 font-display text-[70vw] md:text-[34vw] ghosted-letterform rotate-90 whitespace-nowrap">
          UCSD
        </div>
      </div>

      <div className="relative z-[1] max-w-6xl mx-auto">
        <MotionSection>
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white tracking-tight leading-[1.1] md:leading-[1.04] prismatic-glow-sm">
            Stop <Strike>waiting</Strike>.
            <br />
            Start shipping.
          </h2>
        </MotionSection>
      </div>
    </section>
  );
}
