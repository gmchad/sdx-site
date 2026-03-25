'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StartupCard from '@/app/components/StartupCard';
import startupsData from '@/data/startups.json';
import SectionHeader from '@/app/components/SectionHeader';

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
    <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        <SectionHeader
          title="Startups"
          subtitle="Companies built by SDx community members. From hackathon projects to funded startups."
          badge="Output"
        />

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-16 max-w-2xl">
          <div>
            <div className="text-2xl font-bold holographic-text">{startupsData.length}</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Startups</div>
          </div>
          <div>
            <div className="text-2xl font-bold holographic-text">${(totalFunding / 1000000).toFixed(1)}M</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Funded</div>
          </div>
          <div>
            <div className="text-2xl font-bold holographic-text">{Math.round(totalUsers / 1000)}K+</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold holographic-text">{categories.length}</div>
            <div className="text-xs uppercase tracking-widest text-white/30">Industries</div>
          </div>
        </div>

        {/* Featured */}
        <div className="mb-16">
          <h2 className="font-display text-2xl text-white mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {startupsData.slice(0, 3).map(startup => (
              <Card key={startup.id}>
                <CardContent className="p-6">
                  <Badge variant="default" className="mb-3">Featured</Badge>
                  <CardTitle className="text-base mb-1">{startup.name}</CardTitle>
                  <Badge variant="outline" className="mb-3">{startup.category}</Badge>
                  <p className="text-sm text-white/40 leading-relaxed mb-4">{startup.story}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {startup.metrics.funding && (
                      <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
                        <div className="text-base font-bold holographic-text">{startup.metrics.funding}</div>
                        <div className="text-xs uppercase tracking-widest text-white/30">Funding</div>
                      </div>
                    )}
                    {startup.metrics.users && (
                      <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
                        <div className="text-base font-bold holographic-text">{startup.metrics.users}</div>
                        <div className="text-xs uppercase tracking-widest text-white/30">Users</div>
                      </div>
                    )}
                  </div>
                  <Link
                    href={startup.websiteUrl}
                    target="_blank"
                    className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
                  >
                    Visit &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredStartups.map(startup => (
            <StartupCard
              key={startup.id}
              name={startup.name}
              description={startup.description}
              logoUrl={startup.logoUrl}
              founders={startup.founders}
              metrics={startup.metrics}
              websiteUrl={startup.websiteUrl}
              category={startup.category}
            />
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xs uppercase tracking-widest text-white/30">No startups match your filters</p>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-white/5 pt-12 text-center">
          <h2 className="font-display text-2xl text-white mb-3">Build the next one.</h2>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            Connect with founders, find co-founders, and access our network.
          </p>
          <Link
            href="https://lu.ma/sdx"
            target="_blank"
            className="holographic-border inline-block px-6 py-2 text-xs uppercase tracking-widest text-white rounded-sm"
          >
            Join Community
          </Link>
        </div>
      </div>
    </main>
  );
}
