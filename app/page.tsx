'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gauge,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  X,
  Zap,
} from 'lucide-react';

interface CarTelemetry {
  id: number;
  brand: string;
  model: string;
  year: number;
  category: 'hypercar' | 'jdm' | 'euro_gt' | 'track';
  categoryLabel: string;
  hp: number;
  torque: string;
  acceleration: string;
  topSpeed: string;
  engine: string;
  transmission: string;
  nurburgringTime: string;
  rating: number;
  score: string;
  review: string;
  part_name: string;
  part_category: string;
  part_health: string;
  image: string;
}

export default function Home() {
  const [cars, setCars] = useState<CarTelemetry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCar, setSelectedCar] = useState<CarTelemetry | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic Canvas Cybernetic Speed Lines Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle speed lines
    const particles = Array.from({ length: 65 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 80 + 20,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle horizon grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw speed lines
      particles.forEach((p) => {
        ctx.strokeStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y);
        ctx.stroke();

        p.x += p.speed;
        if (p.x - p.length > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fetch telemetry ledger
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (selectedCategory && selectedCategory !== 'all') {
      params.append('category', selectedCategory);
    }

    fetch(`/api/cars?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load telemetry:', err);
        setLoading(false);
      });
  }, [search, selectedCategory]);

  const categories = [
    { id: 'all', label: 'ALL SPECIMENS' },
    { id: 'hypercar', label: 'HYBRID HYPERCARS' },
    { id: 'track', label: 'TRACK WEAPONS' },
    { id: 'jdm', label: 'JDM LEGENDS' },
    { id: 'euro_gt', label: 'EUROPEAN GT' },
  ];

  return (
    <main className="min-h-screen bg-[#04060A] text-slate-100 selection:bg-cyan-400 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#04060A]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute opacity-75" />
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="font-mono text-sm tracking-widest text-slate-200 font-bold">
              AUTOPULSE <span className="text-cyan-400">//</span> TELEMETRY LABS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ECU DYNO: SYNCHRONIZED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>DATABASE: RESILIENT SQLITE</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              BUILD 2026.11
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section with Cybernetic Backdrop & Visual Asset */}
      <section className="relative w-full min-h-[580px] flex items-center justify-center overflow-hidden border-b border-slate-900">
        {/* Background Visual Image with Dark Cinematic Gradient */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />

        {/* Cybernetic Particle Speed-Lines Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none w-full h-full" />

        {/* Radial Dark Vignette Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#04060A] via-[#04060A]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_0%,#04060A_85%)] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>NÜRBURGRING TELEMETRY // CHASSIS DIAGNOSTICS</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 uppercase">
            AUTOMOTIVE PERFORMANCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              ANALYZER & REVIEW
            </span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed font-normal">
            Real-world track benchmark telemetry, dyno power curves, component wear analysis, and mechanical build reviews for elite supercars and track weapons.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by make, model, or component (e.g. Porsche, Brembo, V12)..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 backdrop-blur-lg transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/80 shadow-[0_0_12px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
            <span>SHOWING {cars.length} VERIFIED ENTRIES</span>
          </div>
        </div>

        {/* Cars Telemetry Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-mono text-xs text-slate-400 tracking-wider">
              POLLING TELEMETRY REGISTRY...
            </p>
          </div>
        ) : cars.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-slate-850 rounded-2xl bg-slate-950/40">
            <p className="text-slate-400 text-sm font-mono mb-2">NO AUTOMOTIVE SPECIMEN FOUND</p>
            <p className="text-slate-500 text-xs">Try searching for Supra, Ferrari, Porsche, or GT-R</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                onClick={() => setSelectedCar(car)}
                className="group relative rounded-2xl bg-[#0B101B] border border-slate-800/90 hover:border-cyan-500/60 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div>
                  {/* Vehicle Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-slate-700/60 font-mono text-[11px] text-cyan-400 font-bold uppercase">
                        {car.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-slate-700/60 text-xs font-mono text-amber-400">
                      <span className="font-bold">{car.score}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>{car.brand.toUpperCase()}</span>
                      <span>YEAR {car.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                      {car.model}
                    </h3>

                    {/* Telemetry Quick Badges */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 font-mono text-center mb-4">
                      <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                        <span className="block text-[10px] text-slate-400">POWER</span>
                        <span className="text-xs font-bold text-white">{car.hp} HP</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                        <span className="block text-[10px] text-slate-400">0-100</span>
                        <span className="text-xs font-bold text-cyan-400">{car.acceleration}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                        <span className="block text-[10px] text-slate-400">V-MAX</span>
                        <span className="text-xs font-bold text-white">{car.topSpeed}</span>
                      </div>
                    </div>

                    {/* Component Part Inspection */}
                    <div className="mb-4 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>COMPONENT AUDIT</span>
                        <span className="text-emerald-400 font-bold">{car.part_health}</span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium truncate">{car.part_name}</p>
                    </div>

                    {/* Review Snippet */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {car.review}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">NÜRBURGRING: {car.nurburgringTime}</span>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>INSPECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Deep Telemetry Modal Dialog */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0B101B] border border-cyan-500/50 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
            {/* Modal Header Image */}
            <div className="relative aspect-video w-full max-h-[300px] overflow-hidden bg-slate-950">
              <img
                src={selectedCar.image}
                alt={selectedCar.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B101B] via-transparent to-black/60" />

              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/80 border border-slate-700 text-white hover:text-cyan-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/50 font-mono text-xs text-cyan-400 font-bold uppercase mb-2 inline-block">
                  {selectedCar.categoryLabel}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  {selectedCar.brand} {selectedCar.model}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Detailed Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">HORSEPOWER</span>
                  <span className="text-base font-bold text-white">{selectedCar.hp} HP</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">0-100 ACCEL</span>
                  <span className="text-base font-bold text-cyan-400">
                    {selectedCar.acceleration}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">TOP SPEED</span>
                  <span className="text-base font-bold text-white">{selectedCar.topSpeed}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">NÜRBURGRING</span>
                  <span className="text-base font-bold text-emerald-400">
                    {selectedCar.nurburgringTime}
                  </span>
                </div>
              </div>

              {/* Powertrain & Transmission */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">POWERTRAIN ARCHITECTURE:</span>
                  <span className="text-white font-bold">{selectedCar.engine}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">TRANSMISSION:</span>
                  <span className="text-white font-bold">{selectedCar.transmission}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400">MAX TORQUE:</span>
                  <span className="text-white font-bold">{selectedCar.torque}</span>
                </div>
              </div>

              {/* Engineering Track Review */}
              <div>
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>TRACK TEST NOTES & DRIVING DYNAMICS</span>
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  {selectedCar.review}
                </p>
              </div>

              {/* Verified Component Status */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>AUDITED COMPONENT: {selectedCar.part_category}</span>
                  </div>
                  <p className="text-sm font-bold text-white mt-1">{selectedCar.part_name}</p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold">
                  {selectedCar.part_health}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-slate-950 flex items-center justify-end">
              <button
                onClick={() => setSelectedCar(null)}
                className="px-6 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono hover:bg-cyan-400 transition-colors"
              >
                CLOSE TELEMETRY HUD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 bg-[#04060A] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
          <div>
            <span>AUTOPULSE TELEMETRY SYSTEMS</span> // ALL SPECIFICATIONS VERIFIED VIA TRACK
            LOGGERS
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-slate-300 cursor-pointer">SECURITY DISCLOSURE</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPTIMAL
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
