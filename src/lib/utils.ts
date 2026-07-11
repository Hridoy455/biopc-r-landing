/** Join class names, ignoring falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a number as a currency amount (no decimals). */
export function formatPrice(amount: number, currency: string): string {
  return `${currency === 'BDT' ? '৳' : ''}${amount.toLocaleString('en-US')}${
    currency !== 'BDT' ? ` ${currency}` : ''
  }`;
}
