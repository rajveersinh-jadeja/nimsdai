"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, CalendarBlank } from "@phosphor-icons/react";

interface PeakItem {
  number: string;
  name: string;
  altitude: string;
  country: string;
  date: string;
  image: string;
  description: string;
  phase: string;
}

const PEAKS_REEL: PeakItem[] = [
  {
    number: "01",
    name: "Annapurna I",
    altitude: "8,091 m",
    country: "Nepal",
    date: "23 Apr 2019",
    image: "/images/annapurna-nimsdai.webp",
    description: "The treacherous opening climb of Project Possible. Battled through heavy avalanches and extreme vertical ice.",
    phase: "Phase I — Nepal Arc",
  },
  {
    number: "04",
    name: "Mt. Everest",
    altitude: "8,848 m",
    country: "Nepal",
    date: "22 May 2019",
    image: "/images/nimsdai-hero.jpg",
    description: "Summited Everest and Lhotse back-to-back in under 10 hours, capturing the viral queue photo that shocked the world.",
    phase: "Phase I — Nepal Arc",
  },
  {
    number: "10",
    name: "K2 (Chhogori)",
    altitude: "8,611 m",
    country: "Pakistan",
    date: "24 Jul 2019",
    image: "/images/nimsdai.webp",
    description: "Fixed ropes through the deadly Bottleneck after multiple international teams had abandoned hope of summiting.",
    phase: "Phase II — Karakoram",
  },
  {
    number: "14",
    name: "Shishapangma",
    altitude: "8,027 m",
    country: "Tibet",
    date: "29 Oct 2019",
    image: "/images/nims-top-world.webp",
    description: "Secured special diplomatic clearance from the Chinese government to complete the final summit and shatter the world record.",
    phase: "Phase III — Tibet Closure",
  },
];

export function HorizontalScrollExpeditions() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let stInstance: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      // Horizontal scroll distance equals total width of the track minus the viewport width
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          id: "expeditionReelTrigger",
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      stInstance = horizontalTween.scrollTrigger || null;
      (window as unknown as { __expeditionScrollTrigger?: ScrollTrigger | null }).__expeditionScrollTrigger = stInstance;
    }, sectionRef);

    // Ensure ScrollTrigger updates after Lenis, fonts, or images resolve
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="milestones"
      className="relative w-screen -mx-[calc((100vw-100%)/2)] h-screen bg-[#05070c] overflow-hidden flex flex-col justify-between py-8 sm:py-12"
    >
      {/* Top Header Rail */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-end justify-between border-b border-white/[0.08] pb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span className="w-5 h-px bg-neutral-400" />
            <span>03 &mdash; Project Possible Expedition Reel</span>
          </div>
          <h3 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white mt-1.5">
            Signature Milestones
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
          <span>Scroll down to traverse reel &rarr;</span>
        </div>
      </div>

      {/* Horizontal Film Strip Track */}
      <div className="w-full flex-1 flex items-center overflow-hidden my-auto py-2">
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 pl-6 sm:pl-16 pr-16 sm:pr-32 shrink-0 will-change-transform"
        >
          {PEAKS_REEL.map((peak) => (
            <div
              key={peak.name}
              className="w-[82vw] sm:w-[500px] lg:w-[580px] shrink-0 rounded-3xl bg-[#090d16] border border-white/[0.09] overflow-hidden flex flex-col justify-between group shadow-[0_24px_60px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-white/25"
            >
              {/* Visual Upper: 16:10 Cinema Aspect Photo */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#04060a]">
                <img
                  src={peak.image}
                  alt={peak.name}
                  className="w-full h-full object-cover object-[center_30%] contrast-[1.12] brightness-[0.88] transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-black/35 pointer-events-none" />

                {/* Watermark Peak Number */}
                <div className="absolute top-4 left-6 select-none pointer-events-none font-display text-4xl sm:text-6xl font-extrabold text-white/20">
                  {peak.number}
                </div>

                {/* Altitude Pill Tag */}
                <div className="absolute top-4 sm:top-5 right-5 sm:right-6 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white font-mono text-xs sm:text-sm font-semibold tabular-nums shadow-lg">
                  {peak.altitude}
                </div>
              </div>

              {/* Content Lower */}
              <div className="p-5 sm:p-7 flex flex-col justify-between flex-1 space-y-3.5">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-heading">
                    <span>{peak.phase}</span>
                    <span className="flex items-center gap-1 font-mono text-neutral-400">
                      <CalendarBlank className="w-3.5 h-3.5" />
                      {peak.date}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1.5">
                    {peak.name}
                  </h4>

                  <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2 line-clamp-3 sm:line-clamp-none">
                    {peak.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" weight="duotone" />
                    {peak.country}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                    <span>Expedition Log</span>
                    <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Rail Summary */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] sm:text-xs font-mono text-neutral-400 shrink-0">
        <span>PROJECT POSSIBLE &middot; 14 PEAKS</span>
        <span>RECORD: 189 DAYS &middot; 0 CASUALTIES</span>
      </div>
    </section>
  );
}

export default HorizontalScrollExpeditions;
