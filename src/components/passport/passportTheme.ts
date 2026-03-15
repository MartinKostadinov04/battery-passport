// Central design tokens for all passport-specific visuals.
// Change colors or chart geometry here — it propagates everywhere.

export const passportTheme = {
  // ── Color palettes ────────────────────────────────────────
  lifecycleColors: [
    "hsl(160, 84%, 39%)",  // Raw Materials
    "hsl(200, 70%, 50%)",  // Production
    "hsl(40, 90%, 55%)",   // Distribution
    "hsl(280, 50%, 55%)",  // End of Life
  ],
  recycledContentColors: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(200, 70%, 50%)",
    "hsl(280, 50%, 55%)",
    "hsl(160, 60%, 45%)",
  ],
  // Line chart series colors (fade curves & time series)
  lineColors: {
    capacityFade: "hsl(160, 84%, 39%)",  // green — capacity
    powerFade:    "hsl(200, 70%, 50%)",  // blue  — power
    rteFade:      "hsl(40, 90%, 55%)",   // amber — round-trip efficiency
    soc:          "hsl(160, 84%, 39%)",  // green — state of charge
    cycles:       "hsl(280, 50%, 55%)",  // purple — cycle count
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
