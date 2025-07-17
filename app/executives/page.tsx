'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Mail, Building, Calendar, CheckCircle } from 'lucide-react';

export default function ExecutivesPage() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with pre-filled subject and body
    const subject = encodeURIComponent('Interest in SDx Executive Program');
    const body = encodeURIComponent(`Hi SDx Team,

I&apos;m interested in learning more about the upcoming executive program for AI leaders.

Name: [Please fill in your name]
Email: ${email}
Company: ${company}
Role: ${role}

I&apos;d like to be notified when the program launches and learn more about partnership opportunities.

Best regards`);
    
    const mailtoLink = `mailto:contact@sdx.community?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    sendGAEvent('form_submit', {
      form_name: 'executives-interest',
      email: email,
      company: company
    });
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="relative bg-background text-foreground pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="text-center bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <CardTitle className="text-3xl">Thank You!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Your interest has been recorded. We&apos;ll be in touch soon with more details about our executive program.
              </p>
              <Button asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-background text-foreground pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600">
            Coming Soon
          </Badge>
          <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Executive Program for
            <span className="text-blue-400"> AI Leaders</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            An exclusive program designed for AI executives, Chief AI Officers, and senior leaders 
            looking to stay ahead of the innovation curve and connect with San Diego&apos;s AI ecosystem
          </p>
        </div>

        {/* What's Coming */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What to Expect</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Building className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <h3 className="text-lg font-semibold mb-2">Executive Roundtables</h3>
                <p className="text-muted-foreground text-sm">
                  Exclusive discussions with fellow AI executives on strategy, implementation, and industry trends
                </p>
              </div>
              <div className="text-center">
                <Crown className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-lg font-semibold mb-2">Strategic Partnerships</h3>
                <p className="text-muted-foreground text-sm">
                  Direct access to San Diego&apos;s top AI talent and emerging startups for collaboration opportunities
                </p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Innovation Insights</h3>
                <p className="text-muted-foreground text-sm">
                  Early access to breakthrough technologies and research emerging from our builder community
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interest Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              <Mail className="w-6 h-6 inline mr-2" />
              Get Early Access
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Be among the first to know when our executive program launches. 
                             Leave your details and we&apos;ll reach out with exclusive information.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Your Role *</Label>
                <Input
                  id="role"
                  type="text"
                  placeholder="e.g., Chief AI Officer, VP of AI, CTO"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                Express Interest
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Questions? Contact us directly at{' '}
                <Link 
                  href="mailto:contact@sdx.community" 
                  className="text-blue-400 hover:underline"
                  onClick={() => sendGAEvent('clicked', { link_url: 'mailto:contact@sdx.community', label: 'executives-contact' })}
                >
                  contact@sdx.community
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
            <div className="text-muted-foreground">AI Builders in Network</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400 mb-2">15+</div>
            <div className="text-muted-foreground">Startups Launched</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-muted-foreground">Events Hosted</div>
          </div>
        </div>
      </div>
    </main>
  );
} 