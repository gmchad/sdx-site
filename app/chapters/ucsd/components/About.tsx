'use client'

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MotionSection from '@/app/components/motion/MotionSection';
import { UCSD_EVENTS } from '../lib/links';
import media from '../lib/media';

export default function About() {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 30%, rgba(17,187,205,0.12), transparent 60%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(217,44,45,0.08), transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Text column — top: what we do, middle: CTA, bottom: who can join (aligned with collage) */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:h-full lg:gap-0">
            <MotionSection>
              <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight leading-[1.08] prismatic-glow-sm">
                What we do.
              </h2>
              <ul className="mt-5 space-y-3 text-sm md:text-base text-white/50 leading-relaxed max-w-md list-disc pl-5 marker:text-white/30">
                <li>
                  Host builder days to showcase community projects and get feedback
                </li>
                <li>
                  Organize hackathons, fireside chats, and other events with startup founders
                  and industry speakers
                </li>
                <li>
                  Cultivate UCSD&apos;s builder community with fun events (cookouts, builder
                  nights, hikes, etc.)
                </li>
              </ul>
            </MotionSection>

            {/* Between the two copy blocks; slightly above true center on desktop */}
            <MotionSection
              delay={0.08}
              className="max-w-md flex justify-center lg:flex-1 lg:items-center lg:-translate-y-12"
            >
              <Link
                href={UCSD_EVENTS}
                className="btn-outline-glow px-8 py-3.5 text-sm font-bold tracking-wide rounded-sm inline-flex items-center gap-2.5"
              >
                see all events
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </MotionSection>

            <MotionSection delay={0.12} className="max-w-md lg:mt-auto lg:-translate-y-14">
              <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight leading-[1.08] prismatic-glow-sm">
                Who can join.
              </h2>
              <p className="mt-5 text-sm md:text-base text-white/50 leading-relaxed">
                UCSD students who are <em className="italic text-white/60">genuinely</em>{' '}
                curious and <em className="italic text-white/60">passionate</em> about
                building.
              </p>
            </MotionSection>
          </div>

          {/* Event collage — Luma covers, title only */}
          <div className="lg:col-span-7 flex lg:h-full">
            <MotionSection delay={0.08} className="w-full">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {media.about.map((tile) => (
                  <a
                    key={tile.id}
                    href={tile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all duration-300 hover:border-white/25 hover:z-10"
                    style={{ transform: `rotate(${tile.rotate})` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tile.cover}
                      alt={tile.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                      onError={(e) => {
                        // Fallback wash if photo not dropped in yet
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${tile.accent}44 0%, transparent 55%),
                          linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.35) 100%)`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                    <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
                      <h4 className="font-display text-xl sm:text-2xl text-white tracking-tight leading-snug">
                        {tile.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </section>
  );
}
