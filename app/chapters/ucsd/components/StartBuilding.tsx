'use client'

import React from 'react';
import Link from 'next/link';
import { Calendar, Mail } from 'lucide-react';
import PrismaticCanvas from '@/app/components/PrismaticCanvas';
import AsciiButton from '@/app/components/AsciiButton';
import MotionSection from '@/app/components/motion/MotionSection';
import MotionButton from '@/app/components/motion/MotionButton';
import { UCSD_APPLY_PATH, UCSD_EMAIL, UCSD_LUMA } from '../lib/links';
import { useIsUcsdHost, ucsdPath } from '../lib/ucsd-host';

/** Square icon tile beside the Join button: same height as the button, icon centered. */
function IconTile({
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
    <MotionButton className="self-stretch">
      <a
        href={href}
        aria-label={label}
        title={label}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex h-full aspect-square items-center justify-center rounded-sm border border-white/15 bg-white/[0.04] text-white/60 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
      >
        {children}
      </a>
    </MotionButton>
  );
}

export default function StartBuilding() {
  const onUcsdHost = useIsUcsdHost();
  const applyHref = ucsdPath(UCSD_APPLY_PATH, onUcsdHost);

  return (
    <section id="join" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <PrismaticCanvas intensity="subtle" />

      <MotionSection className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight mb-10 prismatic-glow">
          Start building.
        </h2>

        <div className="flex items-stretch justify-center gap-3">
          <IconTile href={`mailto:${UCSD_EMAIL}`} label={`Email ${UCSD_EMAIL}`}>
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </IconTile>
          <IconTile href={UCSD_LUMA} label="Luma calendar" external>
            <Calendar className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </IconTile>
          <MotionButton>
            <Link href={applyHref} className="block">
              <AsciiButton>Join us</AsciiButton>
            </Link>
          </MotionButton>
        </div>
      </MotionSection>
    </section>
  );
}
