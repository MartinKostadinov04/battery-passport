import type { DesignData } from "@/types/passport";

interface HslComponents { h: number; s: number; l: number; }

function hexToHslComponents(hex: string): HslComponents {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hsl({ h, s, l }: HslComponents): string {
  return `${h} ${s}% ${l}%`;
}

export function applyDesign(design: DesignData | null): void {
  if (!design) return;

  const root = document.documentElement;

  const byLightness: Record<number, string> = {};
  for (const entry of design.palette) {
    byLightness[entry.lightness] = entry.hex;
  }

  const components = (step: number): HslComponents | null => {
    const hex = byLightness[step];
    return hex ? hexToHslComponents(hex) : null;
  };

  const p500 = components(500);
  if (!p500) return;
  const { h } = p500;

  const p50  = components(50);
  const p100 = components(100);
  const p600 = components(600);

  root.style.setProperty("--primary",            hsl(p500));
  root.style.setProperty("--ring",               hsl(p500));
  root.style.setProperty("--sidebar-primary",    hsl(p500));
  if (p50)  root.style.setProperty("--primary-foreground",          hsl(p50));
  if (p50)  root.style.setProperty("--sidebar-primary-foreground",  hsl(p50));
  if (p100) root.style.setProperty("--accent",                      hsl(p100));
  if (p100) root.style.setProperty("--sidebar-accent",              hsl(p100));
  if (p600) root.style.setProperty("--accent-foreground",           hsl(p600));

  if (p50) root.style.setProperty("--background", hsl(p50));

  root.style.setProperty("--card",               `${h} 0% 100%`);
  root.style.setProperty("--card-foreground",    `${h} 30% 10%`);
  root.style.setProperty("--popover",            `${h} 10% 96%`);
  root.style.setProperty("--popover-foreground", `${h} 30% 10%`);
  root.style.setProperty("--foreground",         `${h} 30% 10%`);

  root.style.setProperty("--secondary",            `${h} 18% 55%`);
  root.style.setProperty("--secondary-foreground", "0 0% 98%");
  root.style.setProperty("--muted",                `${h} 10% 72%`);
  root.style.setProperty("--muted-foreground",     `${h} 12% 44%`);
  root.style.setProperty("--border",              `${h} 14% 86%`);
  root.style.setProperty("--input",               `${h} 14% 86%`);

  const chartSteps = [500, 400, 300, 600, 200, 700, 100, 800];
  for (let i = 0; i < chartSteps.length; i++) {
    const c = components(chartSteps[i]);
    if (c) root.style.setProperty(`--chart-${i + 1}`, hsl(c));
  }

  root.style.setProperty("--radius", `${design.rounding * 0.125}rem`);

  if (design.logo_url) {
    const linkId = "passport-design-favicon";
    let favicon = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.id = linkId;
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = design.logo_url;
    favicon.type = design.logo_url.endsWith(".svg") ? "image/svg+xml" : "image/png";
  }

  if (design.font) {
    const encoded = design.font.replace(/ /g, "+");
    const linkId = "passport-design-font";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${encoded}:ital,wght@0,400;0,500;0,700;1,400&display=swap`;
    root.style.setProperty(
      "--font-sans",
      `'${design.font}', ui-sans-serif, system-ui, -apple-system, sans-serif`
    );
  }
}
