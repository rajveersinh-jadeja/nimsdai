"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MapPin, CalendarBlank, CaretLeft, CaretRight, Gauge, TrendUp } from "@phosphor-icons/react";

interface PeakItem {
  number: string;
  name: string;
  altitude: string;
  country: string;
  date: string;
  image: string;
  description: string;
  phase: string;
  deathZoneHours: string;
  climbHighlight: string;
}

const PEAKS_REEL: PeakItem[] = [
  {
    number: "01",
    name: "Annapurna I",
    altitude: "8,091 m",
    country: "Nepal",
    date: "23 Apr 2019",
    image: "/images/annapurna-nimsdai.webp",
    description: "The brutal beginning of Project Possible. Navigated high avalanche terrain and steep technical ice to lay the foundation of the 189-day world record.",
    phase: "Phase I — Nepal Arc",
    deathZoneHours: "18h in Death Zone",
    climbHighlight: "Avalanche Rescue Performed",
  },
  {
    number: "04",
    name: "Mt. Everest",
    altitude: "8,848 m",
    country: "Nepal",
    date: "22 May 2019",
    image: "/images/nimsdai-hero.jpg",
    description: "Conquered Everest and Lhotse back-to-back in 10 hours and 15 minutes, capturing the viral summit-ridge queue photograph that defined an era of Himalayan climbing.",
    phase: "Phase I — Nepal Arc",
    deathZoneHours: "24h Continuous",
    climbHighlight: "World Record Double Ascent",
  },
  {
    number: "10",
    name: "K2 (Chhogori)",
    altitude: "8,611 m",
    country: "Pakistan",
    date: "24 Jul 2019",
    image: "/images/nimsdai.webp",
    description: "Fixed ropes through the lethal Bottleneck when multiple international expeditions had stood down due to extreme rockfall and unstable seracs.",
    phase: "Phase II — Karakoram",
    deathZoneHours: "21h High Exposure",
    climbHighlight: "Led Ropes Through Bottleneck",
  },
  {
    number: "14",
    name: "Shishapangma",
    altitude: "8,027 m",
    country: "Tibet",
    date: "29 Oct 2019",
    image: "/images/nims-top-world.webp",
    description: "Secured special diplomatic permits to summit the final peak, shattering the previous 7-year, 11-month speed record by over 93% in exactly 189 days.",
    phase: "Phase III — Tibet Closure",
    deathZoneHours: "14h Summit Push",
    climbHighlight: "14/14 Record Shattered",
  },
];

export function HorizontalScrollExpeditions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section
      id="milestones"
      className="relative w-screen -mx-[calc((100vw-100%)/2)] bg-[#04060a] overflow-hidden flex flex-col justify-between py-16 sm:py-20 select-none border-y border-white/[0.08]"
    >
      {/* Background Ambience Layer: Deep Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      {/* Top Header Rail */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-8 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#9cc9ee]">
            <span className="w-6 h-px bg-[#9cc9ee]" />
            <span>03 &mdash; Project Possible Historical Reel</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white">
            Signature Milestones
          </h2>
          <p className="font-body text-xs sm:text-sm text-neutral-400 max-w-xl">
            Swipe or scroll horizontally to explore the key 8,000m summits that defined the 189-day world speed record.
          </p>
        </div>

        {/* Tactile Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
          >
            <CaretLeft className="w-5 h-5" weight="bold" />
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
          >
            <CaretRight className="w-5 h-5" weight="bold" />
          </button>
        </div>
      </header>

      {/* Fluid Horizontal Strip (Natural Momentum Scroll without Pin Lock) */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 w-full overflow-x-auto overflow-y-hidden no-scrollbar py-8 flex items-stretch gap-6 sm:gap-8 px-6 sm:px-12 scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {PEAKS_REEL.map((peak) => (
          <article
            key={peak.name}
            className="relative w-[86vw] sm:w-[460px] lg:w-[500px] shrink-0 rounded-3xl overflow-hidden flex flex-col justify-between border border-white/[0.09] bg-[#070b14] hover:border-white/30 transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* 16:10 Cinematic Alpine Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#04060a]">
              <img
                src={peak.image}
                alt={peak.name}
                className="w-full h-full object-cover object-[center_30%] contrast-[1.12] brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-black/40 pointer-events-none" />

              {/* Peak Index Watermark */}
              <div className="absolute top-4 left-6 select-none pointer-events-none font-display text-4xl sm:text-5xl font-black text-white/25 tracking-tighter">
                {peak.number}
              </div>

              {/* Altitude Tag */}
              <div className="absolute top-4 right-5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs sm:text-sm font-bold tabular-nums shadow-lg">
                {peak.altitude}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-heading">
                  <span className="text-neutral-400 font-medium">{peak.phase}</span>
                  <span className="flex items-center gap-1.5 font-mono text-neutral-400">
                    <CalendarBlank className="w-3.5 h-3.5 text-neutral-400" />
                    {peak.date}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {peak.name}
                </h3>

                <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {peak.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" weight="duotone" />
                  <span>{peak.country}</span>
                </span>

                <a
                  href="#story"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black font-heading text-xs font-bold hover:bg-neutral-200 transition-all duration-200 shrink-0 shadow-md group/btn"
                >
                  <span>Expedition Log</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" weight="bold" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Summary Rail */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400 border-t border-white/[0.08] gap-2">
        <span className="tracking-widest uppercase">Project Possible 14/14 &middot; Elite Exped</span>
        <span className="text-white/70">World Speed Record: 189 Days &middot; 0 Fatalities</span>
      </footer>
    </section>
  );
}

export default HorizontalScrollExpeditions;
