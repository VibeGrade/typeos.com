'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [showOnlineCount, setShowOnlineCount] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-0">

        {/* Header with Logo */}
        <header className="mb-12 md:mb-16">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
            <Image
              src="https://ext.same-assets.com/808577167/2899468770.svg"
              alt="The Browser Company"
              width={128}
              height={128}
              className="w-full h-full object-contain md:hidden"
            />
            <Image
              src="https://ext.same-assets.com/808577167/4192365745.svg"
              alt="The Browser Company"
              width={128}
              height={128}
              className="w-full h-full object-contain hidden md:block"
            />
          </div>
        </header>

        {/* Main Heading */}
        <section className="max-w-4xl mx-auto mb-12 md:mb-16">
          <h1 className="heading text-center italic">
            We're building a better way to learn with {' '}
            <a
              href="https://vibelearn.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="heading-link"
            >
              VibeLearn
            </a>
            {' '}and{' '}
            <a
              href="https://vibegrade.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="heading-link"
            >
              VibeGrade
            </a>
            .
          </h1>
        </section>

        {/* CTA Buttons */}
        <section className="mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-center">
            <a
              href="https://diabrowser.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-link"
            >
              <Image
                src="https://ext.same-assets.com/808577167/3124602396.svg"
                alt=""
                width={14}
                height={13}
                className="w-3.5 h-3"
              />
              Dia Browser
            </a>
            <a
              href="https://arc.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-link"
            >
              <Image
                src="https://ext.same-assets.com/808577167/1900558864.svg"
                alt=""
                width={18}
                height={15}
                className="w-4.5 h-3.5"
              />
              Arc Browser
            </a>
          </div>
        </section>

        {/* Mobile Decorative Element */}
        <div className="md:hidden mb-12">
          <Image
            src="https://ext.same-assets.com/808577167/2570943512.svg"
            alt=""
            width={200}
            height={50}
            className="mx-auto"
          />
        </div>

        {/* Footer Navigation */}
        <footer className="max-w-4xl mx-auto">
          <nav className="flex flex-col md:flex-row gap-5 md:gap-10 items-center justify-center">
            <a href="/values" className="mono-link">Company Values</a>
            <a href="/careers" className="mono-link">Jobs</a>
            <a
              href="https://browsercompany.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-link"
            >
              Newsletter
            </a>
            <a
              href="https://x.com/browsercompany"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-link"
            >
              @browsercompany
            </a>
          </nav>
        </footer>
      </div>

      {/* Status Elements - Top Left on Desktop */}
      <div className="fixed top-5 left-5 z-10 hidden md:flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="online-dot" />
            <span className="mono-link text-sm">68 Online</span>
          </div>
          <button
            onClick={() => setShowOnlineCount(!showOnlineCount)}
            className="mono-link text-sm opacity-50 hover:opacity-100"
          >
            {showOnlineCount ? 'Hide' : 'Show'}
          </button>
        </div>
        <button className="mono-link text-sm flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-[#272725] rounded-full" />
          Theme
        </button>
      </div>

      {/* Mobile Status Elements */}
      <div className="md:hidden px-4 py-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="online-dot" />
            <span className="mono-link text-sm">68 Online</span>
            <button
              onClick={() => setShowOnlineCount(!showOnlineCount)}
              className="mono-link text-sm opacity-50 hover:opacity-100"
            >
              {showOnlineCount ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="mono-link text-sm flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#272725] rounded-full" />
            Theme
          </button>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="px-4 pb-4 md:fixed md:left-0 md:right-0 md:bottom-0 md:pb-5">
        <div className="flex justify-between items-center opacity-50 max-w-6xl mx-auto">
          <Image
            src="https://ext.same-assets.com/808577167/2030264835.svg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <Image
            src="https://ext.same-assets.com/808577167/3737963061.svg"
            alt=""
            width={48}
            height={24}
            className="w-12 h-6"
          />
          <div className="hidden md:block">
            <small className="sr-only">Copyright 2025 The Browser Company</small>
          </div>
        </div>
      </div>
    </div>
  );
}
