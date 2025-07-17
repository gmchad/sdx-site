'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (linkUrl: string) => {
    sendGAEvent('clicked', {
      link_url: linkUrl
    });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/sdx-logo-white.svg"
                alt="SDx"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button 
                variant="ghost"
                asChild
                onClick={() => handleLinkClick('/events')}
              >
                <Link href="/events">Events</Link>
              </Button>
              <Button 
                variant="ghost"
                asChild
                onClick={() => handleLinkClick('/startups')}
              >
                <Link href="/startups">Startups</Link>
              </Button>
              <Button 
                variant="ghost"
                asChild
                onClick={() => handleLinkClick('/members')}
              >
                <Link href="/members">Members</Link>
              </Button>
              <Button 
                variant="ghost"
                asChild
                onClick={() => handleLinkClick('/chapters')}
              >
                <Link href="/chapters">Chapters</Link>
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost"
              asChild
              onClick={() => handleLinkClick('https://lu.ma/sdx')}
            >
              <Link href="https://lu.ma/sdx" target="_blank">Join Community</Link>
            </Button>
            <Button 
              asChild
              onClick={() => handleLinkClick('/executives')}
            >
              <Link href="/executives">For Executives</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Button 
                    variant="ghost"
                    asChild
                    onClick={() => handleLinkClick('/events')}
                    className="justify-start"
                  >
                    <Link href="/events">Events</Link>
                  </Button>
                  <Button 
                    variant="ghost"
                    asChild
                    onClick={() => handleLinkClick('/startups')}
                    className="justify-start"
                  >
                    <Link href="/startups">Startups</Link>
                  </Button>
                  <Button 
                    variant="ghost"
                    asChild
                    onClick={() => handleLinkClick('/members')}
                    className="justify-start"
                  >
                    <Link href="/members">Members</Link>
                  </Button>
                  <Button 
                    variant="ghost"
                    asChild
                    onClick={() => handleLinkClick('/chapters')}
                    className="justify-start"
                  >
                    <Link href="/chapters">Chapters</Link>
                  </Button>
                  <Button 
                    variant="ghost"
                    asChild
                    onClick={() => handleLinkClick('https://lu.ma/sdx')}
                    className="justify-start"
                  >
                    <Link href="https://lu.ma/sdx" target="_blank">Join Community</Link>
                  </Button>
                  <Button 
                    asChild
                    onClick={() => handleLinkClick('/executives')}
                    className="justify-start"
                  >
                    <Link href="/executives">For Executives</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 