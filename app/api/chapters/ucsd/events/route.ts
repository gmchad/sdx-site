import { NextRequest, NextResponse } from 'next/server';
import { getUcsdEventsWithFallbackStatus } from '@/app/chapters/ucsd/lib/luma';

export const revalidate = 3600;

export async function GET(request: NextRequest) {
  const filterParam = request.nextUrl.searchParams.get('filter');
  const filter = filterParam === 'past' ? 'past' : 'upcoming';

  const { events, fallback } = await getUcsdEventsWithFallbackStatus(filter);

  return NextResponse.json({ events, fallback });
}
