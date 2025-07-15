import { ProcessedEvent } from '@/types/luma';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
  usingFallback?: boolean;
  error?: string;
  message?: string;
}

export interface EventsResult {
  events: ProcessedEvent[];
  usingFallback: boolean;
}

/**
 * Fetch events from our API routes
 * @param filter - Event filter (all, upcoming, past)
 * @param limit - Number of events to fetch
 * @returns Promise<EventsResult>
 */
export async function fetchEvents(
  filter: 'all' | 'upcoming' | 'past' = 'all',
  limit: number = 20
): Promise<EventsResult> {
  const searchParams = new URLSearchParams({
    filter,
    limit: limit.toString(),
  });

  const url = `/api/events?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result: ApiResponse<ProcessedEvent[]> = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch events');
    }

    return {
      events: result.data,
      usingFallback: result.usingFallback || false,
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

/**
 * Get upcoming events
 * @param limit - Number of events to fetch
 * @returns Promise<EventsResult>
 */
export async function getUpcomingEvents(limit: number = 10): Promise<EventsResult> {
  return fetchEvents('upcoming', limit);
}

/**
 * Get past events
 * @param limit - Number of events to fetch
 * @returns Promise<EventsResult>
 */
export async function getPastEvents(limit: number = 10): Promise<EventsResult> {
  return fetchEvents('past', limit);
}

/**
 * Get all events
 * @param limit - Number of events to fetch
 * @returns Promise<EventsResult>
 */
export async function getAllEvents(limit: number = 50): Promise<EventsResult> {
  return fetchEvents('all', limit);
} 