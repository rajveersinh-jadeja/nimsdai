'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from '@phosphor-icons/react';

export interface ClassicHeroProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  heroImage?: string;
  className?: string;
  peaksHref?: string;
}

/**
 * ClassicHeroSection
 * 
 * Preserved standalone component containing the complete yesterday hero section
 * from commit 797eb91:
 * - High-resolution Nimsdai summit photograph with dark gradient depth
 * - Cinematic page-load entrance timeline (scale, brightness, upward slide blur)
 * - Scroll-driven parallax depth sequence (scrubbed yPercent + scale)
 * - Scroll mist fade-out: lifts and dissolves bottom title overlay early in scroll
 * - Editorial typography: large display title, tagline, and pill CTA button
 */
export function ClassicHeroSection({
  title = "Nimsdai",
  subtitle = "14 Peaks • Nothing Is Impossible",
  tagline = "Nepali mountaineer, former Gurkha and UK SBS Special Forces. Conquered all 14 of the world's 8,000m peaks in 6 months and 6 days, followed by the historic first winter ascent of K2.",
  heroImage = "/images/nimsdai-hero.jpg",
  className = "",
  peaksHref = "#peaks"
}: ClassicHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    if (heroRef.current) {
      ctx = gsap.context(() => {
        // 1. Cinematic Page-Load Entrance Sequence (Independent Targets)
        const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Hero image cinematic scale & illumination
        entranceTl.fromTo(
          '[data-classic-hero-img]',
          { scale: 1.12, filter: 'brightness(0.6) contrast(1.1)' },
          { scale: 1.02, filter: 'brightness(0.93) contrast(1.04)', duration: 2.0 },
          0
        );

        // Nimsdai title reveal with smooth upward slide
        entranceTl.fromTo(
          '[data-classic-hero-entrance-left]',
          { y: 50, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          0.4
        );

        // Right-side narrative text and pill button reveal
        entranceTl.fromTo(
          '[data-classic-hero-entrance-right]',
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          0.6
        );

        // 2. High-Altitude Scroll-Driven Parallax Depth Sequence
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });

        // Mountain photo slowly tracks with depth across the full scroll
        scrollTl.to('[data-classic-hero-img]', {
          yPercent: 14,
          scale: 1.07,
          ease: 'none',
          duration: 1.0,
        }, 0);

        // Crucial fix: The entire bottom text overlay lifts and dissolves completely into mist
        // within the early 28% of the scroll. This ensures the title and narrative are 100%
        // invisible and misted away long before the incoming content section arrives,
        // completely preventing any shattered or cut-off text under the black background.
        scrollTl.to('[data-classic-hero-scroll-overlay]', {
          y: -50,
          opacity: 0,
          filter: 'blur(10px)',
          ease: 'power2.out',
          duration: 0.28,
        }, 0);
      }, heroRef);
    }

    return () => {
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`.trim()} ref={heroRef}>
      <section className="parallax__header relative w-full h-[155vh] overflow-hidden bg-black">
        <div className="parallax__visuals relative w-full h-full">
          <div className="parallax__black-line-overflow"></div>

          {/* Visual Canvas Container */}
          <div data-parallax-layers className="parallax__layers relative w-full h-full overflow-hidden">

            {/* Layer 1: High-Resolution Nimsdai Photograph */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                data-classic-hero-img
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
              data-classic-hero-scroll-overlay
              className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-6 sm:p-10 md:p-14"
            >
              <div className="w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-2">

                {/* Bottom Left Display Title: Nimsdai (Entrance target left) */}
                <div data-classic-hero-entrance-left className="pointer-events-auto">
                  <h1
                    className="font-display text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-[-0.04em] text-white leading-none select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.85)]"
                  >
                    {title}
                  </h1>
                  <p className="font-heading text-xs sm:text-sm font-semibold text-neutral-300 mt-2.5 drop-shadow-md tracking-tight flex items-center gap-2">
                    <span>{subtitle}</span>
                  </p>
                </div>

                {/* Bottom Right Narrative & Pill CTA Button (Entrance target right) */}
                <div
                  data-classic-hero-entrance-right
                  className="pointer-events-auto max-w-md text-left md:text-right flex flex-col items-start md:items-end gap-3.5"
                >
                  <p className="font-body text-xs sm:text-sm text-neutral-200/95 leading-relaxed font-normal drop-shadow-md tracking-normal">
                    {tagline}
                  </p>

                  <a
                    href={peaksHref}
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
    </div>
  );
}
