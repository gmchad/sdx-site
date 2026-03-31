'use client'

import React from 'react';
import Link from 'next/link';
import BackgroundEffects from '@/app/components/BackgroundEffects';
import MetaballCanvas from '@/app/components/MetaballCanvas';
import AsciiButton from '@/app/components/AsciiButton';

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      {/* Full-bleed canvas layer — same as hero */}
      <div className="absolute inset-0 w-screen overflow-hidden">
        <BackgroundEffects showLetterforms={false} />
        <MetaballCanvas />
      </div>

      {/* Content layer */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-[8rem] md:text-[12rem] text-white leading-none mb-4 prismatic-glow">
            404
          </h1>
          <p className="text-base md:text-lg text-white/60 mb-8 max-w-md mx-auto">
            This page doesn&apos;t exist yet.<br />Maybe you should build it.
          </p>
          <Link href="/" className="inline-block">
            <AsciiButton>Go home</AsciiButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
