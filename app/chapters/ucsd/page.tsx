'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function UCSDChapterPage() {
  return (
    <main className="relative bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-48">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <Image
              src="/sdx-v2.png"
              alt="SDx Community Logo"
              width={300}
              height={250}
              className="mx-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SDx @ UC San Diego
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            An invite-only community where the best UCSD students building with AI share their latest experiments and projects
          </p>
        </div>

        {/* Chapter Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <CardTitle className="text-3xl font-bold text-blue-400">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Active Students</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <CardTitle className="text-3xl font-bold text-green-400">Monthly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Demo Sessions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <CardTitle className="text-3xl font-bold text-purple-400">UCSD</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Campus Location</p>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">About Our Chapter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto">
              SDx @ UC San Diego is an invite-only meetup where the best UCSD students building with AI get to share their latest experiments and projects with peers. 
              We curate small groups for each event to make sure it is a safe and fun place to demo and to keep the quality high.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">What We Do</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-green-400 mr-2">✓</span>
                    Monthly project demos and presentations
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-green-400 mr-2">✓</span>
                    Peer feedback and collaboration sessions
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-green-400 mr-2">✓</span>
                    Networking with industry professionals
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-green-400 mr-2">✓</span>
                    Access to the broader SDx community
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Who Can Join</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-blue-400 mr-2">•</span>
                    UCSD students actively building AI projects
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-blue-400 mr-2">•</span>
                    Undergraduate and graduate students
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-blue-400 mr-2">•</span>
                    Researchers and PhD candidates
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="text-blue-400 mr-2">•</span>
                    Students with demonstrated AI project experience
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Projects - Coming Soon */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Student Projects</h2>
          <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 max-w-2xl mx-auto">
            <CardHeader>
              <Badge className="w-fit mb-2 mx-auto bg-yellow-600">Coming Soon</Badge>
              <CardTitle className="text-2xl text-center">2025 Cohort Projects</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                We&apos;re preparing to showcase amazing projects from our 2025 cohort of UCSD AI builders. 
                Stay tuned for innovative research, creative applications, and cutting-edge AI experiments from our student community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Connect Section */}
        <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Connect with UCSD Chapter</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground max-w-2xl mx-auto">
                             Interested in joining our UCSD chapter? We&apos;re always looking for motivated students who are passionate about AI and want to share their work with the community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="mailto:ucsd@sdx.community">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Chapter Lead
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank">
                  Join Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Monthly meetings
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Invite-only
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                UCSD Campus
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}