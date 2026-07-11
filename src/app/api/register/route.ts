import { NextResponse } from 'next/server';
import { validateRegistration, type RegistrationPayload } from '@/lib/registration';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Simple in-memory rate limiter (per server instance). -------------------
// Good enough to blunt casual abuse. For strict guarantees behind multiple
// serverless instances, back this with Upstash Redis or Vercel KV.
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_REQUESTS;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Please wait a minute and try again.' },
      { status: 429 },
    );
  }

  let body: Partial<RegistrationPayload>;
  try {
    body = (await req.json()) as Partial<RegistrationPayload>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: real users never fill this. Pretend success to waste the bot's time.
  if (body.website && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const errors = validateRegistration(body);
  // Payment screenshot is required and must be an image data URL.
  if (!body.screenshotData || !/^data:image\//.test(body.screenshotData)) {
    errors.screenshot = 'Payment screenshot is required.';
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, error: 'Please check the form fields and try again.', fields: errors },
      { status: 422 },
    );
  }

  const webAppUrl = process.env.SHEETS_WEBAPP_URL;
  const secret = process.env.SHEETS_SHARED_SECRET;

  // Assemble the record we store. Keep server-side metadata for auditing.
  const record = {
    secret,
    submittedAt: new Date().toISOString(),
    ip,
    userAgent: req.headers.get('user-agent') ?? '',
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    whatsapp: body.whatsapp ?? '',
    university: body.university,
    department: body.department ?? '',
    country: body.country ?? '',
    academicLevel: body.academicLevel,
    currentSkills: body.currentSkills ?? '',
    paymentMethod: body.paymentMethod,
    transactionId: body.transactionId,
    screenshotName: body.screenshotName ?? '',
    screenshotData: body.screenshotData ?? '',
  };

  // If the sheet endpoint isn't configured yet, log and fail gracefully so the
  // page still works during setup. In production this should be set.
  if (!webAppUrl) {
    console.warn('[register] SHEETS_WEBAPP_URL is not set — registration not persisted.', {
      email: record.email,
    });
    return NextResponse.json(
      { ok: false, error: 'Registration is temporarily unavailable. Please email us to register.' },
      { status: 503 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);

    const res = await fetch(webAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[register] Sheets endpoint error', res.status, text);
      throw new Error('storage_failed');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[register] Failed to store registration', err);
    return NextResponse.json(
      { ok: false, error: 'We could not save your registration. Please try again in a moment.' },
      { status: 502 },
    );
  }
}
