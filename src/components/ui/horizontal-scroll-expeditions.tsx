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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activePeak, setActivePeak] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    if (!section || !track) return;

    let stInstance: ScrollTrigger | null = null;

    const ctx = gsap.context(() => {
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const getPinDuration = () => Math.min(window.innerHeight * 1.4, getScrollDistance() * 0.85);

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
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.width = `${Math.min(100, Math.max(0, self.progress * 100))}%`;
            }
            const index = Math.min(PEAKS_REEL.length - 1, Math.floor(self.progress * PEAKS_REEL.length));
            setActivePeak(index);
          },
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
      className="relative w-screen -mx-[calc((100vw-100%)/2)] h-screen bg-[#04060a] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Background Ambience Layer: Deep Vignette & Alpine Grain */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      {/* Top Museum Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-8 sm:pt-10 pb-4 flex items-end justify-between border-b border-white/[0.08]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            <span className="w-6 h-px bg-white/40" />
            <span>Project Possible &middot; 14 Summits Reel</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white">
            Signature Milestones
          </h2>
        </div>

        {/* Live Counter & Scroll Direction Indicator */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <div className="font-mono text-xs text-white/90 tabular-nums font-semibold">
              <span className="text-white">0{activePeak + 1}</span>
              <span className="text-neutral-500"> / 0{PEAKS_REEL.length}</span>
            </div>
            <span className="font-body text-[10px] uppercase tracking-widest text-neutral-400">Scroll to explore</span>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/70">
            <ArrowRight className="w-4 h-4 animate-pulse" weight="bold" />
          </div>
        </div>
      </header>

      {/* Main Full-Height Horizontal Filmstrip Container */}
      <main className="relative z-10 w-full flex-1 flex items-center overflow-hidden my-auto py-2">
        <div
          ref={trackRef}
          className="flex items-stretch gap-6 sm:gap-10 pl-6 sm:pl-16 pr-16 sm:pr-32 shrink-0 will-change-transform h-[62vh] sm:h-[66vh] max-h-[620px]"
        >
          {PEAKS_REEL.map((peak, idx) => {
            const isCurrent = idx === activePeak;
            return (
              <article
                key={peak.name}
                className={`relative w-[86vw] sm:w-[540px] lg:w-[620px] shrink-0 rounded-3xl overflow-hidden flex flex-col justify-between border transition-all duration-500 group shadow-[0_24px_64px_rgba(0,0,0,0.85)] ${
                  isCurrent ? "border-white/30 bg-[#070b14]" : "border-white/[0.08] bg-[#05080e]"
                }`}
              >
                {/* Full-Bleed Atmospheric Background Photo with High-Contrast Gradient Veil */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={peak.image}
                    alt={peak.name}
                    className="w-full h-full object-cover object-[center_32%] contrast-[1.14] brightness-[0.72] group-hover:scale-104 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
                  />
                  {/* Multi-stage obsidian gradients ensuring 100% text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-[#04060a]/80 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#04060a]/90 via-transparent to-transparent h-28" />
                </div>

                {/* Card Top: Identity, Watermark & Altitude Badge */}
                <header className="relative z-10 p-6 sm:p-8 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-semibold text-neutral-300 tracking-wider uppercase block">
                      {peak.phase}
                    </span>
                    <span className="font-display text-4xl sm:text-6xl font-black text-white/20 select-none tracking-tighter">
                      {peak.number}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-xs sm:text-sm font-bold tabular-nums shadow-lg">
                      {peak.altitude}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-mono text-neutral-200">
                      <Gauge className="w-3.5 h-3.5 text-neutral-300" weight="bold" />
                      <span>{peak.deathZoneHours}</span>
                    </div>
                  </div>
                </header>

                {/* Card Bottom: Mountain Title, Editorial Story & Action Footer */}
                <footer className="relative z-10 p-6 sm:p-8 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-heading">
                      <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-neutral-300" weight="duotone" />
                        {peak.country}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-600" />
                      <span className="flex items-center gap-1.5 font-mono text-neutral-300">
                        <CalendarBlank className="w-3.5 h-3.5 text-neutral-400" />
                        {peak.date}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                      {peak.name}
                    </h3>

                    <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                      {peak.description}
                    </p>
                  </div>

                  {/* Highlight Tag & Action Button */}
                  <div className="pt-4 border-t border-white/[0.12] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 truncate">
                      <TrendUp className="w-3.5 h-3.5 text-neutral-400 shrink-0" weight="bold" />
                      <span className="truncate">{peak.climbHighlight}</span>
                    </div>

                    <a
                      href="#story"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-heading text-xs font-bold hover:bg-neutral-200 transition-all duration-200 shrink-0 shadow-lg group/btn active:scale-95"
                    >
                      <span>Expedition Log</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" weight="bold" />
                    </a>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </main>

      {/* Bottom Telemetry & Scrub Progress Rail */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-6 sm:pb-8 flex flex-col gap-3">
        {/* Sleek Progress Track */}
        <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-white transition-[width] duration-150 ease-out rounded-full"
            style={{ width: "25%" }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-neutral-400">
          <span className="tracking-widest uppercase">Project Possible 14/14 &middot; Elite Exped</span>
          <span className="text-white/70">Scroll down to traverse peaks</span>
        </div>
      </footer>
    </section>
  );
}

export default HorizontalScrollExpeditions;
