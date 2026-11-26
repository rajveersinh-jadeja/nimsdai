'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export const peaksData = [
  { name: 'Annapurna', height: 8091, date: '23 Apr' },
  { name: 'Dhaulagiri', height: 8167, date: '12 May' },
  { name: 'Kangchenjunga', height: 8586, date: '15 May' },
  { name: 'Everest', height: 8849, date: '22 May' },
  { name: 'Lhotse', height: 8516, date: '22 May' },
  { name: 'Makalu', height: 8485, date: '24 May' },
  { name: 'Nanga Parbat', height: 8126, date: '3 Jul' },
  { name: 'Gasherbrum I', height: 8080, date: '15 Jul' },
  { name: 'Gasherbrum II', height: 8035, date: '18 Jul' },
  { name: 'K2', height: 8611, date: '24 Jul' },
  { name: 'Broad Peak', height: 8051, date: '26 Jul' },
  { name: 'Cho Oyu', height: 8188, date: '23 Sep' },
  { name: 'Manaslu', height: 8163, date: '27 Sep' },
  { name: 'Shishapangma', height: 8027, date: '29 Oct' },
];

export const storySteps = [
  {
    year: '1983',
    tag: 'Beginnings',
    title: 'Born beneath the Himalaya',
    desc: 'Born on 25 July 1983 in Dana, Myagdi district, and raised largely in Chitwan.',
  },
  {
    year: '2003',
    tag: 'Service',
    title: 'Joining the Gurkhas',
    desc: "Following his father and brothers, he joined the British Army's Gurkhas at 18.",
  },
  {
    year: '2009',
    tag: 'Special Forces',
    title: 'First Gurkha in the SBS',
    desc: 'He passed selection for the Special Boat Service and became a cold-weather warfare specialist.',
  },
  {
    year: '2019',
    tag: 'Project Possible',
    title: '14 peaks in 6 months, 6 days',
    desc: 'A record that redrew the limits of high-altitude climbing and put Nepali climbers in the spotlight.',
  },
  {
    year: '2021',
    tag: 'K2 Winter',
    title: 'A first for Nepal',
    desc: 'On 16 January 2021 he stood on K2 with an all-Nepali team, the first to summit it in winter.',
  },
  {
    year: '2026',
    tag: 'In memory',
    title: 'Remembered in the mountains',
    desc: 'Nimsdai died in an avalanche on Broad Peak, Pakistan, in July 2026.',
  },
];

export interface ParallaxComponentProps {
  className?: string;
}

