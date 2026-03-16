// Central design tokens for all passport-specific visuals.
// Change colors or chart geometry here — it propagates everywhere.

export const passportTheme = {
  // ── Color palettes ────────────────────────────────────────
  // Both pie charts share the same ramp — lifecycle uses steps 1–4,
  // recycled content uses all 8. Change --chart-1..8 in index.css to retheme both.
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
  // Line chart series colors — also drawn from the unified ramp
  lineColors: {
    capacityFade: "hsl(var(--chart-1))",
    powerFade:    "hsl(var(--chart-2))",
    rteFade:      "hsl(var(--chart-3))",
    soc:          "hsl(var(--chart-1))",
    cycles:       "hsl(var(--chart-4))",
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
