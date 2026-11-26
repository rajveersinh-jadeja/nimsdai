'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

export interface PeakDetail {
  id: string;
  name: string;
  height: number;
  date: string;
  country: string;
  range: string;
  notes: string;
  phase: string;
  oxygen: string;
}

export const peaksData: PeakDetail[] = [
  {
    id: '01',
    name: 'Annapurna I',
    height: 8091,
    date: '23 Apr 2019',
    country: 'Nepal',
    range: 'Annapurna Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'Opening peak of Project Possible. Notorious avalanche risk, completed in brutal spring conditions.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '02',
    name: 'Dhaulagiri',
    height: 8167,
    date: '12 May 2019',
    country: 'Nepal',
    range: 'Dhaulagiri Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'The White Mountain. Pushed through 70mph jetstream winds after summit delay.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '03',
    name: 'Kangchenjunga',
    height: 8586,
    date: '15 May 2019',
    country: 'Nepal / India',
    range: 'Kangchenjunga Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'Third highest peak in the world. Led a daring rescue of stranded climbers during descent.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '04',
    name: 'Mount Everest',
    height: 8849,
    date: '22 May 2019',
    country: 'Nepal / Tibet',
    range: 'Mahalangur Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'Took the iconic viral photo of the Hillary Step summit traffic jam at 05:30 AM.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '05',
    name: 'Lhotse',
    height: 8516,
    date: '22 May 2019',
    country: 'Nepal / Tibet',
    range: 'Mahalangur Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'Summited just 10 hours and 15 minutes after standing on top of Everest. Record speed double-header.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '06',
    name: 'Makalu',
    height: 8485,
    date: '24 May 2019',
    country: 'Nepal / Tibet',
    range: 'Makalu Himalaya',
    phase: 'Phase 1 · Nepal',
    notes: 'Closed Phase 1: 6 summits in just 31 days. Unprecedented endurance milestone in climbing history.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '07',
    name: 'Nanga Parbat',
    height: 8126,
    date: '03 Jul 2019',
    country: 'Pakistan',
    range: 'Western Himalaya',
    phase: 'Phase 2 · Pakistan',
    notes: 'The "Killer Mountain". Ruthless Kinshofer Route scaled in pure tactical alpine push.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '08',
    name: 'Gasherbrum I',
    height: 8080,
    date: '15 Jul 2019',
    country: 'Pakistan / China',
    range: 'Baltoro Karakoram',
    phase: 'Phase 2 · Pakistan',
    notes: 'Hidden Peak. Extreme crevasse labyrinths and intense thermal radiation on the upper glacier.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '09',
    name: 'Gasherbrum II',
    height: 8035,
    date: '18 Jul 2019',
    country: 'Pakistan / China',
    range: 'Baltoro Karakoram',
    phase: 'Phase 2 · Pakistan',
    notes: 'Summited just 3 days after G1. Relentless momentum across the Karakoram giants.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '10',
    name: 'K2',
    height: 8611,
    date: '24 Jul 2019',
    country: 'Pakistan / China',
    range: 'Baltoro Karakoram',
    phase: 'Phase 2 · Pakistan',
    notes: 'Savage Mountain. Fixed ropes through the infamous Bottleneck when all other teams had given up.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '11',
    name: 'Broad Peak',
    height: 8051,
    date: '26 Jul 2019',
    country: 'Pakistan / China',
    range: 'Baltoro Karakoram',
    phase: 'Phase 2 · Pakistan',
    notes: 'Completed K2 and Broad Peak in only 48 hours, wrapping Phase 2 with zero casualties.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '12',
    name: 'Cho Oyu',
    height: 8188,
    date: '23 Sep 2019',
    country: 'Nepal / Tibet',
    range: 'Mahalangur Himalaya',
    phase: 'Phase 3 · Tibet',
    notes: 'The Turquoise Goddess. Swift, cold ascent opened the final leg of the mission.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '13',
    name: 'Manaslu',
    height: 8163,
    date: '27 Sep 2019',
    country: 'Nepal',
    range: 'Mansiri Himalaya',
    phase: 'Phase 3 · Tibet',
    notes: 'Mountain of the Spirit. Battled deep snow on the knife-edge ridge to reach the summit plateau.',
    oxygen: 'Supplemental O2'
  },
  {
    id: '14',
    name: 'Shishapangma',
    height: 8027,
    date: '29 Oct 2019',
    country: 'Tibet (China)',
    range: 'Jugal Himalaya',
    phase: 'Phase 3 · Tibet',
    notes: 'Special diplomatic permit granted by China. 14th summit sealed the world record: 189 days total.',
    oxygen: 'Supplemental O2'
  },
];

