'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, MessageCircle } from 'lucide-react';
import {
  buildWhatsAppUrl,
  OWNER_EMAIL,
  type CallbackRequest,
} from '@/lib/contact-config';
import {
  isFormSubmitActivationError,
  submitCallbackToFormSubmit,
} from '@/lib/submit-callback';

const INPUT_CLASS =
  'h-14 w-full rounded-lg border border-white/15 bg-white/5 px-5 text-base text-white placeholder:text-white/40 outline-none transition focus:border-[#FF8A00] focus:bg-white/10 focus:ring-1 focus:ring-[#FF8A00]';

export function CallbackForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [loadDetails, setLoadDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsActivation, setNeedsActivation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNeedsActivation(false);

    const payload: CallbackRequest = {
      name: name.trim(),
      phone: phone.trim(),
      fromCity: fromCity.trim(),
      toCity: toCity.trim(),
      loadDetails: loadDetails.trim(),
    };

    if (!payload.name || !payload.phone || !payload.fromCity || !payload.toCity) {
      setError('Please fill your name, phone, from city, and to city.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitCallbackToFormSubmit(payload);
      setWhatsappUrl(buildWhatsAppUrl(payload));
      setIsSubmitted(true);
    } catch (err) {
      if (isFormSubmitActivationError(err)) {
        setNeedsActivation(true);
        setError(null);
      } else {
        setError(err instanceof Error ? err.message : 'Could not send request');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setWhatsappUrl(null);
    setName('');
    setPhone('');
    setFromCity('');
    setToCity('');
    setLoadDetails('');
    setError(null);
    setNeedsActivation(false);
  };

  return (
    <form
      id="quote"
      onSubmit={handleSubmit}
      className="relative flex min-h-[460px] w-full flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-md sm:p-8"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#FF8A00]/15 blur-[80px]" />
      <div className="relative z-10 flex h-full w-full flex-col justify-center">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center duration-500 animate-in fade-in zoom-in">
            <div className="mb-6 grid size-20 place-items-center rounded-full bg-green-500/20 text-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
              <CheckCircle className="size-10" />
            </div>
            <h2 className="mb-2 text-3xl font-black text-white">Request Sent!</h2>
            <p className="max-w-sm leading-relaxed text-white/70">
              Details were emailed to the owner. You can also send the same info on WhatsApp with one
              tap.
            </p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex h-14 w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-[#25D366] text-lg font-bold text-white transition hover:bg-[#1da851]"
              >
                <MessageCircle className="size-6" />
                Send on WhatsApp
              </a>
            )}
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 text-sm text-white/50 underline-offset-2 hover:text-white hover:underline"
            >
              Submit another request
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-black text-white">Request a callback</h2>
              <p className="mt-2 text-white/60">
                Fill out the details below and we will get back to you immediately.
              </p>
            </div>

            <div className="grid gap-5">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
                className={INPUT_CLASS}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isSubmitting}
                className={INPUT_CLASS}
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="From city"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className={INPUT_CLASS}
                />
                <input
                  type="text"
                  placeholder="To city"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className={INPUT_CLASS}
                />
              </div>
              <textarea
                placeholder="Load details (weight, type of goods)"
                rows={3}
                value={loadDetails}
                onChange={(e) => setLoadDetails(e.target.value)}
                disabled={isSubmitting}
                className="w-full resize-none rounded-lg border border-white/15 bg-white/5 p-5 text-base text-white placeholder:text-white/40 outline-none transition focus:border-[#FF8A00] focus:bg-white/10 focus:ring-1 focus:ring-[#FF8A00]"
              />

              {needsActivation && (
                <div className="rounded-lg border border-amber-400/40 bg-amber-500/15 px-4 py-4 text-sm text-amber-50">
                  <p className="font-bold">One-time email activation required</p>
                  <p className="mt-2 leading-relaxed text-amber-100/90">
                    FormSubmit sent an email to{' '}
                    <strong className="text-white">{OWNER_EMAIL}</strong>. Open it and
                    click <strong className="text-white">Activate Form</strong>, then submit this
                    form again.
                  </p>
                  <p className="mt-2 text-amber-100/70">Check Spam / Promotions if you don&apos;t see it.</p>
                </div>
              )}

              {error && !needsActivation && (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#FF8A00] text-lg font-bold text-white shadow-[0_0_20px_rgba(255,138,0,0.3)] transition hover:bg-[#e67900] hover:shadow-[0_0_30px_rgba(255,138,0,0.5)] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-6 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Request
                    <ArrowRight className="size-6" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
