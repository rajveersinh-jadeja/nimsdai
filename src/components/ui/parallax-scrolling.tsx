'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import {
  ArrowRight,
  ArrowSquareOut,
  Mountains,
  Play,
  BookOpen,
  Timer,
  CalendarBlank,
  ArrowsVertical,
  ShieldCheck,
  MapPin
} from '@phosphor-icons/react';
import { AnimatedNumber as NumberFlow } from '@/components/ui/animated-number';
import { BlurFade } from '@/components/ui/blur-fade';
import { PeaksLedger } from '@/components/ui/peaks-ledger';

export interface ParallaxComponentProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  heroImage?: string;
  className?: string;
}

export function ParallaxComponent({
  title = "Nimsdai",
  subtitle = "14 Peaks • Nothing Is Impossible",
  tagline = "Nepali mountaineer, former Gurkha and UK SBS Special Forces. Conquered all 14 of the world's 8,000m peaks in 6 months and 6 days, followed by the historic first winter ascent of K2.",
  heroImage = "/images/nimsdai-hero.jpg",
  className = ""
}: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;
    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (parallaxRef.current) {
      ctx = gsap.context(() => {
        // 1. Cinematic Page-Load Entrance Sequence (Independent Targets)
        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Hero image cinematic scale & illumination
        entranceTl.fromTo(
          '[data-hero-img]',
          { scale: 1.12, filter: 'brightness(0.6) contrast(1.1)' },
          { scale: 1.02, filter: 'brightness(0.93) contrast(1.04)', duration: 2.0 },
          0
        );

        // Nimsdai title reveal with smooth upward slide
        entranceTl.fromTo(
          '[data-hero-entrance-left]',
          { y: 50, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          0.4
        );

        // Right-side narrative text and pill button reveal
        entranceTl.fromTo(
          '[data-hero-entrance-right]',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0.6
        );

        // 2. High-Altitude Scroll-Driven Parallax Depth Sequence
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.parallax__header',
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });

        // Mountain photo slowly tracks with depth across the full scroll
        scrollTl.to('[data-hero-img]', {
          yPercent: 14,
          scale: 1.07,
          ease: 'none',
          duration: 1.0,
        }, 0);

        // Crucial fix: The entire bottom text overlay lifts and dissolves completely into mist
        // within the early 28% of the scroll. This ensures the title and narrative are 100%
        // invisible and misted away long before the incoming content section arrives,
        // completely preventing any shattered or cut-off text under the black background.
        scrollTl.to('[data-hero-scroll-overlay]', {
          y: -50,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'power2.out',
          duration: 0.28,
        }, 0);
      }, parallaxRef);
    }

    // Initialize Lenis with cinematic deceleration
    lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      if (ctx) {
        ctx.revert();
      } else {
        ScrollTrigger.getAll().forEach(st => st.kill());
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className={`parallax ${className}`.trim()} ref={parallaxRef}>
      {/* Hero Section with 155vh Balanced Scroll Distance */}
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>

          {/* Visual Canvas Container */}
          <div data-parallax-layers className="parallax__layers relative w-full h-full overflow-hidden">

            {/* Layer 1: High-Resolution Nimsdai Photograph */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                data-hero-img
                src={heroImage}
                loading="eager"
                alt="Nirmal Nims Purja MBE on Himalayan Summit"
                className="w-full h-full object-cover object-center transform-gpu will-change-transform"
              />
              {/* Natural mountain gradient for crystal-clear typography readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/20 pointer-events-none" />
            </div>

            {/* Layer 2: Editorial Typography & Narrative CTA (Scroll scrub target) */}
            <div
              data-hero-scroll-overlay
              className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-6 sm:p-10 md:p-14"
            >
              <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2">

                {/* Bottom Left Display Title: Nimsdai (Entrance target left) */}
                <div data-hero-entrance-left className="pointer-events-auto">
                  <h1
                    className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[-0.04em] text-white leading-none select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]"
                  >
                    {title}
                  </h1>
                  <p className="font-heading text-xs sm:text-sm font-semibold text-neutral-300 mt-2.5 drop-shadow-md tracking-tight flex items-center gap-2">
                    <span>14 Peaks &mdash; Nothing Is Impossible</span>
                  </p>
                </div>

                {/* Bottom Right Narrative & Pill CTA Button (Entrance target right) */}
                <div
                  data-hero-entrance-right
                  className="pointer-events-auto max-w-md text-left md:text-right flex flex-col items-start md:items-end gap-3.5"
                >
                  <p className="font-body text-xs sm:text-sm text-neutral-200/95 leading-relaxed font-normal drop-shadow-md tracking-normal">
                    {tagline}
                  </p>

                  <a
                    href="#peaks"
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/85 hover:bg-black text-white font-heading text-xs sm:text-sm font-semibold tracking-tight backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl shadow-black/60 group hover:scale-[1.03] active:scale-95"
                  >
                    <span>Explore 14 Peaks</span>
                    <span className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors duration-200">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" weight="bold" />
                    </span>
                  </a>
                </div>

              </div>
            </div>

          </div>

          <div className="parallax__fade"></div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="parallax__content w-full bg-[#05070c] text-white">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-32 sm:space-y-44 lg:space-y-52">

          {/* Section 1: Our Story (#story) — Editorial Biography & Heritage */}
          <div id="story" className="scroll-mt-28 relative">
            {/* Atmospheric Right-Side Portrait & Narrative Fold */}
            <div className="relative pt-10 sm:pt-14 pb-12 sm:pb-16">
              {/* Right-anchored monochrome mountain portrait blending seamlessly into #05070c */}
              <div className="hidden md:block absolute -top-6 right-0 w-[62%] lg:w-[58%] h-[460px] lg:h-[520px] pointer-events-none select-none overflow-hidden">
                <img
                  src="/images/nimsdai-pose.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-[50%_18%] grayscale contrast-[1.2] brightness-[0.82] opacity-80"
                />
                {/* Multi-directional obsidian fades for seamless integration */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#05070c]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-[#05070c]/85" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#05070c]/80 via-transparent to-transparent" />
              </div>

              {/* Mobile Portrait Header */}
              <div className="md:hidden relative w-full h-64 mb-8 rounded-2xl overflow-hidden border border-white/[0.08]">
                <img
                  src="/images/nimsdai-pose.webp"
                  alt="Nirmal Nims Purja MBE in Himalayan expedition gear"
                  className="w-full h-full object-cover object-[50%_18%] grayscale contrast-[1.18] brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent" />
              </div>

              {/* Left Editorial Copy */}
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  01 &mdash; Biography &amp; Heritage
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
                  From Soldier to<br />
                  Mountaineering Pioneer
                </h2>

                <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                  Born in Dana, Myagdi District, Nepal, Nirmal &quot;Nims&quot; Purja MBE served 6 years with the Gurkhas and 10 years in the UK Special Boat Service (SBS) before attempting all 14 peaks above 8,000 meters.
                </p>
              </div>

              {/* 3-Column Editorial Feature Row */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-14 sm:mt-20 pt-8 border-t border-white/[0.08]">
                {/* Pillar 1: Gurkhas & UK SBS */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0c1018] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300">
                    <Mountains className="w-4 h-4" weight="duotone" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                      Gurkhas &amp; UK SBS
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] text-neutral-400 leading-relaxed">
                      First Gurkha to pass selection for the UK Special Boat Service, mastering cold-weather operations and extreme tactical leadership.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: 14 Peaks: Netflix */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0c1018] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300">
                    <Play className="w-4 h-4" weight="duotone" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                      14 Peaks: Netflix
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] text-neutral-400 leading-relaxed">
                      The acclaimed 2021 documentary brought the inspiring spirit of Nepali climbers and Project Possible to millions worldwide.
                    </p>
                  </div>
                </div>

                {/* Pillar 3: Beyond Possible */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0c1018] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300">
                    <BookOpen className="w-4 h-4" weight="duotone" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                      Beyond Possible
                    </h3>
                    <p className="font-body text-xs sm:text-[13px] text-neutral-400 leading-relaxed">
                      Bestselling memoir chronicling his life in the Death Zone, mental resilience, and the relentless drive to defy perceived human limits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Split Highlight Banner: Historic Speed Record */}
            <div className="relative rounded-2xl bg-[#090c12] border border-white/[0.09] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
              {/* Left Narrative Half */}
              <div className="md:col-span-6 p-7 sm:p-9 lg:p-10 flex items-start gap-5 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                  <Timer className="w-5 h-5" weight="duotone" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Historic Speed Record
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-md">
                    In 2019, Purja climbed all 14 peaks above 8,000 meters in 6 months and 6 days, beating the prior 7-year record.
                  </p>
                </div>
              </div>

              {/* Right Metric + Mountain Ridge Silhouette Half */}
              <div className="md:col-span-6 relative p-7 sm:p-9 lg:p-10 md:border-l border-t md:border-t-0 border-white/[0.08] flex items-center overflow-hidden min-h-[160px] z-10">
                {/* Dark mountain ridge backdrop */}
                <img
                  src="/images/nimsdai.webp"
                  alt=""
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 w-3/4 h-full object-cover object-[18%_38%] grayscale contrast-[1.35] brightness-[0.42] opacity-75 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090c12] via-[#090c12]/80 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090c12] via-transparent to-[#090c12]/60 pointer-events-none" />

                <div className="relative z-10">
                  <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.08] flex flex-col">
                    <span><NumberFlow value={6} className="text-white" /> Months</span>
                    <span><NumberFlow value={6} className="text-white" /> Days</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-2 font-medium">
                    14 Peaks &mdash; 8,000m
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 14 Peaks Project Possible (#peaks) */}
          <div id="peaks" className="scroll-mt-28 space-y-12 sm:space-y-14 relative">
            {/* Hero Banner with Authentic Mountain Background & Cursive Signature */}
            <div className="relative rounded-3xl bg-[#070b13] border border-white/[0.08] overflow-hidden pt-12 pb-14 px-6 sm:px-10 lg:px-12 min-h-[460px] flex flex-col justify-center">
              {/* Real Himalayan Mountain Peak on Right Side */}
              <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full overflow-hidden pointer-events-none select-none z-0">
                <img
                  src="/images/himalaya-peak-bg.jpg"
                  alt="Majestic Himalayan snowy summit"
                  className="w-full h-full object-cover object-[70%_25%] contrast-[1.12] brightness-[0.88]"
                />
                {/* Seamless gradient fade into dark alpine canvas #070b13 */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#070b13] via-[#070b13]/85 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-transparent to-[#070b13]/60" />
                
                {/* Handwritten Cursive "Nims Dai" Signature across Mountain */}
                <div className="absolute top-8 sm:top-12 right-6 sm:right-14 select-none pointer-events-none">
                  <span
                    className="text-4xl sm:text-5xl lg:text-6xl text-white/85 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] -rotate-12 transform inline-block"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Nims Dai
                  </span>
                </div>
              </div>

              {/* Left Editorial Narrative */}
              <div className="relative z-10 max-w-xl space-y-4">
                <div className="flex items-center gap-2.5 font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <span className="w-5 h-px bg-neutral-400" />
                  <span>02 &mdash; Project Possible &middot; Historic Speed Record</span>
                </div>

                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.8rem] font-bold tracking-tight text-white leading-[1.04]">
                  14 Summits in<br />
                  189 Days
                </h2>

                <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg pt-1">
                  Completed between 23 April and 29 October 2019. Shattered Jerzy Kukuczka&apos;s previous 7-year, 11-month record by over 93% &mdash; proving that with conviction and meticulous logistics, nothing is impossible.
                </p>

                <div className="pt-2">
                  <a
                    href="#ledger"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0d1422]/90 hover:bg-[#152034] text-white text-xs sm:text-sm font-medium border border-white/15 hover:border-white/30 transition-all shadow-lg backdrop-blur-md group"
                  >
                    <Play className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" weight="fill" />
                    <span>Explore the Journey</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 4-Column Telemetry Strip with NumberFlow */}
            <div className="rounded-2xl bg-[#090d15]/90 border border-white/[0.08] backdrop-blur-xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10 shadow-xl">
              <div className="bg-[#0b101a] rounded-xl p-5 sm:p-6 flex items-start gap-4 border border-white/[0.04]">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                  <CalendarBlank className="w-5 h-5" weight="duotone" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1.5 whitespace-nowrap">
                    <span><NumberFlow value={189} className="text-white" /></span>
                    <span className="text-base sm:text-lg font-medium text-neutral-400">Days</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-1">Previous: 2,889 Days</div>
                </div>
              </div>

              <div className="bg-[#0b101a] rounded-xl p-5 sm:p-6 flex items-start gap-4 border border-white/[0.04]">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                  <Mountains className="w-5 h-5" weight="duotone" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1 whitespace-nowrap">
                    <span><NumberFlow value={14} className="text-white" /></span>
                    <span className="text-neutral-400">/</span>
                    <span>14</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-1">100% Summit Success</div>
                </div>
              </div>

              <div className="bg-[#0b101a] rounded-xl p-5 sm:p-6 flex items-start gap-4 border border-white/[0.04]">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                  <ArrowsVertical className="w-5 h-5" weight="duotone" />
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums flex items-baseline gap-1.5 whitespace-nowrap">
                    <span><NumberFlow value={115557} className="text-white" /></span>
                    <span className="text-base sm:text-lg font-medium text-neutral-400">m</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-1">Combined Altitude</div>
                </div>
              </div>

              <div className="bg-[#0b101a] rounded-xl p-5 sm:p-6 flex items-start gap-4 border border-white/[0.04]">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-0.5">
                  <ShieldCheck className="w-5 h-5" weight="duotone" />
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-baseline gap-1.5 whitespace-nowrap">
                    <span>0</span>
                    <span className="text-base sm:text-lg font-medium text-neutral-400">Casualties</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-1">4 High-Altitude Rescues</div>
                </div>
              </div>
            </div>

            {/* Signature Expedition Milestones (#milestones) */}
            <div id="milestones" className="scroll-mt-28 space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    <span className="w-4 h-px bg-neutral-400" />
                    <span>Featured Ascents</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Signature Expedition Milestones
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-neutral-300 bg-white/[0.04] border border-white/10 self-start sm:self-auto">
                  <Mountains className="w-3.5 h-3.5 text-neutral-300" weight="duotone" />
                  Above 8,000m Death Zone
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                {/* 1. Annapurna I */}
                <BlurFade delay={0.04} inView>
                  <div className="rounded-2xl bg-[#090d15] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 h-full shadow-lg">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#05070c]">
                        <img
                          src="/images/annapurna-nimsdai.webp"
                          alt="Annapurna I Himalayan ridge climb"
                          className="w-full h-full object-cover object-[50%_25%] contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 pb-4">
                        <h4 className="font-display text-lg font-bold text-white tracking-tight">Annapurna I</h4>
                        <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">
                          The opening climb on 23 April 2019. Purja&apos;s team braved extreme terrain.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3 pt-2 border-t border-white/[0.04]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" weight="duotone" />
                            Peak 01, Nepal
                          </span>
                          <span>23 Apr 2019</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="bg-white/[0.06] text-neutral-300 border border-white/10 px-2.5 py-1 rounded-md text-xs font-semibold tabular-nums">
                        8,091 m
                      </span>
                      <button
                        type="button"
                        aria-label="View Annapurna I ascent details"
                        className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                      </button>
                    </div>
                  </div>
                </BlurFade>

                {/* 2. Mt. Everest */}
                <BlurFade delay={0.08} inView>
                  <div className="rounded-2xl bg-[#090d15] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 h-full shadow-lg">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#05070c]">
                        <img
                          src="/images/nimsdai-hero.jpg"
                          alt="Mount Everest summit ridge"
                          className="w-full h-full object-cover object-[22%_25%] contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 pb-4">
                        <h4 className="font-display text-lg font-bold text-white tracking-tight">Mt. Everest</h4>
                        <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">
                          Purja summited Everest and Lhotse within 10 hours.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3 pt-2 border-t border-white/[0.04]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" weight="duotone" />
                            Peak 04, Nepal
                          </span>
                          <span>22 May 2019</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="bg-white/[0.06] text-neutral-300 border border-white/10 px-2.5 py-1 rounded-md text-xs font-semibold tabular-nums">
                        8,848 m
                      </span>
                      <button
                        type="button"
                        aria-label="View Mount Everest ascent details"
                        className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                      </button>
                    </div>
                  </div>
                </BlurFade>

                {/* 3. K2 */}
                <BlurFade delay={0.12} inView>
                  <div className="rounded-2xl bg-[#090d15] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 h-full shadow-lg">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#05070c]">
                        <img
                          src="/images/nimsdai.webp"
                          alt="K2 Karakoram expedition"
                          className="w-full h-full object-cover object-[45%_35%] contrast-[1.12] brightness-[0.92] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 pb-4">
                        <h4 className="font-display text-lg font-bold text-white tracking-tight">K2 (Chhogori)</h4>
                        <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">
                          Purja and his team fixed ropes through the Bottleneck.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3 pt-2 border-t border-white/[0.04]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" weight="duotone" />
                            Peak 10, Pakistan
                          </span>
                          <span>24 Jul 2019</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="bg-white/[0.06] text-neutral-300 border border-white/10 px-2.5 py-1 rounded-md text-xs font-semibold tabular-nums">
                        8,611 m
                      </span>
                      <button
                        type="button"
                        aria-label="View K2 ascent details"
                        className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                      </button>
                    </div>
                  </div>
                </BlurFade>

                {/* 4. Shishapangma */}
                <BlurFade delay={0.16} inView>
                  <div className="rounded-2xl bg-[#090d15] border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-white/20 transition-all duration-300 h-full shadow-lg">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#05070c]">
                        <img
                          src="/images/nims-top-world.webp"
                          alt="Shishapangma summit celebration"
                          className="w-full h-full object-cover object-[50%_25%] contrast-[1.08] brightness-[0.92] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 pb-4">
                        <h4 className="font-display text-lg font-bold text-white tracking-tight">Shishapangma</h4>
                        <p className="font-body text-xs text-neutral-400 mt-2 leading-relaxed">
                          Special diplomatic clearances from China.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 mt-3 pt-2 border-t border-white/[0.04]">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-500" weight="duotone" />
                            Peak 14, Tibet
                          </span>
                          <span>29 Oct 2019</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="bg-white/[0.06] text-neutral-300 border border-white/10 px-2.5 py-1 rounded-md text-xs font-semibold tabular-nums">
                        8,027 m
                      </span>
                      <button
                        type="button"
                        aria-label="View Shishapangma ascent details"
                        className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-white group-hover:bg-white/10 transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                      </button>
                    </div>
                  </div>
                </BlurFade>
              </div>
            </div>

            <PeaksLedger />
          </div>

          {/* Section 3: K2 Winter Ascent (#k2) */}
          <div id="k2" className="scroll-mt-28 rounded-2xl bg-[#090c12] border border-white/[0.09] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-1">
                  <Mountains className="w-5 h-5" weight="duotone" />
                </div>
                <div className="space-y-2.5">
                  <div className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    03 &mdash; Historic Winter Ascent &middot; 16 January 2021
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-[1.1]">
                    First Winter Ascent of K2
                  </h2>
                  <p className="font-body text-sm text-neutral-300 leading-relaxed max-w-xl">
                    For decades, K2 was the last 8,000-metre peak on Earth unclimbed in winter. In temperatures dropping below &minus;65&deg;C, Purja and nine Nepali climbers paused 10 metres below the summit, joined arms, and stepped onto the top together singing the Nepalese national anthem.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/[0.08]">
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">&minus;65&deg;C</div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">Windchill Factor</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white flex items-baseline gap-1.5">
                    <NumberFlow value={10} className="text-white" />
                    <span className="text-sm sm:text-base font-medium text-neutral-300">Climbers</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">United Nepali Team</div>
                </div>
                <div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white">Zero Casualties</div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">Clean Descent</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.08]">
              <img
                src="/images/nimsdai.webp"
                alt="K2 winter mountain ridge"
                className="w-full h-full object-cover object-[75%_30%] grayscale contrast-[1.3] brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090c12] via-[#090c12]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c12]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Section 4: Nimsdai Foundation (#foundation) */}
          <div id="foundation" className="scroll-mt-28 p-10 sm:p-14 lg:p-16 rounded-3xl bg-[#0c0f16] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                04 &mdash; Environmental Stewardship
              </div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Nimsdai Foundation &amp; Big Mountain Cleanup
              </h3>
              <p className="font-body text-sm text-neutral-300 leading-relaxed">
                Founded to remove abandoned commercial gear, spent oxygen cylinders, and expedition waste from high-altitude camps across the Death Zone in Nepal.
              </p>
            </div>
            <a
              href="https://www.nimsdaifoundation.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-heading text-xs font-semibold bg-white hover:bg-neutral-200 text-black transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap shadow-md"
            >
              <span>Support Foundation</span>
              <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
            </a>
          </div>

          {/* Section 5: Inquiries & Archive (#inquiries) */}
          <div id="inquiries" className="scroll-mt-28 text-center space-y-8 pt-14 sm:pt-20 pb-14 sm:pb-20 border-t border-white/[0.08]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                05 &mdash; Verification &amp; Inquiries
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Expedition Archive &amp; Inquiries
              </h3>
              <p className="font-body text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                Historical expedition records, speaking engagements, and guided Himalayan climbs.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="https://www.nimsdai.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-heading text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Official Nimsdai Archive</span>
                <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
              </a>
              <a
                href="https://www.eliteexped.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-heading text-xs font-semibold bg-white hover:bg-neutral-200 text-black transition-all hover:scale-[1.02] active:scale-95 shadow-md"
              >
                <span>Elite Exped Expeditions</span>
                <ArrowSquareOut className="w-3.5 h-3.5" weight="bold" />
              </a>
            </div>

            {/* Osmo Logo */}
            <div className="pt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 160 160"
                fill="none"
                className="osmo-icon-svg mx-auto opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Osmo icon"
              >
                <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
