// Lu.ma API Types
export interface LumaEventTag {
  api_id: string;
  name: string;
}

export interface LumaGeoAddress {
  // This would contain the Google Maps location data
  [key: string]: any;
}

export interface LumaEvent {
  api_id: string;
  created_at: string; // ISO 8601 Datetime
  cover_url: string;
  calendar_api_id: string;
  description: string;
  description_md: string;
  duration_interval: string; // ISO 8601 Duration format
  end_at: string; // ISO 8601 Datetime
  geo_address_json: LumaGeoAddress | null;
  geo_latitude: string | null;
  geo_longitude: string | null;
  meeting_url: string | null;
  name: string;
  start_at: string; // ISO 8601 Datetime
  timezone: string; // IANA Timezone
  url: string;
  user_api_id: string;
  visibility: string; // Could be 'public', 'private', etc.
  zoom_meeting_url: string | null;
  tags: LumaEventTag[];
}

export interface LumaEventEntry {
  api_id: string;
  event: LumaEvent;
}

export interface LumaEventsResponse {
  entries: LumaEventEntry[];
  has_more: boolean;
  next_cursor: string;
}

// Helper type for our application
export interface ProcessedEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  eventUrl: string;
  coverUrl: string;
  isUpcoming: boolean;
  tags: string[];
  timezone: string;
  meetingUrl?: string;
  zoomMeetingUrl?: string;
} 