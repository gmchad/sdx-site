# Lu.ma API Integration

This project includes a secure server-side integration with the Lu.ma API to fetch event data.

## Setup

### 1. Get a Lu.ma API Key

1. Sign up for [Lu.ma Plus](https://lu.ma/pricing) (required for API access)
2. Go to your [Lu.ma Dashboard](https://lu.ma/dashboard)
3. Navigate to API settings and generate an API key
4. Keep this key secure - it provides full access to your Lu.ma account

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Lu.ma API Configuration (Server-side only)
LUMA_API_KEY=your_luma_api_key_here
```

**Important**: Never use `NEXT_PUBLIC_` prefix for the Lu.ma API key as this would expose it to the client side.

## API Architecture

### Server-Side Only
- Lu.ma API calls are made exclusively on the server side
- API key is never exposed to the client
- All Lu.ma communication goes through Next.js API routes

### API Routes
- `GET /api/events` - Fetch events with filters
  - `?filter=all|upcoming|past` - Filter by event timing
  - `?limit=50` - Limit number of events

### Client-Side API
- `lib/api-client.ts` - Client-side functions to call our API routes
- `fetchEvents()`, `getUpcomingEvents()`, `getPastEvents()`, `getAllEvents()`

### Fallback System
- If API key is not configured, the app uses mock data
- Users see a notice that demo data is being used
- Graceful degradation ensures the app always works

## File Structure

```
sdx-site/
├── app/api/events/route.ts     # Next.js API route for events
├── lib/luma-api.ts             # Server-side Lu.ma API utilities
├── lib/api-client.ts           # Client-side API functions
├── types/luma.ts               # TypeScript types for Lu.ma API
├── data/events.json            # Mock data (Lu.ma API format)
└── app/events/page.tsx         # Events page component
```

## Usage

### Basic Usage
```typescript
import { getAllEvents } from '@/lib/api-client';

const events = await getAllEvents();
```

### With Filters
```typescript
import { fetchEvents } from '@/lib/api-client';

const upcomingEvents = await fetchEvents('upcoming', 10);
const pastEvents = await fetchEvents('past', 10);
```

### Error Handling
The system automatically falls back to mock data if:
- API key is not configured
- Lu.ma API is unavailable
- Network errors occur

## Security Features

1. **Server-Side Only**: Lu.ma API key never leaves the server
2. **Environment Variables**: API key stored securely in `.env.local`
3. **API Routes**: All external API calls go through Next.js API routes
4. **Graceful Fallback**: App works even without API access
5. **Error Handling**: Comprehensive error handling with fallbacks

## Development

### Without API Key
- App uses mock data from `data/events.json`
- Shows demo data notice to users
- Full functionality available for development

### With API Key
- Real Lu.ma data is fetched and cached
- Live event updates from your Lu.ma calendar
- Production-ready functionality

## Lu.ma API Reference

The integration uses the Lu.ma Calendar API:
- **Endpoint**: `https://public-api.lu.ma/public/v1/calendar/list-events`
- **Authentication**: `x-luma-api-key` header
- **Documentation**: [Lu.ma API Docs](https://docs.lu.ma/reference/getting-started-with-your-api)

## TypeScript Support

Full TypeScript support with proper types for:
- Lu.ma API responses
- Processed event data
- API client functions
- Error handling 