# Global Typography & Aesthetic Rules for Nimsdai

## 1. Font Families
- **Headlines & Display Titles**: Use `Plus Jakarta Sans` or `Inter` (`font-display` / `font-heading`).
- **Body & Editorial Copy**: Use `Inter` (`font-body`) with relaxed, legible line-height.
- **Eyebrows & Section Markers**: Use `Inter` (`font-body text-xs font-semibold uppercase tracking-wider text-neutral-400`).
- **STRICTLY PROHIBITED**:
  - Never use `font-mono` on section kickers, eyebrows, subtitles, card headers, or badges.
  - Never use squished or condensed fonts (such as `Inter Tight`).

## 2. Prohibition of Eyebrow Dots & AI Slop Chrome
- **NO DECORATIVE DOTS**: Never place indicator dots (`•`, `&bull;`, `<span className="w-1.5 h-1.5 rounded-full ..."/>`, pulse dots) next to section titles, eyebrow kickers, or category labels.
  - *Prohibited*: `• 01 / BIOGRAPHY & HERITAGE`, `• Signature Expedition Milestones`, `• Phase 1: Nepal`.
  - *Required*: Clean, elegant editorial text: `01 — Biography & Heritage`, `Signature Expedition Milestones`, `Phase 1 in Nepal`.
- **NO Faux-Terminal Slashes**: Use clean typographic em-dashes (`&mdash;` / `—`) or mid-dots (`&middot;` / `·`), never terminal-style slashes (`/`) or code-like separators.

## 3. Capitalization & Heading Hierarchy
- All prominent section headlines, subheadings, and milestone cards **MUST use Title Case**:
  - Correct: `14 Summits in 189 Days`, `From Soldier to Mountaineering Pioneer`, `Signature Expedition Milestones`, `Complete 14 Peaks Operational Ledger`, `First Winter Ascent of K2`.
  - Prohibited: Never use lowercase sentence-case for primary headings (e.g. `14 summits in 189 days` is banned).

## 4. Metrics, Numbers & Unit Spacing
- Telemetry values and their unit labels **MUST NEVER wrap onto a separate line**:
  - Always bind the number and unit using `whitespace-nowrap flex items-baseline gap-1.5`.
  - Example: `115,557 m` must stay united on a single line; `m` must never break onto its own row.
  - Scale the unit proportionally (number: `text-2xl sm:text-3xl font-extrabold text-white`, unit: `text-base sm:text-lg font-medium text-neutral-400`).
  - Use `@number-flow/react` for all animated numerical counters with in-view viewport triggers.

## 5. Pure High-End Editorial Palette (No Neon)
- All text, badges, borders, and icons must adhere to an editorial monochrome / titanium palette:
  - Primary text: `text-white`
  - Secondary editorial: `text-neutral-300`
  - Captions, metadata, unit labels: `text-neutral-400`
  - Eyebrows & subtle metadata: `text-neutral-500`
  - Cards & panels: `bg-[#090c12] border-white/[0.08]`
- **STRICTLY PROHIBITED**:
  - Never use neon colors (`sky-400`, `cyan-400`, `emerald-400`, `amber-400`, `#38bdf8`, neon lasers, glowing circular rings).
  - Never use decorative 3D rotating globes or AI gimmick elements.

## 6. Letter Spacing & Tracking
- Display titles use clean, proportional tracking (`tracking-tight` / `-0.02em`).
- Never apply extreme negative tracking (like `-0.035em`) that squishes or overlaps letterforms.
- Eyebrows use subtle uppercase tracking (`tracking-wider` / `0.05em`) with standard `font-body`.
