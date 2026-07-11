/**
 * Central content + configuration for the landing page.
 * Editing this file changes the whole page — no component edits required.
 * Everything here is safe to expose to the browser.
 */

export const siteConfig = {
  org: 'BioPC',
  orgTagline: 'A Bioinformatics Lab of Research and Training',
  courseName: 'R Programming for Biologists',
  courseSubtitle: 'Learn Data Analysis, Statistics and Bioinformatics with R',
  courseShort: 'A hands-on, beginner-friendly live course that takes biologists from zero coding to confident data analysis in R.',

  // Change this to your real registration deadline (ISO 8601, with timezone).
  // Bangladesh Standard Time is UTC+6.
  registrationDeadline: '2026-08-15T23:59:59+06:00',

  // Change to your real batch start date.
  courseStartDate: '2026-08-22',

  // Pricing (shown on the page + payment section).
  price: {
    amount: 2500,
    currency: 'BDT',
    original: 4000,
  },

  format: {
    duration: '6 weeks',
    mode: 'Live online (Google Meet / Zoom)',
    sessions: '2 live classes per week + recordings',
    seats: 40,
  },

  contactEmail: 'research@biopc.org',
  altEmail: 'biopc.research@gmail.com',
  whatsapp: '', // e.g. '+8801XXXXXXXXX' — shown as a support contact if set.

  social: {
    facebookPage: 'https://www.facebook.com/BioPcLab/',
    facebookGroup: 'https://facebook.com/groups/5659344424181576/',
    linkedin: 'https://www.linkedin.com/company/biopc-a-bioinformatics-lab',
    website: 'https://biopc.org',
  },

  // Payment channels shown in the registration section.
  payments: [
    { method: 'bKash', type: 'Personal', number: '01XXXXXXXXX', instruction: 'Send Money to this number, then enter the Transaction ID below.' },
    { method: 'Nagad', type: 'Personal', number: '01XXXXXXXXX', instruction: 'Send Money to this number, then enter the Transaction ID below.' },
    { method: 'Rocket', type: 'Personal', number: '01XXXXXXXXX', instruction: 'Send Money, then enter the Transaction ID below.' },
    { method: 'Bank Transfer', type: 'A/C', number: 'Contact us for bank details', instruction: 'Email research@biopc.org for bank account details.' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
