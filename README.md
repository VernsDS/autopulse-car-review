# AutoPulse - Automotive Review & Part Analyzer

AutoPulse is a high-performance web platform for automotive telemetry, vehicle diagnostics, and spare-part telemetry analysis built on Next.js 14 and Tailwind CSS.

## Features

- **Interactive 3D Hero Section**: Real-time 3D vehicle canvas powered by Spline runtime (`@splinetool/react-spline`).
- **Telemetry & Part Ledger**: Dynamic search and filtering of performance sports cars (Toyota GR Supra, Porsche 911 GT3 RS, Nissan GT-R Nismo, BMW M4 Competition, Ferrari 296 GTB).
- **SQLite Database with Resilient Fallback**: Fast local persistence via `better-sqlite3` with embedded fallback data support for serverless edge runtimes.
- **Client Security Shield**: Integrated `AntiDevTools` component preventing inspection tampering and context exploitation.
- **Automated CI/CD**: Fully synchronized Git repository (`VernsDS/autopulse-car-review`) with automated Vercel production deployments.

## Tech Stack

- **Framework**: Next.js 14.2.5 (App Router)
- **Styling**: Tailwind CSS 3.3
- **3D Graphics**: Spline Tool (`@splinetool/react-spline` & `@splinetool/runtime`)
- **Database**: SQLite / `better-sqlite3`
- **Deployment**: Vercel & GitHub Actions / CLI

## Directory Topology

```
autopulse-car-review/
├── app/
│   ├── api/cars/route.ts       # Car & part telemetry API route
│   ├── globals.css             # Base styles & Tailwind directives
│   ├── layout.tsx              # Root HTML wrapper with AntiDevTools
│   └── page.tsx                # AutoPulse 3D hero & telemetry review grid
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
