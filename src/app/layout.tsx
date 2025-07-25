import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The TypeOS Company | Building VibeLearn",
  description: "We're building a better way to learn with VibeLearn and VibeGrade",
  icons: {
    icon: "/typeos.png",
    shortcut: "/typeos.png",
    apple: "/typeos.png",
  },
  openGraph: {
    title: "The TypeOS Company | Building VibeLearn",
    description: "We're building a better way to learn with VibeLearn and VibeGrade",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "The TypeOS Company",
        type: "image/png",
      },
    ],
    type: "website",
    siteName: "The TypeOS Company",
  },
  twitter: {
    card: "summary_large_image",
    title: "The TypeOS Company | Building VibeLearn",
    description: "We're building a better way to learn with VibeLearn and VibeGrade",
    images: [
      {
        url: "/share.png",
        alt: "The TypeOS Company",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
