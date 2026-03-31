'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { ProcessedEvent } from '@/types/luma';
import { getAllEvents as getEventsFromAPI } from '@/lib/api-client';
import { formatEventDateTime, formatDuration } from '@/lib/luma-api';
import SectionHeader from '@/app/components/SectionHeader';
import PrismaticCanvas from '@/app/components/PrismaticCanvas';
import AsciiButton from '@/app/components/AsciiButton';
import MotionSection from '@/app/components/motion/MotionSection';
import MotionGrid from '@/app/components/motion/MotionGrid';
import MotionCard from '@/app/components/motion/MotionCard';
import MotionButton from '@/app/components/motion/MotionButton';

// Helper function to get location string
const getLocationString = (event: any): string => {
  if (event.geo_address_json?.formatted_address) {
    return event.geo_address_json.formatted_address;
  }
  return 'Location TBD';
};

export default function EventsPage() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [events, setEvents] = useState<ProcessedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getEventsFromAPI(50);
        setEvents(result.events);
        setUsingFallback(result.usingFallback);
        if (result.usingFallback) {
          setError('Using demo data - Lu.ma API key not configured');
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events');
        setEvents([]);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const eventTypes = useMemo(() => {
    const allTypes = events.flatMap(event => event.tags);
    return Array.from(new Set(allTypes)).sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesTimeFilter = filter === 'all' ||
        (filter === 'upcoming' && event.isUpcoming) ||
        (filter === 'past' && !event.isUpcoming);
      const matchesTypeFilter = typeFilter === 'all' ||
        event.tags.some(tag => tag.toLowerCase() === typeFilter.toLowerCase());
      return matchesTimeFilter && matchesTypeFilter;
    });
  }, [events, filter, typeFilter]);

  const upcomingCount = events.filter(event => event.isUpcoming).length;
  const pastCount = events.filter(event => !event.isUpcoming).length;

  if (loading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b border-white/20 mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-white/30">Loading events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Full-width prismatic header — extends to toolbar */}
      <div className="relative pt-24">
        <PrismaticCanvas intensity="subtle" palette="cool" glitchFrequency="rare" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeader
            title="Events"
            subtitle="Paper Club, AI Coffee, Hack Days, Hackathons, and more. Show up, build something, learn something."
          />

          {/* Error Notice */}
          {error && (
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 mb-8 max-w-2xl">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Stats */}
          <MotionSection className="flex flex-wrap items-center gap-4 md:gap-8" delay={0.1}>
            <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
              <span className="block text-xl md:text-2xl font-bold text-white/90">{upcomingCount}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Upcoming</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
              <span className="block text-xl md:text-2xl font-bold text-white/90">{pastCount}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Past</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="bg-white/10 rounded-sm px-4 py-2 text-center">
              <span className="block text-xl md:text-2xl font-bold text-white/90">{events.length}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40 mt-0.5">Total</span>
            </div>
          </MotionSection>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ghosted letterform */}
        <div className="absolute right-0 top-0 bottom-0 w-[50vw] overflow-hidden" aria-hidden="true">
          <div className="absolute -right-[20%] top-1/2 -translate-y-1/2 font-display text-[45vw] ghosted-letterform rotate-90 whitespace-nowrap">
            SDx
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(['all', 'upcoming', 'past'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                filter === f
                  ? 'bg-white text-black'
                  : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {f === 'all' ? 'All' : f === 'upcoming' ? `Upcoming (${upcomingCount})` : `Past (${pastCount})`}
            </button>
          ))}
          <div className="w-px h-6 bg-white/10 self-center mx-1" />
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
              typeFilter === 'all'
                ? 'bg-white text-black'
                : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            All types
          </button>
          {eventTypes.slice(0, 4).map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${
                typeFilter === type
                  ? 'bg-white text-black'
                  : 'text-white/40 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <MotionGrid key={`${filter}-${typeFilter}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredEvents.map((event) => (
            <MotionCard key={event.id}>
              <Card>
              <div className="aspect-video bg-white/[0.02] rounded-t-lg overflow-hidden">
                <Image
                  src={event.coverUrl}
                  alt={event.title}
                  width={400}
                  height={225}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={event.isUpcoming ? 'default' : 'secondary'}>
                    {event.isUpcoming ? 'Upcoming' : 'Past'}
                  </Badge>
                  <div className="flex gap-1">
                    {event.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-base">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1.5 text-sm text-white/40 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatEventDateTime(event.startDate, event.endDate, event.timezone)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDuration(getEventDuration(event))}</span>
                  </div>
                </div>
                <Link
                  href={event.eventUrl}
                  target="_blank"
                  className="inline-flex items-center text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200"
                >
                  View on Lu.ma
                  <ExternalLink className="w-3 h-3 ml-1.5" />
                </Link>
              </CardContent>
              </Card>
            </MotionCard>
          ))}
        </MotionGrid>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-8 h-8 mx-auto mb-4 text-white/20" />
            <p className="text-xs uppercase tracking-widest text-white/30">No events match your filters</p>
          </div>
        )}

      </div>

      {/* Lu.ma CTA — full width, break out of parent padding */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 relative overflow-hidden border-t border-white/5 pt-16 pb-16 text-center">
        <PrismaticCanvas intensity="subtle" />
        <MotionSection className="relative z-10 px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl text-white mb-3 prismatic-glow-sm">Never miss an event</h2>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
            All events are hosted on Lu.ma. Follow our calendar for updates.
          </p>
          <MotionButton className="inline-block">
            <Link href="https://lu.ma/sdx" target="_blank" className="block">
              <AsciiButton>Follow on Lu.ma</AsciiButton>
            </Link>
          </MotionButton>
        </MotionSection>
      </div>
    </div>
  );
}

function getEventDuration(event: ProcessedEvent): string {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  if (diffHours > 0 && diffMinutes > 0) return `PT${diffHours}H${diffMinutes}M`;
  if (diffHours > 0) return `PT${diffHours}H`;
  if (diffMinutes > 0) return `PT${diffMinutes}M`;
  return 'PT1H';
}
