import { LumaEventsResponse, ProcessedEvent } from '@/types/luma';

// Lu.ma API configuration - SERVER SIDE ONLY
const LUMA_API_BASE_URL = 'https://public-api.lu.ma/public/v1';
const LUMA_API_KEY = process.env.LUMA_API_KEY; // Server-side only

export interface LumaApiOptions {
  before?: string; // ISO 8601 Datetime
  after?: string; // ISO 8601 Datetime
  sort_direction?: 'asc' | 'desc';
  sort_column?: string;
  pagination_cursor?: string;
  pagination_limit?: number;
}

/**
 * Fetch events from Lu.ma API - SERVER SIDE ONLY
 * @param options - API query options
 * @returns Promise<LumaEventsResponse>
 */
export async function fetchLumaEvents(options: LumaApiOptions = {}): Promise<LumaEventsResponse> {
  if (!LUMA_API_KEY) {
    throw new Error('Lu.ma API key is not configured');
  }

  const searchParams = new URLSearchParams();
  
  // Add query parameters
  if (options.before) searchParams.append('before', options.before);
  if (options.after) searchParams.append('after', options.after);
  if (options.sort_direction) searchParams.append('sort_direction', options.sort_direction);
  if (options.sort_column) searchParams.append('sort_column', options.sort_column);
  if (options.pagination_cursor) searchParams.append('pagination_cursor', options.pagination_cursor);
  if (options.pagination_limit) searchParams.append('pagination_limit', options.pagination_limit.toString());

  const url = `${LUMA_API_BASE_URL}/calendar/list-events?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-luma-api-key': LUMA_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Lu.ma API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Lu.ma API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Lu.ma API response structure:', JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching Lu.ma events:', error);
    throw error;
  }
}

/**
 * Helper function to determine if an event is upcoming
 * @param startAt - Event start time in ISO format
 * @returns boolean
 */
export function isEventUpcoming(startAt: string): boolean {
  const eventDate = new Date(startAt);
  const now = new Date();
  return eventDate > now;
}

/**
 * Helper function to get location string from event
 * @param event - Lu.ma event object
 * @returns string
 */
export function getEventLocation(event: any): string {
  if (event.geo_address_json?.formatted_address) {
    return event.geo_address_json.formatted_address;
  }
  return 'Location TBD';
}

/**
 * Process Lu.ma events into our application format
 * @param lumaResponse - Lu.ma API response
 * @returns ProcessedEvent[]
 */
export function processLumaEvents(lumaResponse: LumaEventsResponse): ProcessedEvent[] {
  // Handle case where entries might be undefined or not an array
  if (!lumaResponse || !lumaResponse.entries || !Array.isArray(lumaResponse.entries)) {
    console.error('Invalid Lu.ma API response structure:', lumaResponse);
    return [];
  }

  return lumaResponse.entries.map((entry) => {
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
      tags: event.tags?.map(tag => tag.name) || [],
      timezone: event.timezone,
      meetingUrl: event.meeting_url || undefined,
      zoomMeetingUrl: event.zoom_meeting_url || undefined,
    };
  });
}

/**
 * Format event date and time for display
 * @param startAt - Start time in ISO format
 * @param endAt - End time in ISO format
 * @param timezone - Event timezone
 * @returns string
 */
export function formatEventDateTime(startAt: string, endAt: string, timezone: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);
  
  // Format date
  const dateStr = start.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  // Format time
  const timeStr = `${start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })} - ${end.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })}`;
  
  return `${dateStr} • ${timeStr}`;
}

/**
 * Format ISO 8601 duration to readable format
 * @param duration - ISO 8601 duration string
 * @returns string
 */
export function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return '';
  
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  }
  return '';
}

/**
 * Get upcoming events from Lu.ma - SERVER SIDE ONLY
 * @param limit - Number of events to fetch
 * @returns Promise<ProcessedEvent[]>
 */
export async function getUpcomingEvents(limit: number = 10): Promise<ProcessedEvent[]> {
  const now = new Date().toISOString();
  
  const response = await fetchLumaEvents({
    after: now,
    sort_direction: 'asc',
    sort_column: 'start_at',
    pagination_limit: limit,
  });
  
  return processLumaEvents(response);
}

/**
 * Get past events from Lu.ma - SERVER SIDE ONLY
 * @param limit - Number of events to fetch
 * @returns Promise<ProcessedEvent[]>
 */
export async function getPastEvents(limit: number = 10): Promise<ProcessedEvent[]> {
  const now = new Date().toISOString();
  
  const response = await fetchLumaEvents({
    before: now,
    sort_direction: 'desc',
    sort_column: 'start_at',
    pagination_limit: limit,
  });
  
  return processLumaEvents(response);
}

/**
 * Get all events from Lu.ma - SERVER SIDE ONLY
 * @param limit - Number of events to fetch
 * @returns Promise<ProcessedEvent[]>
 */
export async function getAllEvents(limit: number = 50): Promise<ProcessedEvent[]> {
  const response = await fetchLumaEvents({
    sort_direction: 'desc',
    sort_column: 'start_at',
    pagination_limit: limit,
  });
  
  return processLumaEvents(response);
} 