'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { faqs } from '@/lib/content';

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[rgb(var(--bg-subtle))] py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.03}>
                <div className="surface overflow-hidden rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-medium">{item.q}</span>
                    <span className={`flex-none text-xl text-accent-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-[rgb(var(--border))] px-5 py-4 text-sm text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
