'use client'

import React from 'react';
import MotionSection from '@/app/components/motion/MotionSection';
import SectionTag from '../components/SectionTag';
import styles from './gallery.module.css';

const week: { day: string; event?: string; time?: string; color?: string }[] = [
  { day: 'Mon', event: 'Build Hours', time: '6PM · SSC', color: '#03C661' },
  { day: 'Tue' },
  { day: 'Wed', event: 'Paper Club', time: '7PM · Geisel', color: '#FAC205' },
  { day: 'Thu' },
  { day: 'Fri', event: 'Demo Night', time: '7PM · Geisel East', color: '#11BBCD' },
  { day: 'Sat', event: 'Cowork + Coffee', time: '11AM · Blue Bowl', color: '#FC5715' },
  { day: 'Sun' },
];

export default function Rhythm() {
  return (
    <section className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <SectionTag index="004" label="The week" heading="Always on." className="mb-4" />

        <MotionSection delay={0.1}>
          <div className="border border-white/[0.08] rounded-lg overflow-x-auto">
            <div className="relative min-w-[760px] overflow-hidden">
              {/* Scanning beam */}
              <div
                className={`${styles.scanBeam} absolute top-0 bottom-0 w-[2px] pointer-events-none z-10`}
                style={{
                  background: 'linear-gradient(to bottom, transparent, #11BBCD 30%, #11BBCD 70%, transparent)',
                  boxShadow: '0 0 18px rgba(17, 187, 205, 0.55)',
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-7">
              {week.map((d, i) => (
                <div
                  key={d.day}
                  className={`px-4 py-8 md:py-10 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}
                >
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-6">
                    {d.day}
                  </p>
                  {d.event ? (
                    <div>
                      <span
                        className="block w-1.5 h-1.5 rounded-full mb-3"
                        style={{ backgroundColor: d.color }}
                      />
                      <p className="text-xs font-bold text-white/80 leading-snug">{d.event}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-white/30">
                        {d.time}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="block w-1.5 h-1.5 rounded-full mb-3 bg-white/10" />
                      <p className="text-xs text-white/20">—</p>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection delay={0.18}>
          <p className="mt-6 text-xs text-white/30 max-w-md leading-relaxed">
            Four standing touchpoints a week. Show up to one Demo Night and the calendar opens
            to you.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
