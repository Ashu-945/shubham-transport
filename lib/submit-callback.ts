import { OWNER_EMAIL, type CallbackRequest } from '@/lib/contact-config';

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

/** FormSubmit must be called from the browser, not the Next.js server. */
export async function submitCallbackToFormSubmit(
  payload: CallbackRequest,
): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `New callback: ${payload.name} (${payload.fromCity} → ${payload.toCity})`,
      _template: 'table',
      _captcha: 'false',
      name: payload.name,
      phone: payload.phone,
      from_city: payload.fromCity,
      to_city: payload.toCity,
      load_details: payload.loadDetails || 'Not provided',
    }),
  });

  let data: FormSubmitResponse = {};
  try {
    data = (await response.json()) as FormSubmitResponse;
  } catch {
    // ignore parse errors
  }

  const succeeded = data.success === true || data.success === 'true';

  if (!response.ok || !succeeded) {
    const message =
      data.message ?? 'Could not send email. Please use WhatsApp or call us directly.';
    const error = new Error(message) as Error & { needsActivation?: boolean };
    error.needsActivation = /activation|activate form/i.test(message);
    throw error;
  }
}

export function isFormSubmitActivationError(err: unknown): boolean {
  return (
    err instanceof Error &&
    'needsActivation' in err &&
    (err as Error & { needsActivation?: boolean }).needsActivation === true
  );
}
