"use client";

import { useState, useEffect } from "react";

export type DeviceInfo = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
};

export function useDevice(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard

    // 1) set up your media‐queries (all CSS)
    const mqs = {
      mobile: window.matchMedia("(max-width: 639px)"),
      tablet: window.matchMedia("(min-width: 640px) and (max-width: 1023px)"),
      touch: window.matchMedia("(hover: none) and (pointer: coarse)"),
    };

    // 2) update function
    const update = () => {
      setDevice({
        isMobile: mqs.mobile.matches,
        isTablet: mqs.tablet.matches,
        isDesktop: !mqs.mobile.matches && !mqs.tablet.matches,
        isTouch: mqs.touch.matches,
      });
    };

    // 3) run once, then subscribe to changes
    update();
    Object.values(mqs).forEach((mq) =>
      mq.addEventListener("change", update)
    );

    // 4) clean up
    return () =>
      Object.values(mqs).forEach((mq) =>
        mq.removeEventListener("change", update)
      );
  }, []);

  return device;
}