export function ParallaxComponent({ className = '' }: ParallaxComponentProps) {
  const [activeYear, setActiveYear] = useState('1983');
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const valleyRef = useRef<HTMLDivElement>(null);
  const summitRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLSpanElement>(null);

  const peaksRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis for smooth fluid scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let travel = 0;

    const size = () => {
      if (trackRef.current && peaksRef.current) {
        travel = Math.max(0, trackRef.current.scrollWidth - document.documentElement.clientWidth);
        peaksRef.current.style.height = `${travel + window.innerHeight}px`;
      }
    };

    const peaksUpdate = () => {
      if (!peaksRef.current || !trackRef.current || !fillRef.current) return;
      const box = peaksRef.current.getBoundingClientRect();
      const q = clamp(-box.top / (travel || 1));
      trackRef.current.style.transform = `translateX(${-q * travel}px)`;
      fillRef.current.style.transform = `scaleX(${q})`;

      const inside = box.top < window.innerHeight * 0.5 && box.bottom > 0;
      const navStory = document.querySelector('nav a[href="#story"]');
      const navPeaks = document.querySelector('nav a[href="#peaks"]');
      if (navStory) navStory.classList.toggle('on', !inside);
      if (navPeaks) navPeaks.classList.toggle('on', inside);
    };

    const update = () => {
      peaksUpdate();

      // Hero Scroll Animation Math
      if (heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const p = clamp(window.scrollY / (heroH - window.innerHeight));
        const t = clamp(p / 0.35);

        if (titleRef.current) {
          titleRef.current.style.opacity = String(1 - t);
        }

        if (!calm) {
          if (h1Ref.current) {
            h1Ref.current.style.letterSpacing = `${0.18 + t * 0.2}em`;
          }
          if (valleyRef.current) {
            valleyRef.current.style.transform = `scale(${1 + p * 0.35})`;
          }
          if (summitRef.current) {
            summitRef.current.style.transform = `scale(${1.18 - clamp((p - 0.45) / 0.55) * 0.18})`;
          }
        }

        if (mistRef.current) {
          mistRef.current.style.opacity = String(clamp(1 - Math.abs(p - 0.5) / 0.22));
        }

        if (summitRef.current) {
          summitRef.current.style.opacity = p < 0.5 ? '0' : '1';
        }

        const r = clamp((p - 0.65) / 0.2);
        if (revealRef.current) {
          revealRef.current.style.opacity = String(r);
          revealRef.current.style.transform = `translateY(${(1 - r) * 40}px)`;
          revealRef.current.style.pointerEvents = r > 0.5 ? 'auto' : 'none';
        }

        if (altRef.current) {
          altRef.current.textContent = `${Math.round(1400 + p * 7449).toLocaleString('en')} m`;
          altRef.current.style.opacity = window.scrollY > heroH - window.innerHeight ? '0' : '1';
        }
      }

      // Story Step Scroll Tracking
      const mid = window.innerHeight * (window.innerWidth < 760 ? 0.72 : 0.55);
      const steps = document.querySelectorAll<HTMLElement>('.story-step-item');
      let currentIdx = -1;
      let currentYear = '1983';

      steps.forEach((s, idx) => {
        if (s.getBoundingClientRect().top < mid) {
          currentIdx = idx;
          currentYear = s.dataset.y || '1983';
        }
      });

      if (currentIdx !== -1) {
        setActiveStepIndex(currentIdx);
        setActiveYear(currentYear);
      }
    };

    let animationFrameId: number;
    const rafCallback = (time: number) => {
      lenis.raf(time);
      update();
      animationFrameId = requestAnimationFrame(rafCallback);
    };
    animationFrameId = requestAnimationFrame(rafCallback);

    window.addEventListener('resize', size);
    size();
    update();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        size();
        update();
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', size);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
    };
  }, []);

  return (
    <div className="w-full bg-[#06080c] text-[#f2f5f8] font-body selection:bg-[#9cc9ee] selection:text-black">
      {/* 1. HERO PINNED SCROLL STORY (320vh height with 100svh sticky viewport) */}
      <section id="hero" ref={heroRef} className="relative w-full h-[320vh]">
        <div className="sticky top-0 h-[100vh] h-[100svh] overflow-hidden">
          
          {/* Valley Layer */}
          <div
            id="valley"
            ref={valleyRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `linear-gradient(#06080c66, #06080c22 50%, #06080c), url('/images/himalaya-peak-bg.jpg'), linear-gradient(160deg, #16314d, #4a6380 45%, #241f19 75%)`,
            }}
          />

          {/* Summit Layer */}
          <div
            id="summit"
            ref={summitRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform opacity-0"
            style={{
              backgroundImage: `linear-gradient(transparent 45%, #06080cf2), url('/images/nimsdai-hero.jpg'), linear-gradient(200deg, #0b2b4d, #7690a8 50%, #151a21 80%)`,
            }}
          />

          {/* Title and Valley Overlay */}
          <div
            id="title"
            ref={titleRef}
            className="absolute inset-0 flex flex-col items-center justify-center text-center select-none"
          >
            <span className="absolute top-[14%] left-[8%] font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
              14 Peaks &middot; 8,000m
            </span>
            <span className="absolute top-[14%] right-[8%] font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
              Project Possible
            </span>

            <h1
              ref={h1Ref}
              className="font-serif font-normal text-[clamp(54px,14vw,220px)] leading-none tracking-[0.18em] pl-[0.18em] text-[#f2f5f8] drop-shadow-2xl"
            >
              NIMSDAI
            </h1>

            <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4] mt-3">
              1983 &ndash; 2026
            </p>

            <div className="absolute bottom-[6%] w-full text-center">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                Scroll to explore
              </span>
              <div className="w-[1px] h-[34px] mx-auto mt-2.5 bg-gradient-to-b from-[#f2f5f8] to-transparent animate-pulse" />
            </div>
          </div>

          {/* Mist / Fog Transition Layer */}
          <div
            id="mist"
            ref={mistRef}
            className="absolute inset-0 pointer-events-none opacity-0 will-change-opacity"
            style={{
              background: `radial-gradient(ellipse at 30% 70%, #e8f1f8, transparent 65%), radial-gradient(ellipse at 75% 40%, #cddbe8, transparent 65%), #8fa4b8`,
            }}
          />

          {/* Reveal Layer (Screen 2: Nothing Is Impossible) */}
          <div
            id="reveal"
            ref={revealRef}
            className="absolute left-[4%] right-[4%] bottom-[6%] flex justify-between items-end gap-6 flex-wrap opacity-0 pointer-events-none"
          >
            <h2 className="font-serif font-medium text-[clamp(42px,6vw,92px)] leading-none text-[#f2f5f8]">
              Nothing Is<br />
              Impossible
            </h2>

            <div className="max-w-[420px] space-y-4">
              <p className="text-[14px] text-[#f2f5f8]/90 leading-relaxed font-body">
                Nepal-born mountaineer, former Gurkha and UK Special Boat Service. He climbed all 14 of the world&apos;s 8,000m peaks in 6 months and 6 days, then joined the first winter ascent of K2.
              </p>
              <a
                href="#story"
                className="inline-block text-[#f2f5f8] no-underline border border-white/20 bg-[#05070a]/80 px-[22px] py-[11px] rounded-full text-[13px] font-semibold hover:bg-[#f2f5f8] hover:text-[#06080c] transition-colors duration-300 shadow-xl"
              >
                Read his story &rarr;
              </a>
            </div>
          </div>

          {/* Live Altitude Readout */}
          <span
            id="alt"
            ref={altRef}
            className="hidden sm:block absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]"
          >
            1,400 m
          </span>
        </div>
      </section>

      {/* 2. OUR STORY SECTION (Sticky Portrait with Dynamic Changing Year & Stepped Timeline) */}
      <section
        id="story"
        className="px-[6%] pt-[140px] pb-[100px] grid grid-cols-1 md:grid-cols-2 gap-[7%]"
      >
        {/* Left Sticky Portrait with Dynamic Year */}
        <div className="relative">
          <div
            className="sticky top-[90px] h-[36svh] md:h-[calc(100vh-130px)] md:h-[calc(100svh-130px)] rounded-[20px] overflow-hidden bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: `url('/images/nimsdai-pose.webp'), linear-gradient(170deg, #1d3a58, #0a0e14)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080c] via-transparent to-transparent pointer-events-none" />
            <div className="absolute left-6 bottom-2.5 font-serif font-normal text-[clamp(60px,9vw,140px)] leading-none text-[#f2f5f8] drop-shadow-[0_4px_30px_#000] select-none transition-all duration-300">
              {activeYear}
            </div>
          </div>
        </div>

        {/* Right Stepped Timeline Content */}
        <div>
          <div className="mb-[60px]">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
              Our story
            </span>
            <h2 className="font-serif font-medium text-[clamp(36px,5vw,72px)] leading-[1.08] text-[#f2f5f8] mt-3 mb-4">
              From Myagdi to the top of the world
            </h2>
            <p className="text-[#9aa6b4] max-w-[480px] text-sm sm:text-base leading-relaxed">
              A soldier who came to the mountains late, and changed what people believed was possible on them.
            </p>
          </div>

          <div className="space-y-4">
            {storySteps.map((step, idx) => {
              const isOn = activeStepIndex === idx;
              return (
                <article
                  key={step.year}
                  data-y={step.year}
                  className={`story-step-item min-h-[55vh] pl-7 border-l transition-all duration-500 flex flex-col justify-center ${
                    isOn
                      ? 'opacity-100 border-[#9cc9ee]'
                      : 'opacity-25 border-white/10'
                  }`}
                >
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                    {step.tag}
                  </span>
                  <h3 className="font-serif font-medium text-[36px] leading-[1.15] text-[#f2f5f8] my-2">
                    {step.title}
                  </h3>
                  <p className="text-[#9aa6b4] max-w-[440px] text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 14 PEAKS PINNED HORIZONTAL TRACK */}
      <section id="peaks" ref={peaksRef} className="relative w-full">
        <div className="sticky top-0 h-[100vh] h-[100svh] overflow-hidden flex flex-col justify-center gap-[3vh] pt-10 bg-[radial-gradient(ellipse_at_50%_120%,#17324d,#06080c_65%)]">
          <div className="px-[6%]">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
              Project Possible &middot; 2019
            </span>
            <h2 className="font-serif font-medium text-[clamp(40px,5vw,72px)] leading-none text-[#f2f5f8] mt-1">
              14 Peaks
            </h2>
            <div className="flex gap-8 flex-wrap mt-3">
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">14</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">Summits</span>
              </span>
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">189</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">Days</span>
              </span>
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">8,000+</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">Metres</span>
              </span>
            </div>
          </div>

          {/* Cards Track */}
          <div
            id="track"
            ref={trackRef}
            className="flex gap-[18px] px-[6%] w-max will-change-transform"
          >
            {peaksData.map((peak, idx) => {
              const mountainHeightPercent = 35 + ((peak.height - 8000) / 849) * 30;
              return (
                <article
                  key={peak.name}
                  className="w-[min(300px,75vw)] h-[min(380px,46svh)] p-[22px] border border-white/10 hover:border-[#9cc9ee] rounded-[18px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-colors duration-300 group shadow-xl"
                >
                  {/* Peak Mountain Silhouette Polygon */}
                  <i
                    className="absolute left-0 right-0 bottom-0 pointer-events-none bg-gradient-to-t from-[#9cc9ee]/25 via-[#9cc9ee]/10 to-transparent transition-opacity group-hover:opacity-100"
                    style={{
                      height: `${mountainHeightPercent}%`,
                      clipPath:
                        'polygon(0 100%, 0 75%, 28% 38%, 40% 52%, 58% 0, 74% 45%, 84% 32%, 100% 68%, 100% 100%)',
                    }}
                  />

                  <span className="relative font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                    {String(idx + 1).padStart(2, '0')} / 14
                  </span>

                  <div className="relative">
                    <h3 className="font-serif font-medium text-[30px] leading-[1.1] text-[#f2f5f8]">
                      {peak.name}
                    </h3>
                    <strong className="text-[26px] font-medium text-white block mt-0.5">
                      {peak.height.toLocaleString('en')} m
                    </strong>
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4] block mt-1">
                      {peak.date} 2019
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Horizontal Progress Bar */}
          <div className="mx-[6%] h-[2px] bg-white/10 shrink-0">
            <div
              id="fill"
              ref={fillRef}
              className="h-full bg-[#9cc9ee] origin-left transform scale-x-0 transition-transform duration-75"
            />
          </div>

          <p className="px-[6%] text-[11px] text-[#9aa6b4] max-w-4xl">
            The 189-day record has since been broken. Later research found he stopped short of the true summits of Dhaulagiri and Manaslu in 2019; he reached both in 2021.
          </p>
        </div>
      </section>

      {/* 4. FOOTER NOTE */}
      <footer className="py-[30px] px-[6%] border-t border-white/10 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
        Unofficial tribute concept &middot; Not affiliated with Nirmal Purja&apos;s family, team or foundation
      </footer>
    </div>
  );
}
