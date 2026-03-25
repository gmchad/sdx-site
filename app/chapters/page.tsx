'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, ExternalLink, Mail } from 'lucide-react';
import SectionHeader from '@/app/components/SectionHeader';

const chapters = [
  {
    id: "ucsd",
    name: "SDx UCSD",
    university: "UC San Diego",
    location: "San Diego, CA",
    status: "active",
    memberCount: "50+",
    founded: "2024",
    founder: "Dhruv Kanetkar",
    description: "The flagship chapter. An invite-only community where the best UCSD students building with AI share their latest experiments and projects.",
    href: "/chapters/ucsd",
    contactEmail: "ucsd@sdx.community",
  },
  {
    id: "sdsu",
    name: "SDx SDSU",
    university: "San Diego State University",
    location: "San Diego, CA",
    status: "active",
    memberCount: "New",
    founded: "2026",
    founder: "Matt Attardo",
    description: "Expanding SDx's presence with SDSU's vibrant student community. Builder-first programming for Aztec engineers and creators.",
    href: "#",
    contactEmail: "sdsu@sdx.community",
  },
];

const plannedChapters = [
  {
    name: "SDx USD",
    university: "University of San Diego",
    description: "Planned launch 2026 or 2027. Bringing SDx to USD's campus community.",
  },
];

export default function ChaptersPage() {
  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <SectionHeader
          title="Chapters"
          subtitle="SDx university chapters bring builders together on campus. Same energy, same values, local community."
          badge="University"
        />

        {/* Active Chapters */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-white mb-6">Active</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chapters.map(chapter => (
              <Card key={chapter.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <CardTitle className="text-base">{chapter.name}</CardTitle>
                      <p className="text-sm text-white/40 mt-0.5">{chapter.university}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sdx-teal" />
                      <span className="text-xs uppercase tracking-widest text-white/30">Active</span>
                    </div>
                  </div>

                  <p className="text-sm text-white/40 leading-relaxed mb-4">{chapter.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{chapter.memberCount} members</Badge>
                    <Badge variant="outline">Founded {chapter.founded}</Badge>
                    <Badge variant="outline">{chapter.founder}</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    {chapter.href !== '#' && (
                      <Link
                        href={chapter.href}
                        className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
                      >
                        Learn more &rarr;
                      </Link>
                    )}
                    <Link
                      href={`mailto:${chapter.contactEmail}`}
                      className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      Contact
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Planned */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-white mb-6">Planned</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plannedChapters.map((chapter, index) => (
              <Card key={index} className="opacity-60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-base">{chapter.name}</CardTitle>
                    <Badge variant="outline">Planned</Badge>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{chapter.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Join */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-white mb-6">Why join a chapter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Build on campus', desc: 'Peer community for learning and building together. Lower the barrier to entry for first-time builders.' },
              { title: 'Events & demos', desc: 'Chapter-specific Hack Days, demo sessions, and Paper Club discussions.' },
              { title: 'Pipeline to SDx', desc: 'Connect to the broader ecosystem. Mentors, events, partners, and a reason to stay in San Diego after graduation.' },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start a Chapter CTA */}
        <div className="border-t border-white/5 pt-12 text-center">
          <h2 className="font-display text-2xl text-white mb-3">Start a chapter.</h2>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            Interested in bringing SDx to your university? We&apos;re looking for builders who want to lead.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="mailto:chapters@sdx.community?subject=Start a New Chapter"
              className="holographic-border px-6 py-2 text-xs uppercase tracking-widest text-white rounded-sm"
            >
              Start a Chapter
            </Link>
            <Link
              href="https://lu.ma/sdx"
              target="_blank"
              className="px-6 py-2 text-xs uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 rounded-sm transition-[color,border-color] duration-200"
            >
              Join Main Community
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
