'use client';

import React, { useState, useEffect, useRef } from 'react';
import { List, X, ArrowUpRight } from '@phosphor-icons/react';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FloatingNavbarProps {
  items?: NavItem[];
  activeItem?: string;
  className?: string;
}

export type NavbarProps = FloatingNavbarProps;

export const defaultNavItems: NavItem[] = [
  { label: 'Our story', href: '#story' },
  { label: '14 Peaks', href: '#peaks' },
  { label: 'K2 Winter', href: '#k2' },
  { label: 'Foundation', href: '#foundation' },
];

export function Navbar({
  items = defaultNavItems,
  activeItem = 'Our story',
  className = '',
}: FloatingNavbarProps) {
  const [active, setActive] = useState(activeItem);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const scrollLockRef = useRef<number | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  // Rock-solid scrollspy tracking sections accurately
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Don't override active pill while smooth-scrolling from a navbar click
      if (isProgrammaticScrollRef.current) return;

      const viewportHeight = window.innerHeight;
      const scrollHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

      // Bottom of page: activate last item only when it is actually in view
      const lastItem = items[items.length - 1];
      const lastEl = lastItem?.href.startsWith('#')
        ? document.getElementById(lastItem.href.slice(1))
        : null;
      if (
        scrollHeight > viewportHeight + 100 &&
        viewportHeight + scrollY >= scrollHeight - 60 &&
        (!lastEl || lastEl.getBoundingClientRect().top < viewportHeight * 0.85)
      ) {
        if (lastItem) {
          setActive(lastItem.label);
        }
        return;
      }

      // If at the very top (Hero): activate first item
      const storyEl = document.getElementById('story');
      if (storyEl && storyEl.getBoundingClientRect().top > viewportHeight * 0.45) {
        if (items.length > 0) {
          setActive(items[0].label);
        }
        return;
      }

      // Check which section top has crossed into view (180px threshold)
      const threshold = 180;
      let currentActive = items[0]?.label ?? activeItem;

      for (const item of items) {
        if (!item.href.startsWith('#')) continue;
        const id = item.href.slice(1);
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            currentActive = item.label;
          }
        }
      }

      setActive(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollLockRef.current !== null) {
        window.clearTimeout(scrollLockRef.current);
      }
    };
  }, [items, activeItem]);

  // Close mobile menu on Escape key or click outside
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      setActive(item.label);
      setMobileOpen(false);

      const targetId = item.href.substring(1);
      const targetElement = document.getElementById(targetId);

      // Temporarily disable the pin lock while jumping
      const reelTrigger = (window as unknown as { __expeditionScrollTrigger?: { disable: (revert?: boolean) => void; enable: () => void } }).__expeditionScrollTrigger;
      if (reelTrigger && typeof reelTrigger.disable === 'function') {
        reelTrigger.disable(false);
      }

      isProgrammaticScrollRef.current = true;
      if (scrollLockRef.current !== null) {
        window.clearTimeout(scrollLockRef.current);
      }

      const unlock = () => {
        isProgrammaticScrollRef.current = false;
        if (scrollLockRef.current !== null) {
          window.clearTimeout(scrollLockRef.current);
          scrollLockRef.current = null;
        }
        if (reelTrigger && typeof reelTrigger.enable === 'function') {
          reelTrigger.enable();
        }
      };

      const lenisInstance = (window as unknown as {
        __lenis?: {
          scrollTo: (
            target: HTMLElement | number,
            options?: { offset?: number; immediate?: boolean; duration?: number; onComplete?: () => void }
          ) => void
        }
      }).__lenis;

      if (targetId === 'story' && !targetElement) {
        if (lenisInstance) {
          lenisInstance.scrollTo(0, { immediate: true, onComplete: unlock });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
          unlock();
        }
      } else if (targetElement) {
        if (lenisInstance) {
          lenisInstance.scrollTo(targetElement, {
            offset: -70,
            immediate: true,
            onComplete: unlock,
          });
        } else {
          targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
          unlock();
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
        unlock();
      }
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      className={`fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-auto max-w-fit pointer-events-auto transition-all duration-300 ${className}`.trim()}
    >
      {/* Top-Docked Capsule Container: 0 top margin, flat top, rounded bottom */}
      <div
        className={`flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-b-2xl rounded-t-none border-x border-b border-t-0 transition-all duration-300 ease-out ${isScrolled
            ? 'bg-black/90 backdrop-blur-2xl border-white/20 shadow-[0_12px_32px_rgba(0,0,0,0.85)]'
            : 'bg-black/80 backdrop-blur-xl border-white/15 shadow-[0_8px_24px_rgba(0,0,0,0.6)]'
          }`}
      >
        {/* Desktop Links Container */}
        <div className="hidden sm:flex items-center gap-1.5 relative">
          {items.map((item) => {
            const isActive = active === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative whitespace-nowrap px-3.5 md:px-4 py-1.5 rounded-full font-heading text-xs md:text-[13px] font-medium select-none transition-all duration-200 ease-out ${isActive
                    ? 'text-white font-semibold bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.4)] backdrop-blur-md'
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
              >
                <span className="inline-block transition-transform duration-150 active:scale-95">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Mobile View Header */}
        <div className="flex sm:hidden items-center justify-between w-full px-2 py-0.5">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-neutral-200">
            {active}
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="p-1.5 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full transition-transform duration-200 active:scale-90"
          >
            {mobileOpen ? <X className="w-5 h-5" weight="bold" /> : <List className="w-5 h-5" weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileOpen && (
        <div className="sm:hidden mt-2 p-2 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className={`px-4 py-2.5 font-heading text-xs font-semibold rounded-xl transition-all duration-150 flex items-center justify-between active:scale-98 ${active === item.label
                  ? 'bg-white/20 text-white font-bold shadow-inner'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <span>{item.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" weight="bold" />
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
