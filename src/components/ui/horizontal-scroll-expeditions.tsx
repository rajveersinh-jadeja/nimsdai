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
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getPinDuration = () => Math.min(window.innerHeight * 1.3, getScrollDistance() * 0.75);

      const horizontalTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          id: "expeditionReelTrigger",
          trigger: section,
          start: "top top",
          end: () => `+=${getPinDuration()}`,
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      stInstance = horizontalTween.scrollTrigger || null;
      (window as unknown as { __expeditionScrollTrigger?: ScrollTrigger | null }).__expeditionScrollTrigger = stInstance;
    }, sectionRef);

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
      className="relative w-screen -mx-[calc((100vw-100%)/2)] min-h-screen bg-[#05070c] overflow-hidden flex flex-col justify-between py-12 sm:py-16 selection:bg-white selection:text-black"
    >
      {/* Top Header Rail: High-end Swiss typographic hierarchy with live progress cues */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-6 shrink-0 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-widest text-neutral-400">
            <span className="w-6 h-px bg-neutral-400" />
            <span>03 &mdash; Project Possible Historical Reel</span>
          </div>
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white">
            Signature Milestones
          </h3>
          <p className="font-body text-xs sm:text-sm text-neutral-400 max-w-xl">
            Critical summits of the 14-peak speed run, documented with technical altitude metrics and alpine logs.
          </p>
        </div>

        {/* Interaction Guidance: Accessible vector prompt, no raw emojis */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
          <span>Horizontal Expedition Reel</span>
          <ArrowRight className="w-4 h-4 text-white/60 animate-bounce-x" weight="bold" />
        </div>
      </div>

      {/* Horizontal Cinematic Film Strip Track */}
      <div className="w-full flex-1 flex items-center overflow-hidden my-auto py-6">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 sm:gap-10 pl-6 sm:pl-16 pr-16 sm:pr-32 shrink-0 will-change-transform"
        >
          {PEAKS_REEL.map((peak) => (
            <div
              key={peak.name}
              className="w-[84vw] sm:w-[460px] lg:w-[520px] shrink-0 rounded-2xl bg-[#090d16] border border-white/[0.09] overflow-hidden flex flex-col justify-between group shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-white/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.85)] transition-all duration-300 relative"
            >
              {/* Visual Upper: Cinema 16:10 Ratio with Deep Gradient Masking */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#04060a]">
                <img
                  src={peak.image}
                  alt={`Nimsdai at ${peak.name}`}
                  className="w-full h-full object-cover object-[center_28%] contrast-[1.12] brightness-[0.88] transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-black/40 pointer-events-none" />

                {/* Summit Index Number: High-fashion watermark */}
                <div className="absolute top-4 left-5 select-none pointer-events-none font-display text-4xl sm:text-5xl font-extrabold text-white/20 tracking-tighter">
                  {peak.number}
                </div>

                {/* Altitude Metric Badge: High contrast backdrop pill */}
                <div className="absolute top-4 right-5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-semibold tabular-nums shadow-md">
                  {peak.altitude}
                </div>
              </div>

              {/* Card Body: Swiss Typographic Balance & Contrast */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-heading">
                    <span className="text-neutral-400 font-medium">{peak.phase}</span>
                    <span className="flex items-center gap-1.5 font-mono text-neutral-400">
                      <CalendarBlank className="w-3.5 h-3.5 text-neutral-400" weight="bold" />
                      {peak.date}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {peak.name}
                  </h4>

                  <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {peak.description}
                  </p>
                </div>

                {/* Lower Action Footer */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" weight="duotone" />
                    <span>{peak.country}</span>
                  </span>

                  <a
                    href="#story"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black transition-all duration-200 group/btn"
                  >
                    <span>Summit Report</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Rail: Editorial Summary Line */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.08] pt-4 text-xs font-mono text-neutral-400 gap-2 shrink-0">
        <span className="tracking-widest">PROJECT POSSIBLE &middot; 14 PEAKS &middot; 8,000M</span>
        <span className="text-white/60">WORLD RECORD: 189 DAYS &middot; 0 EXPEDITION LOSSES</span>
      </div>
    </section>
  );
}
  );
}

export default HorizontalScrollExpeditions;
