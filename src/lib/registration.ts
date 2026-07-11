/** Shared types + validation for the registration flow (client + server). */

export const academicLevels = [
  'Undergraduate',
  'Master’s',
  'PhD',
  'Postdoc / Faculty',
  'Researcher / Professional',
  'Other',
] as const;

export const skillLevels = [
  'Complete beginner (no coding)',
  'Some basics (Excel/SPSS)',
  'Beginner in R / Python',
  'Intermediate',
] as const;

export const paymentMethods = ['bKash', 'Nagad', 'Rocket'] as const;

export interface RegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  university: string;
  department: string;
  country: string;
  academicLevel: string;
  currentSkills: string;
  paymentMethod: string;
  transactionId: string;
  screenshotName?: string;
  screenshotData?: string; // base64 data URL, optional
  agreed: boolean;
  // Honeypot: must stay empty. Bots tend to fill every field.
  website?: string;
}

export interface FieldErrors {
  [key: string]: string | undefined;
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+()\-\s\d]{6,20}$/;

/** Validate a payload. Returns a map of field -> error message (empty if valid). */
export function validateRegistration(p: Partial<RegistrationPayload>): FieldErrors {
  const e: FieldErrors = {};

  if (!p.fullName || p.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
  if (!p.email || !emailRe.test(p.email)) e.email = 'Enter a valid email address.';
  if (!p.phone || !phoneRe.test(p.phone)) e.phone = 'Enter a valid phone number.';
  if (!p.university || p.university.trim().length < 2) e.university = 'Please enter your university/institution.';
  if (!p.academicLevel) e.academicLevel = 'Select your academic level.';
  if (!p.paymentMethod) e.paymentMethod = 'Select a payment method.';
  if (!p.transactionId || p.transactionId.trim().length < 4)
    e.transactionId = 'Enter the Transaction ID from your payment.';
  if (!p.agreed) e.agreed = 'Please accept the terms to continue.';

  return e;
}
