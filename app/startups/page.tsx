'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StartupCard from '@/app/components/StartupCard';
import startupsData from '@/data/startups.json';
import SectionHeader from '@/app/components/SectionHeader';
import PrismaticCanvas from '@/app/components/PrismaticCanvas';
import MotionSection from '@/app/components/motion/MotionSection';
import MotionGrid from '@/app/components/motion/MotionGrid';
import MotionCard from '@/app/components/motion/MotionCard';
import MotionButton from '@/app/components/motion/MotionButton';
import AsciiButton from '@/app/components/AsciiButton';

export default function StartupsPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStartups = startupsData.filter(startup => {
    const matchesCategory = categoryFilter === 'all' || startup.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || startup.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(startupsData.map(startup => startup.category)));
  const statuses = Array.from(new Set(startupsData.map(startup => startup.status)));

  const totalFunding = startupsData.reduce((sum, startup) => {
    if (startup.metrics.funding && startup.metrics.funding !== 'Open Source') {
      const amount = parseFloat(startup.metrics.funding.replace(/[$KM]/g, ''));
      const multiplier = startup.metrics.funding.includes('M') ? 1000000 : 1000;
      return sum + (amount * multiplier);
    }
    return sum;
  }, 0);

  const totalUsers = startupsData.reduce((sum, startup) => {
    if (startup.metrics.users && startup.metrics.users !== 'Open Source') {
      const amount = parseFloat(startup.metrics.users.replace(/[K+]/g, ''));
      return sum + (amount * 1000);
    }
    return sum;
  }, 0);

  return (
    <main className="relative pt-24 px-4 sm:px-6 lg:px-8">
      {/* Ghosted letterform */}
      <div className="absolute left-0 top-0 bottom-0 w-[50vw] overflow-hidden" aria-hidden="true">
        <div className="absolute -left-[20%] top-[40%] -translate-y-1/2 font-display text-[45vw] ghosted-letterform -rotate-90 whitespace-nowrap">
          SDx
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 relative z-[1]">
        <SectionHeader
          title="Startups"
          subtitle="Companies built by SDx community members. From hackathon projects to funded startups."
          badge="Output"
        />

        {/* Metrics */}
        <MotionSection delay={0.1} className="flex flex-wrap items-center gap-4 md:gap-8 mb-16">
          <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
            <span className="block text-xl md:text-2xl font-bold text-white/90">{startupsData.length}</span>
            <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Startups</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
            <span className="block text-xl md:text-2xl font-bold text-white/90">${(totalFunding / 1000000).toFixed(1)}M</span>
            <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Funded</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
            <span className="block text-xl md:text-2xl font-bold text-white/90">{Math.round(totalUsers / 1000)}K+</span>
            <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Users</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-white/10" />
          <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
            <span className="block text-xl md:text-2xl font-bold text-white/90">{categories.length}</span>
            <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Industries</span>
          </div>
        </MotionSection>

        {/* Featured */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-white mb-6">Featured</h2>
          <MotionGrid className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {startupsData.slice(0, 3).map(startup => (
              <MotionCard key={startup.id}>
                <Link href={startup.websiteUrl} target="_blank" className="block group">
                  <Card className="h-full transition-colors duration-200 group-hover:border-white/20">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Badge variant="default" className="mb-3 w-fit">Featured</Badge>
                      <CardTitle className="text-base mb-1">{startup.name}</CardTitle>
                      <Badge variant="outline" className="mb-3 w-fit">{startup.category}</Badge>
                      <p className="text-sm text-white/40 leading-relaxed mb-4">{startup.story}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {startup.metrics.funding && (
                          <div className="bg-white/[0.06] rounded px-3 py-2">
                            <span className="block text-base font-bold text-white/90">{startup.metrics.funding}</span>
                            <span className="block text-xs uppercase tracking-widest text-white/40">Funding</span>
                          </div>
                        )}
                        {startup.metrics.users && (
                          <div className="bg-white/[0.06] rounded px-3 py-2">
                            <span className="block text-base font-bold text-white/90">{startup.metrics.users}</span>
                            <span className="block text-xs uppercase tracking-widest text-white/40">Users</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-auto flex justify-end">
                        <span className="btn-secondary px-4 py-1.5 text-xs uppercase tracking-widest rounded-sm">
                          Visit &rarr;
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </MotionCard>
            ))}
          </MotionGrid>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
              categoryFilter === 'all' ? 'bg-white text-black' : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                categoryFilter === category ? 'bg-white text-black' : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 self-center mx-1" />
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                statusFilter === status ? 'bg-white text-black' : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Grid */}
        <MotionGrid key={`${categoryFilter}-${statusFilter}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredStartups.map(startup => (
            <MotionCard key={startup.id}>
              <StartupCard
                name={startup.name}
                description={startup.description}
                logoUrl={startup.logoUrl}
                founders={startup.founders}
                metrics={startup.metrics}
                websiteUrl={startup.websiteUrl}
                category={startup.category}
              />
            </MotionCard>
          ))}
        </MotionGrid>

        {filteredStartups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xs uppercase tracking-widest text-white/30">No startups match your filters</p>
          </div>
        )}

      </div>

      {/* CTA — full width, break out of parent padding */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 relative overflow-hidden border-t border-white/5 pt-16 pb-16 text-center">
        <PrismaticCanvas intensity="subtle" />
        <MotionSection className="relative z-10 px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-white mb-3 prismatic-glow-sm">Build the next one.</h2>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            Connect with founders, find co-founders, and access our network.
          </p>
          <MotionButton className="inline-block">
            <Link href="https://lu.ma/sdx" target="_blank" className="block">
              <AsciiButton>Join Community</AsciiButton>
            </Link>
          </MotionButton>
        </MotionSection>
      </div>
    </main>
  );
}
