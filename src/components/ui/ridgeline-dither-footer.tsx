"use client"

// Ridgeline Dither Footer — Full-Width Edition for NIMSDAl (Nirmal Purja MBE).
// A quiet, airy site footer that sits over a range of mountains printed in ordered dither.
// Six ridges, each generated from ridged noise, recede into valley mist that drifts slowly
// across them, and the whole range dissolves upward into the paper behind the copyright line.
//
// Celebrates Nimsdai's historic 14 Peaks Project Possible achievement:
// Hovering or tapping across the edge-to-edge mountain range identifies the corresponding 8,000m peak,
// with interactive pointer parallax, drifting mist clearing, and click gust physics.

import * as React from "react"
import { Mountains } from "@phosphor-icons/react"

export interface RidgelinePalette {
  /** The footer background, and the colour the mist dissolves into. */
  paper: string
  /** Body text and the logo. */
  ink: string
  /** Headings, tagline and the copyright line. */
  muted: string
  /** Hairlines. */
  line: string
  /** Accent highlight (e.g. Expedition Yellow). */
  accent: string
  /** Dither tones from mist to deepest ridge. The first should be the paper. */
  tones: string[]
}

export type RidgelineTheme = "nimsdai" | "night" | "glacier" | "evergreen" | "dusk" | "sepia"

export type RidgelinePreset = "auto" | RidgelineTheme

export interface RidgelineLink {
  label: string
  href?: string
  /** A small pill after the label, e.g. "14/14" or "Historic". */
  badge?: string
}

export interface RidgelineColumn {
  title: string
  links: RidgelineLink[]
}

export type RidgelineSocialIcon = "x" | "instagram" | "linkedin" | "github" | "youtube"

export interface RidgelineSocial {
  icon: RidgelineSocialIcon
  href?: string
  /** Accessible name. Defaults to the network's name. */
  label?: string
}

/** The official 14 eight-thousander peaks conquered by Nimsdai Purja MBE */
export const FOURTEEN_PEAKS = [
  "Everest",
  "K2",
  "Kangchenjunga",
  "Lhotse",
  "Makalu",
  "Cho Oyu",
  "Dhaulagiri I",
  "Manaslu",
  "Nanga Parbat",
  "Annapurna I",
  "Gasherbrum I",
  "Broad Peak",
  "Gasherbrum II",
  "Shishapangma",
] as const

export interface RidgelineDitherFooterProps {
  /** Brand name beside the mark. Defaults to "NIMSDAl". */
  name?: string
  /** Subtitle beside the brand name. Defaults to "NIRMAL PURJA MBE". */
  subtitle?: string
  /** Where the brand links to. */
  brandHref?: string
  /** Replace the built-in ridge mark. */
  logo?: React.ReactNode
  /** The line under the brand. */
  tagline?: string
  /** Link columns. */
  columns?: RidgelineColumn[]
  /** Social icons under the tagline. */
  socials?: RidgelineSocial[]
  /** Bottom-left line. */
  copyright?: string
  /** Expedition Archive badge on the right. Pass null to hide it. */
  credit?: { label: string; href?: string } | null
  /** Colours. "auto" follows site dark theme, defaulting to Nimsdai expedition theme. */
  preset?: RidgelinePreset
  /** Colour overrides, merged over the preset. */
  palette?: { paper?: string; ink?: string; muted?: string; line?: string; accent?: string; tones?: string[] }
  /** Which range to generate. Any integer. */
  seed?: number
  /** How many ridges recede into the mist, 2–9. Defaults to 6. */
  ridges?: number
  /** Size of one dither pixel in CSS px. Defaults to 2. */
  pixel?: number
  /** How thick the drifting mist is, 0–1. Defaults to 0.8. */
  mist?: number
  /** Speed the mist drifts at. 0 holds it still. Defaults to 1. */
  drift?: number
  /** Radius, in CSS px, of the clearing the pointer makes. Defaults to 140. */
  radius?: number
  /** Pointer parallax, mist clearing and the click gust. Defaults to true. */
  interactive?: boolean
  /** Enable interactive 14 Peaks identification tooltip on hover and tap. Defaults to true. */
  peakIdentification?: boolean
  /** List of 14 peak names. */
  peaks?: readonly string[]
  /** Face for the body type. */
  fontFamily?: string
  /** Face for the headings and the altimeter. */
  monoFamily?: string
  /** Root height. A definite length. */
  height?: string
  /** The least height the range itself gets. Defaults to "300px". */
  sceneMinHeight?: string
  /** Extra root class names. */
  className?: string
}

