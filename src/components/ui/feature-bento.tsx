"use client";

import React from "react";
import {
  Mountains,
  CalendarBlank,
  Trophy,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  CheckCircle,
} from "@phosphor-icons/react";
import { BlurFade } from "@/components/ui/blur-fade";

type Peak = {
  name: string;
  altitude: number;
  date: string;
  country: string;
};

const PHASES: {
  numeral: string;
  region: string;
  dates: string;
  peaks: Peak[];
}[] = [
    {
      numeral: "I",
      region: "Nepal",
      dates: "23 Apr — 24 May 2019",
      peaks: [
        { name: "Annapurna I", altitude: 8091, date: "23 Apr", country: "Nepal" },
        { name: "Dhaulagiri", altitude: 8167, date: "12 May", country: "Nepal" },
        { name: "Kanchenjunga", altitude: 8586, date: "15 May", country: "Nepal" },
        { name: "Mt. Everest", altitude: 8848, date: "22 May", country: "Nepal" },
        { name: "Lhotse", altitude: 8516, date: "22 May", country: "Nepal" },
        { name: "Makalu", altitude: 8485, date: "24 May", country: "Nepal" },
      ],
    },
    {
      numeral: "II",
      region: "Karakoram",
      dates: "3 Jul — 26 Jul 2019",
      peaks: [
        { name: "Nanga Parbat", altitude: 8126, date: "03 Jul", country: "Pakistan" },
        { name: "Gasherbrum I", altitude: 8080, date: "15 Jul", country: "Pakistan" },
        { name: "Gasherbrum II", altitude: 8034, date: "18 Jul", country: "Pakistan" },
        { name: "K2", altitude: 8611, date: "24 Jul", country: "Pakistan" },
        { name: "Broad Peak", altitude: 8051, date: "26 Jul", country: "Pakistan" },
      ],
    },
    {
      numeral: "III",
      region: "Tibet & Nepal",
      dates: "23 Sep — 29 Oct 2019",
      peaks: [
        { name: "Cho Oyu", altitude: 8188, date: "23 Sep", country: "Tibet" },
        { name: "Manaslu", altitude: 8163, date: "27 Sep", country: "Nepal" },
        { name: "Shishapangma", altitude: 8027, date: "29 Oct", country: "Tibet" },
      ],
    },
  ];

