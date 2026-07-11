'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Countdown } from '@/components/ui/countdown';
import { siteConfig } from '@/lib/site-config';
import { trustStats } from '@/lib/content';
import { formatPrice } from '@/lib/utils';
import { track } from '@/lib/pixel';

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brand-radial" />
        <motion.div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
          animate={reduce ? undefined : { y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl"
          animate={reduce ? undefined : { y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-tight">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: copy */}
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              🧬 {siteConfig.org} · Live Online Cohort
            </motion.span>

            <motion.h1
              className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              <span className="text-gradient">R Programming</span>
              <br />
              for Biologists
            </motion.h1>

            <motion.p
              className="mt-5 max-w-xl text-lg text-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              {siteConfig.courseSubtitle}. {siteConfig.courseShort}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              <a
                href="#register"
                onClick={() => track('InitiateCheckout', 'cta_click', { location: 'hero' })}
                className="btn-primary px-7 py-3.5 text-base"
              >
                Register Now
              </a>
              <a href="#curriculum" className="btn-secondary px-7 py-3.5 text-base">
                Learn More
              </a>
            </motion.div>

            {/* Price + format quick facts */}
            <motion.div
              className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              <span className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-[rgb(var(--fg))]">
                  {formatPrice(siteConfig.price.amount, siteConfig.price.currency)}
                </span>
                <span className="text-muted line-through">
                  {formatPrice(siteConfig.price.original, siteConfig.price.currency)}
                </span>
              </span>
              <span>· {siteConfig.format.duration}</span>
              <span>· {siteConfig.format.mode}</span>
              <span>· {siteConfig.format.seats} seats only</span>
            </motion.div>
          </div>

          {/* Right: countdown card */}
          <motion.div
            className="glass rounded-4xl p-6 shadow-card sm:p-8"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Registration closes in
            </p>
            <Countdown target={siteConfig.registrationDeadline} className="mt-3" />

            <div className="mt-6 space-y-3 border-t border-[rgb(var(--border))] pt-5 text-sm">
              <Fact label="Batch starts" value={new Date(siteConfig.courseStartDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <Fact label="Classes" value={siteConfig.format.sessions} />
              <Fact label="Level" value="Beginner friendly — no coding needed" />
            </div>

            <a
              href="#register"
              onClick={() => track('InitiateCheckout', 'cta_click', { location: 'hero_card' })}
              className="btn-primary mt-6 w-full"
            >
              Reserve my seat
            </a>

            {/* Trusted-by strip */}
            <div className="mt-6 grid grid-cols-4 gap-2 border-t border-[rgb(var(--border))] pt-5 text-center">
              {trustStats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-lg font-bold text-gradient">{s.value}</div>
                  <div className="text-[10px] leading-tight text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
