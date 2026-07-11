'use client';

import { Countdown } from '@/components/ui/countdown';
import { siteConfig } from '@/lib/site-config';
import { track } from '@/lib/pixel';

export function FinalCta() {
  return (
    <section className="py-16">
      <div className="container-tight">
        <div className="relative overflow-hidden rounded-4xl bg-brand-gradient px-6 py-14 text-center text-white shadow-glow sm:px-12">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(50%_50%_at_50%_0%,#fff,transparent)]" />
          <div className="relative">
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start your journey into R
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              Join the next {siteConfig.courseName} cohort. Beginner-friendly, live, and research-focused —
              with a certificate and lifetime recordings.
            </p>

            <div className="mt-8 flex justify-center">
              <Countdown target={siteConfig.registrationDeadline} />
            </div>

            <a
              href="#register"
              onClick={() => track('InitiateCheckout', 'cta_click', { location: 'final' })}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-semibold text-brand-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
