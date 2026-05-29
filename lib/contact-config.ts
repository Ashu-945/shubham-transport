/** Inbox for FormSubmit — must be NEXT_PUBLIC_* (browser sends the form) */
export const OWNER_EMAIL =
  process.env.NEXT_PUBLIC_OWNER_EMAIL ?? 'shubhamtransport37@gmail.com';

/** WhatsApp number with country code, no + or spaces (India: 91…) */
export const OWNER_WHATSAPP =
  process.env.NEXT_PUBLIC_OWNER_WHATSAPP ?? '919029294037';

export type CallbackRequest = {
  name: string;
  phone: string;
  fromCity: string;
  toCity: string;
  loadDetails: string;
};

export function buildWhatsAppUrl(data: CallbackRequest): string {
  const phone = OWNER_WHATSAPP.replace(/\D/g, '');
  const text = [
    '*New transport inquiry — Shubham Transport*',
    '',
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*From:* ${data.fromCity}`,
    `*To:* ${data.toCity}`,
    `*Load details:* ${data.loadDetails || '—'}`,
  ].join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
