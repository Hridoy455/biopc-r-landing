import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/ui/reveal';
import { whyBiopc } from '@/lib/content';

export function WhyBiopc() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-tight">
        <SectionHeading
          eyebrow="Why BioPC"
          title="Learn from a research-first platform, not a slideshow factory"
          subtitle="Since 2021, BioPC has trained thousands of students and published peer-reviewed research. You learn the skills the way researchers actually use them."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyBiopc.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="surface rounded-3xl p-6 shadow-card">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <span className="font-display text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
