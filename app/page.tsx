import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import {
  Hammer,
  Wrench,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import type { ReactNode } from "react";
import CountUp from "@/components/CountUp";
import CostCalculator from "@/components/CostCalculator";
import ReviewCarousel from "@/components/ReviewCarousel";
import FadeContent from "@/components/FadeContent";
// import ScrollVelocity from "@/components/ScrollVelocity";
import { reviews } from "@/components/reviews.data";

type Service = { icon: ReactNode; title: string; desc: string; bullets?: string[] };

export default function Home() {
  const services: Service[] = [
    {
      icon: <Wrench className="size-6" />,
      title: "General Repairs",
      desc: "Small fixes. Big relief.",
      bullets: [
        "Quick fixes, flawless finish.",
        "Precision tools. Professional results.",
        "Cleaner than we found it.",
      ],
    },
    {
      icon: <Hammer className="size-6" />,
      title: "Installations",
      desc: "installation of cabinets, and fixtures.",
      bullets: [
        "Cabinets custom‑fit to the millimeter.",
        "Level, plumb, and soft‑close aligned.",
        "Anchored, weight‑rated, built to last.",
      ],
    },
    // { icon: <ShieldCheck className="size-6" />, title: "Safety Checks", desc: "Peace of mind at home." },
    {
      icon: <Clock className="size-6" />,
      title: "Emergency Help",
      desc: "On‑call, when time matters.",
      bullets: [
        "Rapid response. No downtime.",
        "Straightforward after‑hours pricing.",
        "Secure now. Restore fast.",
      ],
    },
  ];



  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header />
      <main>
        {/* SEO: LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeAndConstructionBusiness",
              name: "Installer Man",
              url: "https://installer.example",
              telephone: "+1-818-422-1249",
              image: [
                "/f3a3c203-eba7-426b-aae2-e5e5f576d055.png"
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Los Angeles",
                addressRegion: "CA",
                addressCountry: "US",
              },
              areaServed: {
                "@type": "City",
                name: "Los Angeles"
              },
              sameAs: [
                "https://www.instagram.com/",
                "https://www.facebook.com/"
              ],
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  opens: "08:00",
                  closes: "18:00"
                }
              ],
              makesOffer: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cabinet installation" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "General repairs" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency help" } }
              ]
            }),
          }}
        />
        <Hero reviews={reviews} />
          
        {/* Calculator */}
        <FadeContent>
          <section id="calculator" className="container mx-auto px-6 py-12 sm:py-16">
            <CostCalculator />
          </section>
        </FadeContent>

        {/* Services */}
        <FadeContent>
        <section id="services" className="container mx-auto px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">What we do</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Carefully crafted home services, built around you
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Expert help, thoughtfully delivered — fast, precise, and worry‑free.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <FadeContent key={s.title}>
                <Card className="transition-shadow hover:shadow-md border-none bg-zinc-100/60 rounded-3xl shadow-none">
                  <CardHeader className="flex items-start gap-3">
                    <div className="rounded-md border bg-secondary/40 p-2 text-secondary-foreground">
                      {s.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{s.title}</CardTitle>
                      <CardDescription className="text-base">{s.desc}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-base text-muted-foreground">
                      {s.bullets && s.bullets.length > 0 ? (
                        s.bullets.map((b, i) => <li key={i}>• {b}</li>)
                      ) : (
                        <>
                          <li>• Clear pricing. No surprises.</li>
                          <li>• Right on time. Every time.</li>
                          <li>• Immaculate finishes. Built to last.</li>
                        </>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </FadeContent>
            ))}
          </div>
        </section>
        </FadeContent>

        {/* CTA / Lead capture */}
        <FadeContent>
        <section id="contact" className="container mx-auto px-6 py-16 sm:py-20 scroll-mt-24 md:scroll-mt-32">
          <div className="mx-auto max-w-2xl">
            <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none">
              <CardHeader className="px-4 sm:px-6">
                {/* <Badge className="w-fit">Free estimate</Badge> */}
                <CardTitle className="text-3xl">Tell us what you need</CardTitle>
                <CardDescription className="text-lg">A few details help us price it right.</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <ContactForm />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button asChild variant="default" className="bg-green-600/90 text-primary-foreground hover:bg-green-600">
                    <Link href="tel:+15551234567" className="inline-flex items-center gap-2">
                      <Phone className="size-4" /> Call now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        </FadeContent>

        {/* Reviews grid */}
        <FadeContent>
        <section id="testimonials" className="container mx-auto px-6 pt-0 pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Reviews</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Loved by homeowners</h2>
            <p className="mt-3 text-lg text-muted-foreground">Real stories from recent jobs.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <FadeContent key={`${r.name}-${i}`}>
                <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-yellow-500">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="size-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <CardTitle className="text-lg">{r.headline}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="font-medium text-foreground">{r.name}</span> · {r.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">{r.body}</p>
                    {r.images && r.images.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-3 gap-3">
                          {r.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-white">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <noscript>
                          <div>
                            {r.images.map((img, j) => (
                              <a key={j} href={img.src} title={img.alt}>{img.src}</a>
                            ))}
                          </div>
                        </noscript>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </FadeContent>
            ))}
          </div>
        </section>
        </FadeContent>

        {/* Info: Fast help, local pros */}
        <FadeContent>
        <section className="container mx-auto px-6 pt-0 pb-16 sm:pb-20">
          <div className="w-full">
            <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none">
              <CardHeader>
                <CardTitle className="text-3xl">Local pros. On your schedule.</CardTitle>
                <CardDescription className="text-lg">Service area, hours, and ways to reach us.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 gap-4 text-base">
                  <li className="flex items-center gap-3">
                    <MapPin className="size-5 text-primary" /> Your neighborhood and nearby
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="size-5 text-primary" /> Mon–Sat, 8am–6pm (emergencies after-hours)
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-5 text-primary" /> hello@example.com
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
        </FadeContent>

        {/* Process */}
        {/* <FadeContent>
        <section id="process" className="container mx-auto px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">How it works</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Simple. Fast. Dependable.</h2>
            <p className="mt-3 text-lg text-muted-foreground">From request to results in three steps.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <FadeContent key={step.title}>
                <Card className="relative border-none bg-zinc-100/60 rounded-3xl shadow-none">
                  <CardHeader>
                    <div className="mb-2 inline-flex size-10 items-center justify-center rounded-full border bg-secondary/40 text-secondary-foreground">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{i + 1}. {step.title}</CardTitle>
                    <CardDescription className="text-base">{step.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </FadeContent>
            ))}
          </div>
        </section>
        </FadeContent> */}

        {/* Testimonials placeholder */}
        {/* <FadeContent>
        <section id="testimonials" className="container mx-auto px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">Testimonials</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">What neighbors say</h2>
            <p className="mt-3 text-lg text-muted-foreground">Real stories go here. Placeholder cards below.</p>
          </div>
          <div className="mt-10">
            <FadeContent>
              <ReviewCarousel reviews={reviews} />
            </FadeContent>
          </div>
        </section>
        </FadeContent> */}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <>
      <FadeContent>
        <div className="w-full border-none bg-orange-600 text-orange-50">
          <div className="container mx-auto px-6 py-2 text-center text-sm font-medium">
            🎃 Halloween special — 20% off select services
          </div>
        </div>
      </FadeContent>
      <header className="sticky top-0 z-40 w-full border-none bg-zinc-50 md:-mb-16">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link href="#" className="flex items-center gap-2">
            <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-secondary/50">
              <Wrench className="size-4" />
            </div>
            <span className="text-base font-semibold tracking-tight">Installer Man</span>
          </Link>
          <nav className="hidden items-center gap-6 text-base md:flex">
            <Link href="#services" className="text-muted-foreground hover:text-foreground">Services</Link>
            <Link href="#process" className="text-muted-foreground hover:text-foreground">How it works</Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-foreground">Reviews</Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link>
          </nav>
          <div className="hidden md:block">
            <Button asChild size="sm" className="bg-green-600/90 text-primary-foreground hover:bg-green-600">
              <Link href="#contact" className="inline-flex items-center gap-2">
                <Phone className="size-4" /> Call (818) 422-1249
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero({ reviews }: { reviews: { headline: string; body: string; name: string; location: string }[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.967_0.001_286.375)_0%,transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.274_0.006_286.033)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 py-2">
          <FadeContent delay={100}>
          <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[400px] md:max-w-none -mb-3 -mt-3">
            <div className="mb-3 flex justify-center md:hidden">
              <Badge variant="secondary" className="inline-flex border-zinc-200 items-center gap-2">
                <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" aria-hidden="true" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
                </span>
                <span>Now Serving LA & Surrounding Areas</span>
              </Badge>
            </div>
            <div className="rounded-xl border-none bg-card shadow-none">
              <Image
                src="/f3a3c203-eba7-426b-aae2-e5e5f576d055.png"
                alt="Handyman illustration"
                width={900}
                height={900}
                priority
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
          </FadeContent>
          <FadeContent>
          <div className="text-center md:text-left">
            <Badge variant="secondary" className="mb-4 hidden border-zinc-200 md:inline-flex items-center gap-2">
              <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" aria-hidden="true" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
              </span>
              <span>Now serving LA and nearby</span>
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Repairs, made effortless
            </h1>
            <p className="mt-4 text-md text-muted-foreground">
              Book in minutes. On time, every time. Finished with care.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-3 sm:flex sm:flex-row md:justify-start">
              <Button asChild className="w-full h-12 px-4 py-3 text-base sm:w-auto sm:h-9 sm:py-2 sm:text-sm">
                <Link href="#contact" className="px-4 inline-flex items-center gap-2">
                  <Phone className="size-4" /> Get a quick estimate
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-12 py-3 text-base sm:w-auto sm:h-9 sm:py-2 sm:text-sm">
                <Link href="#services">See what we do</Link>
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl font-semibold tracking-tight">
                  <CountUp to={1200} />
                  <span>+</span>
                </div>
                <p className="text-sm text-muted-foreground">Projects completed</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl font-semibold tracking-tight">
                  <CountUp to={98} />
                  <span>%</span>
                </div>
                <p className="text-sm text-muted-foreground">Customer satisfaction</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-3xl font-semibold tracking-tight">
                  <CountUp to={21} />
                </div>
                <p className="text-sm text-muted-foreground">Years of trusted service</p>
              </div>
            </div>
            <div className="mt-8">
              <FadeContent>
                <ReviewCarousel reviews={reviews} />
              </FadeContent>
            </div>
          </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-none bg-zinc-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-secondary/50">
                <Wrench className="size-4" />
              </div>
              <span className="text-sm font-semibold">Installer Man</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted repairs and installations for busy homeowners. On time, tidy,
              and built to last.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold">Quick links</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#services" className="hover:text-foreground">Services</Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-foreground">How it works</Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-foreground">Reviews</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold">Popular services</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>General repairs</li>
              <li>Installations</li>
              <li>Emergency help</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Get in touch</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-primary" />
                <Link href="tel:+15551234567" className="hover:text-foreground">(818) 422-1249</Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <Link href="mailto:hello@example.com" className="hover:text-foreground">hello@example.com</Link>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" /> Mon–Sat, 8am–6pm
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Los Angeles & nearby
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Installer Man. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <span aria-hidden>•</span>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
