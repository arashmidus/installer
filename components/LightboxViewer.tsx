"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

type LightboxViewerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  initialIndex?: number;
  title?: string;
};

export default function LightboxViewer({
  open,
  onOpenChange,
  images,
  initialIndex = 0,
  title = "Image viewer",
}: LightboxViewerProps) {
  const [index, setIndex] = React.useState(initialIndex);
  const touchStartX = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (open) setIndex(Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)));
  }, [open, initialIndex, images.length]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % Math.max(images.length, 1));
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + Math.max(images.length, 1)) % Math.max(images.length, 1));
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onOpenChange]);

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent
        showCloseButton={false}
        aria-label={title}
        className="p-0 border-none bg-transparent shadow-none w-screen max-w-[100vw] sm:max-w-[95vw]"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative w-screen max-w-[100vw] sm:w-[95vw] sm:max-w-[95vw]">
          <button
            type="button"
            aria-label="Close image viewer"
            className="absolute top-3 right-3 z-10 inline-flex items-center justify-center rounded-full bg-black/60 p-2 text-white hover:bg-black/70 focus:outline-hidden focus:ring-2 focus:ring-white/50"
            onClick={() => onOpenChange(false)}
          >
            <X className="size-5" />
          </button>

          <div
            className="flex items-center justify-center px-3"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              const threshold = 40; // px
              if (dx > threshold) setIndex((i) => (i - 1 + images.length) % images.length);
              else if (dx < -threshold) setIndex((i) => (i + 1) % images.length);
              touchStartX.current = null;
            }}
          >
            <div className="relative h-[60vh] w-full max-w-[100vw] sm:h-[75vh]">
              <Image
                key={images[index]}
                src={images[index]}
                alt={`Image ${index + 1} of ${images.length}`}
                fill
                sizes="100vw"
                className="object-contain opacity-0 transition-opacity duration-300"
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                priority
              />
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/60 p-3 text-white hover:bg-black/70 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/60 p-3 text-white hover:bg-black/70 focus:outline-hidden focus:ring-2 focus:ring-white/50"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {index + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <div className="mt-3 w-full overflow-x-auto px-3">
              <div className="mx-auto flex max-w-[95vw] gap-2">
                {images.map((src, idx) => (
                  <button
                    type="button"
                    key={src + idx}
                    onClick={() => setIndex(idx)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md border ${
                      idx === index ? "ring-2 ring-white" : ""
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


