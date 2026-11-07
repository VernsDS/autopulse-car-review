
import { NextRequest, NextResponse } from 'next/server';
const Database = require('better-sqlite3');
const db = new Database('dev.db');

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  const cars = db.prepare(`
    SELECT c.*, r.rating, r.content as review, s.name as part_name
    FROM cars c
    LEFT JOIN reviews r ON c.id = r.car_id
    LEFT JOIN spareparts s ON r.sparepart_id = s.id
    WHERE c.brand LIKE ? OR c.model LIKE ?
    ORDER BY (CASE WHEN c.brand LIKE ? THEN 0 ELSE 1 END), c.brand ASC
  `).all(`%${query}%`, `%${query}%`, `${query}%`);
  
  return NextResponse.json(cars);
}
