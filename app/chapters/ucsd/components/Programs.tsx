'use client'

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import MotionGrid from '@/app/components/motion/MotionGrid';
import MotionCard from '@/app/components/motion/MotionCard';
import SectionTag from './SectionTag';

const programs = [
  {
    n: '01',
    color: '#D92C2D',
    name: 'Builder Days',
    desc: 'Show up and ship. Build alongside the chapter, get unstuck, leave with progress.',
  },
  {
    n: '02',
    color: '#FC5715',
    name: 'Hackathons',
    desc: 'Timed sprints. Working demo or it didn\u2019t happen.',
  },
  {
    n: '03',
    color: '#FAC205',
    name: 'Fireside Chats',
    desc: 'Founders and builders, candid and off the record.',
  },
];

export default function Programs() {
  return (
    <section className="relative py-14 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionTag heading="Our events:" className="mb-2" />

        <MotionGrid className="border-t border-white/[0.06]" staggerDelay={0.06}>
          {programs.map((p) => (
            <MotionCard key={p.n} enableHover={false}>
              <div className="group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 md:gap-x-8 py-4 md:py-5 border-b border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.02] px-2 md:px-3 -mx-2 md:-mx-3">
                <span
                  className="font-mono text-[10px] md:text-xs font-bold"
                  style={{ color: p.color }}
                >
                  {p.n}
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl text-white/85 tracking-tight transition-all duration-300 group-hover:text-white group-hover:translate-x-1.5">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/40 leading-snug md:hidden">
                    {p.desc}
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-8">
                  <p className="max-w-[280px] text-sm text-white/40 leading-snug text-right">
                    {p.desc}
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/60 opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>

                <ArrowUpRight className="md:hidden w-3.5 h-3.5 text-white/30 self-start mt-1" />
              </div>
            </MotionCard>
          ))}
        </MotionGrid>
      </div>
    </section>
  );
}
