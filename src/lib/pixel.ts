/**
 * Thin, type-safe wrapper around the Meta (Facebook) Pixel and GA4.
 * Safe to call even when analytics IDs are not configured — calls no-op.
 */

type FbqFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn & { queue?: unknown[] };
    gtag?: (...args: unknown[]) => void;
  }
}

/** Standard Meta Pixel events we use for the ad funnel. */
export type StandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Purchase';

/** Fire a standard Meta Pixel event. No-ops if the pixel isn't loaded. */
export function trackPixel(event: StandardEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', event, params);
}

/** Fire a GA4 event. No-ops if gtag isn't loaded. */
export function trackGA(event: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', event, params ?? {});
}

/** Convenience: fire the same intent to both Meta and GA4. */
export function track(
  metaEvent: StandardEvent,
  gaEvent: string,
  params?: Record<string, unknown>,
): void {
  trackPixel(metaEvent, params);
  trackGA(gaEvent, params);
}
