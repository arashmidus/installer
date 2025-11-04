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
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
} from "lucide-react";
import CountUp from "@/components/CountUp";
import CostCalculator from "@/components/CostCalculator";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ReviewCarousel from "@/components/ReviewCarousel";
import FadeContent from "@/components/FadeContent";
import Gallery from "@/components/Gallery";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
// import ScrollVelocity from "@/components/ScrollVelocity";
import { reviews } from "@/components/reviews.data";

export default function Home() {



  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
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
                "/Installer_man.png"
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

        {/* Process */}
        <ProcessSection />

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
              </CardContent>
            </Card>
          </div>
        </section>
        </FadeContent>

        {/* Services */}
        <ServicesSection />

        {/* Gallery */}
        <FadeContent>
        <section id="gallery" className="container mx-auto px-6 pt-0 pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">Gallery</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Recent installs</h2>
            <p className="mt-3 text-lg text-muted-foreground">From kitchens to closets — a few highlights.</p>
          </div>
          <div className="mt-8">
            {(() => {
              const galleryImages = reviews.flatMap((r) => r.images ?? []).slice(0, 12);
              return (
                <Gallery images={galleryImages} mode="inline" />
              );
            })()}
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
                    <Mail className="size-5 text-primary" /> installerman.info@gmail.com
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
      <SiteFooter />
    </div>
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
                src="/Installer_man.png"
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
              Cabinets and repairs, made effortless
            </h1>
            <p className="mt-4 text-md text-muted-foreground">
              Book in minutes. On time, every time. Finished with care.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-3 sm:flex sm:flex-row md:justify-start">
              <Button asChild className="w-full h-12 px-4 py-3 text-base sm:w-auto sm:h-9 sm:py-2 sm:text-sm">
                <Link href="tel:+18184221249" className="px-4 inline-flex items-center gap-2">
                  <Phone className="size-4" /> Call us for a quick estimate
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

// Footer moved to components/SiteFooter