const PRESETS: RidgelinePresetMap = {
  nimsdai: {
    paper: "#05070c",
    ink: "#ffffff",
    muted: "#94a3b8",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#ffffff",
    tones: [
      "#05070c",
      "#090e15",
      "#101722",
      "#182230",
      "#233044",
      "#32445f",
      "#486186",
      "#698cb9",
    ],
  },
  night: {
    paper: "#05070c",
    ink: "#ffffff",
    muted: "#94a3b8",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#ffffff",
    tones: ["#05070c", "#0c1c14", "#123224", "#1a4b33", "#256a48", "#3a8c63", "#62b388"],
  },
  glacier: {
    paper: "#05070c",
    ink: "#ffffff",
    muted: "#94a3b8",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#38bdf8",
    tones: ["#05070c", "#0a192a", "#122c49", "#1d436e", "#30649c", "#4c8dc7", "#76b7ec"],
  },
  evergreen: {
    paper: "#07120c",
    ink: "#ffffff",
    muted: "#869b8f",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#34d399",
    tones: ["#07120c", "#0e2016", "#163324", "#214b35", "#306c4d", "#45956c", "#68c392"],
  },
  dusk: {
    paper: "#0d0812",
    ink: "#ffffff",
    muted: "#9c8aa0",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#f472b6",
    tones: ["#0d0812", "#190e24", "#28153a", "#3e1e59", "#5e2b85", "#853ebc", "#b066ed"],
  },
  sepia: {
    paper: "#120c07",
    ink: "#ffffff",
    muted: "#9c8c7c",
    line: "rgba(255, 255, 255, 0.08)",
    accent: "#fb923c",
    tones: ["#120c07", "#21150c", "#341f11", "#4f2d18", "#724021", "#9d582c", "#cc783f"],
  },
}

const DEFAULT_NIMSDAL_COLUMNS: RidgelineColumn[] = [
  {
    title: "14 Peaks Record",
    links: [
      { label: "Annapurna I to Shishapangma", href: "#peaks", badge: "14/14" },
      { label: "6 Months & 6 Days", href: "#peaks" },
      { label: "Historic K2 Winter Summit", href: "#k2", badge: "First" },
      { label: "Project Possible Documentary", href: "https://www.netflix.com/title/81464765" },
    ],
  },
  {
    title: "Expeditions & Heritage",
    links: [
      { label: "Our Story & Military Service", href: "#story" },
      { label: "Gurkha & UK SBS Brotherhood", href: "#story" },
      { label: "Elite Exped Commercial Ascents", href: "https://www.eliteexped.com" },
      { label: "Beyond Possible Memoir", href: "#story" },
    ],
  },
  {
    title: "Foundation & Contact",
    links: [
      { label: "Nimsdai Foundation", href: "https://www.nimsdaifoundation.org", badge: "Impact" },
      { label: "Big Mountain Cleanup", href: "#foundation" },
      { label: "Official Archive Verification", href: "https://www.nimsdai.com" },
      { label: "Expedition Inquiries", href: "#inquiries" },
    ],
  },
]

const DEFAULT_NIMSDAL_SOCIALS: RidgelineSocial[] = [
  { icon: "instagram", href: "https://instagram.com/nimsdai", label: "Instagram @nimsdai" },
  { icon: "x", href: "https://x.com/nimsdai", label: "X @nimsdai" },
  { icon: "youtube", href: "https://youtube.com/@nimsdai", label: "YouTube @nimsdai" },
  { icon: "linkedin", href: "https://linkedin.com/in/nimsdai", label: "LinkedIn Nirmal Purja MBE" },
]

const SOCIAL_NAMES: RidgelineSocialNameMap = {
  x: "X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  github: "GitHub",
  youtube: "YouTube",
}

const SANS_STACK = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif'
const MONO_STACK = '"JetBrains Mono", "Geist Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace'

// #region ridge pure math helpers

/** Hex → [r, g, b] in 0–255, or null for anything that isn't #rgb / #rrggbb. */
export function rdfHex(hex: string) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || "").trim())
  if (!m) return null
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

/** [r, g, b] → one opaque pixel for a little-endian Uint32 view of ImageData. */
export function rdfPack(rgb: number[]) {
  return ((255 << 24) | (rgb[2] << 16) | (rgb[1] << 8) | rgb[0]) >>> 0
}

/** The classic 8×8 Bayer matrix, as thresholds in (0, 1). */
export const RDF_BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64)

/** Palette index for a tone in [0, 1] across `n` colours at Bayer threshold `b`. */
export function rdfDither(tone: number, n: number, b: number) {
  const t = tone < 0 ? 0 : tone > 1 ? 1 : tone
  const v = Math.floor(t * (n - 1) + b)
  return v > n - 1 ? n - 1 : v
}

/** Integer lattice hash → [0, 1). */
export function rdfHash(x: number, y: number, seed: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(seed | 0, 1442695041)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  h ^= h >>> 16
  return (h >>> 0) / 4294967296
}

/** Smooth value noise in [0, 1). */
export function rdfNoise(x: number, y: number, seed: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = rdfHash(xi, yi, seed)
  const b = rdfHash(xi + 1, yi, seed)
  const c = rdfHash(xi, yi + 1, seed)
  const d = rdfHash(xi + 1, yi + 1, seed)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}

/** Fractal value noise, normalised back into [0, 1). */
export function rdfFbm(x: number, y: number, seed: number, octaves: number) {
  let sum = 0
  let amp = 0.5
  let norm = 0
  for (let o = 0; o < octaves; o++) {
    sum += rdfNoise(x, y, seed + o * 31) * amp
    norm += amp
    x *= 2.03
    y *= 2.03
    amp *= 0.5
  }
  return norm > 0 ? sum / norm : 0
}

