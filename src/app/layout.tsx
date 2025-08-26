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
  metadataBase: new URL("https://typeos.com"),
  title: "TypeOS | Applied AI Research Lab",
  description: "Work with AI directly in your Google Docs and Browser.",
  icons: {
    icon: "/typeos.png",
    shortcut: "/typeos.png",
    apple: "/typeos.png",
  },
  openGraph: {
    title: "TypeOS | Applied AI Research Lab",
    description: "Work with AI directly in your Google Docs and Browser.",
    images: [
      {
        url: "/share.png",
        width: 1200,
        height: 630,
        alt: "TypeOS",
        type: "image/png",
      },
    ],
    type: "website",
    siteName: "TypeOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeOS | Applied AI Research Lab",
    description: "Work with AI directly in your Google Docs and Browser.",
    images: [
      {
        url: "/twitter-image.png",
        alt: "TypeOS",
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
