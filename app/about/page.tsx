import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FadeContent from "@/components/FadeContent";
import { Phone } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "About Us",
  description: "Who we are and how we work — Installer Man",
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <>
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.967_0.001_286.375)_0%,transparent_60%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.274_0.006_286.033)_0%,transparent_60%)]" />
            <div className="container mx-auto px-6 py-16 sm:py-24">
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <FadeContent>
                  <div className="text-center md:text-left">
                    <Badge variant="secondary" className="mb-4 inline-flex border-zinc-200 items-center gap-2">
                      <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50 animate-ping" aria-hidden="true" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-600" aria-hidden="true" />
                      </span>
                      <span>About Installer Man</span>
                    </Badge>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Craftsmanship, without the headache</h1>
                    <p className="mt-4 text-md text-muted-foreground">
                      We’re a Los Angeles team focused on thoughtful installations and dependable repairs — scheduled clearly, finished neatly, and built to last.
                    </p>
                    
                  </div>
                </FadeContent>
                <FadeContent delay={100}>
                  <div className="relative mx-auto w-full max-w-[200px] sm:max-w-[420px] md:max-w-none">
                    <div className="rounded-xl border-none bg-card shadow-none">
                      <Image
                        src="/Installer_man.png"
                        alt="Installer at work"
                        width={900}
                        height={900}
                        priority
                        className="h-auto w-full rounded-xl"
                      />
                    </div>
                  </div>
                </FadeContent>
              </div>
            </div>
          </section>
        </>

        <FadeContent>
          <section className="container mx-auto px-6 py-16 sm:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4">Our approach</Badge>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Simple, reliable, well‑made</h2>
              <p className="mt-3 text-lg text-muted-foreground">
                We show up on time, protect your space, and communicate clearly. Most work is completed same‑day with tidy finishes and verified hardware.
              </p>
            </div>
            
          </section>
        </FadeContent>

        {/* Contact form */}
        

        {/* About + Contact side by side */}
        <FadeContent>
          <section className="container mx-auto px-6 pt-0 pb-16 sm:pb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none">
                <CardContent>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>Your trusted partner for cabinet installation, custom closets, and door installation services in Los Angeles.</p>
                    <p>With over 20 years of hands-on experience, we’ve proudly completed hundreds of successful projects across the greater Los Angeles area. At Installer Man, we’re dedicated to delivering top-quality craftsmanship, reliable service, and affordable pricing — always focused on your complete satisfaction.</p>
                    <p>Whether you’re planning a kitchen remodel, need custom-built cabinets, want to organize your home with modern closet systems, or upgrade your interior and exterior doors, our team is here to make it happen with precision, care, and attention to detail.</p>
                    <p>We also provide free design consultation to help you choose the right cabinet style, layout, and materials for your home. From design ideas to final installation, Installer Man makes the entire process simple, stress-free, and customized to your needs.</p>
                    <p className="font-medium text-foreground">Our core values are simple: Quality. Honesty. Satisfaction.</p>
                    <p>We believe that every space deserves to be both beautiful and functional — and we’re here to make that happen for you.</p>
                    <p>If you’re looking for an experienced cabinet and closet installer in Los Angeles who also offers free design consultation, Installer Man is your best choice.</p>
                    <p className="text-foreground">✨ Quality work. Fair price. Always on time.</p>
                  </div>
                </CardContent>
              </Card>
              <Card id="contact" className="border-none bg-zinc-100/60 rounded-3xl shadow-none">
                <CardHeader className="px-4 sm:px-6">
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

        
        
      </main>
      <SiteFooter />
    </div>
  );
}


