'use client'

/**
 * Hidden component gallery — not linked from anywhere, noindex.
 * Archives the chapter components that were built for PR #13 but aren't
 * on the live pages, so they can be reviewed (and possibly revived) later.
 * Live components (SpecStrip, Programs, SectionTag) are imported from
 * components/; the rest are frozen copies restored from git history.
 */

import React from 'react';
import SectionTag from '../components/SectionTag';
import SpecStrip from '../components/SpecStrip';
import Programs from '../components/Programs';
import Stats from './Stats';
import Manifesto from './Manifesto';
import Projects from './Projects';
import Rhythm from './Rhythm';
import Leads from './Leads';
import JoinCTA from './JoinCTA';

function Divider({ name, note }: { name: string; note?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4">
      <p className="text-xs uppercase tracking-widest text-white/40 border border-white/15 rounded-sm inline-block px-3 py-1.5 bg-white/[0.03]">
        ↓ {name}
        {note && <span className="text-white/25 normal-case tracking-normal"> — {note}</span>}
      </p>
    </div>
  );
}

export default function UCSDComponentGalleryPage() {
  return (
    <main className="relative pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-white tracking-tight">
          SDxUCSD component gallery
        </h1>
        <p className="mt-2 text-sm text-white/40 max-w-xl leading-relaxed">
          Everything built for the chapter redesign. Some of it is live on the
          chapter pages; the rest is archived here. Names, projects, metrics, and
          schedules in the archived sections are placeholder content.
        </p>
      </div>

      <Divider name="SpecStrip" note="LIVE — hero stat count-up (real numbers)" />
      <div className="py-10 border-y border-white/[0.08]">
        <SpecStrip />
      </div>

      <Divider name="Programs" note="LIVE — events page intro list" />
      <Programs />

      <Divider name="SectionTag" note="LIVE — editorial label primitive" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTag index="001" label="Example label" heading="Example heading." />
      </div>

      <Divider name="Stats" note="archived — static stat band (superseded by SpecStrip)" />
      <Stats />

      <Divider name="Manifesto" note="archived — headline moved into the final CTA; ghosted UCSD letterform" />
      <Manifesto />

      <Divider name="Projects" note="archived — build-log terminal + project cards (placeholder projects)" />
      <Projects />

      <Divider name="Rhythm" note="archived — weekly schedule grid with linear scan beam (placeholder schedule)" />
      <Rhythm />

      <Divider name="Leads" note="archived — team grid (placeholder names)" />
      <Leads />

      <Divider name="JoinCTA" note="archived — full-viewport CTA (superseded by StartBuilding)" />
      <JoinCTA />
    </main>
  );
}
