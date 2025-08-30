'use client';

import { Button } from "@/components/dris/button";
import { YC } from "@/components/yc";
import FeaturesSection from "@/components/features/FeaturesSection";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16 inherited-css">
        <main className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-4">
            {/* <div className="inline-flex items-center gap-1 px-4 py-1 rounded-full opacity-0 animate-fade-in-up">
              <span className="text-gray-500 text-sm font-semibold">Backed by</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11" fill="none" className="w-4 h-4">
                <g clipPath="url(#clip0_2_4)">
                  <path d="M9.35 0H1.65C0.73873 0 0 0.73873 0 1.65V9.35C0 10.2613 0.73873 11 1.65 11H9.35C10.2613 11 11 10.2613 11 9.35V1.65C11 0.73873 10.2613 0 9.35 0Z" fill="#FF6600" />
                  <path d="M2.70703 2.42773H3.75977L5.5 5.95117L7.24023 2.40625H8.29297L5.88672 6.74609V9.625H4.98438V6.74609L2.70703 2.42773Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_2_4">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-gray-500 text-sm font-semibold">Combinator</span>
            </div> */}
            <div className="opacity-0 animate-fade-in-up">
              <YC />
            </div>
            <div className="flex items-center space-x-4 opacity-0 animate-fade-in-up">
              <h1 className="text-7xl text-black font-bold">TypeOS</h1>
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-xl text-center opacity-0 animate-fade-in-up animate-delay-200">
            Work with AI directly in Google Docs and your Browser.
          </p>

          <div className="opacity-0 animate-fade-in-up animate-delay-400">
            <Button 
              variant="silver"
              onClick={() => window.open('https://chromewebstore.google.com/detail/vibelearn-ai-in-google-do/hikgnomhpklghakgjgecehpfodfmaanm', '_blank')}
            >
              Get TypeOS
            </Button>
          </div>
          
          <div className="opacity-0 animate-fade-in-up animate-delay-600">
            <div className="text-center space-y-4">
              {/* <p className="text-gray-600 text-lg">
                Shoot us an email at{' '}
                <a 
                  href="mailto:team@typeos.com" 
                  className="text-black font-medium hover:underline transition-all duration-200"
                >
                  team@typeos.com
                </a>
              </p> */}
              {/* <p className="text-gray-500 text-sm">We'll respond within 10 hours</p> */}
            </div>
          </div>
        </main>
      </div>
      
      <FeaturesSection showTitles={false} />
    </>
  );
}