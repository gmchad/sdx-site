'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ExternalLink, Users, Calendar, Code, Rocket } from 'lucide-react';

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
          Join 1000+ builders creating the future of AI through hands-on projects, collaborative events, and a supportive community of innovators
        </p>

        {/* Main CTA Card */}
        <Card className="border-border hover:border-blue-500 transition-all duration-300 transform hover:scale-105 max-w-2xl mx-auto mb-16">
          <CardHeader>
            <div className="text-5xl mb-4">🚀</div>
            <CardTitle className="text-3xl">Join the Builder Community</CardTitle>
            <CardDescription className="text-lg">
              Connect with fellow AI builders, share your projects, get feedback, and grow together in San Diego&apos;s most active AI community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <span>Mentorship from industry leaders</span>
              </div>
              <div className="flex items-center text-green-400">
                <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Access to startup resources</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
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
                className="text-lg px-8 py-3"
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

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <CardTitle className="text-lg">Active Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Connect with 1000+ AI builders and innovators</p>
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
        <div className="flex justify-center space-x-6 text-lg">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
            onClick={() => handleLinkClick('https://discord.gg/Rkgyzx2ykV', 'discord')}
          >
            <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
              </svg>
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            asChild
            onClick={() => handleLinkClick('https://twitter.com/SDxCommunity', 'twitter')}
          >
            <Link href="https://twitter.com/SDxCommunity" target="_blank">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 