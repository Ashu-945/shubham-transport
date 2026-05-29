'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  Clock3,
  Headphones,
  IndianRupee,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Phone,
  ShieldCheck,
  Star,
  Truck,
  X,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CallbackForm } from '@/components/callback-form';

const navItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Cities', href: '#cities' },
  { label: 'FAQ', href: '#faq' },
];

const cities = [
  'Mumbai',
  'Satara',
  'Kolhapur',
  'Nashik',
  'Bangalore',
  'Chennai',
  'Goa',
  'Kerala',
  'Telangana',
  'Gujarat'
];

const stats = [
  { value: '500+', label: 'customers served' },
  { value: '10+', label: 'verified trucks' },
  { value: '50+', label: 'cities covered' },
  { value: '24/7', label: 'support desk' },
];

const steps = [
  {
    title: 'Share route',
    description: 'Enter pickup, delivery city, load type, and preferred truck size.',
    icon: MapPin,
  },
  {
    title: 'Compare quote',
    description: 'See transparent prices from verified transport partners.',
    icon: IndianRupee,
  },
  {
    title: 'Track delivery',
    description: 'Get live status updates from loading to proof of delivery.',
    icon: Navigation,
  },
];

const features = [
  {
    title: 'Instant truck matching',
    description: 'Find available vehicles for full-load, part-load, and urgent dispatches.',
    icon: Zap,
  },
  {
    title: 'Verified fleet network',
    description: 'Book drivers and transporters with document checks and service history.',
    icon: ShieldCheck,
  },
  {
    title: 'Live trip visibility',
    description: 'Keep your team and customers updated with pickup and delivery milestones.',
    icon: Clock3,
  },
  {
    title: 'Human support',
    description: 'Talk to a logistics specialist whenever a route, load, or payment needs help.',
    icon: Headphones,
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    company: 'Kumar Manufacturing',
    text: 'Booked an LPT for Pune to Mumbai in minutes. The price was clear and the driver reached on time.',
  },
  {
    name: 'Priya Sharma',
    company: 'Sharma Exports',
    text: 'The mobile booking flow is simple for our dispatch team. Tracking updates helped us reduce calls.',
  },
  {
    name: 'Amit Patel',
    company: 'Patel Trading Co.',
    text: 'Reliable trucks for repeat shipments. Their support team handles route changes quickly.',
  },
];

