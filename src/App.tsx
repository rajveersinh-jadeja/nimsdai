import React from 'react';
import { Navbar } from '@/components/navbar';
import ParallaxDemo from '@/demos/default';
import NimsdaiFooterDemo from '@/components/ui/demo';

export default function App() {
  return (
    <div className="min-h-screen bg-[#07090e] text-[#f0f4f8] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Top Modular Navigation */}
      <Navbar />

      {/* Main Experience */}
      <main className="flex-1">
        <ParallaxDemo />
      </main>

      {/* Ridgeline Dither 14 Peaks Footer */}
      <NimsdaiFooterDemo />
    </div>
  );
}
