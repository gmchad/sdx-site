'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <Card className="border-border hover:border-blue-500 transition-all duration-300">
      {imageUrl && (
        <div className="w-full h-48 bg-muted rounded-t-lg overflow-hidden">
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
          <span className="text-muted-foreground text-sm">{date}</span>
        </div>
        
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-muted-foreground text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {time}
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        
        <p className="text-muted-foreground line-clamp-3">{description}</p>
        
        {eventUrl && (
          <Button asChild>
            <Link href={eventUrl} target="_blank">
              Learn More
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard; 