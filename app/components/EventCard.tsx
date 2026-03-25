'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  eventUrl?: string;
  imageUrl?: string;
  isUpcoming?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  location,
  description,
  eventUrl,
  imageUrl,
  isUpcoming = true
}) => {
  return (
    <Card>
      {imageUrl && (
        <div className="w-full h-48 bg-white/[0.02] rounded-t-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={isUpcoming ? "default" : "secondary"}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </Badge>
          <span className="text-xs uppercase tracking-widest text-white/30">{date}</span>
        </div>

        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-white/40">
          <Calendar className="w-3.5 h-3.5 mr-2" />
          {time}
        </div>

        <div className="flex items-center text-sm text-white/40">
          <MapPin className="w-3.5 h-3.5 mr-2" />
          {location}
        </div>

        <p className="text-sm text-white/40 line-clamp-3 leading-relaxed">{description}</p>

        {eventUrl && (
          <Link
            href={eventUrl}
            target="_blank"
            className="inline-flex items-center text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200 pt-2"
          >
            View event
            <ExternalLink className="w-3 h-3 ml-1.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
