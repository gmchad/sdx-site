'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StartupCard from '@/app/components/StartupCard';
import startupsData from '@/data/startups.json';
import { Rocket, TrendingUp, Users, Building, Filter, ExternalLink } from 'lucide-react';

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

  // Calculate aggregate metrics
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
    <main className="relative bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Startup Success Stories
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Meet the innovative AI companies built by our community members, from hackathon projects to funded startups
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Building className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <CardTitle className="text-3xl font-bold text-blue-400">
                {startupsData.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Startups Launched</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-3xl font-bold text-green-400">
                ${(totalFunding / 1000000).toFixed(1)}M
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Total Funding</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <CardTitle className="text-3xl font-bold text-purple-400">
                {Math.round(totalUsers / 1000)}K+
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Rocket className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <CardTitle className="text-3xl font-bold text-orange-400">
                {categories.length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Industries</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {startupsData.slice(0, 3).map(startup => (
              <Card key={startup.id} className="border-green-500">
                <CardHeader>
                  <Badge className="w-fit mb-2">Featured</Badge>
                  <CardTitle className="text-xl">{startup.name}</CardTitle>
                  <Badge variant="secondary">{startup.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{startup.story}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {startup.metrics.funding && (
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-bold text-green-400">{startup.metrics.funding}</div>
                        <div className="text-xs text-muted-foreground">Funding</div>
                      </div>
                    )}
                    {startup.metrics.users && (
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-bold text-blue-400">{startup.metrics.users}</div>
                        <div className="text-xs text-muted-foreground">Users</div>
                      </div>
                    )}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={startup.websiteUrl} target="_blank">
                      Visit Website
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join Network CTA */}
        <Card className="mb-16 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Join Our Startup Ecosystem</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with founders, find co-founders, get mentorship, and access our network of investors and industry experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="https://lu.ma/sdx" target="_blank">
                  Join Community
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://airtable.com/appHsy3IiApTDvksA/shrOxmPTtfryRvHij" target="_blank">
                  View Talent Network
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setCategoryFilter('all')}
              size="sm"
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={categoryFilter === category ? 'default' : 'outline'}
                onClick={() => setCategoryFilter(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All Stages
            </Button>
            {statuses.map(status => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                onClick={() => setStatusFilter(status)}
                size="sm"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Startups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* No Startups Message */}
        {filteredStartups.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Startups Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters to see more startups.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Categories Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Industries We're Building</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => {
              const categoryCount = startupsData.filter(s => s.category === category).length;
              return (
                <Card key={category} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{categoryCount}</div>
                    <p className="text-sm text-muted-foreground">{category}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">From Hackathon to Success</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Many of our startups began as hackathon projects, demonstrating the power of our community-driven approach to innovation.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">60%</span>
                  <span className="text-sm text-muted-foreground">Started at hackathons</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Collaborative Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Our startups often involve collaboration between multiple community members, fostering a culture of shared success.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-400">85%</span>
                  <span className="text-sm text-muted-foreground">Have community connections</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 