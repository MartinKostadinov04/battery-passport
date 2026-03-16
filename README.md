# Battery Passport

A production-ready Digital Product Passport (DPP) viewer for batteries, built on the [Formlyst](https://formlyst.com) API. Renders live passport data across 7 thematic tabs with role-based visibility control.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Data fetching | TanStack Query (React Query) |
| Routing | React Router v6 |
| QR code | react-qr-code |

---

## How It Works

### URL Structure

```
/passport/:id?visibility=<level>
```

- `:id` — Formlyst passport ID (e.g. `pass_023481ce3200b000`)
- `?visibility=` — one of `public | partners | auditors | internal` (defaults to `internal`)

Both are bookmarkable and shareable. Changing the visibility level triggers an automatic re-fetch with the new level.

---

### Data Pipeline

```
Formlyst API
    │
    ▼
fetchPassportValues(id, visibility)        src/services/passportApi.ts
    │  GET /passport/:id?visibility=<level>
    │  Returns: { properties: { [propId]: { value } } }
    │
    ▼
PROPERTY_PATH_MAP lookup                   src/data/propertyMap.ts
    │  Maps each property_0234… ID → "section.subsection.field"
    │
    ▼
setNestedValue + normalizeValue
    │  Hydrates a typed PassportData object
    │
    ▼
PassportData                               src/types/passport.ts
    │  Fully typed, all fields string | null
    │
    ▼
usePassportData(id, visibility)            src/hooks/usePassportData.ts
    │  React Query wrapper, 5-min stale time
    │  queryKey = ["passport", id, visibility] → re-fetches on visibility change
    │
    ▼
Index.tsx → tab components
```

### Null Sentinel Pattern

Every field in `PassportData` is typed `string | null` (or `FileValue | null`):

| Value | Meaning | Display |
|---|---|---|
| `null` | Not returned by the API at this visibility level | Field is **hidden entirely** |
| `""` | Returned by the API but has no value | Renders `–` |
| `"some value"` | Has a real value | Renders the value |

This applies at two levels:

- **Field level** — `InfoRow`, `InfoBlock`, `FileLinkCard`, `FileRow`, `FileInlineLink` all return `null` when their value prop is `null`
- **Section level** — each card in a tab checks whether any of its fields are non-null before rendering. If all fields in a section are null, the entire card is hidden

This means visibility filtering is fully automatic — reduce the visibility level and both individual fields and entire sections disappear from the UI with no hardcoded role checks anywhere.

### Visibility Levels

```
public (53 props) ⊂ auditors (57) ⊂ partners (72) = internal (72)
```

The selector in the header writes `?visibility=` to the URL. React Query re-fetches when the query key changes.

---

## Project Structure

```
src/
├── App.tsx                          Routes, providers (QueryClient, BrowserRouter)
├── pages/
│   ├── Index.tsx                    Main passport page — layout + tab wiring
│   └── NotFound.tsx                 404
│
├── services/
│   └── passportApi.ts               API fetch + PassportData hydration
│
├── data/
│   └── propertyMap.ts               propId → dot-path map + visualization groups
│
├── types/
│   └── passport.ts                  All TypeScript interfaces for PassportData
│
├── hooks/
│   └── usePassportData.ts           React Query hook
│
├── utils/
│   └── formatDate.ts                ISO date → "15 Mar 2024" (accepts null)
│
└── components/
    ├── ui/                          shadcn/ui component library
    └── passport/
        ├── passportTheme.ts         ← All visual constants (colors, chart geometry)
        ├── passportConfig.ts        ← Tab definitions (value, label)
        ├── Header.tsx               Sticky header: visibility selector, QR dialog (with Synex brand mark), JSON viewer
        ├── IdentityCard.tsx         Battery identity summary card
        ├── Footer.tsx               Page footer
        ├── primitives/              Shared display components (see below)
        │   ├── InfoRow.tsx
        │   ├── InfoBlock.tsx
        │   ├── FileDisplay.tsx
        │   ├── SymbolImage.tsx
        │   ├── GaugeCard.tsx
        │   ├── StatBox.tsx
        │   └── index.ts
        └── tabs/
            ├── GeneralInfoTab.tsx   Identifiers, product data, manufacturer
            ├── SymbolsLabelsTab.tsx Symbols, labels, compliance documents
            ├── CarbonFootprintTab.tsx Lifecycle emissions + pie chart
            ├── SupplyChainTab.tsx   Due diligence report, assurances
            ├── MaterialsTab.tsx     Chemistry, materials, hazardous substances
            ├── CircularityTab.tsx   Recycled content + end-of-life
            └── PerformanceTab.tsx  Capacity, power, efficiency, temperature
```

---

## Central Design Panel

All visual decisions flow from three files. Change things here and they propagate everywhere.

### `src/index.css` — Colors, typography, spacing

CSS custom properties that Tailwind maps to utility classes. Key entries:

```css
--primary: 20 90% 48%;          /* brand orange — drives buttons, badges, highlights */
--muted-foreground: 0 0% 45%;   /* secondary label text */

/* Unified pie chart ramp (warm orange → golden)
   Lifecycle pie uses steps 1–4. Recycled content uses all 8.
   Change only these variables to retheme all charts at once. */
--chart-1: 13 72% 40%;   /* burnt rust     */
--chart-2: 20 90% 48%;   /* primary orange */
--chart-3: 38 84% 56%;   /* amber          */
--chart-4: 48 88% 63%;   /* golden yellow  */
--chart-5: 30 58% 64%;   /* warm peach     */
--chart-6: 25 46% 50%;   /* warm brown     */
--chart-7: 17 76% 52%;   /* mid orange     */
--chart-8: 45 72% 73%;   /* pale gold      */
```

Dark mode equivalents are defined in `.dark` in the same file with brightened values.

### `src/components/passport/passportTheme.ts` — Chart tokens

All chart colors and geometry in one place. Change here, propagates to all tabs.

```ts
import { passportTheme } from "@/components/passport/passportTheme";

// Both pie charts share the same ramp — lifecycle uses steps 1–4,
// recycled content uses all 8. Driven by --chart-1..8 in index.css.
passportTheme.lifecycleColors        // ["hsl(var(--chart-1))", ..., "--chart-4"]
passportTheme.recycledContentColors  // ["hsl(var(--chart-1))", ..., "--chart-8"]
passportTheme.lineColors             // Named colors for line chart series (same ramp)
passportTheme.pieChart               // Large donut: innerRadius, outerRadius, paddingAngle
passportTheme.smallPieChart          // Small donut (recycled content)
passportTheme.barChart               // Bar corner radius
passportTheme.lineChart              // strokeWidth, dotRadius
passportTheme.gridStroke             // CartesianGrid stroke color
passportTheme.primaryFill            // Default bar/area fill
```

### `src/components/ui/button.tsx` — Button variants

Custom variants and sizes added on top of shadcn defaults via CVA:

| Variant | Style | Use |
|---|---|---|
| `pill` | rounded-full, primary/10 fill, primary/20 border | Header action buttons (QR, JSON, visibility) |
| `outline` | border, `text-primary`, `hover:bg-primary/5` | Download buttons throughout all tabs |

| Size | Dimensions | Use |
|---|---|---|
| `xs` | `h-7 px-3 text-xs` | Header pill buttons |

---

## Shared Primitives — `primitives/`

Import from the barrel: `import { InfoRow, FileLinkCard, GaugeCard } from "@/components/passport/primitives"`

| Component | Props | Use case |
|---|---|---|
| `InfoRow` | `label, value: string\|number\|null, unit?` | Key-value row in a card. Null hides the row entirely |
| `InfoBlock` | `label, value: string\|null` | Stacked label + multiline text block |
| `FileLinkCard` | `icon, title, file: FileValue\|null` | Card with download button (Circularity section) |
| `FileRow` | `icon, title, file: FileValue\|null` | Inline row with download button (End-of-Life section) |
| `FileInlineLink` | `file: FileValue\|null, label?` | Compact anchor link (Supply Chain, Symbols) |
| `SymbolImage` | `src: string\|null, alt` | Image with `ImageOff` fallback |
| `GaugeCard` | `label, value, unit, max` | Circular SVG gauge card |
| `StatBox` | `label, value, subtext?` | Centered stat display; optional secondary line below value |

All primitives respect the null sentinel: passing `null` returns `null` — the component renders nothing. Tabs then guard entire cards with the same pattern so empty sections disappear too.

---

## Tab Configuration — `passportConfig.ts`

Tabs are defined as a typed array. To reorder, rename, or add tabs, edit only this file:

```ts
export const PASSPORT_TABS = [
  { value: "identifiers", label: "Identifiers & Product Data" },
  { value: "symbols",     label: "Symbols & Labels" },
  // ...
] as const;
```

`Index.tsx` maps this array to `<TabsTrigger>` elements. Tab content is wired manually with `<TabsContent value="...">` in the same file.

---

## Property Map — `propertyMap.ts`

Maps every Formlyst ontology property ID to its location in `PassportData`:

```ts
"property_02347db2e840b000": "general.identifiers.batteryId"
```

The API returns `{ properties: { [propId]: { value } } }`. The pipeline iterates this object, looks up each ID in the map, and calls `setNestedValue` to write the value into the correct nested path of the typed data object.

`VISUALIZATION_GROUPS` groups property IDs by chart — useful for knowing which fields compose the carbon lifecycle chart, the recycled content chart, and the temperature extremes bar chart.

---

## Porting to a New Passport Type

The data layer and UI layer are fully decoupled. To create a new passport type (vehicle, electronics, food, etc.):

1. **New types** — `src/types/<domain>.ts` — same nested `string | null` structure
2. **New property map** — `src/data/<domain>PropertyMap.ts` — map the new ontology IDs
3. **New API service** — `src/services/<domain>Api.ts` — same `createEmpty + hydrate` pattern
4. **New hook** — swap the service import in a new `use<Domain>Data.ts`
5. **New tabs** — components import primitives from `@/components/passport/primitives`
6. **New config** — tab definitions in `<domain>Config.ts`
7. **New page** — wire it together in `src/pages/<Domain>.tsx`

The `primitives/`, `passportTheme.ts`, and all shadcn/ui components are shared and require no changes.

---

## Agent Guide: Building a New DPP from Scratch

Everything an autonomous agent needs to go from a Formlyst ontology to a fully rendered DPP, without asking questions.

---

### How the API works (read this first)

Formlyst passports have two levels of data: **SKU** (product-level, shared across all units of a model) and **Unit** (instance-level, specific to one physical item). When you fetch a passport by its unit-level Snowflake ID, the API automatically merges both levels and returns all inherited properties in a single flat response. The caller never needs to know which depth a property came from — the response already contains everything.

```
GET /passport/:id?visibility=internal
→ { properties: { [propId]: { value } }, last_updated, friendly_id }
```

The `properties` object is the complete, merged, flat list of all fields for that object at that visibility level. Iterate it directly — no second request needed.

---

### What `FileValue` looks like

File and image fields are not strings. When `normalizeValue` detects a file object it passes it through unchanged. Your types must reflect this:

```ts
interface FileValue {
  snowflake: string;   // Formlyst object ID of the file
  extension: string;   // "pdf", "png", etc.
  filename:  string;   // display name
  size:      string;   // human-readable, e.g. "2.4 MB"
  link:      string;   // direct download URL
}
```

In `createEmptyPassportData`, file fields default to `null` (same as string fields). In `PassportData` types, declare them as `FileValue | null`.

---

### `normalizeValue` — what it does and does not do

```ts
function normalizeValue(raw): string | string[] | FileValue {
  if (isFileValue(raw))  return raw;          // file objects pass through untouched
  if (Array.isArray(raw)) return raw.map(String); // range fields → string[]
  return String(raw);                          // everything else → string
}
```

Numbers become strings. Booleans become `"true"` / `"false"`. The typed data structure stores everything as `string | null` — formatting (units, date display, percentages) happens in the component layer, not here.

---

### The null sentinel — the most important convention

`createEmptyPassportData` initializes **every field to `null`**, not `""`. The hydration loop only writes a value when the API returns one. This means:

- **`null`** → field was not in the API response at this visibility level → component hides it entirely
- **`""`** → field was returned but has no value → component renders `–`
- **`"some value"`** → renders the value

This applies at two levels. **Field level**: every primitive returns `null` when its value is `null`. **Section level**: each card checks whether any of its fields are non-null before rendering — if all fields in a card are null, the entire card is hidden. Both levels must be implemented for visibility switching to work correctly.

If you accidentally default fields to `""` instead of `null`, hidden fields will render as `–` regardless of visibility level, breaking the role-based hiding behaviour. Always use `null` in `createEmptyPassportData`.

---

### `category`-type properties — skip them

The ontology includes properties whose type is `"category"`. These are structural section headers in the Formlyst UI — they carry no data value and the API never returns them in `properties`. Do not add them to the property map.

---

### Property type → UI primitive mapping

Use this table when deciding which primitive to render each field with:

| API property type | Primitive | Notes |
|---|---|---|
| `short_text` | `InfoRow` | Plain label + value |
| `number` | `InfoRow` | Value is already a string |
| `measurement` | `InfoRow` with `unit` prop | e.g. `unit="kg"` |
| `date` | `InfoRow` with `formatDate()` | Pass the string through `formatDate(value)` |
| `long_text` | `InfoBlock` | Renders `whitespace-pre-line` for multiline |
| `file` | `FileLinkCard` / `FileRow` / `FileInlineLink` | Choose by visual weight (card > row > inline) |
| `image` | `SymbolImage` | Shows `ImageOff` fallback when null |
| `range` | `InfoRow` | Format as `` `${val[0]} – ${val[1]}` `` before passing |
| `category` | — | Skip entirely |

For **percentage values** (e.g. capacity fade, recycled content): store as plain string, append `%` in the component — `InfoRow` accepts a `unit` prop for this.

For **gauge-worthy metrics** (0–100% values like SoC or RTE): use `GaugeCard` instead of `InfoRow` when the value deserves visual prominence.

---

### New features with no existing primitive (e.g. bill of materials)

If the new ontology has structured data that doesn't fit any existing primitive — nested component trees, tabular BoM lists, multi-column grids — create a new primitive in `src/components/passport/primitives/` and export it from `index.ts`. Follow the same null-handling pattern:

- Prop type is `<YourType> | null`
- When `null`, return `null` (hidden) or a "Not provided" placeholder
- Export the component from `primitives/index.ts`

The primitives folder is the only place shared display logic should live. Do not define reusable components inside tab files.

---

### Chart colors and geometry — always use the theme

Never hardcode HSL values or pixel dimensions in a tab component.

For **pie charts**: use the shared ramp via `passportTheme.lifecycleColors` (steps 1–4) or `passportTheme.recycledContentColors` (all 8). The palette is defined once in `--chart-1..8` in `index.css` and flows through both arrays.

For **new chart types**: add new color arrays or geometry constants to `passportTheme.ts` and reference `hsl(var(--chart-N))` for colors, not hardcoded HSL literals. This ensures dark mode and palette changes work from one place.

```ts
// Add to passportTheme.ts
bomColors: ["hsl(var(--chart-1))", "hsl(var(--chart-2))", ...],
treemapChart: { padding: 4 },

// Use in tab
import { passportTheme } from "@/components/passport/passportTheme";
fill={passportTheme.bomColors[i]}
```

---

### Full build sequence

```
1. Fetch a live passport at ?visibility=internal
   → collect all propIds and inspect their values to infer types

2. Optionally fetch the ontology to get official property names and types
   → GET /passport/:id/ontology (or the ontology endpoint for the template)

3. Design PassportData structure
   → group properties into tabs, decide nesting depth
   → identify which fields will drive charts (document in VISUALIZATION_GROUPS)

4. src/types/<domain>.ts
   → string | null for all fields, FileValue | null for files, string[] | null for ranges

5. src/data/<domain>PropertyMap.ts
   → map every non-category propId → "tab.section.field" dot-path

6. src/services/<domain>Api.ts
   → copy passportApi.ts, swap types + propertyMap imports, rename createEmpty function

7. src/hooks/use<Domain>Data.ts
   → copy usePassportData.ts, swap service import

8. src/components/<domain>/passportTheme.ts  (or extend shared one)
   → add any new color palettes or chart geometry the new tabs need

9. src/components/<domain>/tabs/*.tsx
   → one file per tab, import primitives, no local component definitions

10. src/<domain>Config.ts
    → tab value/label array

11. src/pages/<Domain>.tsx
    → copy Index.tsx structure, wire new tabs and config

12. src/App.tsx
    → add new route: <Route path="/<domain>/:id" element={<Domain />} />
```

---

## Header Features

| Feature | Details |
|---|---|
| **Visibility selector** | Pill-shaped dropdown; writes `?visibility=` to URL; React Query re-fetches on change |
| **QR dialog** | Renders passport URL as QR code with Synex brand mark centred (error correction `H`); copy link or download SVG |
| **JSON viewer** | Pretty / Raw toggle; syntax-highlighted dark code block (keys, strings, numbers, booleans, null each in distinct colour); download always saves pretty-printed JSON |
| **Status badge** | Shows DPP status and schema version from live API data |

All header interactive elements use `Button variant="pill" size="xs"` for visual consistency.

---

## Icon Convention

Icons in `CardTitle` are reserved for **warning/alert contexts only** (`AlertTriangle text-destructive`). This applies to Hazardous Substances and Negative Events. All other sections use plain text titles — decorative icons in headers were removed to keep this distinction meaningful.

---

## Running Locally

```bash
npm install
npm run dev       # starts at http://localhost:8080
npm run build     # production build
npm run typecheck # tsc --noEmit (zero-error target)
```

The default route (`/`) redirects to `/passport/pass_023481ce3200b000` for quick local development.
