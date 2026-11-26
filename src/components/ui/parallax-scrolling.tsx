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
import { FeatureBento } from '@/components/ui/feature-bento';
import { HorizontalScrollExpeditions } from '@/components/ui/horizontal-scroll-expeditions';

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
        scrollTl.to('[data-hero-scroll-overlay]', {
          y: -50,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'power2.out',
          duration: 0.28,
        }, 0);

        // 3. Section-by-Section Scroll Reveal Animations
        // Section 1: Biography & Heritage reveal
        gsap.fromTo(
          '#story [data-reveal]',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#story',
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Section 2: 14 Peaks Banner & Telemetry
        gsap.fromTo(
          '#peaks [data-reveal]',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#peaks',
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Section 3: K2 Winter Ascent
        gsap.fromTo(
          '#k2',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#k2',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Section 4: Nimsdai Foundation
        gsap.fromTo(
          '#foundation',
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#foundation',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
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

          {/* Section 1: Our Story (#story) — Bold Magazine Editorial & Timeline Layout */}
          <div id="story" className="scroll-mt-28 space-y-16 sm:space-y-24 relative">
            
            {/* Editorial Magazine Hero: Open Canvas, Massive Kinetic Typography & Integrated Alpine Portrait */}
            <div data-reveal className="relative border-b border-white/[0.1] pb-14 sm:pb-20">
              {/* Atmospheric Background Portrait integrated into the black canvas without enclosing boxes */}
              <div className="hidden md:block absolute -top-8 right-0 w-[58%] lg:w-[52%] h-[560px] pointer-events-none select-none overflow-hidden z-0">
                <img
                  src="/images/nimsdai-pose.webp"
                  alt="Nimsdai Purja"
                  className="w-full h-full object-cover object-[52%_15%] grayscale contrast-[1.28] brightness-[0.72] opacity-85"
                />
                {/* Seamless Obsidian Vignette Masking */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#05070c] via-[#05070c]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-[#05070c]/90" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#05070c]/70 via-transparent to-transparent" />
              </div>

              {/* Mobile Portrait */}
              <div className="md:hidden relative w-full h-72 mb-8 rounded-2xl overflow-hidden border border-white/[0.08]">
                <img
                  src="/images/nimsdai-pose.webp"
                  alt="Nimsdai Purja"
                  className="w-full h-full object-cover object-[50%_15%] grayscale contrast-[1.2] brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent" />
              </div>

              {/* Main Magazine Lead */}
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="flex items-center gap-3 font-heading text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  <span className="w-8 h-px bg-white/40" />
                  <span>01 &mdash; Biography &amp; Military Heritage</span>
                </div>

                <h2 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-[0.98]">
                  Soldier to<br />
                  <span className="text-neutral-400">Pioneer</span>
                </h2>

                <p className="font-body text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl font-normal pt-2">
                  Born in Dana, Myagdi District, Nepal. Nirmal &quot;Nims&quot; Purja MBE served 6 years with the Gurkhas and 10 years in the UK Special Boat Service (SBS) before mounting Project Possible &mdash; redefining what is humanly achievable across the world&apos;s 14 death-zone peaks.
                </p>

                {/* Editorial Meta Tags */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs font-medium">
                    16 Years Special Forces
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs font-medium">
                    MBE Honoree
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white font-mono text-xs font-medium">
                    SBS Mountain Leader
                  </span>
                </div>
              </div>
            </div>

            {/* Bold Large-Format Pull Quote with Editorial Signature */}
            <div data-reveal className="relative py-8 sm:py-12 border-b border-white/[0.08]">
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 block">
                  The Core Philosophy
                </span>
                <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.12]">
                  &ldquo;Giving up is not in the blood, sir. It&apos;s not in the blood.&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-3 pt-2 text-neutral-400 text-xs sm:text-sm font-heading">
                  <span className="text-white font-semibold">Nirmal &quot;Nimsdai&quot; Purja MBE</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-600" />
                  <span>SBS Selection &middot; Project Possible Leader</span>
                </div>
              </div>
            </div>

            {/* Chronological Heritage Timeline (The Journey) */}
            <div data-reveal className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-4 gap-2">
                <div>
                  <span className="font-heading text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    The Chronicle
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                    Timeline of Endurance
                  </h3>
                </div>
                <span className="font-mono text-xs text-neutral-400">2003 &mdash; 2021 &middot; 4 Pivotal Chapters</span>
              </div>

              {/* 4-Step Interactive Horizontal / Stacked Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Step 1: Gurkha Selection */}
                <div className="p-6 rounded-2xl bg-[#080c14] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 font-bold">01</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px]">2003</span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                      The Gurkhas
                    </h4>
                    <p className="font-body text-xs text-neutral-400 leading-relaxed">
                      Enlisted in the British Army Brigade of Gurkhas, following family tradition into one of the most feared infantry units in military history.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Infantry &middot; Nepal
                  </div>
                </div>

                {/* Step 2: SBS Selection */}
                <div className="p-6 rounded-2xl bg-[#080c14] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 font-bold">02</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px]">2009</span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                      UK Special Boat Service
                    </h4>
                    <p className="font-body text-xs text-neutral-400 leading-relaxed">
                      Became the first Gurkha to pass UK SBS Selection. Specialised in cold-weather warfare and high-altitude covert mountain operations.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Special Forces &middot; UK
                  </div>
                </div>

                {/* Step 3: Project Possible */}
                <div className="p-6 rounded-2xl bg-[#080c14] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 font-bold">03</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px]">2019</span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                      Project Possible
                    </h4>
                    <p className="font-body text-xs text-neutral-400 leading-relaxed">
                      Resigned pension from SBS to climb all 14 8,000m summits. Shattered the world record in 6 months and 6 days with 0 casualties.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    189 Days &middot; World Record
                  </div>
                </div>

                {/* Step 4: K2 Winter */}
                <div className="p-6 rounded-2xl bg-[#080c14] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between space-y-6 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 font-bold">04</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-mono text-[11px]">2021</span>
                    </div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                      K2 First Winter Ascent
                    </h4>
                    <p className="font-body text-xs text-neutral-400 leading-relaxed">
                      Conquered the &apos;Savage Mountain&apos; in harsh sub-zero winter conditions, stepping onto the summit together as an all-Nepali team.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    8,611m &middot; Historic First
                  </div>
                </div>
              </div>
            </div>

            {/* Speed Record Telemetry Banner */}
            <div data-reveal className="relative rounded-3xl bg-[#080c14] border border-white/[0.09] overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
              <div className="md:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 relative z-10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0e1422] border border-white/10 flex items-center justify-center shrink-0 text-white mt-1 shadow-md">
                    <Timer className="w-6 h-6" weight="duotone" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-heading text-xs font-semibold uppercase tracking-widest text-neutral-400">
                      Unprecedented World Record
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Historic Speed Record
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-lg">
                      In 2019, Purja completed all 14 peaks above 8,000 meters in 6 months and 6 days, annihilating Jerzy Kukuczka&apos;s previous mark of 7 years, 11 months by over 93%.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">189 Days</div>
                    <div className="font-body text-xs text-neutral-400 mt-0.5">Total Duration</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">14 / 14</div>
                    <div className="font-body text-xs text-neutral-400 mt-0.5">8,000m Summits</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">0</div>
                    <div className="font-body text-xs text-neutral-400 mt-0.5">Casualties</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 relative p-8 sm:p-10 lg:p-12 md:border-l border-t md:border-t-0 border-white/[0.08] flex items-center justify-center overflow-hidden min-h-[200px] z-10 bg-[#060910]">
                <img
                  src="/images/nimsdai.webp"
                  alt="Himalayan mountain ridge silhouette"
                  className="absolute right-0 bottom-0 w-full h-full object-cover object-[20%_35%] grayscale contrast-[1.3] brightness-[0.38] opacity-80 pointer-events-none select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060910] via-[#060910]/70 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060910] via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 text-center md:text-left space-y-1">
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                    <span>6 Months</span>
                  </div>
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-400 tracking-tight leading-none">
                    <span>6 Days</span>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 pt-2 font-semibold">
                    14 Peaks &mdash; 8,000m
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: 14 Peaks Project Possible (#peaks) */}
          <div id="peaks" className="scroll-mt-28 space-y-12 sm:space-y-14 relative">
            {/* Hero Banner with Authentic Mountain Background & Cursive Signature */}
            <div data-reveal className="relative rounded-3xl bg-[#070b13] border border-white/[0.08] overflow-hidden pt-12 pb-14 px-6 sm:px-10 lg:px-12 min-h-[460px] flex flex-col justify-center">
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
                <div className="flex items-center gap-2.5 font-heading text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  <span className="w-5 h-px bg-neutral-400" />
                  <span>02 &mdash; Project Possible &middot; Historic Speed Record</span>
                </div>

                <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-white leading-[1.02]">
                  14 Summits<br />
                  189 Days
                </h2>

                <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed max-w-lg pt-1">
                  Completed between 23 April and 29 October 2019. Shattered Jerzy Kukuczka&apos;s previous 7-year, 11-month record by over 93% &mdash; proving that with conviction and meticulous logistics, nothing is impossible.
                </p>

                <div className="pt-2">
                  <a
                    href="#ledger"
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/85 hover:bg-black text-white font-heading text-xs sm:text-sm font-semibold tracking-tight backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all duration-300 shadow-xl shadow-black/60 group hover:scale-[1.03] active:scale-95"
                  >
                    <span>Explore the Journey</span>
                    <span className="w-6 h-6 rounded-full bg-white/15 group-hover:bg-white group-hover:text-black flex items-center justify-center transition-colors duration-200">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" weight="bold" />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* 4-Column Telemetry Strip with NumberFlow */}
            <div data-reveal className="rounded-2xl bg-[#090d15]/90 border border-white/[0.08] backdrop-blur-xl p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10 shadow-xl">
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

            {/* Signature Expedition Milestones — Replaced by Osmo Parallax Horizontal Reel */}
            <HorizontalScrollExpeditions />

            <FeatureBento />
          </div>

          {/* Section 3: K2 Winter Ascent (#k2) */}
          <div id="k2" className="scroll-mt-28 rounded-2xl bg-[#090c12] border border-white/[0.09] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-[0_16px_48px_rgba(0,0,0,0.55)]">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="flex items-start gap-5">
                <div className="w-11 h-11 rounded-xl bg-[#0f141e] border border-white/10 flex items-center justify-center shrink-0 text-neutral-300 mt-1">
                  <Mountains className="w-5 h-5" weight="duotone" />
                </div>
                <div className="space-y-2.5">
                  <div className="font-heading text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    03 &mdash; Historic Winter Ascent &middot; 16 January 2021
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05]">
                    First Winter<br />
                    Ascent of K2
                  </h2>
                  <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl pt-1">
                    For decades, K2 was the last 8,000-metre peak on Earth unclimbed in winter. In temperatures dropping below &minus;65&deg;C, Purja and nine Nepali climbers paused 10 metres below the summit, joined arms, and stepped onto the top together singing the Nepalese national anthem.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-white/[0.08]">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums">&minus;65&deg;C</div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">Windchill Factor</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white flex items-baseline gap-1.5">
                    <NumberFlow value={10} className="text-white" />
                    <span className="text-sm sm:text-base font-medium text-neutral-300">Climbers</span>
                  </div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">United Nepali Team</div>
                </div>
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">0 Casualties</div>
                  <div className="font-body text-xs text-neutral-400 mt-0.5">Clean Descent</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/[0.08]">
              <img
                src="/images/nimsdai.webp"
                alt="K2 winter mountain ridge"
                className="w-full h-full object-cover object-[75%_30%] contrast-[1.15] brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090c12] via-[#090c12]/40 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c12]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Section 4: Nimsdai Foundation (#foundation) */}
          <div id="foundation" className="scroll-mt-28 p-10 sm:p-14 lg:p-16 rounded-3xl bg-[#0c0f16] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="font-heading text-xs font-semibold uppercase tracking-wider text-neutral-400">
                04 &mdash; Environmental Stewardship
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white leading-[1.08]">
                Nimsdai Foundation &amp;<br />Big Mountain Cleanup
              </h3>
              <p className="font-body text-sm sm:text-base text-neutral-300 leading-relaxed pt-1">
                Founded to remove abandoned commercial gear, spent oxygen cylinders, and expedition waste from high-altitude camps across the Death Zone in Nepal.
              </p>
            </div>
            <a
              href="https://www.nimsdaifoundation.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-heading text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-200 text-black transition-all hover:scale-[1.03] active:scale-95 whitespace-nowrap shadow-md group"
            >
              <span>Support Foundation</span>
              <span className="w-6 h-6 rounded-full bg-black/10 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors duration-200">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" weight="bold" />
              </span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
