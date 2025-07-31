'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ExternalLink, Users, Calendar, Code, Rocket, Crown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleLinkClick = (linkUrl: string, label: string) => {
    sendGAEvent('clicked', {
      link_url: linkUrl,
      label: label
    });
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 mt-16">
          <Image
            src="/sdx-v2.png"
            alt="SDx Community Logo"
            width={300}
            height={250}
            className="mx-auto"
          />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          San Diego&apos;s premier community for 
          <span className="text-blue-400"> AI builders</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto">
          Join 1000+ builders and executives creating the future of AI through hands-on projects, collaborative events, and a supportive community of innovators
        </p>

        {/* Main CTAs - Side by Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {/* Builders Card */}
          <Card className="border-border hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 w-fit mx-auto">
                <Code className="w-4 h-4 mr-2" />
                For AI Builders
              </Badge>
              <CardTitle className="text-2xl lg:text-3xl">Builder Community</CardTitle>
              <CardDescription className="text-base lg:text-lg">
                Connect with fellow AI builders, share your projects, get feedback, and grow together in San Diego&apos;s most active AI community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center text-green-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Weekly events & hackathons</span>
                </div>
                <div className="flex items-center text-green-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Project showcase opportunities</span>
                </div>
                <div className="flex items-center text-green-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Executive network access</span>
                </div>
                <div className="flex items-center text-green-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Access to startup resources</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 w-full"
                  asChild
                  onClick={() => handleLinkClick('https://lu.ma/sdx', 'builders-signup')}
                >
                  <Link href="https://lu.ma/sdx" target="_blank">
                    Join Community
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="text-lg px-8 py-3 w-full"
                  asChild
                  onClick={() => handleLinkClick('https://discord.gg/Rkgyzx2ykV', 'discord-join')}
                >
                  <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank">
                    Join Discord
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Executive Network Card */}
          <Card className="border-border hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 w-fit mx-auto">
                <Crown className="w-4 h-4 mr-2" />
                For AI Executives
              </Badge>
              <CardTitle className="text-2xl lg:text-3xl">Executive Network</CardTitle>
              <CardDescription className="text-base lg:text-lg">
                Join our exclusive executive network of 50 AI leaders for quarterly roundtables, strategic insights, and direct access to San Diego&apos;s top AI talent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center text-purple-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Quarterly executive roundtables</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Strategic AI insights & trends</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Access to top AI talent</span>
                </div>
                <div className="flex items-center text-purple-400">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Exclusive network of 50 leaders</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-3 w-full border-purple-500 hover:bg-purple-500/10"
                asChild
                onClick={() => handleLinkClick('/executives', 'executive-funnel')}
              >
                <Link href="/executives">
                  Apply to Executive Network
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <CardTitle className="text-lg">Active Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Connect with 1000+ AI builders and industry executives</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Calendar className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <CardTitle className="text-lg">Regular Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Weekly meetups, hackathons, and workshops</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Code className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <CardTitle className="text-lg">Hands-on Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Build real AI applications with peer support</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Rocket className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <CardTitle className="text-lg">Startup Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">From idea to launch with community backing</p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
            <div className="text-muted-foreground">Active Builders</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
            <div className="text-muted-foreground">Events Hosted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
            <div className="text-muted-foreground">Startups Launched</div>
          </div>
        </div>

        {/* Social Links */}

      </div>
    </section>
  );
};

export default HeroSection; 