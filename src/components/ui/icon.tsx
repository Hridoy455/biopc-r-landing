import type { SVGProps } from 'react';

const paths: Record<string, string> = {
  sparkles: 'M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3zM19 14l.9 2.2L22 17l-2.1.8L19 20l-.9-2.2L16 17l2.1-.8L19 14z',
  video: 'M15 10l4.5-2.5v9L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z',
  flask: 'M9 3h6M10 3v5.6L4.8 17a2 2 0 001.7 3h11a2 2 0 001.7-3L14 8.6V3M8 14h8',
  certificate: 'M12 3l2.5 1.7L17.5 4l.5 3 2.7 1.4-1.7 2.5 1 2.9-3 .6-1.5 2.6L12 16.7 6 21l-1.5-2.6-3-.6 1-2.9L.8 12.6 3.5 11l.5-3 3 .7L9.5 7 12 3z',
  replay: 'M3 12a9 9 0 109-9 9 9 0 00-6.4 2.6L3 8M3 4v4h4',
  community: 'M17 20v-2a4 4 0 00-3-3.9M9 20v-2a4 4 0 013-3.9M12 11a4 4 0 100-8 4 4 0 000 8zM4 20v-1a3 3 0 013-3M20 20v-1a3 3 0 00-3-3',
  microscope: 'M6 18h8M6 21h12M9 4l3 1.7M11 3l4 7-3.5 2L7.5 5M14 12a5 5 0 01-2 8',
  rocket: 'M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5A2.1 2.1 0 005 15zM9 11a12 12 0 018-6 12 12 0 01-6 8l-3 1-1 1-2-2 1-1 3-1zM14 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  check: 'M20 6L9 17l-5-5',
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof paths | string;
}

export function Icon({ name, ...props }: IconProps) {
  const d = paths[name] ?? paths.check;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={d} />
    </svg>
  );
}
