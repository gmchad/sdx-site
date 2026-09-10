'use client'

import React from 'react';
import Link from 'next/link';
import { Calendar, Mail } from 'lucide-react';
import PrismaticCanvas from '@/app/components/PrismaticCanvas';
import AsciiButton from '@/app/components/AsciiButton';
import MotionSection from '@/app/components/motion/MotionSection';
import MotionButton from '@/app/components/motion/MotionButton';
import IconTile from './IconTile';
import { UCSD_EMAIL, UCSD_JOIN_FORM, UCSD_LUMA } from '../lib/links';

export default function StartBuilding() {
  return (
    <section id="join" className="relative flex min-h-[80svh] items-center py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <PrismaticCanvas intensity="subtle" />

      <MotionSection className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight mb-10 prismatic-glow">
          Start building.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <IconTile href={`mailto:${UCSD_EMAIL}`} label={`Email ${UCSD_EMAIL}`}>
            <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </IconTile>
          <IconTile href={UCSD_LUMA} label="Luma calendar" external>
            <Calendar className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </IconTile>
          <MotionButton>
            <Link href={UCSD_JOIN_FORM} target="_blank" rel="noopener noreferrer" className="block">
              <AsciiButton>Join us</AsciiButton>
            </Link>
          </MotionButton>
        </div>
      </MotionSection>
    </section>
  );
}
