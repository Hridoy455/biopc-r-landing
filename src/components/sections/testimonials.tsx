'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/lib/content';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3 6.5 7 .9-5 4.9 1.3 7L12 18l-6.6 3.3L6.7 14.3l-5-4.9 7-.9L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const t = testimonials[index];

  return (
    <section className="py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Testimonials"
          title="Students who started from zero"
          subtitle="Real feedback from biologists who took the leap into R with BioPC."
        />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="surface min-h-[240px] rounded-4xl p-8 shadow-card sm:p-10">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <Stars n={t.rating} />
                <blockquote className="mt-4 text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                    {t.name.split(' ').map((w) => w[0]).join('')}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={prev} aria-label="Previous testimonial" className="surface flex h-10 w-10 items-center justify-center rounded-full transition hover:border-accent-400 hover:text-accent-600">
              ‹
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-accent-500' : 'w-2 bg-[rgb(var(--border))]'}`}
                />
              ))}
            </div>
            <button type="button" onClick={next} aria-label="Next testimonial" className="surface flex h-10 w-10 items-center justify-center rounded-full transition hover:border-accent-400 hover:text-accent-600">
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
