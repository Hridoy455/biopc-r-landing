'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { curriculum } from '@/lib/content';

export function Curriculum() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="curriculum" className="bg-[rgb(var(--bg-subtle))] py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Curriculum"
          title="A 6-week roadmap from your first line of code to a full analysis"
          subtitle="Every week pairs concepts with a hands-on project using real biological data."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {curriculum.map((week, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={week.week} delay={i * 0.04}>
                <div className="surface overflow-hidden rounded-2xl shadow-card">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-brand-gradient text-xs font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-accent-600">
                        {week.week}
                      </span>
                      <span className="block font-display text-base font-semibold">{week.title}</span>
                    </span>
                    <Icon
                      name="check"
                      className={`h-5 w-5 flex-none text-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-90' : ''
                      }`}
                    />
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
                        <div className="border-t border-[rgb(var(--border))] px-5 py-4">
                          <ul className="space-y-2">
                            {week.lessons.map((lesson) => (
                              <li key={lesson} className="flex items-start gap-2.5 text-sm text-muted">
                                <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-accent-500" />
                                {lesson}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 rounded-xl bg-accent-50 px-4 py-2.5 text-sm font-medium text-accent-700 dark:bg-accent-950/40 dark:text-accent-300">
                            🎯 Project: {week.project}
                          </p>
                        </div>
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
