'use client';

import React from 'react';

type Peak = {
  name: string;
  altitude: number;
  /** Days since 23 April 2019, used by the sequence chart. */
  day: number;
};

type Phase = {
  numeral: string;
  region: string;
  dates: string;
  days: number;
  peaks: Peak[];
  closing?: boolean;
};

const PHASES: Phase[] = [
  {
    numeral: 'I',
    region: 'Nepal',
    dates: '23 APR — 24 MAY 2019',
    days: 31,
    peaks: [
      { name: 'Annapurna I', altitude: 8091, day: 0 },
      { name: 'Dhaulagiri', altitude: 8167, day: 19 },
      { name: 'Kanchenjunga', altitude: 8586, day: 22 },
      { name: 'Mt. Everest', altitude: 8848, day: 29 },
      { name: 'Lhotse', altitude: 8516, day: 29 },
      { name: 'Makalu', altitude: 8485, day: 31 },
    ],
  },
  {
    numeral: 'II',
    region: 'Karakoram',
    dates: '3 JUL — 26 JUL 2019',
    days: 23,
    peaks: [
      { name: 'Nanga Parbat', altitude: 8126, day: 71 },
      { name: 'Gasherbrum I', altitude: 8080, day: 83 },
      { name: 'Gasherbrum II', altitude: 8034, day: 86 },
      { name: 'K2', altitude: 8611, day: 92 },
      { name: 'Broad Peak', altitude: 8051, day: 94 },
    ],
  },
  {
    numeral: 'III',
    region: 'Tibet & Nepal',
    dates: '23 SEP — 29 OCT 2019',
    days: 36,
    closing: true,
    peaks: [
      { name: 'Cho Oyu', altitude: 8188, day: 153 },
      { name: 'Manaslu', altitude: 8163, day: 157 },
      { name: 'Shishapangma', altitude: 8027, day: 189 },
    ],
  },
];

const ALL_PEAKS = PHASES.flatMap((phase) => phase.peaks);

const CHART = {
  width: 380,
  height: 200,
  left: 38,
  right: 365,
  top: 18,
  bottom: 162,
  minAltitude: 7950,
  maxAltitude: 8950,
  totalDays: 189,
};

function chartX(day: number) {
  return CHART.left + (day / CHART.totalDays) * (CHART.right - CHART.left);
}

function chartY(altitude: number) {
  const ratio = (altitude - CHART.minAltitude) / (CHART.maxAltitude - CHART.minAltitude);
  return CHART.bottom - ratio * (CHART.bottom - CHART.top);
}

const linePath = ALL_PEAKS.map((peak, index) => {
  const command = index === 0 ? 'M' : 'L';
  return `${command}${chartX(peak.day).toFixed(2)},${chartY(peak.altitude).toFixed(2)}`;
}).join(' ');

const areaPath = `${linePath} L${CHART.right},${CHART.bottom} L${CHART.left},${CHART.bottom} Z`;

const EVEREST = ALL_PEAKS.find((peak) => peak.name === 'Mt. Everest')!;
const K2 = ALL_PEAKS.find((peak) => peak.name === 'K2')!;
const SHISHAPANGMA = ALL_PEAKS.find((peak) => peak.name === 'Shishapangma')!;

function formatAltitude(value: number) {
  return value.toLocaleString('en-US');
}

