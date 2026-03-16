// Central design tokens for all passport-specific visuals.
// Change any value here — it propagates to every component that imports passportTheme.
//
// Runtime theming: applyDesign() in src/utils/applyDesign.ts overrides the CSS custom
// properties below at page load when the API returns a design object. The tokens here
// (hsl(var(--...))) will therefore automatically reflect the operator's brand.

export const passportTheme = {
  // ── Chart color palettes ──────────────────────────────────
  lifecycleColors: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ],
  recycledContentColors: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
  ],
  lineColors: {
    capacityFade: "hsl(var(--chart-1))",
    powerFade:    "hsl(var(--chart-2))",
    rteFade:      "hsl(var(--chart-3))",
    soc:          "hsl(var(--chart-1))",
    cycles:       "hsl(var(--chart-4))",
  },

  // ── JSON viewer syntax colours ────────────────────────────
  jsonSyntax: {
    whitespace:  "text-neutral-500",
    key:         "text-sky-400",
    string:      "text-emerald-400",
    boolean:     "text-amber-400",
    null:        "text-rose-400",
    number:      "text-violet-400",
    punctuation: "text-neutral-500",
    codeBg:      "bg-neutral-950",
  },

  // ── Chart geometry ────────────────────────────────────────
  pieChart: {
    innerRadius: 70,
    outerRadius: 110,
    paddingAngle: 3,
  },
  smallPieChart: {
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 2,
  },
  barChart: {
    radius: [4, 4, 0, 0] as [number, number, number, number],
  },
  lineChart: {
    strokeWidth: 2,
    dotRadius: 3,
  },

  // ── Chart container heights ───────────────────────────────
  chartHeight: {
    bar:      "h-[220px]",
    smallPie: "h-[280px]",
    largePie: "h-[320px]",
  },

  // ── Chart axis configuration ──────────────────────────────
  chartAxis: {
    tickFontSize:  10,
    labelFontSize: 12,
    barXAngle:     -15,
    barXHeight:    60,
  },

  // ── Gauge SVG configuration ───────────────────────────────
  gauge: {
    containerClass: "relative h-24 w-24",
    strokeWidth:    8,
    cx:             50,
    cy:             50,
    r:              42,
    circumference:  264,
  },

  // ── Shared chart styling ──────────────────────────────────
  gridStroke:  "hsl(var(--border))",
  primaryFill: "hsl(var(--primary))",

  // ── Typography ────────────────────────────────────────────
  typography: {
    sectionLabel: "text-xs uppercase tracking-wide text-muted-foreground",
    fieldLabel:   "text-sm text-muted-foreground",
    fieldValue:   "text-sm font-medium",
    metaText:     "text-xs text-muted-foreground",
    bodyText:     "text-sm whitespace-pre-line",
    monoId:       "font-mono text-xs",
    statValue:    "text-lg font-bold",
    statValueLg:  "text-3xl font-bold",
    cardTitle:    "text-base",
  },
} as const;
