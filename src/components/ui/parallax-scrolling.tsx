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

        // 2. High-Altitude Continuous Scroll-Story Sequence (Valley to Summit Pin Reveal)
        const storyPinTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-story-pin',
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Smooth live altitude counter from 2,860m (Lukla / Valley) to 8,848m (Everest / Summit)
              const altEl = document.querySelector('[data-live-altitude]');
              if (altEl) {
                const currentAlt = Math.round(2860 + (8848 - 2860) * self.progress);
                altEl.textContent = `${currentAlt.toLocaleString()}M`;
              }
            }
          }
        });

        // Step 1: Landscape (Screen 1) zooms in subtly
        storyPinTl.to('[data-hero-screen1-bg]', {
          scale: 1.18,
          ease: 'none',
          duration: 0.45,
        }, 0);

        // Step 2: NIMSDAI letters spread (letterSpacing / scale) and fade away
        storyPinTl.to('[data-hero-screen1-title]', {
          scale: 1.25,
          letterSpacing: '0.35em',
          opacity: 0,
          filter: 'blur(16px)',
          ease: 'power2.inOut',
          duration: 0.35,
        }, 0);

        storyPinTl.to('[data-hero-screen1-meta]', {
          opacity: 0,
          y: -30,
          ease: 'power2.in',
          duration: 0.25,
        }, 0);

        // Step 3: Thick clouds and atmospheric alpine mist rise to cover Screen 1
        storyPinTl.fromTo(
          '[data-hero-mist-layer]',
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, ease: 'power2.inOut', duration: 0.35 },
          0.15
        );

        // Step 4: Screen 2 (The Summit Shot & The Climber) clears from the mist and rises with parallax
        storyPinTl.fromTo(
          '[data-hero-screen2-wrap]',
          { opacity: 0, yPercent: 12, scale: 0.96 },
          { opacity: 1, yPercent: 0, scale: 1.0, ease: 'power2.out', duration: 0.45 },
          0.4
        );

        // Mist gently dissipates as summit establishes
        storyPinTl.to('[data-hero-mist-layer]', {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out'
        }, 0.55);

        // Climber photo subtle parallax lift
        storyPinTl.to('[data-hero-screen2-img]', {
          yPercent: -6,
          scale: 1.04,
          ease: 'none',
          duration: 0.45
        }, 0.5);

        // Screen 2 Typography and CTA smoothly fade & slide in
        storyPinTl.fromTo(
          '[data-hero-screen2-content]',
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'power3.out', duration: 0.35 },
          0.65
        );

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
      {/* Unified 2-Screen Scroll Story: Screen 1 (The Valley & Stupa) -> Screen 2 (The Summit & The Climber) */}
      <section className="hero-story-pin relative w-full h-[100vh] overflow-hidden bg-[#04060a]">
        
        {/* ========================================================= */}
        {/* SCREEN 1: The Valley / Landscape with Towering NIMSDAI */}
        {/* ========================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Valley Background with Cool Blue/Alpine Slate color grade */}
          <div data-hero-screen1-bg className="absolute inset-0 w-full h-full transform-gpu will-change-transform">
            <img
              data-hero-img
              src="/images/himalaya-peak-bg.jpg"
              loading="eager"
              alt="Himalayan mountain landscape and towering alpine peaks"
              className="w-full h-full object-cover object-[center_35%] filter brightness-[0.78] contrast-[1.14] saturate-[0.88] hue-rotate-[-8deg]"
            />
            {/* Deep atmospheric cool obsidian vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-transparent to-[#04060a]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#04060a]/75 via-transparent to-[#04060a]/90 pointer-events-none" />
          </div>

          {/* Screen 1 Typography Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between items-center p-6 sm:p-12 md:p-16">
            
            {/* Top Subtitle Rail with Live Altitude Counter */}
            <div
              data-hero-entrance-left
              data-hero-screen1-meta
              className="w-full max-w-7xl flex items-center justify-between text-xs font-mono text-neutral-400 tracking-[0.25em] uppercase pt-16 sm:pt-20"
            >
              <div className="flex items-center gap-2 text-cyan-200/90">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>14 PEAKS &middot; 8,000M</span>
              </div>
              
              {/* Dynamic Live Altitude Telemetry */}
              <div className="px-3.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md flex items-center gap-2">
                <span className="text-[10px] text-neutral-400">ALTITUDE:</span>
                <span data-live-altitude className="text-white font-bold tracking-widest">2,860M</span>
              </div>

              <span className="hidden sm:inline text-neutral-400">PROJECT POSSIBLE</span>
            </div>

            {/* Giant Towering Serif Name (Showed big only here on screen 1) */}
            <div
              data-hero-entrance-left
              data-hero-screen1-title
              className="text-center w-full px-4 select-none my-auto transform-gpu will-change-transform"
            >
              <h1 className="font-serif text-[18vw] sm:text-[19vw] lg:text-[200px] xl:text-[230px] font-normal tracking-[0.08em] sm:tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f4f8] to-white/40 leading-none drop-shadow-[0_24px_60px_rgba(0,0,0,0.98)]">
                NIMSDAI
              </h1>
              <p className="font-heading text-xs sm:text-sm md:text-base font-medium uppercase tracking-[0.35em] text-neutral-300 mt-4 drop-shadow-md">
                14 PEAKS &middot; 8,000M
              </p>
            </div>

            {/* Bottom Scroll Prompt */}
            <div
              data-hero-entrance-right
              data-hero-screen1-meta
              className="flex flex-col items-center gap-2 text-neutral-400 text-xs font-mono tracking-widest pb-4"
            >
              <span>SCROLL TO EXPLORE</span>
              <span className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TRANSITION LAYER: Volumetric Alpine Mist & Cloud Fog */}
        {/* ========================================================= */}
        <div
          data-hero-mist-layer
          className="absolute inset-0 z-25 pointer-events-none opacity-0 transform-gpu will-change-transform"
        >
          {/* Dense multi-layered cloud/fog gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-[#09101d]/90 to-[#04060a]" />
          <div className="absolute inset-0 backdrop-blur-xl bg-slate-950/40" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#04060a] via-[#070b14]/95 to-transparent" />
        </div>

        {/* ========================================================= */}
        {/* SCREEN 2: The Summit Reveal & The Climber ("Nothing Is Impossible") */}
        {/* ========================================================= */}
        <div
          data-hero-screen2-wrap
          className="absolute inset-0 z-30 w-full h-full overflow-hidden opacity-0 transform-gpu will-change-transform flex flex-col justify-between p-6 sm:p-12 md:p-16"
        >
          {/* Background Summit Climber Photo with Matching Cool Blue Grade */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              data-hero-screen2-img
              src="/images/nimsdai-hero.jpg"
              alt="Nirmal Nims Purja MBE at the Himalayan summit ridge"
              className="w-full h-full object-cover object-[center_28%] transform-gpu will-change-transform filter brightness-[0.80] contrast-[1.16] saturate-[0.92] hue-rotate-[-4deg]"
            />
            {/* Cool atmospheric vignettes matching screen 1 */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060a] via-[#04060a]/30 to-[#04060a]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04060a]/90 via-[#04060a]/40 to-transparent pointer-events-none" />
          </div>

          {/* Screen 2 Top Rail */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-300 tracking-[0.25em] uppercase pt-16 sm:pt-20">
            <span className="text-cyan-300 font-bold">THE SUMMIT ZONE &middot; 8,848M</span>
            <div className="px-3.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md flex items-center gap-2">
              <span className="text-[10px] text-neutral-400">STATUS:</span>
              <span className="text-emerald-400 font-bold">SUMMIT SECURED</span>
            </div>
            <span className="hidden sm:inline text-neutral-400">189 DAYS RECORD</span>
          </div>

          {/* Screen 2 Core Narrative Reveal: "Nothing Is Impossible" */}
          <div
            data-hero-screen2-content
            className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 flex flex-col items-start justify-center text-left pointer-events-auto space-y-6"
          >
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Project Possible &middot; 14 &times; 8,000m Peaks</span>
            </div>

            {/* Serif Headline: "Nothing Is Impossible" */}
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-tight text-white leading-[0.95] max-w-4xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              Nothing Is<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-neutral-400">Impossible</span>
            </h2>

            {/* Sans Description */}
            <p className="font-body text-base sm:text-lg lg:text-xl text-neutral-200/90 leading-relaxed max-w-2xl font-light drop-shadow-md">
              From the Gurkhas and UK Special Boat Service to conquering every 8,000-meter peak in 6 months and 6 days. Redefining human endurance at the edge of the Death Zone.
            </p>

            {/* CTAs and Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#peaks"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black font-heading text-xs sm:text-sm font-bold tracking-tight hover:bg-neutral-200 transition-all duration-300 shadow-2xl hover:scale-[1.03] active:scale-95 group/btn"
              >
                <span>Explore 14 Peaks</span>
                <span className="w-6 h-6 rounded-full bg-black/10 group-hover/btn:bg-black group-hover/btn:text-white flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" weight="bold" />
                </span>
              </a>

              <a
                href="#story"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-heading text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-md"
              >
                <span>The Story of Nimsdai</span>
              </a>
            </div>
          </div>

          {/* Screen 2 Bottom Telemetry / Indicators */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400 tracking-widest pb-2">
            <span>SCROLL TO PROCEED TO CHRONICLE</span>
            <div className="flex items-center gap-4">
              <span>0 CASUALTIES</span>
              <span>&middot;</span>
              <span>HISTORIC FIRST</span>
            </div>
          </div>
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

            {/* Chronological Heritage Timeline (The Journey) — Connected Minimalist Trail with Glowing Milestone Nodes */}
            <div data-reveal className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-4 gap-2">
                <div>
                  <div className="flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    <span className="w-5 h-px bg-white/40" />
                    <span>The Chronicle</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-1">
                    Timeline of Endurance
                  </h3>
                </div>
                <span className="font-mono text-xs text-neutral-400">2003 &mdash; 2021 &middot; 4 Historic Milestones</span>
              </div>

              {/* Connected Timeline Trail: Glowing Continuous Wire with Interactive Milestone Nodes */}
              <div className="relative pt-6">
                {/* Desktop Continuous Glowing Rail */}
                <div className="hidden lg:block absolute top-[43px] left-8 right-8 h-0.5 bg-gradient-to-r from-white/30 via-white/50 to-white/20 z-0 pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                  {/* Milestone 1: 2003 */}
                  <div className="flex flex-col space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#05070c] border-2 border-white flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_16px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                        01
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-semibold">
                        2003
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#080d16]/90 border border-white/[0.08] group-hover:border-white/30 group-hover:bg-[#0c1322] transition-all duration-300 space-y-3 shadow-lg">
                      <h4 className="font-display text-xl font-bold text-white">
                        The Gurkhas
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        Enlisted in the British Army Brigade of Gurkhas, carrying forward Nepali heritage into one of the most storied combat forces in the world.
                      </p>
                      <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                        <span>Brigade Enlistment</span>
                        <span className="text-white/60">Nepal</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 2: 2009 */}
                  <div className="flex flex-col space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#05070c] border-2 border-white flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_16px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                        02
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-semibold">
                        2009
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#080d16]/90 border border-white/[0.08] group-hover:border-white/30 group-hover:bg-[#0c1322] transition-all duration-300 space-y-3 shadow-lg">
                      <h4 className="font-display text-xl font-bold text-white">
                        UK SBS Special Forces
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        First Gurkha to pass UK Special Boat Service selection. Commanded arctic mountain warfare and classified high-altitude winter operations.
                      </p>
                      <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                        <span>SBS Selection</span>
                        <span className="text-white/60">United Kingdom</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 3: 2019 */}
                  <div className="flex flex-col space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#05070c] border-2 border-white flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_16px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                        03
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-semibold">
                        2019
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#080d16]/90 border border-white/[0.08] group-hover:border-white/30 group-hover:bg-[#0c1322] transition-all duration-300 space-y-3 shadow-lg">
                      <h4 className="font-display text-xl font-bold text-white">
                        Project Possible
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        Climbed all 14 peaks above 8,000 meters in 6 months and 6 days &mdash; demolishing the previous 7-year record with 0 team fatalities.
                      </p>
                      <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                        <span>189-Day Record</span>
                        <span className="text-white/60">14 Summits</span>
                      </div>
                    </div>
                  </div>

                  {/* Milestone 4: 2021 */}
                  <div className="flex flex-col space-y-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#05070c] border-2 border-white flex items-center justify-center font-mono text-xs font-bold text-white shadow-[0_0_16px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform">
                        04
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs font-semibold">
                        2021
                      </span>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#080d16]/90 border border-white/[0.08] group-hover:border-white/30 group-hover:bg-[#0c1322] transition-all duration-300 space-y-3 shadow-lg">
                      <h4 className="font-display text-xl font-bold text-white">
                        K2 First Winter Ascent
                      </h4>
                      <p className="font-body text-xs sm:text-sm text-neutral-300 leading-relaxed">
                        First human winter ascent of K2 at -65&deg;C. Paused 10m below summit so 10 Nepali climbers joined arms to step onto the top together.
                      </p>
                      <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                        <span>8,611m Winter</span>
                        <span className="text-white/60">Pakistan</span>
                      </div>
                    </div>
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
