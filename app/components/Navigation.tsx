'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/events', label: 'Events' },
  { href: '/members', label: 'Members' },
  { href: '/chapters', label: 'Chapters' },
];

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (linkUrl: string) => {
    sendGAEvent('clicked', { link_url: linkUrl });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => handleLinkClick('/')}>
            <span className="font-display text-2xl text-white tracking-tight">SDx</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="px-3 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/executives"
              onClick={() => handleLinkClick('/executives')}
              className="px-3 py-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
            >
              Executives
            </Link>
            <Link
              href="https://lu.ma/sdx"
              target="_blank"
              onClick={() => handleLinkClick('https://lu.ma/sdx')}
              className="holographic-border px-4 py-1.5 text-xs uppercase tracking-widest text-white rounded-sm"
            >
              Join
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-white/60 hover:text-white transition-colors duration-200">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-black border-white/5 p-0">
                <div className="flex flex-col pt-12">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="px-6 py-3 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/[0.03] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/5 my-2" />
                  <Link
                    href="/executives"
                    onClick={() => handleLinkClick('/executives')}
                    className="px-6 py-3 text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/[0.03] transition-colors duration-200"
                  >
                    Executives
                  </Link>
                  <div className="px-6 pt-4">
                    <Link
                      href="https://lu.ma/sdx"
                      target="_blank"
                      onClick={() => handleLinkClick('https://lu.ma/sdx')}
                      className="holographic-border block text-center px-4 py-2 text-xs uppercase tracking-widest text-white rounded-sm"
                    >
                      Join
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Holographic line separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </nav>
  );
};

export default Navigation;
