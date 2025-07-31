import { NextRequest, NextResponse } from 'next/server';
import { getAllEvents, getUpcomingEvents, getPastEvents, processLumaEvents } from '@/lib/luma-api';
import { ProcessedEvent, LumaEventsResponse } from '@/types/luma';
import lumaEventsData from '@/data/events.json';

// Helper function to get location string from event
const getEventLocation = (event: any): string => {
  if (event.geo_address_json?.formatted_address) {
    return event.geo_address_json.formatted_address;
  }
  return 'Location TBD';
};

// Helper function to determine if an event is upcoming
const isEventUpcoming = (startAt: string): boolean => {
  const eventDate = new Date(startAt);
  const now = new Date();
  return eventDate > now;
};

// Process Lu.ma events data for fallback
const processLumaEventsFallback = (lumaData: LumaEventsResponse): ProcessedEvent[] => {
  return lumaData.entries.map((entry) => {
    const event = entry.event;
    return {
      id: event.api_id,
      title: event.name,
      description: event.description,
      startDate: event.start_at,
      endDate: event.end_at,
      location: getEventLocation(event),
      eventUrl: event.url,
      coverUrl: event.cover_url,
      isUpcoming: isEventUpcoming(event.start_at),
      tags: event.tags.map(tag => tag.name),
      timezone: event.timezone,
      meetingUrl: event.meeting_url || undefined,
      zoomMeetingUrl: event.zoom_meeting_url || undefined,
    };
  });
};

// GET /api/events - Fetch events from Lu.ma
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filter = searchParams.get('filter') || 'all';
  const limit = parseInt(searchParams.get('limit') || '50');

  try {
    // Check if API key is configured
    if (!process.env.LUMA_API_KEY) {
      console.log('No LUMA_API_KEY configured, using fallback data');
      
      // Use fallback data
      const fallbackEvents = processLumaEventsFallback(lumaEventsData as LumaEventsResponse);
      
      // Apply filter
      let filteredEvents = fallbackEvents;
      if (filter === 'upcoming') {
        filteredEvents = fallbackEvents.filter(event => event.isUpcoming);
      } else if (filter === 'past') {
        filteredEvents = fallbackEvents.filter(event => !event.isUpcoming);
      }
      
      // Apply limit
      const limitedEvents = filteredEvents.slice(0, limit);
      
      return NextResponse.json({
        success: true,
        data: limitedEvents,
        count: limitedEvents.length,
        usingFallback: true,
      });
    }

    // Try to fetch from Lu.ma API
    let events: ProcessedEvent[];

    switch (filter) {
      case 'upcoming':
        events = await getUpcomingEvents(limit);
        break;
      case 'past':
        events = await getPastEvents(limit);
        break;
      case 'all':
      default:
        events = await getAllEvents(limit);
        break;
    }

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
      usingFallback: false,
    });
  } catch (error) {
    console.error('Error fetching events from Lu.ma API, falling back to mock data:', error);
    
    // Fallback to mock data
    try {
      const fallbackEvents = processLumaEventsFallback(lumaEventsData as LumaEventsResponse);
      
      // Apply filter
      let filteredEvents = fallbackEvents;
      if (filter === 'upcoming') {
        filteredEvents = fallbackEvents.filter(event => event.isUpcoming);
      } else if (filter === 'past') {
        filteredEvents = fallbackEvents.filter(event => !event.isUpcoming);
      }
      
      // Apply limit
      const limitedEvents = filteredEvents.slice(0, limit);
      
      return NextResponse.json({
        success: true,
        data: limitedEvents,
        count: limitedEvents.length,
        usingFallback: true,
      });
    } catch (fallbackError) {
      console.error('Error processing fallback data:', fallbackError);
      
      // Return error response
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to fetch events',
          message: 'Both API and fallback data failed',
        },
        { status: 500 }
      );
    }
  }
}

// OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 