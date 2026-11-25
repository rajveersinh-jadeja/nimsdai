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
    dates: '23 Apr — 24 May 2019',
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
    dates: '3 Jul — 26 Jul 2019',
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
    dates: '23 Sep — 29 Oct 2019',
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
  width: 360,
  height: 190,
  left: 34,
  right: 348,
  top: 16,
  bottom: 158,
  minAltitude: 7950,
  maxAltitude: 8900,
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
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090c12] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.65)] sm:p-9 lg:p-11"
    >
      {/* Masthead */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-px w-5 bg-neutral-400" />
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Project Possible &middot; 2019
            </p>
          </div>

          <h3
            id="ledger-title"
            className="mt-3 max-w-xl font-display text-3xl sm:text-4xl lg:text-[42px] font-bold leading-[1.08] tracking-tight text-white"
          >
            Fourteen Summits, One Season
          </h3>

          <p className="mt-3 max-w-lg font-body text-xs sm:text-sm leading-relaxed text-neutral-300">
            Every 8,000-metre peak on Earth, logged in the chronological order Nimsdai climbed them.
          </p>
        </div>

        {/* Verification stamp */}
        <div
          aria-label="14 of 14 summits verified"
          className="shrink-0 self-start rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:text-right"
        >
          <p className="font-display text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-white tabular-nums">
            14 / 14
          </p>
          <p className="mt-1.5 font-body text-[10px] font-semibold uppercase tracking-wider text-neutral-300">
            Summits Verified
          </p>
          <p className="mt-1 font-body text-[10px] text-neutral-400">
            23 Apr &mdash; 29 Oct 2019
          </p>
        </div>
      </header>

      <div className="mt-8 border-t border-white/[0.08]" />

      {/* Record + phase ledger */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: the record and the sequence chart */}
        <div className="lg:col-span-4">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:items-start md:gap-8 lg:block">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                The Record
              </p>

              <p className="mt-2.5 font-display text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-tight text-white">
                6 Months
                <br />
                6 Days
              </p>

              <p className="mt-3 max-w-[32ch] font-body text-xs sm:text-sm leading-relaxed text-neutral-400">
                All 14 eight-thousanders, climbed between 23 April and 29 October 2019.
                The previous record stood for seven years and eleven months.
              </p>
            </div>

            <div className="mt-6 md:mt-0 lg:mt-6">
              <div className="rounded-xl border border-white/[0.08] bg-[#0c1018] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                    Summit Sequence
                  </p>
                  <p className="font-body text-[10px] text-neutral-400">2019</p>
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
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="0.8"
                      />
                      <text
                        x={CHART.left - 6}
                        y={chartY(altitude) + 2.5}
                        textAnchor="end"
                        fill="#71717a"
                        fontSize="9"
                        className="font-body"
                      >
                        {formatAltitude(altitude)}
                      </text>
                    </g>
                  ))}

                  {/* Elevation profile fill */}
                  <path d={areaPath} fill="rgba(255, 255, 255, 0.04)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />

                  {/* Summit points */}
                  {ALL_PEAKS.map((peak) => (
                    <circle
                      key={`${peak.name}-${peak.day}`}
                      cx={chartX(peak.day)}
                      cy={chartY(peak.altitude)}
                      r="2.5"
                      fill="#090c12"
                      stroke="#ffffff"
                      strokeWidth="1.2"
                    >
                      <title>
                        {peak.name}, {formatAltitude(peak.altitude)} metres
                      </title>
                    </circle>
                  ))}

                  {/* Named peaks */}
                  <circle
                    cx={chartX(EVEREST.day)}
                    cy={chartY(EVEREST.altitude)}
                    r="3.5"
                    fill="#ffffff"
                  />
                  <text
                    x={chartX(EVEREST.day) + 6}
                    y={chartY(EVEREST.altitude) - 5}
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="600"
                    className="font-body"
                  >
                    Everest 8,848
                  </text>

                  <circle cx={chartX(K2.day)} cy={chartY(K2.altitude)} r="3.5" fill="#ffffff" />
                  <text
                    x={chartX(K2.day) + 6}
                    y={chartY(K2.altitude) - 5}
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="600"
                    className="font-body"
                  >
                    K2 8,611
                  </text>

                  <circle
                    cx={chartX(SHISHAPANGMA.day)}
                    cy={chartY(SHISHAPANGMA.altitude)}
                    r="3.5"
                    fill="#ffffff"
                  />

                  {/* Time axis */}
                  <text
                    x={CHART.left}
                    y={CHART.bottom + 16}
                    fill="#71717a"
                    fontSize="9"
                    className="font-body"
                  >
                    23 APR
                  </text>
                  <text
                    x={chartX(69)}
                    y={CHART.bottom + 16}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="9"
                    className="font-body"
                  >
                    JUL
                  </text>
                  <text
                    x={CHART.right}
                    y={CHART.bottom + 16}
                    textAnchor="end"
                    fill="#71717a"
                    fontSize="9"
                    className="font-body"
                  >
                    29 OCT
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right: three phases */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            {PHASES.map((phase, index) => (
              <div
                key={phase.region}
                className={[
                  'flex flex-col',
                  index > 0
                    ? 'border-t border-white/[0.08] pt-7 md:border-l md:border-t-0 md:pl-6 md:pt-0'
                    : '',
                ]
                  .join(' ')
                  .trim()}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-xs font-semibold text-neutral-400">
                    Phase {phase.numeral}
                  </span>
                  <span className="text-neutral-600">&middot;</span>
                  <h4 className="font-display text-base font-bold text-white tracking-tight">
                    {phase.region}
                  </h4>
                </div>

                <p className="mt-1.5 font-body text-xs text-neutral-400">
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
                        className="border-b border-white/[0.06] last:border-b-0"
                      >
                        <th
                          scope="row"
                          className="py-2.5 pr-3 text-left font-body text-xs font-normal text-neutral-200"
                        >
                          {peak.name}
                        </th>
                        <td className="py-2.5 text-right align-baseline font-body text-xs font-medium tabular-nums text-neutral-400">
                          {formatAltitude(peak.altitude)} m
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {phase.closing && (
                  <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                      Record Completed
                    </p>
                    <p className="mt-1 font-display text-xs font-bold text-white">
                      Shishapangma &mdash; 29 October 2019
                    </p>
                  </div>
                )}

                <div className="mt-auto flex items-baseline justify-between border-t border-white/[0.08] pt-3">
                  <span className="font-body text-xs text-neutral-400">
                    {phase.peaks.length} Summits
                  </span>
                  <span className="font-body text-xs font-medium text-neutral-300 tabular-nums">
                    {phase.days} Days
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Ledger total */}
          <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#0c1018] p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-4">
              <p className="shrink-0 font-body text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Season Total
              </p>
              <span
                aria-hidden="true"
                className="hidden flex-1 border-b border-dotted border-white/10 sm:block"
              />
              <div className="flex items-baseline gap-4 sm:shrink-0 sm:gap-8">
                <p className="whitespace-nowrap font-display text-sm sm:text-base font-bold text-white">
                  14 Summits
                </p>
                <p className="whitespace-nowrap font-display text-sm sm:text-base font-bold text-white">
                  189 Days
                </p>
                <p className="whitespace-nowrap font-display text-sm sm:text-base font-bold text-neutral-300">
                  0 Casualties
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colophon */}
      <footer className="mt-8 flex flex-col gap-2 border-t border-white/[0.08] pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="font-body text-xs text-neutral-400">
          Source: Project Possible expedition records. Elevations in metres.
        </p>
        <a
          href="https://www.nimsdai.com"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-white"
        >
          <span>Full Expedition Archive</span>
          <span
            aria-hidden="true"
            className="text-xs transition-transform group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        </a>
      </footer>
    </section>
  );
}
