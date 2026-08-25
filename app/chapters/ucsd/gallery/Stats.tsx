'use client'

import React from 'react';
import MotionSection from '@/app/components/motion/MotionSection';
import media from '../lib/media';

const stats = [
  {
    value: `${media.stats.attendees.toLocaleString()}+`,
    label: 'attendees hosted',
  },
  {
    value: `${media.stats.events}+`,
    label: 'events run',
  },
  {
    value: `${media.stats.hackathons}+`,
    label: 'hackathons organized',
  },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch w-full gap-8 sm:gap-0 py-8 md:py-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex-1 text-center">
                <p className="font-display text-4xl md:text-5xl text-white tracking-tight prismatic-glow-sm">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-white/40 normal-case tracking-normal">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </MotionSection>
      </div>
    </section>
  );
}
