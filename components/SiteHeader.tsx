"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import FadeContent from "@/components/FadeContent";
import { Phone, Menu, Wrench, ChefHat, Box, Trash2, DoorOpen, Home, Drill, SquareLibrary } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import * as React from "react";

export default function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FadeContent>
        <div className="w-full border-none bg-green-600 text-orange-50">
          <div className="container mx-auto px-6 py-2 text-center text-sm font-medium">
            Happy Holidays! 20% off select services
          </div>
        </div>
      </FadeContent>
      <header className="sticky top-0 z-40 w-full border-none bg-zinc-50 md:-mb-16">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-0.5">
            <div className="inline-flex h-8 w-8 items-center border-none justify-center rounded-md border bg-secondary/50">
              <Drill className="size-5" />
            </div>
            <span className="text-base font-semibold tracking-tight">Installer Man</span>
          </Link>

          {/* Desktop nav via shadcn NavigationMenu */}
          <div className="hidden md:block">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 rounded-md bg-transparent hover:bg-zinc-100">Services</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-3">
                    <div className="grid min-w-[520px] grid-cols-2 gap-3">
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <ChefHat className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Kitchen remodeling</div>
                            <p className="mt-1 text-xs text-muted-foreground">Complete kitchen transformations, from design to installation.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Box className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Cabinet installation</div>
                            <p className="mt-1 text-xs text-muted-foreground">Precision cabinet fitting, level and plumb every time.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Wrench className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Cabinet repair</div>
                            <p className="mt-1 text-xs text-muted-foreground">Restore functionality and appearance with expert repairs.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Trash2 className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Demolition</div>
                            <p className="mt-1 text-xs text-muted-foreground">Safe, efficient removal and cleanup.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Box className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Closet</div>
                            <p className="mt-1 text-xs text-muted-foreground">Custom closet systems designed for maximum organization.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <DoorOpen className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Interior door installation</div>
                            <p className="mt-1 text-xs text-muted-foreground">Perfect fit and smooth operation for interior doors.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Home className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Exterior door installation</div>
                            <p className="mt-1 text-xs text-muted-foreground">Secure, weather-tight exterior doors that last.</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border bg-card p-3">
                        <div className="flex items-start gap-2">
                          <Drill className="size-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium">Finish carpentry</div>
                            <p className="mt-1 text-xs text-muted-foreground">Detail-oriented trim, molding, and finishing work.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "ItemList",
                          itemListElement: [
                            { "@type": "Service", name: "Kitchen remodeling" },
                            { "@type": "Service", name: "Cabinet installation" },
                            { "@type": "Service", name: "Cabinet repair" },
                            { "@type": "Service", name: "Demolition" },
                            { "@type": "Service", name: "Closet" },
                            { "@type": "Service", name: "Interior door installation" },
                            { "@type": "Service", name: "Exterior door installation" },
                            { "@type": "Service", name: "Finish carpentry" },
                          ],
                        }),
                      }}
                    />
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#process" className="px-3 py-2 rounded-md hover:bg-zinc-100">How it works</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/about" className="px-3 py-2 rounded-md hover:bg-zinc-100">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#testimonials" className="px-3 py-2 rounded-md hover:bg-zinc-100">Reviews</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="#contact" className="px-3 py-2 rounded-md hover:bg-zinc-100">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button asChild size="sm" className="bg-green-600/90 text-primary-foreground hover:bg-green-600">
              <Link href="tel:+18184221249" className="inline-flex items-center gap-2">
                <Phone className="size-4" /> Call (818) 422-1249
              </Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <SheetHeader className="border-b">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-1 p-2 text-base">
                  <Link href="#services" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-zinc-100">Services</Link>
                  <Link href="/about" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-zinc-100">About</Link>
                  <Link href="#process" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-zinc-100">How it works</Link>
                  <Link href="#testimonials" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-zinc-100">Reviews</Link>
                  <Link href="#contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-zinc-100">Contact</Link>
                </nav>
                <div className="p-2">
                  <Button asChild className="w-full">
                    <Link href="tel:+18184221249" className="inline-flex items-center gap-2">
                      <Phone className="size-4" /> Call now
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}


