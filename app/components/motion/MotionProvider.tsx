'use client'

import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { createContext, useContext } from 'react';
import { EASE_SOFT } from '@/lib/motion';

const ReducedMotionContext = createContext(false);
export const useIsReducedMotion = () => useContext(ReducedMotionContext);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ ease: EASE_SOFT, duration: 0.5 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
