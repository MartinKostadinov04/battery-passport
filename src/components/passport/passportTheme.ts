// Central design tokens for all passport-specific visuals.
// Change colors or chart geometry here — it propagates everywhere.

export const passportTheme = {
  // ── Color palettes ────────────────────────────────────────
  lifecycleColors: [
    "hsl(var(--chart-lifecycle-1))",  // Raw Materials
    "hsl(var(--chart-lifecycle-2))",  // Production
    "hsl(var(--chart-lifecycle-3))",  // Distribution
    "hsl(var(--chart-lifecycle-4))",  // End of Life
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
  // Line chart series colors (fade curves & time series)
  lineColors: {
    capacityFade: "hsl(var(--chart-lifecycle-1))",
    powerFade:    "hsl(var(--chart-lifecycle-2))",
    rteFade:      "hsl(var(--chart-lifecycle-3))",
    soc:          "hsl(var(--chart-lifecycle-1))",
    cycles:       "hsl(var(--chart-lifecycle-4))",
  },

  // ── Chart geometry ────────────────────────────────────────
  // Large donut — Carbon Footprint lifecycle breakdown
  pieChart: {
    innerRadius: 70,
    outerRadius: 110,
    paddingAngle: 3,
  },
  // Small donut — Circularity recycled content
  smallPieChart: {
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 2,
  },
  // Bar & line chart shared settings
  barChart: {
    radius: [4, 4, 0, 0] as [number, number, number, number],
  },
  lineChart: {
    strokeWidth: 2,
    dotRadius: 3,
  },

  // ── Shared chart styling ──────────────────────────────────
  gridStroke:  "hsl(var(--border))",
  primaryFill: "hsl(var(--primary))",
} as const;
