'use client'

import React, { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import MotionSection from '@/app/components/motion/MotionSection';
import { UCSD_LUMA } from '../lib/links';
import media from '../lib/media';

type PastEvent = (typeof media.past)[number];

/** Timeline starts at the Vercel Hackathon (Jan 25, 2026) — older events live on Luma */
const TIMELINE_START = '2026-01-25';

function formatDay(iso: string, timeZone: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone,
  });
}

function monthKey(iso: string, timeZone: string) {
  const d = new Date(iso);
  const y = d.toLocaleString('en-US', { year: 'numeric', timeZone });
  const m = d.toLocaleString('en-US', { month: '2-digit', timeZone });
  const label = d.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone });
  return { key: `${y}-${m}`, label, sort: `${y}-${m}` };
}

export default function PastEvents() {
  const groups = useMemo(() => {
    const map = new Map<string, { label: string; sort: string; events: PastEvent[] }>();

    for (const event of media.past) {
      if (event.date < TIMELINE_START) continue;
      const tz = event.timezone || 'America/Los_Angeles';
      const { key, label, sort } = monthKey(event.date, tz);
      if (!map.has(key)) map.set(key, { label, sort, events: [] });
      map.get(key)!.events.push(event);
    }

    return Array.from(map.values())
      .sort((a, b) => b.sort.localeCompare(a.sort))
      .map((g) => ({
        ...g,
        events: [...g.events].sort((a, b) => b.date.localeCompare(a.date)),
      }));
  }, []);

  return (
    <div className="relative">
      {/* ── Upcoming ── */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <MotionSection>
            <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight prismatic-glow-sm">
              Upcoming events
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/45 leading-relaxed">
              New dates drop on{' '}
              <a
                href={UCSD_LUMA}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 underline underline-offset-4 decoration-white/20 hover:text-white/80 hover:decoration-white/40 transition-colors"
              >
                Luma
              </a>
              .
            </p>
          </MotionSection>
        </div>
      </section>

      {/* ── Past timeline ── */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <MotionSection className="mb-10 md:mb-14">
            <h2 className="font-display text-3xl md:text-5xl text-white tracking-tight prismatic-glow-sm">
              Past events
            </h2>
          </MotionSection>

          <div className="relative pb-12">
            {/* Spine — stays visible through the rows, fades out quickly in the tail below the last event */}
            <div
              className="pointer-events-none absolute left-[0.4rem] md:left-[0.45rem] top-2 bottom-0 w-px"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.15) 82%, transparent 100%)',
              }}
              aria-hidden="true"
            />

            <div className="space-y-12 md:space-y-14">
              {groups.map((group, gi) => (
                <MotionSection key={group.sort} delay={Math.min(gi * 0.04, 0.2)}>
                  <div className="relative pl-8 md:pl-10">
                    <p className="text-sm md:text-base font-bold tracking-wide text-white/60 mb-5">
                      {group.label}
                    </p>

                    <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                      {group.events.map((event) => {
                        const tz = event.timezone || 'America/Los_Angeles';
                        const accent = event.accent || '#11BBCD';

                        return (
                          <li key={event.id}>
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative flex items-baseline gap-4 md:gap-6 py-4 transition-colors hover:bg-white/[0.02] -mx-2 px-2 rounded-sm"
                            >
                              {/* Timeline node */}
                              <span
                                className="absolute -left-[1.32rem] md:-left-[1.77rem] top-[1.35rem] h-2 w-2 rounded-full ring-4 ring-black"
                                style={{ backgroundColor: accent }}
                                aria-hidden="true"
                              />

                              <time
                                dateTime={event.date}
                                className="shrink-0 w-16 md:w-20 text-xs tabular-nums text-white/40 group-hover:text-white/55 transition-colors"
                              >
                                {formatDay(event.date, tz)}
                              </time>

                              <span className="flex-1 min-w-0 font-display text-base md:text-lg text-white/85 tracking-tight group-hover:text-white transition-colors">
                                {event.title}
                              </span>

                              <ExternalLink
                                className="shrink-0 w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors mt-1"
                                strokeWidth={1.75}
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </MotionSection>
              ))}
            </div>
          </div>

          <MotionSection delay={0.12} className="mt-12 md:mt-16">
            <a
              href={UCSD_LUMA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-wide text-white/40 hover:text-white/70 transition-colors"
            >
              view full calendar on luma
              <ExternalLink className="w-3 h-3" strokeWidth={1.75} />
            </a>
          </MotionSection>
        </div>
      </section>
    </div>
  );
}
