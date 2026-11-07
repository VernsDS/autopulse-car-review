import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

interface CarReview {
  id: number;
  brand: string;
  model: string;
  year?: number;
  rating: number;
  review: string;
  part_name: string;
}

const DEFAULT_CARS: CarReview[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'GR Supra 3.0',
    year: 2024,
    rating: 5,
    review: 'B58 inline-six engine response is phenomenal. Chassis balance delivers laser-precise corner exit telemetry.',
    part_name: 'Brembo 4-Piston Calipers',
  },
  {
    id: 2,
    brand: 'Porsche',
    model: '911 GT3 RS (992)',
    year: 2024,
    rating: 5,
    review: 'Active DRS aerodynamics produce staggering downforce at 200+ km/h. PDK gearbox shifts are instantaneous.',
    part_name: 'PCCB Ceramic Composite Brakes',
  },
  {
    id: 3,
    brand: 'Nissan',
    model: 'GT-R Nismo (R35)',
    year: 2023,
    rating: 5,
    review: 'ATTESA E-TS all-wheel drive defies physics in heavy corner load. Twin-turbo VR38DETT pulls aggressively to redline.',
    part_name: 'Titanium Exhaust System',
  },
  {
    id: 4,
    brand: 'BMW',
    model: 'M4 Competition xDrive',
    year: 2024,
    rating: 4,
    review: 'S58 engine generates effortless torque across the rev band. Steering feel is heavily weighted with instant turn-in.',
    part_name: 'M Adaptive Suspension',
  },
  {
    id: 5,
    brand: 'Ferrari',
    model: '296 GTB Assetto Fiorano',
    year: 2024,
    rating: 5,
    review: '120-degree hot-vee V6 hybrid delivers 819 hp with zero turbo lag. High-revving soundtrack matches classic Ferrari pedigree.',
    part_name: 'Multimatic Racing Dampers',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim().toLowerCase();

  try {
    const Database = require('better-sqlite3');
    const dbPath = path.join(process.cwd(), 'dev.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: false });

    const cars = db.prepare(`
      SELECT c.*, r.rating, r.content as review, s.name as part_name
      FROM cars c
      LEFT JOIN reviews r ON c.id = r.car_id
      LEFT JOIN spareparts s ON r.sparepart_id = s.id
      WHERE LOWER(c.brand) LIKE ? OR LOWER(c.model) LIKE ?
      ORDER BY (CASE WHEN LOWER(c.brand) LIKE ? THEN 0 ELSE 1 END), c.brand ASC
    `).all(`%${query}%`, `%${query}%`, `${query}%`);

    db.close();

    if (Array.isArray(cars) && cars.length > 0) {
      return NextResponse.json(cars);
    }
  } catch (error) {
    // Fallback to static in-memory data if SQLite native addon is unsupported on host
  }

  const filtered = DEFAULT_CARS.filter(
    (car) =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.part_name.toLowerCase().includes(query)
  );

  return NextResponse.json(filtered);
}
