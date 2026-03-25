'use client'

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, ExternalLink } from 'lucide-react';
import SectionHeader from '@/app/components/SectionHeader';

export default function UCSDChapterPage() {
  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto py-12">
        <SectionHeader
          title="SDx UCSD"
          subtitle="An invite-only community where the best UCSD students building with AI share their latest experiments and projects. Founded 2024 by Dhruv Kanetkar."
          badge="Chapter"
        />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-16 max-w-md">
          <div>
            <div className="text-2xl font-bold holographic-text">50+</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Students</div>
          </div>
          <div>
            <div className="text-2xl font-bold holographic-text">Monthly</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Demos</div>
          </div>
          <div>
            <div className="text-2xl font-bold holographic-text">UCSD</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Campus</div>
          </div>
        </div>

        {/* About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-base font-bold text-white mb-3">What we do</h3>
              <ul className="space-y-2">
                {[
                  'Monthly project demos and presentations',
                  'Peer feedback and collaboration sessions',
                  'Connection to industry professionals',
                  'Access to the broader SDx ecosystem',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/40 leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-sdx-teal mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-base font-bold text-white mb-3">Who can join</h3>
              <ul className="space-y-2">
                {[
                  'UCSD students actively building AI projects',
                  'Undergraduate and graduate students',
                  'Researchers and PhD candidates',
                  'Students with demonstrated project experience',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/40 leading-relaxed">
                    <div className="w-1 h-1 rounded-full bg-sdx-blue mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-6 text-center">
              <Badge variant="outline" className="mb-3">Coming Soon</Badge>
              <CardTitle className="text-base mb-2">2025 Cohort Projects</CardTitle>
              <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed">
                We&apos;re preparing to showcase projects from our 2025 cohort. Research, applications, and experiments from UCSD&apos;s best builders.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Connect */}
        <div className="border-t border-white/5 pt-12 text-center">
          <h2 className="font-display text-2xl text-white mb-3">Join the chapter.</h2>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            Motivated UCSD students who are building with AI and want to share their work.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="mailto:ucsd@sdx.community"
              className="holographic-border px-6 py-2 text-xs uppercase tracking-widest text-white rounded-sm flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact Lead
            </Link>
            <Link
              href="https://discord.gg/Rkgyzx2ykV"
              target="_blank"
              className="px-6 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-[color,border-color] duration-200"
            >
              Discord
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs uppercase tracking-widest text-white/20">
            <span>Monthly meetings</span>
            <span>Invite-only</span>
            <span>UCSD Campus</span>
          </div>
        </div>
      </div>
    </main>
  );
}
