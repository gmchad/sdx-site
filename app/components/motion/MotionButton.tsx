'use client'

import { m } from 'motion/react';

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
      whileHover={{ scale: 1.02, filter: 'brightness(1.15)' }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {children}
    </m.div>
  );
}
