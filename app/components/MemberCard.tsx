'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

interface MemberCardProps {
  name: string;
  title: string;
  company: string;
  bio: string;
  photoUrl: string;
  location: string;
  skills: string[];
  testimonial?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  joinedYear: number;
  featured?: boolean;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  title,
  company,
  bio,
  photoUrl,
  location,
  skills,
  testimonial,
  linkedin,
  github,
  twitter,
  portfolio,
  joinedYear,
  featured = false
}) => {
  return (
    <Card className={`border-border transition-all duration-300 ${featured ? 'border-blue-500 bg-blue-50/5' : 'hover:border-muted-foreground'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Image
              src={photoUrl}
              alt={`${name} profile`}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            {featured && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">⭐</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-sm font-medium text-blue-400">{company}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          {location}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          Joined {joinedYear}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
        
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
        
        {testimonial && (
          <blockquote className="border-l-4 border-muted pl-4 italic text-sm text-muted-foreground">
            &quot;{testimonial}&quot;
          </blockquote>
        )}
        
        <div className="flex items-center space-x-2">
          {linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {github && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {twitter && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {portfolio && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={portfolio} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard; 