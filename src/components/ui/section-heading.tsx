import type { ReactNode } from 'react';
import { Reveal } from './reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  return (
    <Reveal
      className={`mx-auto max-w-2xl ${align === 'center' ? 'text-center' : 'text-left'} ${
        align === 'center' ? 'mx-auto' : ''
      }`}
    >
      {eyebrow ? <span className="eyebrow mb-4">{eyebrow}</span> : null}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
