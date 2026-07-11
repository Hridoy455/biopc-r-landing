'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { siteConfig } from '@/lib/site-config';
import { track } from '@/lib/pixel';

const links = [
  { href: '#benefits', label: 'Benefits' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#instructor', label: 'Instructor' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="container-tight flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${siteConfig.org} home`}>
          <Image src="/logo.png" alt={`${siteConfig.org} logo`} width={36} height={36} className="rounded-full" priority />
          <span className="font-display text-lg font-bold tracking-tight">
            {siteConfig.org} <span className="text-muted font-medium">Academy</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition hover:text-accent-600">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#register"
            onClick={() => track('InitiateCheckout', 'cta_click', { location: 'navbar' })}
            className="btn-primary hidden px-5 py-2.5 sm:inline-flex"
          >
            Register Now
          </a>
        </div>
      </nav>
    </header>
  );
}
