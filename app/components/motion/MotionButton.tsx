'use client'

import { m } from 'motion/react';
import { transitions } from '@/lib/motion';

interface MotionButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MotionButton({
  children,
  className,
}: MotionButtonProps) {
  return (
    <m.div
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={transitions.buttonHover}
    >
      {children}
    </m.div>
  );
}