export function PeaksLedger() {
  return (
    <section
      id="ledger"
      aria-labelledby="ledger-title"
      className="scroll-mt-28 overflow-hidden rounded-[4px] border border-[#d6d0c2] bg-[#f4f1e8] p-6 text-[#1a1917] shadow-[0_30px_90px_rgba(0,0,0,0.85)] sm:p-10 lg:p-12 transition-all"
      style={{
        boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
      }}
    >
      {/* Masthead */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-[#b85434]" />
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b675b]">
              Project Possible &middot; 2019
            </p>
          </div>

          <h3
            id="ledger-title"
            className="mt-4 max-w-xl font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.05] tracking-[-0.03em] text-[#1a1917]"
          >
            Fourteen summits, one season.
          </h3>

          <p className="mt-3.5 max-w-lg font-body text-xs sm:text-[13px] leading-relaxed text-[#5e5a50]">
            Every 8,000-metre peak on Earth, in the order Nimsdai climbed them.
          </p>
        </div>

        {/* Verification stamp */}
        <div
          aria-label="14 of 14 summits verified"
          className="shrink-0 self-start border border-[#b85434] bg-transparent px-5 py-3.5 text-center sm:text-right"
        >
          <p className="font-serif text-3xl sm:text-[32px] font-normal leading-none tracking-[-0.02em] text-[#b85434] tabular-nums">
            14/14
          </p>
          <p className="mt-1.5 font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-[#b85434]">
            Summits Verified
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.04em] text-[#7d7768]">
            23 Apr — 29 Oct 2019
          </p>
        </div>
      </header>

      <div className="mt-8 border-t border-[#d8d2c4] sm:mt-10" />

      {/* Record + phase ledger */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: the record and the sequence chart */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b675b]">
              The Record
            </p>

            <p className="mt-2.5 font-serif text-4xl sm:text-[44px] font-normal leading-[1.02] tracking-[-0.03em] text-[#1a1917]">
              6 months
              <br />
              6 days
            </p>

            <p className="mt-3.5 max-w-[34ch] font-body text-xs sm:text-[13px] leading-relaxed text-[#5e5a50]">
              All 14 eight-thousanders, climbed between 23 April and 29 October 2019.
              The previous record stood for seven years and eleven months.
            </p>
          </div>

          <div className="mt-8">
            <div className="border border-[#d6d0c2] bg-[#eae6dc]/80 p-4 rounded-[2px]">
              <div className="flex items-baseline justify-between gap-2 border-b border-[#d6d0c2]/70 pb-2">
                <p className="font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-[#6b675b]">
                  Summit Sequence
                </p>
                <p className="font-mono text-[9px] text-[#7d7768]">2019</p>
              </div>

              <svg
                role="img"
                aria-labelledby="ledger-chart-title ledger-chart-desc"
                viewBox={`0 0 ${CHART.width} ${CHART.height}`}
                className="mt-3 w-full"
              >
                <title id="ledger-chart-title">Summit sequence by date and elevation</title>
                <desc id="ledger-chart-desc">
                  Fourteen summit points between 23 April and 29 October 2019, ranging
                  from 8,027 metres on Shishapangma to 8,848 metres on Everest.
                </desc>

                {/* Grid */}
                {[8000, 8400, 8800].map((altitude) => (
                  <g key={altitude}>
                    <line
                      x1={CHART.left}
                      x2={CHART.right}
                      y1={chartY(altitude)}
                      y2={chartY(altitude)}
                      stroke="#d0c9ba"
                      strokeWidth="0.75"
                      strokeDasharray="2 2"
                    />
                    <text
                      x={CHART.left - 6}
                      y={chartY(altitude) + 3}
                      textAnchor="end"
                      fill="#7d7768"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      {formatAltitude(altitude)}
                    </text>
                  </g>
                ))}

                {/* Elevation profile fill */}
                <path d={areaPath} fill="#dfd9cd" opacity="0.85" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#2c2a25"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* Summit points */}
                {ALL_PEAKS.map((peak) => (
                  <circle
                    key={`${peak.name}-${peak.day}`}
                    cx={chartX(peak.day)}
                    cy={chartY(peak.altitude)}
                    r="2.2"
                    fill="#f4f1e8"
                    stroke="#2c2a25"
                    strokeWidth="1.2"
                  >
                    <title>
                      {peak.name}, {formatAltitude(peak.altitude)} metres
                    </title>
                  </circle>
                ))}

                {/* Named peaks with terracotta highlight */}
                <circle
                  cx={chartX(EVEREST.day)}
                  cy={chartY(EVEREST.altitude)}
                  r="3.5"
                  fill="#b85434"
                />
                <text
                  x={chartX(EVEREST.day) + 5}
                  y={chartY(EVEREST.altitude) - 5}
                  fill="#1a1917"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  Everest 8,848
                </text>

                <circle cx={chartX(K2.day)} cy={chartY(K2.altitude)} r="3.5" fill="#b85434" />
                <text
                  x={chartX(K2.day) + 5}
                  y={chartY(K2.altitude) - 5}
                  fill="#1a1917"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="600"
                >
                  K2 8,611
                </text>

                <circle
                  cx={chartX(SHISHAPANGMA.day)}
                  cy={chartY(SHISHAPANGMA.altitude)}
                  r="3.5"
                  fill="#b85434"
                />

                {/* Time axis */}
                <text
                  x={CHART.left}
                  y={CHART.bottom + 16}
                  fill="#7d7768"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  23 APR
                </text>
                <text
                  x={chartX(71)}
                  y={CHART.bottom + 16}
                  textAnchor="middle"
                  fill="#7d7768"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  JUL
                </text>
                <text
                  x={CHART.right}
                  y={CHART.bottom + 16}
                  textAnchor="end"
                  fill="#7d7768"
                  fontSize="9"
                  fontFamily="JetBrains Mono, monospace"
                >
                  29 OCT
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right: three phases */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {PHASES.map((phase, index) => (
              <div
                key={phase.region}
                className={[
                  'flex flex-col',
                  index > 0
                    ? 'border-t border-[#d8d2c4] pt-7 md:border-l md:border-t-0 md:pl-6 md:pt-0'
                    : '',
                ]
                  .join(' ')
                  .trim()}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-sm italic font-normal text-[#b85434]">
                    {phase.numeral}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#1a1917] tracking-tight">
                    {phase.region}
                  </h4>
                </div>

                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.05em] text-[#6b675b]">
                  {phase.dates}
                </p>

                <table className="mt-4 w-full border-collapse">
                  <caption className="sr-only">
                    {phase.region} phase: {phase.peaks.length} summits
                  </caption>
                  <tbody>
                    {phase.peaks.map((peak) => (
                      <tr
                        key={peak.name}
                        className="border-b border-[#1a1917]/10 last:border-b-0 hover:bg-[#eae6dc]/40 transition-colors"
                      >
                        <th
                          scope="row"
                          className="py-2.5 pr-3 text-left font-serif text-[13px] font-normal leading-tight text-[#1a1917]"
                        >
                          {peak.name}
                        </th>
                        <td className="py-2.5 text-right align-baseline font-mono text-[10px] tabular-nums tracking-tight text-[#5e5a50]">
                          {formatAltitude(peak.altitude)} m
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {phase.closing && (
                  <div className="mt-5 border-t border-[#b85434]/30 pt-3">
                    <p className="font-heading text-[9px] font-bold uppercase tracking-[0.16em] text-[#b85434]">
                      Record Completed
                    </p>
                    <p className="mt-1 font-serif text-sm font-normal text-[#1a1917]">
                      Shishapangma
                      <br />
                      <span className="text-xs text-[#5e5a50]">29 October 2019</span>
                    </p>
                  </div>
                )}

                <div className="mt-auto flex items-baseline justify-between border-t border-[#1a1917]/10 pt-3.5">
                  <span className="font-heading text-[9px] font-bold uppercase tracking-[0.14em] text-[#6b675b]">
                    {phase.peaks.length} Summits
                  </span>
                  <span className="font-mono text-[10px] text-[#7d7768] tabular-nums">
                    {phase.days} Days
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ledger total */}
          <div className="mt-8 border-t border-[#1a1917]/15 pt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="shrink-0 font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-[#6b675b]">
                Season Total
              </p>
              <span
                aria-hidden="true"
                className="hidden flex-1 border-b border-dotted border-[#1a1917]/30 sm:block"
              />
              <div className="flex items-baseline gap-5 sm:shrink-0 sm:gap-8">
                <p className="whitespace-nowrap font-serif text-sm sm:text-base font-normal text-[#1a1917]">
                  <strong className="font-serif font-bold text-base sm:text-lg">14</strong> summits
                </p>
                <p className="whitespace-nowrap font-serif text-sm sm:text-base font-normal text-[#1a1917]">
                  <strong className="font-serif font-bold text-base sm:text-lg">189</strong> days
                </p>
                <p className="whitespace-nowrap font-serif text-sm sm:text-base font-normal text-[#1a1917]">
                  <strong className="font-serif font-bold text-base sm:text-lg">0</strong> failures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colophon */}
      <footer className="mt-8 flex flex-col gap-2 border-t border-[#d8d2c4] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="font-body text-[11px] text-[#6b675b]">
          Source: Project Possible expedition records. Elevations in metres.
        </p>
        <a
          href="https://www.nimsdai.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.14em] text-[#1a1917] transition-colors hover:text-[#b85434]"
        >
          <span>Full Expedition Archive</span>
          <span
            aria-hidden="true"
            className="text-xs transition-transform group-hover:translate-x-0.5"
          >
            &#8599;
          </span>
        </a>
      </footer>
    </section>
  );
}