/** Hermite step from e0 to e1, clamped. */
export function rdfSmooth(e0: number, e1: number, x: number) {
  const t = e1 === e0 ? (x < e0 ? 0 : 1) : Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

/** Ease-out cubic over a progress that may run outside [0, 1]. */
export function rdfEase(t: number) {
  const c = t < 0 ? 0 : t > 1 ? 1 : t
  return 1 - Math.pow(1 - c, 3)
}

/**
 * Crest row of ridge `i` of `layers` (0 is the farthest) for every column of
 * a `cols` × `rows` grid, plus `margin` columns either side for parallax.
 */
export function rdfRidgeline(cols: number, rows: number, i: number, layers: number, seed: number, margin: number) {
  const k = layers > 1 ? i / (layers - 1) : 1
  const n = cols + margin * 2
  const out = new Float32Array(n)
  const base = rows * (0.38 + 0.66 * Math.pow(k, 1.4))
  const amp = rows * (0.2 + 0.24 * k)
  const freq = 6 - 3.8 * k
  const flankL = rows * 0.5 * k * k * k * (0.55 + 0.6 * rdfHash(i, 11, seed))
  const flankR = rows * 0.5 * k * k * k * (0.55 + 0.6 * rdfHash(i, 13, seed))
  const ceil = rows * 0.17
  const tilt = (rdfHash(i, 7, seed) - 0.5) * rows * 0.34 * (0.4 + k)
  const s = (seed | 0) * 13 + i * 101
  for (let x = 0; x < n; x++) {
    const u = (x - margin) / cols
    const r1 = 1 - Math.abs(rdfNoise(u * freq + i * 3.7, 0.5, s) * 2 - 1)
    const r2 = 1 - Math.abs(rdfNoise(u * freq * 2.3, 3.5, s + 1) * 2 - 1)
    const f = rdfFbm(u * freq * 4.1, 9.5, s + 2, 3)
    const h = r1 * r1 * 0.62 + r2 * 0.24 + f * 0.14
    const e = Math.min(1.2, Math.abs(u * 2 - 1))
    const y = base - h * amp + tilt * (u - 0.5) * 2 - (u < 0.5 ? flankL : flankR) * e * e * Math.sqrt(e)
    out[x] = y < ceil ? ceil - (ceil - y) * 0.25 : y
  }
  return out
}
// #endregion

const RDF_CSS = `
.rdf-root {
  position: relative; display: grid; width: 100%; overflow: hidden; isolation: isolate;
  background: var(--rdf-paper); color: var(--rdf-ink); font-family: var(--rdf-sans);
  -webkit-font-smoothing: antialiased;
  border-top: 1px solid var(--rdf-line);
  --rdf-pad: clamp(24px, 5.2vw, 68px);
}
.rdf-frame {
  position: relative; display: grid; grid-template-rows: auto auto minmax(var(--rdf-scene-min, 320px), 1fr);
  width: 100%; max-width: 100%; margin: 0; padding: 0; min-height: inherit;
}

.rdf-r {
  opacity: 0; transform: translateY(12px); filter: blur(5px);
  transition: opacity .9s cubic-bezier(.2,.7,.1,1), transform 1s cubic-bezier(.2,.7,.1,1), filter .9s ease;
  transition-delay: calc(var(--d, 0) * 1ms);
}
.rdf-in .rdf-r { opacity: 1; transform: none; filter: none; }

/* Edge-to-edge Top Section */
.rdf-top {
  position: relative; z-index: 2; display: grid; width: 100%;
  grid-template-columns: minmax(0, 1.9fr) repeat(var(--rdf-n), minmax(0, 1fr));
  gap: clamp(28px, 4vw, 56px); padding: clamp(48px, 6.5vw, 84px) var(--rdf-pad) clamp(24px, 3.5vw, 44px);
}
.rdf-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 20px; }
.rdf-logo {
  display: inline-flex; align-items: center; gap: 14px; color: var(--rdf-ink); text-decoration: none;
}
.rdf-brand-icon-box {
  display: grid; place-items: center; width: 40px; height: 40px; border-radius: 11px;
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff; flex-shrink: 0; transition: all .35s cubic-bezier(.2,.7,.1,1);
}
.rdf-logo:hover .rdf-brand-icon-box {
  background: rgba(255, 255, 255, 0.12); border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px); box-shadow: 0 6px 18px rgba(255, 255, 255, 0.1);
}
.rdf-mark { width: 32px; height: 22px; display: block; overflow: visible; flex-shrink: 0; color: #ffffff; }
.rdf-mark rect { fill: var(--rdf-paper); transition: transform .7s cubic-bezier(.2,.7,.1,1); }
.rdf-logo:hover .rdf-mist-a { transform: translateX(5px); }
.rdf-logo:hover .rdf-mist-b { transform: translateX(-6px); }

.rdf-brand-text { display: flex; flex-direction: column; gap: 3px; }
.rdf-brand-name {
  font-size: clamp(24px, 2.5vw, 30px); font-weight: 900; letter-spacing: -.025em; line-height: 1; text-transform: uppercase; color: #ffffff;
}
.rdf-brand-sub {
  font: 700 11px/1.2 var(--rdf-mono); letter-spacing: .24em; text-transform: uppercase; color: #94a3b8;
}
.rdf-tag {
  margin: 0; max-width: 38ch; font-size: 14px; line-height: 1.6; color: var(--rdf-muted); text-wrap: pretty;
}
.rdf-social { display: flex; gap: 8px; margin: 4px 0 0 -6px; padding: 0; list-style: none; }
.rdf-social a {
  display: grid; place-items: center; width: 34px; height: 34px; border-radius: 9px; color: var(--rdf-muted);
  background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all .35s cubic-bezier(.2,.7,.1,1);
}
.rdf-social a:hover {
  color: #ffffff; background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25); transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(255, 255, 255, 0.1);
}
.rdf-social svg { width: 16px; height: 16px; display: block; }

.rdf-col h3 {
  margin: 4px 0 20px; font: 700 11.5px/1 var(--rdf-mono); letter-spacing: .18em; text-transform: uppercase; color: #ffffff;
}
.rdf-col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.rdf-link {
  position: relative; display: inline-flex; align-items: center; gap: 8px;
  color: #cbd5e1; text-decoration: none; font-size: 13.5px; font-weight: 500; line-height: 1.35; letter-spacing: -.005em;
  transition: color .3s ease, transform .45s cubic-bezier(.2,.7,.1,1);
}
.rdf-link::before {
  content: ""; position: absolute; left: -12px; top: 50%; width: 7px; height: 1.5px; background: #ffffff;
  transform: scaleX(0); transform-origin: 0 50%; transition: transform .45s cubic-bezier(.2,.7,.1,1);
}
.rdf-link:hover { color: #ffffff; transform: translateX(7px); }
.rdf-link:hover::before { transform: scaleX(1); }
.rdf-badge {
  font: 700 9px/1 var(--rdf-mono); letter-spacing: .08em; text-transform: uppercase; padding: 3px 7px 2.5px; border-radius: 99px;
  color: #ffffff; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.22);
}
.rdf-link:focus-visible, .rdf-logo:focus-visible, .rdf-social a:focus-visible, .rdf-credit:focus-visible {
  outline: 2px solid #ffffff; outline-offset: 4px; border-radius: 4px;
}

/* Full-width Copyright & Archive Bar */
.rdf-bar {
  position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 16px;
  width: 100%; padding: 0 var(--rdf-pad) 18px; font-size: 12px; color: var(--rdf-muted);
}
.rdf-copyright {
  margin: 0; font: 500 11.5px/1.4 var(--rdf-mono); letter-spacing: .06em; text-transform: uppercase; color: var(--rdf-muted);
}
.rdf-credit {
  display: inline-flex; align-items: center; gap: 7px; color: #cbd5e1;
  text-decoration: none; font: 600 11.5px/1 var(--rdf-mono); letter-spacing: .08em; text-transform: uppercase;
  padding: 6px 12px; border-radius: 99px; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.09);
  transition: all .3s ease;
}
.rdf-credit:hover {
  color: #ffffff; background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}
.rdf-mountain-icon { width: 14px; height: 14px; color: #ffffff; flex-shrink: 0; }

/* Edge-to-edge Procedural Mountain Scene */
.rdf-scene {
  position: relative; z-index: 1; width: 100%; min-height: var(--rdf-scene-min, 320px); margin-top: -64px; overflow: hidden; touch-action: pan-y;
}
.rdf-scene canvas {
  position: absolute; left: 0; bottom: 0; display: block; max-width: none;
  image-rendering: pixelated; image-rendering: crisp-edges;
}

/* Mountain Crest Pin & 14 Peaks Tooltip Badge */
.rdf-alt {
  position: absolute; left: 0; top: 0; z-index: 3; pointer-events: none; opacity: 0;
  transition: opacity .35s ease; font: 700 11.5px/1 var(--rdf-mono); letter-spacing: .08em; color: #ffffff;
}
.rdf-alt i {
  position: absolute; left: -4.5px; top: -4.5px; width: 9px; height: 9px; border-radius: 50%;
  background: #ffffff; box-shadow: 0 0 0 2px var(--rdf-paper), 0 0 12px rgba(255, 255, 255, 0.9);
}
.rdf-alt b {
  position: absolute; left: -.5px; bottom: 6px; width: 1px; height: 26px;
  background: #ffffff; opacity: .85;
}
.rdf-alt span.rdf-alt-pill {
  position: absolute; left: 0; bottom: 34px; transform: translateX(-50%); white-space: nowrap;
  padding: 7px 12px 6px; border-radius: 8px;
  background: rgba(5, 7, 12, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.85), 0 0 16px rgba(255, 255, 255, 0.12);
  -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
  color: #ffffff; display: flex; align-items: center; gap: 7px;
}
.rdf-alt-icon {
  width: 13px; height: 13px; color: #ffffff; flex-shrink: 0;
}
.rdf-alt-num {
  font-size: 10px; color: #94a3b8; font-weight: 600;
}
.rdf-alt-name {
  font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: #ffffff;
}
.rdf-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@media (max-width: 900px) {
  .rdf-top { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); row-gap: 36px; }
  .rdf-brand { grid-column: 1 / -1; }
  .rdf-bar { flex-direction: column; align-items: flex-start; gap: 12px; }
  .rdf-scene { margin-top: -32px; }
}
@media (prefers-reduced-motion: reduce) {
  .rdf-r, .rdf-link, .rdf-link::before, .rdf-social a, .rdf-mark rect { transition: none; }
  .rdf-r { filter: none; }
}
`

export default function RidgelineDitherFooter({
  name = "NIMSDAl",
  subtitle = "NIRMAL PURJA MBE",
  brandHref = "#story",
  logo,
  tagline,
  columns = DEFAULT_NIMSDAL_COLUMNS,
  socials = DEFAULT_NIMSDAL_SOCIALS,
  copyright,
  credit = { label: "14 Peaks Official Archive", href: "https://www.nimsdai.com" },
  preset = "nimsdai",
  palette,
  seed = 14,
  ridges = 6,
  pixel = 2,
  mist = 0.8,
  drift = 1,
  radius = 140,
  interactive = true,
  peakIdentification = true,
  peaks = FOURTEEN_PEAKS,
  fontFamily = SANS_STACK,
  monoFamily = MONO_STACK,
  height = "720px",
  sceneMinHeight = "300px",
  className = "",
}: RidgelineDitherFooterProps) {
  const rootRef = React.useRef(null as HTMLElement | null)
  const sceneRef = React.useRef(null as HTMLDivElement | null)
  const canvasRef = React.useRef(null as HTMLCanvasElement | null)
  const altRef = React.useRef(null as HTMLDivElement | null)
  const altTextRef = React.useRef(null as HTMLSpanElement | null)
  const altNumRef = React.useRef(null as HTMLSpanElement | null)
  const revealAt = React.useRef(null as number | null)
  const [inView, setInView] = React.useState(false)
  const [dark, setDark] = React.useState(true)
  const [activePeakName, setActivePeakName] = React.useState<string>("")

  const base = preset === "auto" ? (dark ? PRESETS.nimsdai : PRESETS.evergreen) : PRESETS[preset] || PRESETS.nimsdai
  const colors = { ...base, ...(palette || {}) }
  const tones = colors.tones && colors.tones.length >= 2 ? colors.tones : base.tones
  const deep = tones[Math.max(1, tones.length - 2)]
  const layers = Math.max(2, Math.min(9, Math.round(ridges)))

  const opts = React.useRef({ mist, drift, radius, interactive, peakIdentification, peaks })
  opts.current = { mist, drift, radius, interactive, peakIdentification, peaks }
  const key = [seed, layers, pixel, tones.join(",")].join("|")

  // Dark class observer
  React.useEffect(() => {
    if (preset !== "auto") return
    const read = () => {
      const root = rootRef.current
      setDark(document.documentElement.classList.contains("dark") || !!(root && root.closest(".dark")))
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [preset])

  // Reveal observer
  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        if (revealAt.current === null) revealAt.current = reduced ? -Infinity : performance.now()
        setInView(true)
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Canvas dither simulation and 14 Peaks identifier loop
  React.useEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    const canvas = canvasRef.current
    if (!root || !scene || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const pal = new Uint32Array(tones.map((t) => rdfPack(rdfHex(t) || [128, 128, 128])))
    const nTones = pal.length

    let p = 2
    let cols = 1
    let rows = 1
    let margin = 2
    let img = null as ImageData | null
    let buf = new Uint32Array(0)
    let tops = [] as Float32Array[]
    let pools = [] as Float32Array[]
    let colTop = new Float32Array(0)
    let colSlope = new Float32Array(0)
    let colPool = new Float32Array(0)
    let fog = new Float32Array(0)
    let fw = 1
    let fh = 1
    let ceil = 0
    let fadeTo = 1

    let raf = 0
    let visible = true
    let awake = true
    let lastDraw = 0
    let lastTick = performance.now()

    let tx = 0
    let ty = 0
    let ex = 0
    let ey = 0
    let inside = false
    let clear = 0
    let pt = 0
    let pe = 0
    let windV = 0
    let windX = 0
    let altShown = false
    let altLabel = ""
    let isTouchActive = false

    const layout = () => {
      const rect = scene.getBoundingClientRect()
      p = Math.max(1, Math.round(pixel))
      const sceneW = rect.width || window.innerWidth || 1200
      const sceneH = Math.max(rect.height || 0, 320)
      cols = Math.max(8, Math.ceil(sceneW / p))
      rows = Math.max(8, Math.ceil(sceneH / p))
      canvas.width = cols
      canvas.height = rows
      canvas.style.width = cols * p + "px"
      canvas.style.height = rows * p + "px"
      img = ctx.createImageData(cols, rows)
      buf = new Uint32Array(img.data.buffer)
      margin = Math.ceil(cols * 0.045) + 3
      ceil = Math.max(rows * 0.17, 92 / p)
      fadeTo = Math.max(rows * 0.3, 128 / p)
      tops = []
      pools = []
      for (let i = 0; i < layers; i++) {
        const t = rdfRidgeline(cols, rows, i, layers, seed, margin)
        for (let x = 0; x < t.length; x++) if (t[x] < ceil) t[x] = ceil - (ceil - t[x]) * 0.2
        const pool = new Float32Array(t.length)
        for (let x = 0; x < t.length; x++) pool[x] = 0.45 + 1.1 * rdfFbm(((x - margin) / cols) * 4, i * 5.3, seed + 9, 2)
        tops.push(t)
        pools.push(pool)
      }
      colTop = new Float32Array(layers * cols)
      colSlope = new Float32Array(layers * cols)
      colPool = new Float32Array(layers * cols)
      fw = (cols >> 1) + 2
      fh = (rows >> 1) + 2
      fog = new Float32Array(fw * fh)
      awake = true
    }

    const draw = (now: number) => {
      if (!img) return
      const o = opts.current
      const dt = Math.min(64, now - lastTick)
      lastTick = now
      const live = o.interactive && !reduced
      const age = revealAt.current === null ? -1 : now - revealAt.current

      const ease = 1 - Math.pow(0.82, dt / 16.7)
      const slow = 1 - Math.pow(0.93, dt / 16.7)
      ex += (tx - ex) * ease
      ey += (ty - ey) * ease
      clear += ((inside && o.interactive ? 1 : 0) - clear) * slow
      pe += ((live ? pt : 0) - pe) * slow
      windV *= Math.pow(0.965, dt / 16.7)
      windX += (windV * dt) / 1000
      const fogT = (reduced ? 0 : (now / 1000) * 0.045 * Math.max(0, o.drift)) + windX

      const sx = 9 / cols
      const sy = 4.4 / rows
      for (let gy = 0; gy < fh; gy++) {
        const ny = gy * sy
        for (let gx = 0; gx < fw; gx++) {
          const nx = gx * sx + fogT
          const warp = rdfNoise(nx * 0.45 - fogT * 0.6, ny * 0.8, 77) * 0.6
          const v = rdfFbm(nx + warp, ny + warp * 0.4, 31, 3)
          fog[gy * fw + gx] = rdfSmooth(0.3, 0.74, v)
        }
      }

      const rev = new Float32Array(layers)
      const k = new Float32Array(layers)
      const toneBase = new Float32Array(layers)
      const fogDepth = new Float32Array(layers)
      for (let i = 0; i < layers; i++) {
        k[i] = i / (layers - 1)
        rev[i] = age < 0 ? 0 : rdfEase((age - 380 - i * 170) / 1300)
        toneBase[i] = 0.16 + 0.76 * Math.pow(k[i], 1.6)
        fogDepth[i] = rows * (0.08 + 0.42 * k[i])
        const rise = (1 - rev[i]) * rows * 0.09
        const shift = Math.round(pe * (0.25 + k[i]) * 0.75 * (margin - 3))
        const t = tops[i]
        const last = t.length - 1
        for (let x = 0; x < cols; x++) {
          const at = x + margin + shift
          colTop[i * cols + x] = t[at] + rise
          colSlope[i * cols + x] = t[Math.min(last, at + 2)] - t[Math.max(0, at - 2)]
          colPool[i * cols + x] = fogDepth[i] * pools[i][at]
        }
      }
      const lift = age < 0 ? 1 : 1 - rdfEase((age - 900) / 1800)
      const mistK = Math.max(0, Math.min(1, o.mist))
      const r = Math.max(1, o.radius / p)
      const r2 = r * r

      for (let y = 0; y < rows; y++) {
        const fade = rdfSmooth(0, fadeTo, y)
        const frow = (y >> 1) * fw
        const by = (y & 7) * 8
        const dyc = (y - ey) * 1.5
        for (let x = 0; x < cols; x++) {
          let L = -1
          for (let i = layers - 1; i >= 0; i--) {
            if (y >= colTop[i * cols + x]) {
              L = i
              break
            }
          }
          let tone = 0
          let mk = 0.3
          if (L >= 0) {
            const kk = k[L]
            const d = y - colTop[L * cols + x]
            const depth = colPool[L * cols + x]
            const crest = 1 - rdfSmooth(0, depth, d) * (0.88 - 0.45 * kk)
            tone = toneBase[L] * crest
            const sl = colSlope[L * cols + x] * 0.06
            tone += (sl < -0.2 ? -0.2 : sl > 0.2 ? 0.2 : sl) * (1 - rdfSmooth(0, depth * 0.5, d))
            tone += (rdfHash(x + Math.round(colTop[L * cols + x] * 7), d | 0, L) - 0.5) * 0.07 * kk
            tone *= rev[L]
            mk = 0.95 - 0.5 * kk
          } else {
            tone = 0.05 * rdfSmooth(rows * 0.15, rows * 0.6, y)
          }

          let m = fog[frow + (x >> 1)] * mistK * mk
          if (clear > 0.01) {
            const dx = x - ex
            const q = (dx * dx + dyc * dyc) / r2
            if (q < 4) {
              const c = clear * Math.exp(-q)
              m *= 1 - c * 0.92
              if (L >= 0) tone += c * 0.16 * rev[L]
            }
          }
          if (tone > 0.93) tone = 0.93
          m += lift * 0.55
          if (m > 1) m = 1
          tone = (tone * (1 - m) + 0.09 * m * (1 - lift)) * fade

          buf[y * cols + x] = pal[rdfDither(tone, nTones, RDF_BAYER[by + (x & 7)])]
        }
      }
      ctx.putImageData(img, 0, 0)

      // 14 Peaks identification: rides the crest of the ridge under the pointer
      const alt = altRef.current
      const label = altTextRef.current
      const numLabel = altNumRef.current
      let show = false
      if (alt && label && o.peakIdentification && inside && age > 1400) {
        const x = Math.max(0, Math.min(cols - 1, Math.round(ex)))
        for (let i = layers - 1; i >= 0; i--) {
          const crest = colTop[i * cols + x]
          if (ey >= crest - 10) {
            show = true
            alt.style.transform = "translate(" + (x * p).toFixed(1) + "px," + (crest * p).toFixed(1) + "px)"

            // Map across the 14 peak sectors
            const peaksList = o.peaks && o.peaks.length > 0 ? o.peaks : FOURTEEN_PEAKS
            const peakIdx = Math.min(peaksList.length - 1, Math.max(0, Math.floor((x / cols) * peaksList.length)))
            const peakText = peaksList[peakIdx]

            if (peakText !== altLabel) {
              altLabel = peakText
              label.textContent = peakText
              if (numLabel) {
                numLabel.textContent = String(peakIdx + 1).padStart(2, "0") + " •"
              }
              setActivePeakName(peakText)
            }
            break
          }
        }
      }
      if (alt && show !== altShown) {
        altShown = show
        alt.style.opacity = show ? "1" : "0"
      }

      const settling =
        Math.abs(tx - ex) + Math.abs(ty - ey) > 0.05 ||
        Math.abs((inside && o.interactive ? 1 : 0) - clear) > 0.005 ||
        Math.abs((live ? pt : 0) - pe) > 0.001 ||
        Math.abs(windV) > 0.002
      awake = (age >= 0 && age < 3400) || age < 0 || settling || (!reduced && o.drift > 0)
    }

    const busy = () => (!reduced && opts.current.drift > 0) || inside || Math.abs(windV) > 0.002 || Math.abs(pt - pe) > 0.001

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      if (revealAt.current === null) {
        draw(now)
        raf = requestAnimationFrame(loop)
        return
      }
      if (busy() || now - lastDraw > 32) {
        draw(now)
        lastDraw = now
      }
      if (awake) raf = requestAnimationFrame(loop)
    }
    const wake = () => {
      awake = true
      if (!raf && visible) raf = requestAnimationFrame(loop)
    }

    const handlePointerCoord = (clientX: number, clientY: number) => {
      const b = root.getBoundingClientRect()
      pt = b.width > 0 ? ((clientX - b.left) / b.width) * 2 - 1 : 0
      const s = scene.getBoundingClientRect()
      const lx = (clientX - s.left) / p
      const ly = (clientY - s.top) / p
      const was = inside
      inside = lx >= 0 && ly >= 0 && lx < cols && ly < rows
      tx = lx
      ty = ly
      if (inside && !was) {
        ex = tx
        ey = ty
      }
      wake()
    }

    const onMove = (e: PointerEv) => {
      const o = opts.current
      if (!o.interactive && !o.peakIdentification) return
      handlePointerCoord(e.clientX, e.clientY)
    }

    const onLeave = () => {
      if (!isTouchActive) {
        pt = 0
        inside = false
        wake()
      }
    }

    const onDown = (e: PointerEv) => {
      if ((e.target as HTMLElement).closest("a,button")) return
      isTouchActive = e.pointerType === "touch"
      handlePointerCoord(e.clientX, e.clientY)
      if (!opts.current.interactive || reduced || !inside) return

      // Gust interaction sweeps the mist sideways
      windV += tx < cols / 2 ? 1.4 : -1.4
      wake()
    }

    layout()
    draw(performance.now())
    wake()

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    root.addEventListener("pointerdown", onDown)

    const ro = new ResizeObserver(() => {
      layout()
      draw(performance.now())
      wake()
    })
    ro.observe(scene)

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true
      if (visible) {
        lastTick = performance.now()
        wake()
      }
    })
    io.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      root.removeEventListener("pointerdown", onDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const year = new Date().getFullYear()
  const line = copyright ?? "© " + year + " " + name + " • NIRMAL PURJA MBE. ALL RIGHTS RESERVED."
  const peakItems = peaks && peaks.length > 0 ? peaks : FOURTEEN_PEAKS

  return (
    <footer
      ref={rootRef}
      className={"rdf-root" + (inView ? " rdf-in" : "") + (className ? " " + className : "")}
      style={
        {
          minHeight: height,
          "--rdf-scene-min": sceneMinHeight,
          "--rdf-paper": colors.paper,
          "--rdf-ink": colors.ink,
          "--rdf-muted": colors.muted,
          "--rdf-line": colors.line,
          "--rdf-accent": colors.accent || "#ffffff",
          "--rdf-deep": deep,
          "--rdf-n": columns.length,
          "--rdf-sans": fontFamily,
          "--rdf-mono": monoFamily,
        } as React.CSSProperties
      }
    >
      <style>{RDF_CSS}</style>
      <div className="rdf-frame">
        {/* Edge-to-edge Top Section */}
        <div className="rdf-top">
          <div className="rdf-brand">
            <a className="rdf-logo rdf-r" style={{ "--d": 140 } as React.CSSProperties} href={brandHref}>
              {logo ?? (
                <div className="rdf-brand-icon-box">
                  <Mountains className="w-5 h-5 text-white" weight="duotone" aria-hidden="true" />
                </div>
              )}
              <div className="rdf-brand-text">
                <span className="rdf-brand-name">{name}</span>
                {subtitle ? <span className="rdf-brand-sub">{subtitle}</span> : null}
              </div>
            </a>
            {tagline !== "" ? (
              <p className="rdf-tag rdf-r" style={{ "--d": 230 } as React.CSSProperties}>
                {tagline ?? "Nepali mountaineer, former Gurkha and UK SBS Special Forces. Conquered all 14 of the world's 8,000m peaks in 6 months and 6 days, followed by the historic first winter ascent of K2."}
              </p>
            ) : null}
            {socials.length ? (
              <ul className="rdf-social">
                {socials.map((s, i) => (
                  <li key={s.icon + i} className="rdf-r" style={{ "--d": 320 + i * 60 } as React.CSSProperties}>
                    <a href={s.href || "#"} target="_blank" rel="noreferrer" aria-label={s.label || SOCIAL_NAMES[s.icon]}>
                      <SocialIcon icon={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {columns.map((col, ci) => (
            <nav className="rdf-col" key={col.title} aria-label={col.title}>
              <h3 className="rdf-r" style={{ "--d": 260 + ci * 110 } as React.CSSProperties}>
                {col.title}
              </h3>
              <ul>
                {col.links.map((l, li) => (
                  <li key={l.label} className="rdf-r" style={{ "--d": 330 + ci * 110 + li * 55 } as React.CSSProperties}>
                    <a className="rdf-link" href={l.href || "#"} target={l.href?.startsWith("http") ? "_blank" : undefined} rel={l.href?.startsWith("http") ? "noreferrer" : undefined}>
                      {l.label}
                      {l.badge ? <span className="rdf-badge">{l.badge}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Full-width Copyright & Archive Bar */}
        <div className="rdf-bar rdf-r" style={{ "--d": 950 } as React.CSSProperties}>
          <p className="rdf-copyright">{line}</p>
          {credit ? (
            <a className="rdf-credit" href={credit.href || "https://www.nimsdai.com"} target="_blank" rel="noreferrer">
              <Mountains className="rdf-mountain-icon" weight="duotone" aria-hidden="true" />
              <span>{credit.label}</span>
            </a>
          ) : null}
        </div>

        {/* Edge-to-edge Procedural Mountain Range Scene */}
        <div ref={sceneRef} className="rdf-scene">
          <canvas ref={canvasRef} aria-hidden="true" />
          {/* Subtle Crest Pin & 14 Peaks Identification Tooltip */}
          <div ref={altRef} className="rdf-alt" aria-hidden="true">
            <b />
            <i />
            <span className="rdf-alt-pill">
              <Mountains className="rdf-alt-icon" weight="duotone" aria-hidden="true" />
              <span ref={altNumRef} className="rdf-alt-num" />
              <span ref={altTextRef} className="rdf-alt-name" />
            </span>
          </div>

          {/* Screen reader accessible list and live announcement */}
          <div className="rdf-sr">
            <h2>The 14 Eight-Thousander Peaks Conquered by Nimsdai Purja MBE</h2>
            <ul aria-label="14 Peaks List">
              {peakItems.map((peak, idx) => (
                <li key={peak}>Peak {idx + 1}: {peak}</li>
              ))}
            </ul>
            <div aria-live="polite" aria-atomic="true">
              {activePeakName ? `Identified peak: ${activePeakName}` : ""}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/** Geometric Mountain Peak Emblem with Snow Summit Cap and animated mist bands */
function NimsdaiPeakMark() {
  return (
    <svg className="rdf-mark" viewBox="0 0 36 24" fill="none" aria-hidden="true">
      {/* Background ridge silhouette */}
      <path d="M3 23 L14 7 L21 16 L26 10 L35 23 Z" fill="currentColor" opacity="0.32" />
      {/* Foreground primary summit */}
      <path d="M7 23 L18 3 L29 23 Z" fill="currentColor" opacity="0.9" />
      {/* Summit Snow Cap */}
      <path d="M18 3 L20.5 8 L15.5 8 Z" fill="#ffffff" />
      {/* Sliding mist hairlines */}
      <rect className="rdf-mist-a" x="1" y="14" width="22" height="1.6" rx="0.8" fill="#05070c" />
      <rect className="rdf-mist-b" x="13" y="18" width="22" height="1.6" rx="0.8" fill="#05070c" />
    </svg>
  )
}

function SocialIcon({ icon }: { icon: RidgelineSocialIcon }) {
  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="3" y="9" width="3.6" height="12" />
        <circle cx="4.8" cy="4.8" r="2.1" />
        <path d="M10 9h3.4v1.7c.6-1 1.9-2 3.9-2 3.3 0 4.3 2.1 4.3 5.3V21h-3.6v-6.2c0-1.5-.3-2.9-2.1-2.9s-2.3 1.3-2.3 2.8V21H10z" />
      </svg>
    )
  }
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.1 10.1 0 0 0 22 12.23C22 6.58 17.52 2 12 2z" />
      </svg>
    )
  }
  if (icon === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 4.9 12 4.9 12 4.9s-6.2 0-7.8.4a2.6 2.6 0 0 0-1.8 1.9C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.9c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.9c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15.1V8.9l5.2 3.1L10 15.1z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.75 3h3.07l-6.71 7.67L22 21h-6.18l-4.84-6.33L5.44 21H2.37l7.18-8.2L2 3h6.33l4.37 5.78L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2z" />
    </svg>
  )
}

type PointerEv = PointerEvent

type RidgelinePresetMap = { [K in RidgelineTheme]: RidgelinePalette }
type RidgelineSocialNameMap = { [K in RidgelineSocialIcon]: string }
