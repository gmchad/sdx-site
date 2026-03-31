'use client'

import { m } from 'motion/react';
import { variants, transitions } from '@/lib/motion';

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
}

export default function MotionCard({
  children,
  className,
  enableHover = true,
}: MotionCardProps) {
  return (
    <m.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: transitions.appear,
        },
      }}
      whileHover={enableHover ? { y: -4, scale: 1.01, transition: transitions.hover } : undefined}
      whileTap={enableHover ? { scale: 0.99 } : undefined}
    >
      {children}
    </m.div>
  );
}
