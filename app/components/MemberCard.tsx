'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  featured = false
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <div className="relative flex-shrink-0">
            <Image
              src={photoUrl}
              alt={`${name}`}
              width={56}
              height={56}
              className="rounded-full object-cover w-14 h-14"
            />
          </div>

          <div className="flex-1 min-w-0">
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-sm text-white/40 mt-0.5">{title}</p>
            <p className="text-sm text-white/60 mt-0.5">{company}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-white/30">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </span>
        </div>

        <p className="text-sm text-white/40 line-clamp-3 leading-relaxed">{bio}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
            {skills.length > 4 && (
              <Badge variant="outline">+{skills.length - 4}</Badge>
            )}
          </div>
        )}

        {testimonial && (
          <blockquote className="border-l border-white/10 pl-3 text-xs text-white/30 italic leading-relaxed">
            &quot;{testimonial}&quot;
          </blockquote>
        )}

        <div className="flex items-center gap-1 pt-1">
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/20 hover:text-white transition-colors duration-200">
              <Linkedin className="w-3.5 h-3.5" />
            </Link>
          )}
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/20 hover:text-white transition-colors duration-200">
              <Github className="w-3.5 h-3.5" />
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/20 hover:text-white transition-colors duration-200">
              <Twitter className="w-3.5 h-3.5" />
            </Link>
          )}
          {portfolio && (
            <Link href={portfolio} target="_blank" rel="noopener noreferrer" className="p-1.5 text-white/20 hover:text-white transition-colors duration-200">
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
