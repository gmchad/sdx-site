'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink, Users, AlertCircle } from 'lucide-react';
import { LumaEventsResponse, LumaEventEntry, ProcessedEvent } from '@/types/luma';
import { getAllEvents as getEventsFromAPI } from '@/lib/api-client';
import { formatEventDateTime, formatDuration } from '@/lib/luma-api';

// Helper function to determine if an event is upcoming
const isEventUpcoming = (startAt: string): boolean => {
  const eventDate = new Date(startAt);
  const now = new Date();
  return eventDate > now;
};

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

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch from API
        const result = await getEventsFromAPI(50);
        console.log('apiEvents', result);
        
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

  // Get unique event types from tags
  const eventTypes = useMemo(() => {
    const allTypes = events.flatMap(event => event.tags);
    return Array.from(new Set(allTypes)).sort();
  }, [events]);

  // Filter events based on selected filters
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

  // Statistics
  const upcomingCount = events.filter(event => event.isUpcoming).length;
  const pastCount = events.filter(event => !event.isUpcoming).length;
  const totalAttendees = events.length * 30; // Approximate average

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Community Events
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our vibrant community of AI builders at workshops, meetups, conferences, and hackathons.
          </p>
          
          {/* Error/Fallback Notice */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Notice: {error}</span>
              </div>
              {usingFallback && (
                <p className="text-sm text-yellow-700 mt-2">
                  To use live Lu.ma data, add your <code className="bg-yellow-100 px-1 rounded">LUMA_API_KEY</code> to <code className="bg-yellow-100 px-1 rounded">.env.local</code>
                </p>
              )}
            </div>
          )}
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{upcomingCount}</div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalAttendees.toLocaleString()}+</div>
                <div className="text-sm text-muted-foreground">Total Attendees</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{pastCount}</div>
                <div className="text-sm text-muted-foreground">Past Events</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Events
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({upcomingCount})
            </Button>
            <Button
              variant={filter === 'past' ? 'default' : 'outline'}
              onClick={() => setFilter('past')}
            >
              Past ({pastCount})
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </Button>
            {eventTypes.slice(0, 4).map(type => (
              <Button
                key={type}
                variant={typeFilter === type ? 'default' : 'outline'}
                onClick={() => setTypeFilter(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                <img 
                  src={event.coverUrl} 
                  alt={event.title}
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
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatEventDateTime(event.startDate, event.endDate, event.timezone)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {formatDuration(getEventDuration(event))}</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => window.open(event.eventUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Lu.ma
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Events Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later for new events.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Lu.ma Integration CTA */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Never Miss an Event
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              All our events are hosted on Lu.ma for easy registration and updates. 
              Follow our calendar to stay informed about upcoming workshops, meetups, and conferences.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => window.open('https://lu.ma/sdx-ai-community', '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Follow on Lu.ma
              </Button>
              <Button variant="outline" onClick={() => window.open('https://lu.ma/sdx-ai-community/calendar', '_blank')}>
                <Calendar className="w-4 h-4 mr-2" />
                Subscribe to Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper function to get event duration (used in the component)
function getEventDuration(event: ProcessedEvent): string {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHours > 0 && diffMinutes > 0) {
    return `PT${diffHours}H${diffMinutes}M`;
  } else if (diffHours > 0) {
    return `PT${diffHours}H`;
  } else if (diffMinutes > 0) {
    return `PT${diffMinutes}M`;
  }
  return 'PT1H';
} 