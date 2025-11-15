import Link from "next/link";
import { Drill, Phone, Mail, Clock, MapPin, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-none bg-zinc-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-0.5">
              <div className="inline-flex h-8 w-8 border-none items-center justify-center rounded-md border bg-secondary/50">
                <Drill className="size-5" />
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
                <Link href="/#services" className="hover:text-foreground">Services</Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-foreground">How it works</Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-foreground">Reviews</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-foreground">Contact</Link>
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
                <Link href="tel:+18184221249" className="hover:text-foreground">(818) 422-1249</Link>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <Link href="mailto:installerman.info@gmail.com" className="hover:text-foreground">installerman.info@gmail.com</Link>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 text-primary" /> Mon–Sat, 8am–6pm
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" /> Los Angeles & nearby
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="size-4 text-primary" />
                <Link href="https://www.instagram.com/installer.man" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Follow us on Instagram</Link>
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


