'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm font-mono">
      Loading 3D Scene...
    </div>
  ),
});

interface Review {
  id: number;
  brand: string;
  model: string;
  review: string;
  rating: number;
  part_name: string;
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cars?q=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load cars:', err);
        setLoading(false);
      });
  }, [search]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* Header / Nav */}
      <header className="w-full max-w-7xl px-6 py-6 flex items-center justify-between border-b border-zinc-900 z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-sm tracking-widest text-zinc-300 uppercase">
            AUTOPULSE // INTELLIGENCE
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
          <span className="hover:text-white transition-colors cursor-pointer">TELEMETRY</span>
          <span className="hover:text-white transition-colors cursor-pointer">SPECS</span>
          <span className="hover:text-white transition-colors cursor-pointer">PARTS</span>
        </div>
      </header>

      {/* Hero Section with 3D Spline */}
      <section className="relative w-full h-[65vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
          <Suspense fallback={null}>
            <Spline scene="https://prod.spline.design/6Wq1W5a4220zG12k/scene.splinecode" />
          </Suspense>
        </div>

        {/* Ambient overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-3xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono mb-4 backdrop-blur-md">
            <span>PERFORMANCE LABS</span>
            <span className="text-zinc-600">/</span>
            <span>V2.4</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            AUTO-PULSE
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mb-8 leading-relaxed">
            Real-time telemetry, automotive build analytics, and verified spare part diagnostics.
          </p>

          <div className="w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search make or model (e.g. Supra, Ferrari)..."
              className="w-full px-5 py-3.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-sm text-center text-white placeholder-zinc-500 outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 backdrop-blur-md transition-all"
            />
          </div>
        </div>
      </section>

      {/* Reviews & Telemetry Grid */}
      <section className="w-full max-w-7xl py-16 px-6 z-20">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-900">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Diagnostics & Reviews</h2>
            <p className="text-xs text-zinc-500 mt-1">Real-world track notes and mechanical telemetry</p>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {reviews.length} RECORDS FOUND
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-zinc-600 font-mono text-sm">
            QUERYING TELEMETRY LEDGER...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-zinc-900 rounded-2xl">
            <p className="text-zinc-500 text-sm">No automotive records matching query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="group relative p-6 bg-zinc-950/80 backdrop-blur-sm rounded-2xl border border-zinc-900 hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase">
                    {r.brand}
                  </span>
                  <div className="text-amber-400 text-xs">
                    {'★'.repeat(r.rating || 5)}{'☆'.repeat(Math.max(0, 5 - (r.rating || 5)))}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {r.model}
                </h3>
                <div className="mt-2 inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                  {r.part_name || 'Stock OEM'}
                </div>
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed line-clamp-3">
                  {r.review || 'No additional track telemetry recorded.'}
                </p>
                <div className="mt-6 pt-4 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span>SPEC-ID #{r.id.toString().padStart(4, '0')}</span>
                  <span className="text-zinc-500 group-hover:text-cyan-400 transition-colors">VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl px-6 py-10 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
        <div>AUTOPULSE INTELLIGENCE SYSTEM // ALL RIGHTS RESERVED</div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className="hover:text-zinc-400 transition-colors">PRIVACY</a>
          <a href="/terms" className="hover:text-zinc-400 transition-colors">TERMS</a>
          <span className="text-zinc-700">|</span>
          <span className="text-emerald-500">LIVE</span>
        </div>
      </footer>
    </main>
  );
}