export interface StoryMilestone {
  year: string;
  tag: string;
  title: string;
  location: string;
  elevationOrRole: string;
  desc: string;
  keyPoints: string[];
  quote?: string;
  bgImage: string;
}

export const storyMilestones: StoryMilestone[] = [
  {
    year: '1983',
    tag: 'Chapter 01 · Heritage & Roots',
    title: 'Born Beneath the Himalaya',
    location: 'Dana, Myagdi District, Nepal',
    elevationOrRole: 'Elevation 1,400m',
    desc: 'Born on 25 July 1983 into a humble Gurkha family in Dana, Myagdi district, and raised in the subtropical plains of Chitwan. Growing up without luxury, resilience was forged early through disciplined routines, distance running, and the indomitable Nepali spirit.',
    keyPoints: [
      'Father served in the 2nd King Edward VII\'s Own Gurkha Rifles',
      'Three elder brothers all enlisted as proud British Gurkhas',
      'Childhood ambition focused entirely on military excellence'
    ],
    quote: '"My background made me hungry. When you start with nothing, you have nothing to lose and everything to prove."',
    bgImage: '/images/nimsdai-pose.webp'
  },
  {
    year: '2003',
    tag: 'Chapter 02 · Military Enlistment',
    title: 'The Gurkha Brotherhood',
    location: 'Catterick & Worldwide Deployments',
    elevationOrRole: 'British Army Brigade of Gurkhas',
    desc: 'At 18, after surviving brutal physical trials among tens of thousands of Nepali candidates, Purja was accepted into the elite Brigade of Gurkhas. He carried the traditional Kukri blade with distinction, learning extreme survival, psychological endurance, and brotherhood.',
    keyPoints: [
      'Top tier recruit in endurance tests and tactical navigation',
      'Served 6 years as an infantry soldier and combat leader',
      'Cultivated the Gurkha creed: "Better to die than live a coward"'
    ],
    bgImage: '/images/nimsdai-pose.webp'
  },
  {
    year: '2009',
    tag: 'Chapter 03 · Tier-1 Special Forces',
    title: 'First Gurkha in the UK SBS',
    location: 'Poole, UK & Classified Mountain Theatres',
    elevationOrRole: 'Special Boat Service (SBS)',
    desc: 'Made British military history by becoming the first Gurkha soldier ever to pass selection for the Special Boat Service (SBS)—the UK\'s most secretive maritime and mountain counter-terrorism unit. He served 10 years, qualifying as a cold-weather combat diving and arctic mountain warfare specialist.',
    keyPoints: [
      'Selected for classified high-altitude tactical mountain operations',
      'Awarded MBE (Member of the Order of the British Empire) by Queen Elizabeth II in 2018',
      'Resigned pension and military career to attempt the unthinkable'
    ],
    quote: '"Giving up is not in the blood, sir. It is not in the blood."',
    bgImage: '/images/nims-top-world.webp'
  },
  {
    year: '2019',
    tag: 'Chapter 04 · World Record',
    title: 'Project Possible: 14 Peaks, 189 Days',
    location: 'Nepal, Pakistan, Tibet',
    elevationOrRole: '14 × 8,000m Death Zone Summits',
    desc: 'Shattered the previous world record of 7 years and 11 months by summiting all fourteen 8,000-meter peaks on Earth in just 6 months and 6 days. Leading a courageous all-Nepali Sherpa team, he completed the feat with zero team casualties, bringing global acclaim to Nepali mountaineers.',
    keyPoints: [
      'Documented in the global hit Netflix film "14 Peaks: Nothing Is Impossible"',
      'Summited Everest, Lhotse, and Makalu within 48 hours',
      'Rescued multiple abandoned climbers from other commercial expeditions'
    ],
    quote: '"I wanted to show the world that Nepali climbers are not just supporting staff. We are the pioneers."',
    bgImage: '/images/annapurna-nimsdai.webp'
  },
  {
    year: '2021',
    tag: 'Chapter 05 · The Final Frontier',
    title: 'K2 First Winter Ascent: A First for Nepal',
    location: 'K2 (8,611m), Karakoram Range, Pakistan',
    elevationOrRole: 'Savage Mountain Winter Summit',
    desc: 'Conquered what high-altitude mountaineering considered the impossible final challenge: summiting K2 in the dead of winter at minus 60°C and hurricane winds. Purja summited without supplemental oxygen, alongside 9 fellow Nepali climbers who linked arms to step on the apex together singing the Nepal national anthem.',
    keyPoints: [
      'Sub-zero hurricane conditions with temperatures plummeting below -65°C',
      'First human in history to summit K2 in winter without supplemental oxygen',
      '10 Nepali mountaineers united as one team to claim the triumph for Nepal'
    ],
    quote: '"We didn\'t do it for individual fame. We stopped 10 meters before the summit, waited for all 10 brothers, and walked onto the top together."',
    bgImage: '/images/nimsdai-hero.jpg'
  },
  {
    year: '2026',
    tag: 'Chapter 06 · Enduring Legacy',
    title: 'Remembered in the Mountains',
    location: 'The Great Himalaya & Karakoram',
    elevationOrRole: 'The Spirit of Nothing Is Impossible',
    desc: 'A titan whose courage permanently transformed high-altitude mountaineering and inspired millions across the globe. Through the Nimsdai Foundation and the Big Mountain Cleanup, his vision lives on: protecting the sacred peaks, empowering indigenous guides, and proving human spirit knows no limit.',
    keyPoints: [
      'Removed metric tons of abandoned commercial trash from the Death Zone',
      'Raised millions for Sherpa widows and high-altitude mountain porter welfare',
      'Eternal pioneer of the high Himalaya: "Nothing is impossible."'
    ],
    quote: '"When the mountain tells you to move, you move. When it tells you to stand, you stand. The mountain always decides."',
    bgImage: '/images/himalaya-peak-bg.jpg'
  },
];

