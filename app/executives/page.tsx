'use client'

import React from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Rocket, Handshake, ExternalLink } from 'lucide-react';

export default function ExecutivesPage() {
  const handleContactClick = () => {
    sendGAEvent('clicked', {
      link_url: 'mailto:contact@sdx.community',
      label: 'executives-contact'
    });
  };

  return (
    <main className="relative bg-background text-foreground pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Partner with San Diego's
            <span className="text-green-400"> AI Innovation</span> Hub
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Access our curated network of 1000+ AI builders, entrepreneurs, and technical talent 
            shaping the future of artificial intelligence
          </p>
        </div>

        {/* Value Propositions */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">Curated Talent Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Direct access to pre-vetted AI engineers, founders, and technical leaders 
                from our exclusive community
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Rocket className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">Innovation Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Early access to cutting-edge AI startups and breakthrough technologies 
                emerging from our ecosystem
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <Handshake className="w-12 h-12 mx-auto mb-4 text-primary" />
              <CardTitle className="text-xl">Strategic Partnerships</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Collaborate with industry leaders and participate in exclusive 
                executive programming and events
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Success Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <Badge variant="default" className="mb-2 text-blue-400">15+ Startups Launched</Badge>
                <p className="text-muted-foreground">
                  Companies like Echo Chunk, Big AGI, and Chat Shape have emerged from our community, 
                  raising millions in funding and serving thousands of users
                </p>
              </div>
              <div className="text-center">
                <Badge variant="default" className="mb-2 text-green-400">50+ Events Hosted</Badge>
                <p className="text-muted-foreground">
                  From technical workshops to executive roundtables, we've facilitated 
                  connections that drive innovation and business growth
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <CardTitle className="text-lg">Initial Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  We understand your talent needs and strategic objectives
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <CardTitle className="text-lg">Curated Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Access to pre-vetted talent and startup opportunities
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <CardTitle className="text-lg">Executive Programming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Exclusive events and insights from industry leaders
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground font-bold">4</span>
                </div>
                <CardTitle className="text-lg">Ongoing Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Long-term collaboration and innovation support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="text-center bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Partner with Us?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-xl text-muted-foreground">
              Let's discuss how SDx can help you access top AI talent and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild onClick={handleContactClick}>
                <Link href="mailto:contact@sdx.community">
                  Schedule a Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://airtable.com/appHsy3IiApTDvksA/shrOxmPTtfryRvHij" target="_blank">
                  View Our Talent Network
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 