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
  return (
    <Card>
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

      <CardContent className="space-y-3">
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
            <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
              <div className="text-base font-bold holographic-text">{metrics.funding}</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Funding</div>
            </div>
          )}
          {metrics.users && (
            <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
              <div className="text-base font-bold holographic-text">{metrics.users}</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Users</div>
            </div>
          )}
          {metrics.revenue && (
            <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
              <div className="text-base font-bold holographic-text">{metrics.revenue}</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Revenue</div>
            </div>
          )}
          {metrics.githubStars && (
            <div className="p-2 bg-white/[0.02] rounded border border-white/[0.04]">
              <div className="text-base font-bold holographic-text">{metrics.githubStars}</div>
              <div className="text-xs uppercase tracking-widest text-white/30">Stars</div>
            </div>
          )}
        </div>

        {websiteUrl && (
          <Link
            href={websiteUrl}
            target="_blank"
            className="inline-flex items-center text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-200 pt-1"
          >
            Visit
            <ExternalLink className="w-3 h-3 ml-1.5" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default StartupCard;
