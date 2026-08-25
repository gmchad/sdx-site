'use client'

import React from 'react';
import MotionGrid from '@/app/components/motion/MotionGrid';
import MotionCard from '@/app/components/motion/MotionCard';
import SectionTag from '../components/SectionTag';

const leads = [
  { name: 'Dhruv Kanetkar', role: 'Founder', initials: 'DK' },
  { name: 'Priya Mehta', role: 'Demo Nights', initials: 'PM' },
  { name: 'Jordan Liu', role: 'Technical', initials: 'JL' },
  { name: 'Sofia Reyes', role: 'Community', initials: 'SR' },
];

export default function Leads() {
  return (
    <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionTag index="002" label="The people" heading="Run by students." className="mb-4" />

        <MotionGrid className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10" staggerDelay={0.08}>
          {leads.map((lead) => (
            <MotionCard key={lead.name} enableHover={false}>
              <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center font-display text-sm text-white/80 flex-shrink-0">
                  {lead.initials}
                </span>
                <div>
                  <p className="text-sm text-white/80">{lead.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mt-0.5">
                    {lead.role}
                  </p>
                </div>
              </div>
            </MotionCard>
          ))}
        </MotionGrid>
      </div>
    </section>
  );
}