export const FeatureBento: React.FC = () => {
  return (
    <section id="ledger" className="scroll-mt-28 w-full py-4 text-white">
      {/* Section Header with Fade-in */}
      <BlurFade delay={0.05} inView>
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-white/[0.08] pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#9cc9ee]">
              <span className="w-4 sm:w-5 h-px bg-[#9cc9ee]" />
              <span>Project Possible &middot; Complete Expedition Ledger</span>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-display">
              Fourteen Summits, One Season
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9cc9ee] self-start sm:self-auto bg-[#9cc9ee]/10 px-3 py-1.5 rounded-full border border-[#9cc9ee]/25">
            <ShieldCheck className="w-4 h-4 text-[#9cc9ee] shrink-0" weight="duotone" />
            <span className="font-medium tracking-tight text-white">14/14 Official UIAA &amp; Himalayan Database Verified</span>
          </div>
        </div>
      </BlurFade>

      {/* Bento Grid with Cascading Fade-In */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-4.5 auto-rows-auto lg:auto-rows-[290px]">
        {/* Card 1: Hero Card - Large (Span 2x2 on Desktop, Full Width on Mobile) */}
        <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <BlurFade delay={0.08} inView className="h-full">
            <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden border border-white/[0.09] bg-[#090d16] min-h-[460px] sm:min-h-[520px] lg:min-h-full h-full">
              {/* Static High-Altitude Mountain Expedition Background (No hover scale) */}
              <div className="absolute inset-0 bg-[url('/images/himalaya-peak-bg.jpg')] bg-cover bg-[center_35%] contrast-[1.08] brightness-[0.78] opacity-65 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/75 to-[#060911]/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#060911]/90 via-transparent to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5 pb-6">
                <span className="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-widest font-heading font-semibold">
                  Historic Speed Record &mdash; 189 Days
                </span>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                  23 Apr &mdash; 29 Oct 2019
                </span>
              </div>

              {/* Center-Bottom Narrative & Live 3-Phase Breakdown */}
              <div className="relative z-10 space-y-5 sm:space-y-6 pt-4">
                <div>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] font-display">
                    All 14 Death Zone Peaks
                    <br />
                    <span className="text-neutral-300 text-lg sm:text-2xl lg:text-3xl font-medium">Conquered in 6 Months &amp; 6 Days</span>
                  </h4>
                  <p className="max-w-xl text-neutral-300 text-xs sm:text-sm mt-2.5 sm:mt-3 leading-relaxed">
                    Purja and his Sherpa team shattered Jerzy Kukuczka&apos;s previous 7-year, 11-month world record by over 93%, proving that with mental resilience and meticulous logistics, nothing is impossible.
                  </p>
                </div>

                {/* Micro Phase Badges Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-3 sm:pt-4 border-t border-white/10">
                  {PHASES.map((p) => (
                    <div key={p.region} className="bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 lg:p-4 transition-colors duration-300 hover:bg-white/[0.08]">
                      <div className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                        Phase {p.numeral}
                      </div>
                      <div className="font-bold text-sm sm:text-base text-white mt-0.5">
                        {p.region}
                      </div>
                      <div className="text-[11px] text-neutral-300 mt-1 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-neutral-400 shrink-0" weight="fill" />
                        <span>{p.peaks.length} Summits</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Card 2: Combined Vertical */}
        <BlurFade delay={0.12} inView className="h-full">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between relative overflow-hidden border border-white/[0.09] bg-[#0c101a] transition-colors duration-300 hover:border-white/20 min-h-[220px] sm:min-h-[260px] lg:min-h-full h-full">
            <div className="absolute -right-8 -top-8 size-32 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="size-10 sm:size-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                <Mountains className="w-5 h-5" weight="duotone" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Combined Vertical
              </span>
            </div>

            <div className="relative z-10 pt-4">
              <h4 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight tabular-nums font-display">
                115,557
                <span className="text-lg sm:text-xl font-medium text-neutral-400 ml-1.5">m</span>
              </h4>
              <p className="text-neutral-400 text-xs mt-1.5 sm:mt-2 leading-relaxed">
                Ascended across Nepal, the Karakoram range in Pakistan, and Tibet.
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Card 3: Top Apex Elevation */}
        <BlurFade delay={0.16} inView className="h-full">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between border border-white/[0.09] bg-[#0c101a] transition-colors duration-300 hover:border-white/20 min-h-[220px] sm:min-h-[260px] lg:min-h-full h-full">
            <div className="flex items-center justify-between">
              <div className="size-10 sm:size-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                <Compass className="w-5 h-5" weight="duotone" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Top Apex Elevation
              </span>
            </div>

            <div className="space-y-2 mt-4 sm:mt-auto pt-2">
              <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-1.5 sm:pb-2">
                <span className="text-xs sm:text-sm font-semibold text-white">Mt. Everest</span>
                <span className="text-xs sm:text-sm font-mono text-neutral-300 tabular-nums">8,848 m</span>
              </div>
              <div className="flex items-baseline justify-between border-b border-white/[0.06] pb-1.5 sm:pb-2">
                <span className="text-xs sm:text-sm font-semibold text-white">K2 (Chhogori)</span>
                <span className="text-xs sm:text-sm font-mono text-neutral-300 tabular-nums">8,611 m</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs sm:text-sm font-semibold text-white">Kanchenjunga</span>
                <span className="text-xs sm:text-sm font-mono text-neutral-300 tabular-nums">8,586 m</span>
              </div>
            </div>
          </div>
        </BlurFade>

        {/* Card 4: Official Archive Verification */}
        <BlurFade delay={0.20} inView className="h-full">
          <a
            href="https://www.nimsdai.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 text-white flex flex-col justify-between transition-all duration-300 cursor-pointer border border-white/[0.09] bg-gradient-to-br from-[#121826] to-[#090d16] hover:border-white/25 group min-h-[200px] sm:min-h-[240px] lg:min-h-full h-full"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-white/10 border border-white/10 backdrop-blur-sm px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-neutral-200">
                Expedition Proof
              </span>
              <div className="size-9 sm:size-10 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full flex items-center justify-center text-neutral-200 group-hover:bg-white group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                <ArrowUpRight className="w-4 h-4" weight="bold" />
              </div>
            </div>
            <div className="pt-3">
              <h4 className="text-xl sm:text-2xl font-bold leading-tight font-display text-white">
                Official 14 Peaks
                <br />
                Summits Archive
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-1.5 sm:mt-2">
                Detailed timestamps, summit certificates, and GPS tracking logs &rarr;
              </p>
            </div>
          </a>
        </BlurFade>

        {/* Card 5: Safety Record */}
        <BlurFade delay={0.24} inView className="h-full">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 text-white flex flex-col justify-between relative overflow-hidden border border-white/[0.09] bg-[#0c101a] transition-colors duration-300 hover:border-white/20 min-h-[200px] sm:min-h-[240px] lg:min-h-full h-full">
            <div className="flex items-center justify-between">
              <div className="size-10 sm:size-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                <Trophy className="w-5 h-5" weight="duotone" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Safety Record
              </span>
            </div>

            <div className="relative z-10 pt-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
                0
                <span className="text-lg sm:text-xl font-medium text-neutral-400 ml-1.5 sm:ml-2">Losses</span>
              </div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1.5 sm:mt-2">
                100% Team Survival &amp; 4 Rescues Conducted
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Card 6: Efficiency Reduction */}
        <BlurFade delay={0.28} inView className="h-full">
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 text-white flex flex-col justify-between relative overflow-hidden border border-white/[0.09] bg-[#0c101a] transition-colors duration-300 hover:border-white/20 min-h-[200px] sm:min-h-[240px] lg:min-h-full h-full">
            <div className="flex items-center justify-between">
              <div className="size-10 sm:size-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                <CalendarBlank className="w-5 h-5" weight="duotone" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                Time Reduction
              </span>
            </div>

            <div className="relative z-10 pt-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
                93.4%
              </div>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1.5 sm:mt-2">
                Cut From 2,889 Days to 189 Days
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default FeatureBento;
