import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { audience } from '@/lib/content';

export function Audience() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Who should join"
          title="Made for students and researchers across the life sciences"
          subtitle="If you work with biological data — or want to — this course is for you."
        />

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {audience.map((a, i) => (
            <Reveal key={a} as="div" delay={(i % 6) * 0.04}>
              <span className="surface inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-card">
                <Icon name="check" className="h-4 w-4 text-accent-500" />
                {a}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
