'use client';
import Spline from '@splinetool/react-spline';
import { Suspense, useEffect, useState } from 'react';

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

  useEffect(() => {
    fetch(`/api/cars?q=${search}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [search]);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold tracking-tighter z-10">AUTO-PULSE</h1>
        <div className="mt-8 z-10 w-full max-w-md px-4">
            <input 
                type="text" 
                placeholder="Search car (e.g. Ferrari)..." 
                className="w-full p-4 rounded-full bg-zinc-900 border border-zinc-700 text-center outline-none focus:border-zinc-400 transition-all"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div className="absolute inset-0 w-full h-full z-0">
          <Suspense fallback={null}>
            <Spline scene="https://prod.spline.design/6Wq1W5a4220zG12k/scene.splinecode" />
          </Suspense>
        </div>
      </section>

      {/* Review Section with transition */}
      <section className="w-full py-20 px-8">
        <h2 className="text-3xl font-bold mb-10">Latest Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all">
          {reviews.map((r, i) => (
            <div key={r.id} className="group relative p-6 bg-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-800 transition-all duration-500 ease-out hover:scale-105 hover:border-zinc-500">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold text-white relative">{r.brand} {r.model}</h3>
                <p className="text-sm text-zinc-400 mt-2 relative italic">{r.part_name}</p>
                <p className="text-sm text-zinc-300 mt-4 relative leading-relaxed">{r.review}</p>
                <div className="mt-6 flex items-center justify-between relative">
                    <div className="text-yellow-500 text-sm">
                        {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                    <span className="text-xs text-zinc-600 font-mono">ID: {r.id}</span>
                </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
