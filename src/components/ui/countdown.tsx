'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  /** ISO 8601 target date. */
  target: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function getTimeLeft(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, done: false };
}

/** Live countdown to the registration deadline. */
export function Countdown({ target, className }: CountdownProps) {
  const targetMs = new Date(target).getTime();
  // Start null so server and first client render match (avoids hydration mismatch).
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(targetMs));
    const id = setInterval(() => setTime(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const units: Array<{ label: string; value: number }> = [
    { label: 'Days', value: time?.days ?? 0 },
    { label: 'Hours', value: time?.hours ?? 0 },
    { label: 'Minutes', value: time?.minutes ?? 0 },
    { label: 'Seconds', value: time?.seconds ?? 0 },
  ];

  if (time?.done) {
    return (
      <div className={className}>
        <p className="text-sm font-semibold text-accent-600">Registration is closing soon — contact us to check availability.</p>
      </div>
    );
  }

  return (
    <div className={className} role="timer" aria-label="Time left to register">
      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="glass flex min-w-[64px] flex-col items-center rounded-2xl px-3 py-2.5 sm:min-w-[76px]"
          >
            <span className="font-display text-2xl font-bold tabular-nums sm:text-3xl">
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
