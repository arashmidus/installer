import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = "Installer Man — Repairs, made effortless";
  const description = "Trusted handyman services in Los Angeles: cabinet installation, general repairs, and emergency help. On time, tidy, and built to last.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s · Installer Man",
    },
    description,
    keywords: [
      "handyman",
      "cabinet installation",
      "general repairs",
      "emergency handyman",
      "Los Angeles",
      "home services",
    ],
    authors: [{ name: "Installer Man" }],
    creator: "Installer Man",
    publisher: "Installer Man",
    openGraph: {
      type: "website",
      url: "/",
      title,
      description,
      siteName: "Installer Man",
      locale: "en_US",
      images: [
        {
          url: "/f3a3c203-eba7-426b-aae2-e5e5f576d055.png",
          width: 1200,
          height: 630,
          alt: "Installer Man — trusted handyman services",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "/f3a3c203-eba7-426b-aae2-e5e5f576d055.png",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
