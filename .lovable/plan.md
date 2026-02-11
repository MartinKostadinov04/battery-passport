

## Digital Battery Passport — Demo Template

A static, clean & minimal demo website that replicates the layout and data sections of the EU Battery Pass (thebatterypass.io), using hardcoded sample data. No backend needed — purely a front-end layout showcase.

---

### Page Structure

**Single page** that loads directly into the passport view (no lookup page), with a **top navigation bar** and **tabbed content sections**.

---

### 1. Top Header Bar
- Logo/brand area (left) — "Battery Passport" with a battery icon
- Verification badge — green "Verified" chip with signature hash
- Dark mode toggle (optional, for polish)

### 2. Passport Identity Card (always visible above tabs)
A summary card showing key identification at a glance:
- **Passport ID** (DID-style identifier with QR code icon)
- **Model Number** & **Serial Number** (large, bold)
- **Category** (e.g. "EV"), **Weight** (e.g. "499.00 kg")
- **Status** (green dot + "Original")
- **Manufactured date** & **Manufactured by** (company name + address)
- **Economic operator** logo/placeholder

### 3. Tabbed Sections (horizontal tabs below the identity card)

Each tab switches the content area below:

**Tab 1 — General Information**
- Battery chemistry, rated capacity, nominal voltage
- Expected lifetime (cycles / calendar years)
- Temperature range (upper/lower limits)
- Battery cell type, dimensions

**Tab 2 — Performance & Durability**
- Original power capability (chart/gauge)
- State of Health (SoH) percentage gauge
- Capacity fade over time (line chart using Recharts)
- Power fade visualization
- Round-trip efficiency
- Internal resistance data

**Tab 3 — Materials & Composition**
- Critical raw materials list (Cobalt, Lithium, Nickel, Manganese) with percentage bars
- Recycled content share per material (bar chart — Nickel, Cobalt, Lithium, Lead)
- Hazardous substances table
- Renewable content share

**Tab 4 — Carbon Footprint**
- Total carbon footprint value (kg CO₂e)
- Breakdown by lifecycle stage (donut/pie chart): Raw Material Extraction, Production, Distribution, Recycling
- Carbon footprint performance class badge
- Carbon footprint study link/reference

**Tab 5 — Supply Chain & Due Diligence**
- Manufacturer details card (name, address, contact)
- Supply chain due diligence report status
- Third-party certifications/verifications list
- EU regulation compliance indicators (green checkmarks)
- Economic operator information

**Tab 6 — End of Life / Circularity**
- Collection & recycling information
- Dismantling instructions reference
- Recycling efficiency rates
- Spare parts availability

### 4. Footer
- Disclaimer text (sample data notice)
- Copyright line

---

### Design Approach
- **Clean & minimal** — white background, green (#10B981) accent color for verified badges and highlights, gray text for labels
- Cards with subtle borders and shadows for data grouping
- Recharts for all visualizations (bar charts, line charts, gauges, pie/donut)
- All data is hardcoded sample data — no API calls, no database
- Responsive layout that works well on desktop and tablet

