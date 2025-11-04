"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Input is re-exported via InputGroupInput; keep direct import unused removed
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { toast } from "sonner";
import CountUp from "@/components/CountUp";

type LineItem = {
  id: string;
  label: string;
  unit: string;
  initialQty?: number;
  pricing: (qty: number) => number;
};

// Configuration: adjust labels, units, and pricing logic per line item as needed.
const lineItemsConfig: LineItem[] = [
  {
    id: "cabinets",
    label: "Cabinet boxes installed",
    unit: "box",
    initialQty: 0,
    // $65 per box; 10% discount for quantities over 10
    pricing: (qty) => {
      const rate = 150;
      const base = qty * rate;
      return qty > 10 ? base * 1 : base;
    },
  },
  {
    id: "closets",
    label: "Closet boxes installed",
    unit: "closet",
    pricing: (qty) => qty * 200,
  },
  {
    id: "Interior door",
    label: "Interior door",
    unit: "Door",
    pricing: (qty) => qty * 175,
  },
  {
    id: "Exterior door",
    label: "Exterior door",
    unit: "Door",
    // Simple tier: first 2 rooms at $300, additional rooms at $250
    pricing: (qty) => qty * 350,
  },
  {
    id: "hours",
    label: "Handyman hours",
    unit: "hr",
    pricing: (qty) => qty * 75,
  },
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export default function CostCalculator() {
  const [quantities, setQuantities] = React.useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const item of lineItemsConfig) {
      initial[item.id] = item.initialQty ?? 0;
    }
    return initial;
  });

  const increment = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + 1) }));
  };

  const decrement = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) - 1) }));
  };

  // Handled inline inside QuantityInput via onChange

  const lineTotals = React.useMemo(() => {
    const result: Record<string, number> = {};
    for (const item of lineItemsConfig) {
      const qty = quantities[item.id] ?? 0;
      result[item.id] = item.pricing(qty);
    }
    return result;
  }, [quantities]);

  const subtotal = React.useMemo(() => Object.values(lineTotals).reduce((a, b) => a + b, 0), [lineTotals]);

  const resetAll = () => {
    const reset: Record<string, number> = {};
    for (const item of lineItemsConfig) reset[item.id] = 0;
    setQuantities(reset);
  };

  function QuantityInput({
    id,
    value,
    onChange,
    onIncrement,
    onDecrement,
  }: {
    id: string;
    value: number;
    onChange: (v: number) => void;
    onIncrement: () => void;
    onDecrement: () => void;
  }) {
    return (
      <InputGroup className="h-10">
        <InputGroupAddon align="inline-start">
          <InputGroupButton
            aria-label="decrease"
            size="icon-sm"
            variant="outline"
            onClick={onDecrement}
            disabled={value <= 0}
          >
            −
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          className="text-center"
          value={String(value)}
          onChange={(e) => {
            const parsed = Number(e.target.value.replace(/[^0-9.\-]/g, ""));
            onChange(Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0);
          }}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="increase" size="icon-sm" onClick={onIncrement}>
            +
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    );
  }

  // Travel calculation state
  const ORIGIN_ZIP = "91304";
  const FREE_RADIUS_MILES = 15;
  const [travelZip, setTravelZip] = React.useState<string>("");
  const [travelMiles, setTravelMiles] = React.useState<number | null>(null);
  const [travelCost, setTravelCost] = React.useState<number>(0);
  const [travelLoading, setTravelLoading] = React.useState<boolean>(false);
  const [travelError, setTravelError] = React.useState<string>("");

  function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 3958.8; // Earth radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async function geocodeZip(zip: string): Promise<{ lat: number; lon: number } | null> {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", zip);
      url.searchParams.set("countrycodes", "us");
      url.searchParams.set("format", "json");
      url.searchParams.set("limit", "1");
      const res = await fetch(url.toString(), {
        headers: {
          "Accept": "application/json",
        },
      });
      const data = (await res.json()) as Array<{ lat: string; lon: string }>;
      if (Array.isArray(data) && data.length > 0) {
        return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
      }
      return null;
    } catch {
      return null;
    }
  }

  async function handleCalculateTravel() {
    setTravelError("");
    setTravelLoading(true);
    try {
      const [from, to] = await Promise.all([geocodeZip(ORIGIN_ZIP), geocodeZip(travelZip.trim())]);
      if (!from || !to) {
        const message = "Could not locate one of the ZIP codes.";
        setTravelError(message);
        toast.error(message);
        setTravelLoading(false);
        return;
      }
      const miles = haversineMiles(from.lat, from.lon, to.lat, to.lon);
      const rounded = Math.round(miles);
      setTravelMiles(rounded);
      const extraMiles = Math.max(0, rounded);
      const cost = extraMiles * 2 - FREE_RADIUS_MILES; // $1 per mile, round trip beyond free radius
      setTravelCost(cost);
    } finally {
      setTravelLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full border-none bg-zinc-100/60 rounded-3xl shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Quick cost calculator</CardTitle>
        <CardDescription>Estimate your project by adjusting quantities. You can type or use + / −.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border-none bg-white dark:bg-card">
          {/* <div className="grid grid-cols-1 items-center gap-2 px-4 py-3 text-xs font-medium uppercase text-muted-foreground sm:grid-cols-[1fr_190px_120px]">
            <div>Item</div>
            <div className="hidden sm:block">Quantity</div>
            <div className="hidden text-right sm:block">Total</div>
          </div> */}
          <div className="divide-y">
            {lineItemsConfig.map((item) => {
              const qty = quantities[item.id] ?? 0;
              const total = lineTotals[item.id] ?? 0;

              return (
                <div key={item.id} className="grid grid-cols-1 border-zinc-200 items-center gap-3 px-4 py-3 sm:grid-cols-[1fr_190px_120px]">
                  <div className="flex min-w-0 flex-col">
                    <Label htmlFor={`qty-${item.id}`} className="text-base">
                      {item.label}
                    </Label>
                    <span className="text-sm text-muted-foreground">Per {item.unit}</span>
                    {/* Mobile controls under label */}
                    <div className="mt-2 sm:hidden">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 max-w-[220px]">
                          <QuantityInput
                            id={`qty-${item.id}`}
                            value={qty}
                            onChange={(v) => setQuantities((p) => ({ ...p, [item.id]: v }))}
                            onIncrement={() => increment(item.id)}
                            onDecrement={() => decrement(item.id)}
                          />
                        </div>
                        <div className="min-w-[100px] text-right">
                          <span className="inline-block rounded-md bg-zinc-100 px-3 py-1 font-medium">
                            {formatCurrency(total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Stepper and total for sm+ */}
                  <div className="hidden sm:block">
                    <QuantityInput
                      id={`qty-${item.id}`}
                      value={qty}
                      onChange={(v) => setQuantities((p) => ({ ...p, [item.id]: v }))}
                      onIncrement={() => increment(item.id)}
                      onDecrement={() => decrement(item.id)}
                    />
                  </div>
                  <div className="hidden text-right sm:block">
                    <span className="inline-block rounded-md bg-zinc-100 px-3 py-1 font-medium">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              );
            })}
            <div className="grid grid-cols-1 border-zinc-200 items-center gap-3 px-4 py-3 sm:grid-cols-[1fr_190px_120px]">
              <div className="flex min-w-0 flex-col">
                <Label htmlFor="travel-zip" className="text-base">
                  Travel to ZIP code
                </Label>
                <span className="text-sm text-muted-foreground">First 15 miles free; beyond is $1/mi round trip.</span>
                <div className="mt-2 sm:hidden">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 max-w-[260px]">
                      <InputGroup className="h-11 w-full">
                        <InputGroupAddon>
                          <span className="text-xs uppercase text-muted-foreground">ZIP</span>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="travel-zip"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          
                          value={travelZip}
                          onChange={(e) => setTravelZip(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton size="sm" onClick={handleCalculateTravel} disabled={travelLoading}>
                            {travelLoading ? "..." : "Calculate"}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>
                    <div className="min-w-[100px] text-right">
                      <span className="inline-block rounded-md bg-zinc-100 px-3 py-1 font-medium">{formatCurrency(travelCost)}</span>
                    </div>
                  </div>
                  {travelMiles !== null && <div className="text-xs text-muted-foreground">Distance: {travelMiles} mi</div>}
                  {travelError && <div className="text-xs text-destructive sr-only">{travelError}</div>}
                </div>
              </div>
              <div className="hidden sm:block">
                <InputGroup className="h-10 w-full">
                  <InputGroupAddon>
                    <span className="text-xs uppercase text-muted-foreground">ZIP</span>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="travel-zip"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    
                    value={travelZip}
                    onChange={(e) => setTravelZip(e.target.value)}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="sm" onClick={handleCalculateTravel} disabled={travelLoading}>
                      {travelLoading ? "..." : "Calculate"}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="hidden text-right sm:block">
                <span className="inline-block rounded-md bg-zinc-100 px-3 py-1 font-medium">{formatCurrency(travelCost)}</span>
                {travelMiles !== null && <div className="mt-1 text-xs text-muted-foreground">{travelMiles} mi</div>}
                {travelError && <div className="mt-1 text-xs text-destructive sr-only">{travelError}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-stretch justify-between gap-4 rounded-xl border-none bg-white px-4 py-4 dark:bg-card sm:flex-row sm:items-center">
          <div>
            <div className="text-xl font-semibold">
              Total: <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5">{formatCurrency(Math.max(499, subtotal + travelCost))}</span>
            </div>
            {subtotal + travelCost < 499 && (
              <div className="mt-1 text-sm text-muted-foreground" aria-live="polite">
                Calculated <span className="font-medium">$<CountUp to={subtotal + travelCost} /></span>; minimum charge {formatCurrency(499)} applied (+{formatCurrency(499 - (subtotal + travelCost))}).
                <div className="mt-2 h-2 w-full max-w-[280px] rounded bg-zinc-100">
                  <div
                    className="h-2 rounded bg-green-600 transition-[width] duration-300"
                    style={{ width: `${Math.min(100, Math.round(((subtotal + travelCost) / 499) * 100))}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end sm:gap-2">
            <Button type="button" variant="ghost" onClick={resetAll} className="w-full sm:w-auto">Reset</Button>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => {
                const total = Math.max(499, subtotal + travelCost);
                const rounded = Math.round(total);
                const input = document.querySelector<HTMLInputElement>('input#budget[name="budget"]');
                if (input) {
                  input.value = String(rounded);
                  // fire input event so any listeners pick it up
                  input.dispatchEvent(new Event('input', { bubbles: true }));
                  // visually indicate it was set
                  input.classList.add('ring-2','ring-green-600','bg-green-50','dark:bg-green-900/30');
                }
                const contact = document.getElementById('contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
                toast.success(`Budget set to ${formatCurrency(rounded)} in the form`);
              }}
            >
              Submit estimate
            </Button>
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


