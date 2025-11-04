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
import { Phone, Calendar, Wrench } from "lucide-react";
import FadeContent from "@/components/FadeContent";

type Step = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const steps: Step[] = [
  {
    icon: <Phone className="size-5" />,
    title: "Get in touch",
    desc: "Call or fill out our form. We'll respond quickly with a free estimate.",
  },
  {
    icon: <Calendar className="size-5" />,
    title: "Schedule your service",
    desc: "Pick a time that works for you. We'll confirm and show up on time.",
  },
  {
    icon: <Wrench className="size-5" />,
    title: "We handle it",
    desc: "Expert work, clean finish, and complete satisfaction guaranteed.",
  },
];

export default function ProcessSection() {
  return (
    <FadeContent>
      <section id="process" className="container mx-auto px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">How it works</Badge>
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
    </FadeContent>
  );
}

