'use client'

import React from 'react';
import MotionButton from '@/app/components/motion/MotionButton';

/**
 * Square icon link that sits beside an AsciiButton.
 * 40px matches the button: one text-xs line (16px) plus 12px padding above and below.
 */
export default function IconTile({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <MotionButton>
      <a
        href={href}
        aria-label={label}
        title={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 bg-white/[0.04] text-white/60 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
      >
        {children}
      </a>
    </MotionButton>
  );
}