const faqs = [
  {
    question: 'How do I book a truck?',
    answer:
      'Enter pickup city, delivery city, truck type, and load details. You can review the estimate and request a confirmed quote immediately.',
  },
  {
    question: 'Which truck sizes are available?',
    answer:
      'Pick up 407, LPT, 909, 1109, and 20 ft trucks are available depending on route and cargo requirement.',
  },
  {
    question: 'Can I use this from mobile?',
    answer:
      'Yes. The booking form, city selection, buttons, and support links are optimized for one-hand mobile use.',
  },
  {
    question: 'Do you support urgent shipments?',
    answer:
      'Most city routes can be matched quickly. For urgent cargo, call support so the nearest available transporter can be assigned.',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCity, setActiveCity] = useState('Mumbai');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-secondary/90 text-secondary-foreground backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex min-w-0 items-center gap-2" aria-label="Shubham Transport home">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Truck className="size-5" />
            </span>
            <span className="truncate text-lg font-black tracking-wide sm:text-xl">Shubham Transport</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
              <a href="tel:9029294037">
                <Phone className="size-4" />
                9029294037
              </a>
            </Button>
            <Button asChild size="sm" className="shadow-lg shadow-primary/25">
              <a href="#quote">Book Now</a>
            </Button>
          </div>

          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-white/15 text-white transition hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/15 bg-secondary px-4 py-4 shadow-2xl md:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2 h-12 w-full">
                <a href="#quote" onClick={closeMenu}>Get Instant Quote</a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <section className="relative min-h-[760px] overflow-hidden bg-secondary pt-16 text-white sm:min-h-[720px] lg:min-h-[760px]">
        <Image
          src="/transport-hero.png"
          alt="Commercial cargo truck on an Indian highway"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,24,31,0.72)_0%,rgba(19,24,31,0.38)_42%,rgba(19,24,31,0.86)_100%)] lg:bg-[linear-gradient(90deg,rgba(19,24,31,0.92)_0%,rgba(19,24,31,0.68)_42%,rgba(19,24,31,0.18)_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pt-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur">
              <BadgeCheck className="size-4 text-[#FF8A00]" />
              Daily Express Service All Over India
            </div>
            <h1 className="max-w-[12ch] text-4xl font-black leading-[1.02] text-balance sm:text-5xl lg:text-7xl">
              Book Trucks Online, Fast.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/82 sm:text-lg">
              Fleet Owners, Transport Contractor & Commission Agent for Full Load and Part Load services. Move goods securely across India.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 w-full text-base font-bold shadow-xl shadow-primary/30 sm:w-auto bg-[#FF8A00] hover:bg-[#e67900] text-white border-none">
                <a href="#quote">
                  Get Instant Quote
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 w-full border-white/40 bg-white/10 text-base font-bold text-white hover:bg-white hover:text-secondary sm:w-auto"
              >
                <a href="tel:9029294037">
                  <Phone className="size-5" />
                  Call Support
                </a>
              </Button>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                  <div className="text-3xl font-black text-[#FF8A00]">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="how-it-works" className="section-shell relative overflow-hidden bg-[linear-gradient(145deg,#0a0812_0%,#161225_100%)] text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8A00]/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#FF8A00]">Simple booking</p>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">Move cargo in three clear steps</h2>
            <p className="mt-4 text-base leading-7 text-white/60 sm:text-lg">Designed for busy owners, dispatch teams, and mobile-first users who need answers quickly.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#FF8A00]/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-[#FF8A00]/10">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-full bg-[#FF8A00]/10 text-[#FF8A00] shadow-[0_0_15px_rgba(255,138,0,0.2)] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-7" />
                    </span>
                    <span className="text-lg font-black text-white/20 transition-colors duration-300 group-hover:text-[#FF8A00]/40">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-white/60 transition-colors duration-300 group-hover:text-white/80">{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="features" className="section-shell">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div className="section-heading text-left sm:text-left">
              <p className="eyebrow">Built for logistics</p>
              <h2>Professional transport support without complicated screens</h2>
              <p>Every element is sized for mobile taps first, then scales cleanly for laptop and desktop users.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="feature-card">
                    <span className="mb-5 grid size-11 place-items-center rounded-md bg-secondary text-secondary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="cities" className="section-shell bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-xl">
              <p className="eyebrow text-primary">City network</p>
              <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Major lanes covered across India
              </h2>
              <p className="mt-4 text-base leading-7 text-white/72">
                Select a city to see service readiness. The layout uses compact rows on mobile and expands into a clean grid on larger screens.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => setActiveCity(city)}
                  className={`min-h-24 rounded-md border p-4 text-left transition ${
                    activeCity === city
                      ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'border-white/15 bg-white/[0.08] text-white hover:border-white/35 hover:bg-white/[0.12]'
                  }`}
                >
                  <MapPin className="mb-3 size-5" />
                  <span className="block text-base font-black">{city}</span>
                  <span className="mt-1 block text-xs opacity-75">Fast matching</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#FF8A00]">Customer trust</p>
            <h2 className="text-4xl font-black leading-tight text-foreground sm:text-5xl">Used by growing businesses</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">Clear prices, dependable communication, and trucks that show up.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/50">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF8A00] to-orange-300 opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-6 flex gap-1 text-[#FF8A00]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="size-5 fill-current drop-shadow-sm" />
                  ))}
                </div>
                <p className="text-base leading-relaxed text-muted-foreground mb-8">&quot;{testimonial.text}&quot;</p>
                <div className="mt-auto border-t border-border/60 pt-6 flex items-center gap-4">
                  <div className="grid size-12 place-items-center rounded-full bg-[#FF8A00]/10 text-[#FF8A00] font-black text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section-shell bg-muted/35">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="section-heading">
            <p className="eyebrow">FAQ</p>
            <h2>Questions before booking?</h2>
            <p>Short answers for the things customers usually ask first.</p>
          </div>

          <div className="grid gap-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <article key={faq.question} className="overflow-hidden rounded-md border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 text-left text-base font-black sm:px-5"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`size-5 shrink-0 text-primary transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && <p className="border-t border-border px-4 py-4 text-sm leading-6 text-muted-foreground sm:px-5">{faq.answer}</p>}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell relative overflow-hidden bg-[linear-gradient(145deg,#0a0812_0%,#161225_100%)] text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF8A00]/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#FF8A00]">Get an Estimate</p>
            <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">Ready to move your cargo?</h2>
          </div>
          <CallbackForm />
        </div>
      </section>

      <footer className="bg-secondary px-4 py-10 text-secondary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_0.9fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-md bg-primary text-primary-foreground">
                <Truck className="size-5" />
              </span>
              <span className="text-lg font-black">Shubham Transport</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
              Fleet Owners, Transport Contractor & Commission Agent. Daily Express Service across India.
            </p>
          </div>
          <FooterLinks title="Company" links={['Home', 'Features', 'Cities', 'FAQ']} />
          <FooterLinks title="Services" links={['Full Load Service', 'Part Load Service', 'Daily Express Service', 'Commission Agent']} />
          <div>
            <h3 className="font-black">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/68">
              <span className="font-bold text-white/80">Owner: Sunil Wagh</span>
              <a href="tel:9029294037" className="flex items-center gap-2 transition hover:text-white">
                <Phone className="size-4" />
                9029294037 / 9833407537
              </a>
              <a href="mailto:shubhamtransport37@gmail.com" className="flex items-center gap-2 transition hover:text-white">
                <Mail className="size-4" />
                shubhamtransport37@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                Shop No 12, Sai Sitara Building, Plot No D, 20/11 Sec - 6 New Panvel, Raygad 410-206
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t border-white/[0.12] pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Shubham Transport. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Support</a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 shadow-2xl backdrop-blur md:hidden">
        <Button asChild className="h-12 w-full text-base font-bold">
          <a href="#quote">
            Get Instant Quote
            <ArrowRight className="size-5" />
          </a>
        </Button>
      </div>
    </main>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-black">{title}</h3>
      <ul className="mt-4 grid gap-2 text-sm text-white/68">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="transition hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