export interface ParallaxComponentProps {
  className?: string;
}

export function ParallaxComponent({ className = '' }: ParallaxComponentProps) {
  const [activeYear, setActiveYear] = useState('1983');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activePeak, setActivePeak] = useState<PeakDetail | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const valleyRef = useRef<HTMLDivElement>(null);
  const summitRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const altRef = useRef<HTMLDivElement>(null);

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

      // Hero Scroll Animation Math (from Reference)
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

  const currentMilestone = storyMilestones[activeStepIndex] || storyMilestones[0];

  return (
    <div className={`w-full bg-[#06080c] text-[#f2f5f8] font-body selection:bg-[#9cc9ee] selection:text-black ${className}`.trim()}>
      
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
            <div className="absolute top-[14%] left-[6%] sm:left-[8%] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9cc9ee] animate-ping" />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                14 Peaks &middot; 8,000m
              </span>
            </div>

            <div className="absolute top-[14%] right-[6%] sm:right-[8%] flex items-center gap-2">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                Project Possible
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-[#9cc9ee] border border-white/10">
                OFFICIAL RECORD
              </span>
            </div>

            <h1
              ref={h1Ref}
              className="font-serif font-normal text-[clamp(54px,14vw,220px)] leading-none tracking-[0.18em] pl-[0.18em] text-[#f2f5f8] drop-shadow-2xl"
            >
              NIMSDAI
            </h1>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                1983 &ndash; 2026
              </span>
              <span className="w-1 h-1 rounded-full bg-[#9aa6b4]" />
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9cc9ee]">
                Nepali Pioneer
              </span>
            </div>

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
            <div className="space-y-2">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#9cc9ee] block">
                The Summit Statement
              </span>
              <h2 className="font-serif font-medium text-[clamp(42px,6vw,92px)] leading-none text-[#f2f5f8]">
                Nothing Is<br />
                Impossible
              </h2>
            </div>

            <div className="max-w-[460px] space-y-4">
              <p className="text-[14px] sm:text-[15px] text-[#f2f5f8]/90 leading-relaxed font-body">
                Nepal-born mountaineer, former Gurkha and UK Special Boat Service. He climbed all 14 of the world&apos;s 8,000m peaks in 6 months and 6 days, then joined the first winter ascent of K2.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#story"
                  className="inline-block text-[#f2f5f8] no-underline border border-white/20 bg-[#05070a]/80 px-[22px] py-[11px] rounded-full text-[13px] font-semibold hover:bg-[#f2f5f8] hover:text-[#06080c] transition-colors duration-300 shadow-xl"
                >
                  Read his story &rarr;
                </a>
                <a
                  href="#peaks"
                  className="inline-block text-[#9aa6b4] hover:text-white text-[13px] font-mono px-3 py-2 transition-colors"
                >
                  View 14 Summits &darr;
                </a>
              </div>
            </div>
          </div>

          {/* Live Altitude Readout */}
          <div
            id="alt"
            ref={altRef}
            className="hidden sm:flex flex-col items-end gap-1 absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]"
          >
            <span className="text-[9px] text-[#9cc9ee]">ALTITUDE</span>
            <span className="text-[#f2f5f8] font-bold text-sm tracking-widest">1,400 m</span>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION (Sticky Portrait with Dynamic Changing Year & Stepped Timeline) */}
      <section
        id="story"
        className="px-[6%] pt-[140px] pb-[100px] grid grid-cols-1 md:grid-cols-2 gap-[7%] relative"
      >
        {/* Left Sticky Portrait with Dynamic Year & Context Telemetry */}
        <div className="relative">
          <div
            className="sticky top-[90px] h-[40svh] md:h-[calc(100vh-130px)] md:h-[calc(100svh-130px)] rounded-[20px] overflow-hidden bg-cover bg-center shadow-2xl transition-all duration-700 border border-white/10 group"
            style={{
              backgroundImage: `url('${currentMilestone.bgImage}'), linear-gradient(170deg, #1d3a58, #0a0e14)`,
            }}
          >
            {/* Atmospheric gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06080c] via-black/20 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06080c]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top metadata inside sticky card */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#9aa6b4] z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[#9cc9ee]">
                {currentMilestone.location}
              </span>
              <span className="hidden sm:inline px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
                {currentMilestone.elevationOrRole}
              </span>
            </div>

            {/* Quote badge if present */}
            {currentMilestone.quote && (
              <div className="absolute bottom-28 left-6 right-6 hidden sm:block z-10">
                <blockquote className="font-serif italic text-white/90 text-sm md:text-base leading-snug p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 max-w-sm">
                  {currentMilestone.quote}
                </blockquote>
              </div>
            )}

            {/* Bottom Giant Changing Year Watermark */}
            <div className="absolute left-6 bottom-2.5 font-serif font-normal text-[clamp(60px,9vw,140px)] leading-none text-[#f2f5f8] drop-shadow-[0_4px_30px_#000] select-none transition-all duration-300">
              {activeYear}
            </div>
          </div>
        </div>

        {/* Right Stepped Timeline Content */}
        <div>
          <div className="mb-[60px]">
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
              Our story &middot; 1983 &ndash; 2026
            </span>
            <h2 className="font-serif font-medium text-[clamp(36px,5vw,72px)] leading-[1.08] text-[#f2f5f8] mt-3 mb-4">
              From Myagdi to the top of the world
            </h2>
            <p className="text-[#9aa6b4] max-w-[480px] text-sm sm:text-base leading-relaxed">
              A soldier who came to the mountains late, and permanently redrew the boundaries of human stamina, high-altitude tactical leadership, and modern mountaineering.
            </p>
          </div>

          <div className="space-y-6">
            {storyMilestones.map((step, idx) => {
              const isOn = activeStepIndex === idx;
              return (
                <article
                  key={step.year}
                  data-y={step.year}
                  className={`story-step-item min-h-[58vh] pl-7 sm:pl-9 border-l transition-all duration-500 flex flex-col justify-center ${
                    isOn
                      ? 'opacity-100 border-[#9cc9ee]'
                      : 'opacity-25 border-white/10'
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9cc9ee] font-medium">
                      {step.tag}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">&bull; {step.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-medium text-[32px] sm:text-[38px] leading-[1.15] text-[#f2f5f8] my-2">
                    {step.title}
                  </h3>

                  {/* Paragraph */}
                  <p className="text-[#9aa6b4] max-w-[480px] text-sm sm:text-[15px] leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  {/* Detailed Bullet Points */}
                  <ul className="space-y-2 max-w-[460px] pt-2 border-t border-white/[0.08]">
                    {step.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#9cc9ee] shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 14 PEAKS PINNED HORIZONTAL TRACK */}
      <section id="peaks" ref={peaksRef} className="relative w-full">
        <div className="sticky top-0 h-[100vh] h-[100svh] overflow-hidden flex flex-col justify-center gap-[2.5vh] pt-8 bg-[radial-gradient(ellipse_at_50%_120%,#17324d,#06080c_65%)]">
          
          {/* Header & Expedition Telemetry */}
          <div className="px-[6%] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
                <span className="w-2 h-2 rounded-full bg-[#9cc9ee]" />
                <span>Project Possible &middot; 2019 Historic World Record</span>
              </div>
              <h2 className="font-serif font-medium text-[clamp(40px,5vw,72px)] leading-none text-[#f2f5f8] mt-1">
                14 Peaks Above 8,000m
              </h2>
            </div>

            <div className="flex gap-6 sm:gap-8 flex-wrap">
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">14</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">Summits</span>
              </span>
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">189</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">Days</span>
              </span>
              <span className="flex items-baseline">
                <b className="font-serif font-medium text-[34px] mr-2 text-[#f2f5f8]">0</b>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9cc9ee]">Casualties</span>
              </span>
            </div>
          </div>

          {/* Cards Track */}
          <div
            id="track"
            ref={trackRef}
            className="flex gap-[18px] px-[6%] w-max will-change-transform"
          >
            {peaksData.map((peak) => {
              const mountainHeightPercent = 35 + ((peak.height - 8000) / 849) * 30;
              const isSelected = activePeak?.id === peak.id;

              return (
                <article
                  key={peak.name}
                  onClick={() => setActivePeak(isSelected ? null : peak)}
                  className={`w-[min(320px,78vw)] h-[min(410px,50svh)] p-[22px] border rounded-[18px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] transition-all duration-300 group shadow-xl cursor-pointer ${
                    isSelected
                      ? 'border-[#9cc9ee] ring-1 ring-[#9cc9ee]/40 bg-white/[0.07]'
                      : 'border-white/10 hover:border-[#9cc9ee]/70'
                  }`}
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

                  {/* Top Bar of the Card */}
                  <div className="relative flex items-center justify-between text-[11px] font-mono text-[#9aa6b4]">
                    <span className="tracking-[0.14em] uppercase font-bold text-white/90">
                      {peak.id} / 14
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-[#9cc9ee] border border-white/10">
                      {peak.country}
                    </span>
                  </div>

                  {/* Middle Content */}
                  <div className="relative z-10 space-y-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">
                      {peak.range}
                    </span>
                    <h3 className="font-serif font-medium text-[30px] sm:text-[32px] leading-[1.05] text-[#f2f5f8]">
                      {peak.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <strong className="text-[26px] font-medium text-white">
                        {peak.height.toLocaleString('en')} m
                      </strong>
                      <span className="text-xs font-mono text-neutral-400">
                        ({Math.round(peak.height * 3.28084).toLocaleString()} ft)
                      </span>
                    </div>
                  </div>

                  {/* Bottom Metadata & Notes */}
                  <div className="relative z-10 pt-2 border-t border-white/10 text-xs text-neutral-300">
                    <p className="line-clamp-2 text-[11px] text-neutral-400 mb-1 leading-snug">
                      {peak.notes}
                    </p>
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#9cc9ee] mt-2">
                      <span>{peak.date}</span>
                      <span className="text-white/60">{peak.oxygen}</span>
                    </div>
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

          {/* Bottom Historical Context Note */}
          <div className="px-[6%] flex items-center justify-between text-[11px] text-[#9aa6b4]">
            <p className="max-w-3xl leading-relaxed">
              The 189-day record has since been broken. Later research found he stopped short of the true summits of Dhaulagiri and Manaslu in 2019; he reached both in 2021.
            </p>
            <span className="hidden md:inline font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
              SWIPE / SCROLL TO TRACK &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* 4. FOOTER NOTE */}
      <footer className="py-[30px] px-[6%] border-t border-white/10 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-[#9aa6b4]">
        Unofficial tribute concept &middot; Not affiliated with Nirmal Purja&apos;s family, team or foundation
      </footer>
    </div>
  );
}
