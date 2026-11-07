# AutoPulse - Automotive Review & Part Analyzer

AutoPulse is a high-performance web platform for automotive telemetry, vehicle diagnostics, and spare-part telemetry analysis built on Next.js 14 and Tailwind CSS.

## Features

- **Cybernetic Speed-Lines Canvas & Hero**: Real-time 60 FPS HTML5 Canvas particle radar background and cinematic dark automotive hero backdrop.
- **Telemetry & Part Ledger**: Dynamic search and multi-category filtering for performance sports cars across Hypercars, Track Weapons, JDM Legends, and European GT.
- **Deep Telemetry HUD Modal**: Interactive vehicle inspection modal featuring dyno specs, horsepower, torque curves, Nürburgring Nordschleife benchmark times, and mechanical track notes.
- **Component Wear Diagnostics**: Verified spare part auditing (calipers, carbon ceramic brakes, titanium exhaust, active aero, and dampers) with health percentages.
- **SQLite Database with Resilient Fallback**: Fast local persistence via `better-sqlite3` with embedded fallback data support for serverless edge runtimes.
- **Client Security Shield**: Integrated `AntiDevTools` component preventing unauthorized shortcut inspections and source tampering.
- **Automated CI/CD**: Fully synchronized Git repository (`VernsDS/autopulse-car-review`) with automated Vercel production deployments.

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React
- **Canvas / Telemetry**: HTML5 Dynamic Canvas Particle Grid
- **Database**: SQLite / `better-sqlite3`
- **Deployment**: Vercel & GitHub Actions / CLI

## Directory Topology

```
autopulse-car-review/
├── app/
│   ├── api/cars/route.ts       # Car & part telemetry API route
│   ├── globals.css             # Base styles & Tailwind directives
│   ├── layout.tsx              # Root HTML wrapper with AntiDevTools
│   └── page.tsx                # AutoPulse Cybernetic hero & telemetry grid
├── components/
│   └── AntiDevTools.tsx        # Client-side shortcut & inspector guard
├── dev.db                      # Local SQLite database
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

## Deployment URL

- **Production**: [https://autopulse-car-review.vercel.app](https://autopulse-car-review.vercel.app)
- **GitHub Repository**: [https://github.com/VernsDS/autopulse-car-review](https://github.com/VernsDS/autopulse-car-review)
