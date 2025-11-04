"use client";

import * as React from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [submitting, setSubmitting] = React.useState(false);

  async function submitForm(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.name || "").trim(),
          phone: String(data.phone || "").trim(),
          email: String(data.email || "").trim(),
          zip: String(data.zip || "").trim() || undefined,
          serviceType: String(data.serviceType || "").trim() || undefined,
          date: String(data.date || "").trim() || undefined,
          timeWindow: String(data.timeWindow || "").trim() || undefined,
          budget: String(data.budget || "").trim() || undefined,
          details: String(data.details || "").trim() || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to send. Please try again.");
      }
      toast.success("Thanks! We’ll be in touch shortly.");
      (document.getElementById("contact-form") as HTMLFormElement | null)?.reset();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      className="grid grid-cols-1 gap-4 text-base sm:grid-cols-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        await submitForm(fd);
      }}
    >
      <div className="sm:col-span-1 space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" required className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-1 space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" placeholder="(555) 123-4567" required className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="you@example.com" required className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-1 space-y-2">
        <Label htmlFor="zip">ZIP code</Label>
        <Input id="zip" name="zip" inputMode="numeric" pattern="[0-9]*" placeholder="90210" className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-1 space-y-2">
        <Label>Service type</Label>
        <Select name="serviceType">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="repairs">General repairs</SelectItem>
            <SelectItem value="installations">Installations</SelectItem>
            <SelectItem value="emergency">Emergency help</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-1 space-y-2">
        <Label htmlFor="date">Preferred date</Label>
        <Input id="date" name="date" type="date" className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-1 space-y-2">
        <Label>Time window</Label>
        <Select name="timeWindow">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a window" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning (8–12)</SelectItem>
            <SelectItem value="afternoon">Afternoon (12–4)</SelectItem>
            <SelectItem value="evening">Evening (4–7)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="sm:col-span-2 space-y-2">
        <Label htmlFor="budget">Approximate budget</Label>
        <Input id="budget" name="budget" type="number" min="0" step="50" placeholder="e.g. 200" className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <Label htmlFor="details">Project details</Label>
        <Textarea id="details" name="details" placeholder="What can we help with?" className="border-zinc-200 bg-white rounded-md shadow-none" />
      </div>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Request a callback"}</Button>
        <Button asChild variant="default" className="bg-green-600/90 text-primary-foreground hover:bg-green-600">
          <Link href="tel:+18184221249" className="inline-flex items-center gap-2">
            <Phone className="size-4" /> Call now
          </Link>
        </Button>
      </div>
    </form>
  );
}


