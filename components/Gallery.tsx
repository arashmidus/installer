"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type GalleryProps = {
  images: GalleryImage[];
  title?: string;
  description?: string;
  /**
   * Optional className applied to the grid container.
   */
  className?: string;
  /** Grid layout variant */
  variant?: "grid" | "masonry";
  /** Show image captions underneath thumbnails */
  showCaptions?: boolean;
  /** Inject ImageObject JSON-LD for SEO */
  jsonLd?: boolean;
  /** Presentation mode */
  mode?: "inline" | "lightbox";
};

export default function Gallery({ images, title, description, className, variant = "masonry", showCaptions = false, jsonLd = true, mode = "inline" }: GalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const touchCurrentX = React.useRef<number | null>(null);

  const onThumbClick = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  // Keyboard navigation for viewer/lightbox
  React.useEffect(() => {
    if (mode === "lightbox" && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % Math.max(images.length, 1));
      else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
      else if (e.key === "Home") setIndex(0);
      else if (e.key === "End") setIndex(Math.max(0, images.length - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, mode]);

  // Preload neighbors for snappy navigation
  React.useEffect(() => {
    if ((mode === "lightbox" && !open) || images.length < 2) return;
    const next = images[(index + 1) % images.length]?.src;
    const prev = images[(index - 1 + images.length) % images.length]?.src;
    [next, prev].forEach((src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });
  }, [open, index, images, mode]);

  return (
    <Card className="border-none bg-zinc-100/60 rounded-3xl shadow-none">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-lg">{title}</CardTitle>}
          {description && <CardDescription className="text-base">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {mode === "inline" ? (
          <div>
            <div className="relative w-full h-[55vh] max-h-[55vh] rounded-xl bg-zinc-100 dark:bg-card">
              {images[index] && (
                <Image
                  key={images[index].src}
                  src={images[index].src}
                  alt={images[index].alt}
                  fill
                  sizes="(max-width: 768px) 95vw, 90vw"
                  className="object-contain opacity-0 transition-opacity duration-300"
                  onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                  priority
                />
              )}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/10 p-2 text-black hover:bg-black/15 focus:outline-hidden focus:ring-2 focus:ring-black/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus:ring-white/40"
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/10 p-2 text-black hover:bg-black/15 focus:outline-hidden focus:ring-2 focus:ring-black/30 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus:ring-white/40"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                  >
                    <ChevronRight className="size-6" />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="mx-auto mt-3 grid max-w-[90vw] grid-cols-8 gap-1.5 px-0 sm:grid-cols-10 lg:grid-cols-12">
                {images.map((img, idx) => (
                  <button
                    type="button"
                    key={img.src + idx}
                    onClick={() => setIndex(idx)}
                    className={`relative aspect-square w-full overflow-hidden rounded-md border ${idx === index ? "ring-1.5 ring-black dark:ring-white" : "hover:border-zinc-300"}`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="(max-width: 640px) 10vw, 60px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              variant === "masonry"
                ? `columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance] ${className ?? ""}`
                : `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 ${className ?? ""}`
            }
            role="list"
            aria-roledescription="photogallery"
          >
            {images.map((img, i) => (
              <div key={img.src + i} role="listitem" className={variant === "masonry" ? "mb-3 break-inside-avoid" : ""}>
                <button
                  type="button"
                  onClick={() => onThumbClick(i)}
                  className="relative w-full overflow-hidden rounded-lg border bg-white group"
                  aria-label={`Open image ${i + 1}`}
                  style={variant === "masonry" ? { aspectRatio: undefined } : { aspectRatio: "4 / 3" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                    className="object-cover transition-opacity duration-300 opacity-0 group-hover:scale-[1.02]"
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-black/40 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="size-3.5" />
                    View
                  </div>
                </button>
                {showCaptions && img.caption && (
                  <div className="mt-1 text-xs text-muted-foreground">{img.caption}</div>
                )}
              </div>
            ))}
          </div>
        )}
        <noscript>
          <div>
            {images.map((img, j) => (
              <a key={j} href={img.src} title={img.alt}>{img.src}</a>
            ))}
          </div>
        </noscript>
        {jsonLd && images.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ImageGallery",
                image: images.map((im) => ({ "@type": "ImageObject", contentUrl: im.src, name: im.alt })),
              }),
            }}
          />
        )}
      </CardContent>

      {/* Optional Lightbox mode */}
      {mode === "lightbox" && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 border-none bg-transparent shadow-none w-full max-w-[95vw] sm:max-w-[90vw]"
        >
          <DialogTitle className="sr-only">{images[index]?.alt || "Gallery image"}</DialogTitle>
          <div className="relative w-full max-w-[95vw] sm:max-w-[90vw] mx-auto">
            <button
              type="button"
              aria-label="Close image viewer"
              className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center justify-center">
              <div
                className="relative w-full h-[65vh] max-h-[65vh] bg-black/30 rounded-md"
                onTouchStart={(e) => (touchStartX.current = e.touches[0]?.clientX ?? null)}
                onTouchMove={(e) => (touchCurrentX.current = e.touches[0]?.clientX ?? null)}
                onTouchEnd={() => {
                  const start = touchStartX.current;
                  const end = touchCurrentX.current;
                  touchStartX.current = null;
                  touchCurrentX.current = null;
                  if (start == null || end == null) return;
                  const dx = end - start;
                  const threshold = 40;
                  if (dx > threshold) setIndex((i) => (i - 1 + images.length) % images.length);
                  else if (dx < -threshold) setIndex((i) => (i + 1) % images.length);
                }}
              >
                {images[index] && (
                  <Image
                    key={images[index].src}
                    src={images[index].src}
                    alt={images[index].alt}
                    fill
                    sizes="(max-width: 768px) 95vw, 90vw"
                    className="object-contain opacity-0 transition-opacity duration-300"
                    onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                    priority
                  />
                )}
              </div>
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                  onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                  onClick={() => setIndex((i) => (i + 1) % images.length)}
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="mx-auto mt-3 grid max-w-[90vw] grid-cols-6 gap-2 px-3 sm:grid-cols-8">
                {images.map((img, idx) => (
                  <button
                    type="button"
                    key={img.src + idx}
                    onClick={() => setIndex(idx)}
                    className={`relative aspect-square w-full overflow-hidden rounded-md border border-white/10 bg-white/5 ${idx === index ? "ring-2 ring-white" : "hover:border-white/20"}`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image src={img.src} alt={img.alt} fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      )}
    </Card>
  );
}


