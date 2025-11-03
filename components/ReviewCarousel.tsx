"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ReviewImage = { src: string; alt: string };
type Review = {
  headline: string;
  body: string;
  name: string;
  location: string;
  images?: ReviewImage[];
};

export default function ReviewCarousel({
  reviews,
  intervalMs = 3500,
}: {
  reviews: Review[];
  intervalMs?: number;
}) {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [paused, setPaused] = React.useState(false);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxReviewIndex, setLightboxReviewIndex] = React.useState(0);
  const [lightboxImages, setLightboxImages] = React.useState<string[]>([]);
  const [lightboxAlts, setLightboxAlts] = React.useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const touchCurrentX = React.useRef<number | null>(null);

  const openLightbox = React.useCallback((reviewIndex: number, imageIndex: number) => {
    const imgs = (reviews[reviewIndex]?.images ?? []);
    setLightboxImages(imgs.map((m) => m.src));
    setLightboxAlts(imgs.map((m) => m.alt));
    setLightboxReviewIndex(reviewIndex);
    setLightboxIndex(Math.min(Math.max(imageIndex, 0), Math.max(imgs.length - 1, 0)));
    setLightboxOpen(true);
  }, [reviews]);

  const updateForReview = React.useCallback((reviewIndex: number) => {
    const nextIndex = (reviewIndex + reviews.length) % reviews.length;
    const imgs = (reviews[nextIndex]?.images ?? []);
    setLightboxReviewIndex(nextIndex);
    setLightboxImages(imgs.map((m) => m.src));
    setLightboxAlts(imgs.map((m) => m.alt));
    setLightboxIndex(0);
  }, [reviews]);

  const goPrevReview = React.useCallback(() => updateForReview(lightboxReviewIndex - 1), [lightboxReviewIndex, updateForReview]);
  const goNextReview = React.useCallback(() => updateForReview(lightboxReviewIndex + 1), [lightboxReviewIndex, updateForReview]);

  const handleTouchStart = React.useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    touchCurrentX.current = null;
  }, []);

  const handleTouchMove = React.useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchCurrentX.current = e.touches[0]?.clientX ?? null;
  }, []);

  const handleTouchEnd = React.useCallback(() => {
    const start = touchStartX.current;
    const end = touchCurrentX.current;
    touchStartX.current = null;
    touchCurrentX.current = null;
    if (start == null || end == null) return;
    const delta = end - start;
    const threshold = 40; // px
    if (delta > threshold) {
      setLightboxIndex((i) => (i - 1 + Math.max(lightboxImages.length, 1)) % Math.max(lightboxImages.length, 1));
    } else if (delta < -threshold) {
      setLightboxIndex((i) => (i + 1) % Math.max(lightboxImages.length, 1));
    }
  }, [lightboxImages.length]);

  React.useEffect(() => {
    if (!api || paused) return;
    const id = setInterval(() => {
      api.scrollNext();
    }, intervalMs);
    return () => clearInterval(id);
  }, [api, intervalMs, paused]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i + 1) % Math.max(lightboxImages.length, 1));
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i - 1 + Math.max(lightboxImages.length, 1)) % Math.max(lightboxImages.length, 1));
      } else if (e.key === "ArrowDown") {
        goNextReview();
      } else if (e.key === "ArrowUp") {
        goPrevReview();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxImages.length, goNextReview, goPrevReview]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <CarouselContent>
        {reviews.map((r, i) => (
          <CarouselItem key={i}>
            <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none text-left">
              <CardHeader>
                <div className="flex items-center gap-2 text-yellow-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-lg text-left">{r.headline}</CardTitle>
                <CardDescription className="text-base text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{r.name}</span>
                    <Badge variant="secondary" className="text-[10px] leading-none py-0.5 px-1.5">Verified homeowner</Badge>
                    <span className="text-muted-foreground">· {r.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base text-muted-foreground text-left">{r.body}</p>
                {r.images && r.images.length > 0 && (
                  <div className="mt-4">
                    <div className="grid grid-cols-3 gap-3">
                      {r.images.slice(0, 3).map((img, idx) => (
                        <a
                          key={idx}
                          href={img.src}
                          className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-white block group"
                          onClick={(e) => {
                            e.preventDefault();
                            openLightbox(i, idx);
                          }}
                          aria-label={`Open image ${idx + 1} of ${(r.images?.length ?? 0)}`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                            className="object-cover opacity-0 transition-opacity duration-500"
                            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                        </a>
                      ))}
                    </div>
                    <noscript>
                      {/* Crawlable links to full-size images */}
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
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 border-none bg-transparent shadow-none w-full max-w-[95vw] sm:max-w-[90vw]"
        >
          <DialogTitle className="sr-only">
            {lightboxAlts[lightboxIndex] || "Review photo viewer"}
          </DialogTitle>
          <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] mx-auto">
            {/* Close button */}
            <button
              type="button"
              aria-label="Close image viewer"
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
              onClick={() => setLightboxOpen(false)}
            >
              <X className="size-5" />
            </button>

            {/* Top gradient for button legibility */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent rounded-t-md" />

            {/* Main image */}
            <div className="flex items-center justify-center">
              <div
                className="relative w-full h-[65vh] max-h-[65vh] bg-black/30 rounded-md"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {lightboxImages[lightboxIndex] && (
                  <Image
                    key={lightboxImages[lightboxIndex]}
                    src={lightboxImages[lightboxIndex]}
                    alt={lightboxAlts[lightboxIndex] || `Review photo ${lightboxIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 95vw, 90vw"
                    className="object-contain opacity-0 transition-opacity duration-300"
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                    priority
                  />
                )}
              </div>
            </div>

            {/* Controls */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                  onClick={() => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length)}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                  onClick={() => setLightboxIndex((i) => (i + 1) % lightboxImages.length)}
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            {/* Image index dots */}
            {lightboxImages.length > 1 && (
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {lightboxImages.map((_, idx) => (
                  <span
                    key={`dot-${idx}`}
                    className={`block h-1.5 w-1.5 rounded-full ${idx === lightboxIndex ? "bg-white" : "bg-white/40"}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnails row */}
            {lightboxImages.length > 1 && (
              <div className="mx-auto mt-3 grid max-w-[90vw] grid-cols-6 gap-2 px-3 sm:grid-cols-8">
                {lightboxImages.map((src, idx) => (
                  <button
                    type="button"
                    key={src + idx}
                    onClick={() => setLightboxIndex(idx % Math.max(lightboxImages.length, 1))}
                    className={`relative aspect-square w-full overflow-hidden rounded-md border border-white/10 bg-white/5 ${
                      idx === lightboxIndex ? "ring-2 ring-white" : "hover:border-white/20"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image
                      src={src}
                      alt={lightboxAlts[idx] || `Thumbnail ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 10vw, 80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Bottom review panel */}
            <div className="mx-auto mt-3 w-full max-w-[90vw] px-3">
              <div className="rounded-md bg-black/50 backdrop-blur-sm text-white p-3 sm:p-4 max-h-[22vh] overflow-y-auto border border-white/10">
                <div className="flex items-start justify-between gap-2">
                  <div className="pr-2">
                    <div className="text-xs sm:text-sm opacity-80">
                      <span className="font-medium">{reviews[lightboxReviewIndex]?.name}</span> · {reviews[lightboxReviewIndex]?.location}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-yellow-400" aria-label="5 star rating">
                      {[...Array(5)].map((_, j) => (
                        <Star key={`lb-star-${j}`} className="size-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-semibold">{reviews[lightboxReviewIndex]?.headline}</div>
                    <p className="mt-1 text-xs sm:text-sm opacity-90">{reviews[lightboxReviewIndex]?.body}</p>
                  </div>
                  <div className="shrink-0 flex gap-2">
                    <button
                      type="button"
                      aria-label="Previous review"
                      className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                      onClick={goPrevReview}
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next review"
                      className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                      onClick={goNextReview}
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Carousel>
  );
}


