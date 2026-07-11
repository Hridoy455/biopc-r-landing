import { Reveal } from '@/components/ui/reveal';
import { Icon } from '@/components/ui/icon';
import { instructor } from '@/lib/content';
import { siteConfig } from '@/lib/site-config';

export function Instructor() {
  return (
    <section id="instructor" className="py-20 sm:py-24">
      <div className="container-tight">
        <Reveal className="glass mx-auto max-w-4xl overflow-hidden rounded-4xl shadow-card">
          <div className="grid gap-8 p-8 sm:grid-cols-[240px_1fr] sm:p-10">
            <div className="mx-auto w-full max-w-[240px]">
              {/*
                Instructor avatar. Shows initials on a brand gradient by default.
                To use a real photo: drop the file at public/instructor.jpg and
                replace this block with a <next/image> using instructor.photo.
              */}
              <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-brand-gradient">
                <span className="font-display text-6xl font-bold text-white/90">
                  {instructor.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
            </div>

            <div>
              <span className="eyebrow mb-3">Your instructor</span>
              <h3 className="font-display text-2xl font-bold">{instructor.name}</h3>
              <p className="text-sm font-medium text-accent-600">{instructor.role}</p>
              <p className="mt-4 text-sm text-muted">{instructor.bio}</p>

              <ul className="mt-5 space-y-2">
                {instructor.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm">
                    <Icon name="check" className="mt-0.5 h-4 w-4 flex-none text-accent-500" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-xs">
                  LinkedIn
                </a>
                <a href={siteConfig.social.facebookPage} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-xs">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
