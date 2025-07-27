'use client'

import React from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const handleLinkClick = (linkUrl: string, label: string) => {
    sendGAEvent('clicked', {
      link_url: linkUrl,
      label: label
    });
  };

  return (
    <footer className="bg-muted/30 border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Community Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">SDx Community</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              San Diego's premier community for AI builders. Join 1000+ innovators creating the future through hands-on projects and collaborative events.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                asChild
                onClick={() => handleLinkClick('https://discord.gg/Rkgyzx2ykV', 'footer-discord')}
              >
                <Link href="https://discord.gg/Rkgyzx2ykV" target="_blank" aria-label="Join our Discord">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                asChild
                onClick={() => handleLinkClick('https://twitter.com/SDxCommunity', 'footer-twitter')}
              >
                <Link href="https://twitter.com/SDxCommunity" target="_blank" aria-label="Follow us on Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                asChild
                onClick={() => handleLinkClick('https://linkedin.com/company/sdxcommunity', 'footer-linkedin')}
              >
                <Link href="https://linkedin.com/company/sdxcommunity" target="_blank" aria-label="Connect on LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-muted-foreground hover:text-foreground transition-colors">
                  Members
                </Link>
              </li>
              <li>
                <Link href="/startups" className="text-muted-foreground hover:text-foreground transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/chapters" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chapters
                </Link>
              </li>
            </ul>
          </div>

          {/* Join Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Join Community</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://lu.ma/sdx" 
                  target="_blank" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick('https://lu.ma/sdx', 'footer-luma')}
                >
                  Lu.ma Events
                </Link>
              </li>
              <li>
                <Link 
                  href="https://discord.gg/Rkgyzx2ykV" 
                  target="_blank" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => handleLinkClick('https://discord.gg/Rkgyzx2ykV', 'footer-discord-text')}
                >
                  Discord Server
                </Link>
              </li>
              <li>
                <Link 
                  href="mailto:community@sdx.community" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SDx Community. Building the future of AI in San Diego.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Button 
              variant="ghost"
              size="sm"
              asChild
              onClick={() => handleLinkClick('https://lu.ma/sdx', 'footer-cta')}
            >
              <Link href="https://lu.ma/sdx" target="_blank">
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 