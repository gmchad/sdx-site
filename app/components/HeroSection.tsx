'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import BackgroundEffects from './BackgroundEffects';
import MetaballCanvas from './MetaballCanvas';

const partnerLogos = [
  { src: '/sponsors/cadre.png', alt: 'Cadre' },
  { src: '/sponsors/anthropic.png', alt: 'Anthropic' },
  { src: '/sponsors/elevenlabs.png', alt: 'ElevenLabs' },
  { src: '/sponsors/hf.png', alt: 'Hugging Face' },
  { src: '/sponsors/openai.png', alt: 'OpenAI' },
  { src: '/sponsors/qualcomm.png', alt: 'Qualcomm' },
  { src: '/sponsors/replit.png', alt: 'Replit' },
  { src: '/sponsors/vercel.png', alt: 'Vercel' },
  { src: '/sponsors/ucsd.png', alt: 'UCSD' },
];

const eventTypes = [
  {
    name: 'Paper Club',
    description: 'Deep dives into fundamental ML research. Come prepared to debate.',
  },
  {
    name: 'AI Coffee',
    description: 'Open discussion on the latest in AI. Practitioner-level signal.',
  },
  {
    name: 'Hack Days',
    description: 'Show up, build something real, demo what you made.',
  },
  {
    name: 'Hackathons',
    description: 'Full-day build events with sponsor credits and prizes.',
  },
  {
    name: 'OpenClaw',
    description: 'Building with the OpenClaw agentic AI framework.',
  },
  {
    name: 'Executive Roundtables',
    description: 'Peer-level AI implementation exchange for senior leaders.',
  },
];

const metrics = [
  { value: '1000+', label: 'builders' },
  { value: '50+', label: 'events' },
  { value: '15+', label: 'startups' },
];

const HeroSection: React.FC = () => {
  const handleLinkClick = (linkUrl: string, label: string) => {
    sendGAEvent('clicked', { link_url: linkUrl, label });
  };

  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <BackgroundEffects />
        <MetaballCanvas />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-tight mb-6">
            Build here.
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed mb-10">
            San Diego&apos;s builder-first technology community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="https://lu.ma/sdx"
              target="_blank"
              onClick={() => handleLinkClick('https://lu.ma/sdx', 'hero-cta')}
              className="holographic-border px-8 py-3 text-xs uppercase tracking-widest text-white rounded-sm"
            >
              Start Building
            </Link>
            <Link
              href="/executives"
              onClick={() => handleLinkClick('/executives', 'hero-exec')}
              className="px-6 py-3 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
            >
              Executive Network &rarr;
            </Link>
          </div>
        </div>

        {/* Partners — full width with edge fade */}
        <div className="absolute bottom-40 left-[10%] right-[10%] z-10">
          <p className="text-xs uppercase tracking-widest text-white/40 text-center mb-4">Partners</p>
          <div
            className="overflow-hidden w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 8%, white 92%, transparent 100%)',
            }}
          >
            <div className="animate-marquee whitespace-nowrap inline-block">
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div key={index} className="inline-block align-middle mx-8">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={96}
                    height={48}
                    className="w-20 h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="relative z-10 flex items-center gap-8 md:gap-12">
          {metrics.map((metric, i) => (
            <React.Fragment key={metric.label}>
              {i > 0 && <div className="w-px h-6 bg-white/10" />}
              <div className="text-center">
                <span className="holographic-text text-xl md:text-2xl font-bold">{metric.value}</span>
                <span className="block text-xs uppercase tracking-widest text-white/30 mt-1">{metric.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Section 2: Event Types */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-white/30">What we do</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-2">
              Where builders build.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {eventTypes.map((event) => (
              <div
                key={event.name}
                className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-6
                  hover:border-white/[0.15] hover:shadow-glow-white
                  transition-[border-color,box-shadow] duration-300 ease-out"
              >
                <h3 className="text-base font-bold text-white mb-2">{event.name}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/events"
              className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
            >
              See all events &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Community Proof */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-white/30">Chapters</span>
              <h3 className="font-display text-2xl text-white mt-2 mb-4">University chapters</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                SDx extends into campus communities, bringing builders together before they even graduate.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sdx-teal" />
                  <span className="text-sm text-white/60">SDx UCSD — Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sdx-blue" />
                  <span className="text-sm text-white/60">SDx SDSU — Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="text-sm text-white/40">SDx USD — Planned</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-white/30">Partners</span>
              <h3 className="font-display text-2xl text-white mt-2 mb-4">Who we work with</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Connected to the organizations that matter. Y Combinator, OpenAI, Anthropic, Qualcomm, Supabase, Vercel, Replit, and the university systems across San Diego.
              </p>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-white/30">Output</span>
              <h3 className="font-display text-2xl text-white mt-2 mb-4">What gets built</h3>
              <p className="text-sm text-white/40 leading-relaxed mb-4">
                SDx members have launched 15+ startups, shipped open-source tools, and built projects that matter.
              </p>
              <Link
                href="/startups"
                className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
              >
                See startups &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Final CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 holographic-bg" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
            Come build.
          </h2>
          <p className="text-base text-white/50 mb-10 max-w-md mx-auto">
            You don&apos;t need to know how to code to join SDx. You need to want to learn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://lu.ma/sdx"
              target="_blank"
              onClick={() => handleLinkClick('https://lu.ma/sdx', 'cta-luma')}
              className="holographic-border px-8 py-3 text-xs uppercase tracking-widest text-white rounded-sm"
            >
              Join on Lu.ma
            </Link>
            <Link
              href="https://discord.gg/Rkgyzx2ykV"
              target="_blank"
              onClick={() => handleLinkClick('https://discord.gg/Rkgyzx2ykV', 'cta-discord')}
              className="px-6 py-3 text-xs uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-[color,border-color] duration-200"
            >
              Join Discord
            </Link>
          </div>
          <Link
            href="/executives"
            onClick={() => handleLinkClick('/executives', 'cta-exec')}
            className="inline-block mt-6 text-xs uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            Executive Network &rarr;
          </Link>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
