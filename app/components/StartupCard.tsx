'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface StartupCardProps {
  name: string;
  description: string;
  logoUrl?: string;
  founders: string[];
  metrics: {
    funding?: string;
    users?: string;
    revenue?: string;
    githubStars?: string;
  };
  websiteUrl?: string;
  category: string;
}

const StartupCard: React.FC<StartupCardProps> = ({
  name,
  description,
  logoUrl,
  founders,
  metrics,
  websiteUrl,
  category
}) => {
  const content = (
    <Card className={`h-full ${websiteUrl ? 'transition-colors duration-200 hover:border-white/20' : ''}`}>
      <CardHeader>
        <div className="flex items-center mb-2">
          {logoUrl && (
            <div className="w-10 h-10 bg-white/[0.04] rounded-lg mr-3 flex items-center justify-center overflow-hidden">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
            <Badge variant="outline" className="mt-1">{category}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 flex flex-col flex-1">
        <p className="text-sm text-white/40 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1">
          {founders.map((founder, index) => (
            <Badge key={index} variant="secondary">
              {founder}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {metrics.funding && (
            <div className="bg-white/[0.06] rounded px-3 py-2">
              <span className="block text-base font-bold text-white/90">{metrics.funding}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40">Funding</span>
            </div>
          )}
          {metrics.users && (
            <div className="bg-white/[0.06] rounded px-3 py-2">
              <span className="block text-base font-bold text-white/90">{metrics.users}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40">Users</span>
            </div>
          )}
          {metrics.revenue && (
            <div className="bg-white/[0.06] rounded px-3 py-2">
              <span className="block text-base font-bold text-white/90">{metrics.revenue}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40">Revenue</span>
            </div>
          )}
          {metrics.githubStars && (
            <div className="bg-white/[0.06] rounded px-3 py-2">
              <span className="block text-base font-bold text-white/90">{metrics.githubStars}</span>
              <span className="block text-xs uppercase tracking-widest text-white/40">Stars</span>
            </div>
          )}
        </div>

        {websiteUrl && (
          <div className="mt-auto flex justify-end pt-2">
            <span className="btn-secondary inline-flex items-center px-4 py-1.5 text-xs uppercase tracking-widest rounded-sm">
              Visit
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (websiteUrl) {
    return (
      <Link href={websiteUrl} target="_blank" className="block group">
        {content}
      </Link>
    );
  }

  return content;
};

export default StartupCard;
