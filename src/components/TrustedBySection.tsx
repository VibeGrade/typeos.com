"use client";

import React, { memo } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";


const TrustedBySection = memo(() => {
  const schools = [
    {
      name: "Stanford University",
      image: "/images/schools/stanford.png"
    },
    {
      name: "MIT",
      image: "/images/schools/mit.png"
    },
    {
      name: "Duke University",
      image: "/images/schools/duke.png"
    },
    {
      name: "Brown University",
      image: "/images/schools/brown.png"
    },
    {
      name: "University of Texas at Dallas",
      image: "/images/schools/utd.png"
    },
    {
      name: "University of California, Riverside",
      image: "/images/schools/UCR.png"
    },
    {
      name: "University of California, Davis",
      image: "/images/schools/ucd2.png"
    },
    {
      name: "University of Michigan",
      image: "/images/schools/umich.png"
    },
  ];

  const renderSchoolLogo = (school: typeof schools[0], index: number) => {
    return (
      <div 
        key={`${school.name}-${index}`}
        className="flex items-center justify-center mx-6 lg:mx-8 flex-shrink-0"
      >
        <Image
          src={school.image}
          alt={school.name}
          width={120}
          height={80}
          priority={index < 8}
          className="w-24 h-16 lg:w-32 lg:h-20 object-contain opacity-40 grayscale hover:opacity-60 transition-opacity duration-300"
        />
      </div>
    );
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider opacity-0 animate-fade-in-up">
            Trusted by students at
          </h2>
        </div>

        <div className="relative overflow-hidden opacity-0 animate-fade-in-up animate-delay-200">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <Marquee 
            speed={40}
            gradient={false} 
            pauseOnHover={true}
            play={true}
            direction="left"
            className="py-4"
          >
            {schools.concat(schools).map((school, index) => 
              renderSchoolLogo(school, index)
            )}
          </Marquee>
        </div>
      </div>
    </div>
  );
});

TrustedBySection.displayName = 'TrustedBySection';

export default TrustedBySection; 