"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Wrench,
  Hammer,
  Trash2,
  Box,
  DoorOpen,
  Home,
  Drill,
} from "lucide-react";
import FadeContent from "@/components/FadeContent";

type Service = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
};

const services: Service[] = [
  {
    icon: <ChefHat className="size-6" />,
    title: "Kitchen remodeling",
    desc: "Complete kitchen transformations, from design to installation.",
    bullets: [
      "Custom layouts tailored to your space.",
      "Premium materials and finishes.",
      "Seamless coordination from start to finish.",
    ],
  },
  {
    icon: <Box className="size-6" />,
    title: "Cabinet installation",
    desc: "Precision cabinet fitting, level and plumb every time.",
    bullets: [
      "Custom-fit to the millimeter.",
      "Soft-close hardware included.",
      "Anchored and weight-rated for durability.",
    ],
  },
  {
    icon: <Wrench className="size-6" />,
    title: "Cabinet repair",
    desc: "Restore functionality and appearance with expert repairs.",
    bullets: [
      "Hinge adjustments and replacements.",
      "Door alignment and hardware fixes.",
      "Restore like-new condition.",
    ],
  },
  {
    icon: <Trash2 className="size-6" />,
    title: "Demolition",
    desc: "Safe, efficient removal and cleanup.",
    bullets: [
      "Controlled demolition practices.",
      "Full debris removal included.",
      "Protected surrounding areas.",
    ],
  },
  {
    icon: <Box className="size-6" />,
    title: "Closet",
    desc: "Custom closet systems designed for maximum organization.",
    bullets: [
      "Space-maximizing designs.",
      "Adjustable shelving and rods.",
      "Built to your exact specifications.",
    ],
  },
  {
    icon: <DoorOpen className="size-6" />,
    title: "Interior door installation",
    desc: "Perfect fit and smooth operation for interior doors.",
    bullets: [
      "Precise measurements and cuts.",
      "Proper hardware installation.",
      "Smooth, silent operation.",
    ],
  },
  {
    icon: <Home className="size-6" />,
    title: "Exterior door installation",
    desc: "Secure, weather-tight exterior doors that last.",
    bullets: [
      "Weatherproof sealing.",
      "Security hardware installation.",
      "Energy-efficient weatherstripping.",
    ],
  },
  {
    icon: <Drill className="size-6" />,
    title: "Finish carpentry",
    desc: "Detail-oriented trim, molding, and finishing work.",
    bullets: [
      "Crown molding and baseboards.",
      "Custom trim installations.",
      "Flawless attention to detail.",
    ],
  },
];

export default function ServicesSection() {
  return (
    <>
      {/* SEO: Service schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Home Improvement Services",
            provider: {
              "@type": "LocalBusiness",
              name: "Installer Man",
            },
            areaServed: {
              "@type": "City",
              name: "Los Angeles",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Installation and Repair Services",
              itemListElement: services.map((service, index) => ({
                "@type": "Offer",
                position: index + 1,
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.desc,
                },
              })),
            },
          }),
        }}
      />
      <FadeContent>
        <section id="services" className="container mx-auto px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4">What we do</Badge>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Expert services, built around you
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              From kitchen remodels to finish carpentry — precision work, thoughtfully delivered.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <FadeContent key={s.title}>
                <Card className="transition-shadow hover:shadow-md border-none bg-zinc-100/60 rounded-3xl shadow-none h-full">
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
                      {s.bullets.map((b, i) => (
                        <li key={i}>• {b}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeContent>
            ))}
          </div>
        </section>
      </FadeContent>
    </>
  );
}

