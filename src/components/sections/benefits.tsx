import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { benefits } from '@/lib/content';

export function Benefits() {
  return (
    <section id="benefits" className="bg-[rgb(var(--bg-subtle))] py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Course benefits"
          title="Everything you need to go from zero to confident in R"
          subtitle="Built for biologists who want practical, publication-ready data skills — without a computer-science background."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={(i % 4) * 0.06}
              className="group surface rounded-3xl p-6 shadow-card transition hover:-translate-y-1 hover:border-accent-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 transition group-hover:bg-brand-gradient group-hover:text-white dark:bg-accent-950/50">
                <Icon name={b.icon} className="h-6 w-6" />
              </div>
              <h3 className="font-display text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
