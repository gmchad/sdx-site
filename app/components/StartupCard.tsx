'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
    <Card className="border-border hover:border-green-500 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center mb-2">
          {logoUrl && (
            <div className="w-12 h-12 bg-muted rounded-lg mr-4 flex items-center justify-center overflow-hidden">
              <Image 
                src={logoUrl} 
                alt={`${name} logo`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <CardTitle className="text-xl">{name}</CardTitle>
            <Badge variant="secondary" className="text-blue-400">{category}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {founders.map((founder, index) => (
            <Badge key={index} variant="outline">
              {founder}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {metrics.funding && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-green-400">{metrics.funding}</div>
              <div className="text-xs text-muted-foreground">Funding</div>
            </div>
          )}
          {metrics.users && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-blue-400">{metrics.users}</div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
          )}
          {metrics.revenue && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-purple-400">{metrics.revenue}</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
          )}
          {metrics.githubStars && (
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-yellow-400">{metrics.githubStars}</div>
              <div className="text-xs text-muted-foreground">GitHub Stars</div>
            </div>
          )}
        </div>
        
        {websiteUrl && (
          <Button asChild className="w-full">
            <Link href={websiteUrl} target="_blank">
              Visit Website
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StartupCard; 