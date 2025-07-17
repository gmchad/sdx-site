'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, ExternalLink, Plus, Mail } from 'lucide-react';

// Chapters data
const chapters = [
  {
    id: "ucsd",
    name: "UC San Diego",
    location: "San Diego, CA",
    status: "active",
    memberCount: "50+",
    description: "An invite-only community where the best UCSD students building with AI share their latest experiments and projects.",
    highlights: [
      "Monthly demo sessions",
      "Invite-only membership",
      "Student-focused projects",
      "Campus-based events"
    ],
    href: "/chapters/ucsd",
    contactEmail: "ucsd@sdx.community",
    image: "/sdx-v2.png",
    featured: true
  }
];

const upcomingChapters = [
  {
    name: "Stanford University",
    location: "Palo Alto, CA",
    status: "coming_soon",
    description: "Expanding to connect Stanford's AI researchers and builders."
  },
  {
    name: "UC Berkeley",
    location: "Berkeley, CA", 
    status: "coming_soon",
    description: "Building bridges with Berkeley's renowned AI and ML community."
  },
  {
    name: "MIT",
    location: "Cambridge, MA",
    status: "planning",
    description: "Connecting with the East Coast's leading AI innovation hub."
  }
];

interface ChapterCardProps {
  chapter: typeof chapters[0];
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter }) => {
  return (
    <Card className={`h-full hover:shadow-lg transition-all duration-300 ${chapter.featured ? 'border-blue-500 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20' : ''}`}>
      <CardHeader>
        {chapter.featured && (
          <Badge className="w-fit mb-2 bg-gradient-to-r from-blue-600 to-purple-600">
            Featured Chapter
          </Badge>
        )}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={chapter.image}
              alt={`${chapter.name} logo`}
              width={64}
              height={64}
              className="w-full h-full object-contain p-2"
            />
          </div>
          <div>
            <CardTitle className="text-xl">{chapter.name}</CardTitle>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{chapter.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          {chapter.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{chapter.memberCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Active</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Chapter Highlights</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {chapter.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center">
                <span className="text-green-400 mr-2">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col gap-2 pt-4">
          <Button asChild className="w-full">
            <Link href={chapter.href}>
              Learn More
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`mailto:${chapter.contactEmail}`}>
              <Mail className="w-4 h-4 mr-2" />
              Contact Chapter
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface UpcomingChapterCardProps {
  chapter: typeof upcomingChapters[0];
}

const UpcomingChapterCard: React.FC<UpcomingChapterCardProps> = ({ chapter }) => {
  const statusColors = {
    coming_soon: "bg-yellow-600",
    planning: "bg-gray-600"
  };
  
  const statusText = {
    coming_soon: "Coming Soon",
    planning: "In Planning"
  };

  return (
    <Card className="h-full opacity-75 hover:opacity-100 transition-opacity duration-300">
      <CardHeader>
        <Badge className={`w-fit mb-2 ${statusColors[chapter.status as keyof typeof statusColors]}`}>
          {statusText[chapter.status as keyof typeof statusText]}
        </Badge>
        <CardTitle className="text-lg">{chapter.name}</CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{chapter.location}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {chapter.description}
        </p>
        <Button variant="outline" size="sm" disabled className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Notify Me
        </Button>
      </CardContent>
    </Card>
  );
};

export default function ChaptersPage() {
  return (
    <main className="relative bg-background text-foreground pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SDx <span className="text-blue-400">Chapters</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Connecting AI builders across top universities and innovation hubs. 
            Each chapter creates a local ecosystem of innovation, collaboration, and growth.
          </p>
        </div>

        {/* Active Chapters */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Active Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map(chapter => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>

        {/* Expansion Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Expanding Nationwide</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
            We&apos;re working to bring SDx chapters to more universities and cities. 
            Each new chapter will maintain our core values of quality, community, and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingChapters.map((chapter, index) => (
              <UpcomingChapterCard key={index} chapter={chapter} />
            ))}
          </div>
        </div>

        {/* Chapter Benefits */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Join a Chapter?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Local Community</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with AI builders in your area for in-person collaboration and networking
                </p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Regular Events</h3>
                <p className="text-muted-foreground text-sm">
                  Participate in chapter-specific events, workshops, and demo sessions
                </p>
              </div>
              <div className="text-center">
                <ExternalLink className="w-12 h-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Global Network</h3>
                <p className="text-muted-foreground text-sm">
                  Access to the broader SDx community while maintaining local connections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start a Chapter CTA */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Start a Chapter</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                             Interested in bringing SDx to your university or city? We&apos;re looking for passionate leaders 
              to help grow our community and create local ecosystems of AI innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:chapters@sdx.community?subject=Start a New Chapter">
                  <Plus className="w-4 h-4 mr-2" />
                  Start a Chapter
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://lu.ma/sdx" target="_blank">
                  Join Main Community
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Questions about chapters? Contact us at{' '}
                <Link 
                  href="mailto:chapters@sdx.community" 
                  className="text-blue-400 hover:underline"
                >
                  chapters@sdx.community
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 