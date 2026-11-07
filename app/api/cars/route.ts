import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export interface CarTelemetry {
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

export const CARS_DATA: CarTelemetry[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'GR Supra 3.0 Track Edition',
    year: 2024,
    category: 'jdm',
    categoryLabel: 'JDM TRACK',
    hp: 382,
    torque: '500 Nm @ 1,800 RPM',
    acceleration: '3.9s',
    topSpeed: '250 km/h',
    engine: '3.0L B58 Twin-Scroll Turbo I6',
    transmission: '8-Speed ZF Sport Automatic',
    nurburgringTime: '7:52.17',
    rating: 5,
    score: '9.4/10',
    review: 'B58 inline-six platform delivers immense tuning headroom and razor-sharp throttle response. Front-mid engine layout creates ideal 50:50 weight distribution.',
    part_name: 'Brembo 4-Piston Monobloc Calipers',
    part_category: 'Braking System',
    part_health: 'OPTIMAL (98%)',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    brand: 'Porsche',
    model: '911 GT3 RS (992)',
    year: 2024,
    category: 'track',
    categoryLabel: 'TRACK WEAPON',
    hp: 518,
    torque: '465 Nm @ 6,300 RPM',
    acceleration: '3.0s',
    topSpeed: '296 km/h',
    engine: '4.0L Naturally Aspirated Boxer-6 (9,000 RPM)',
    transmission: '7-Speed Dual-Clutch PDK',
    nurburgringTime: '6:49.328',
    rating: 5,
    score: '9.9/10',
    review: 'Formula-1 derived active DRS rear wing generates 860 kg of downforce at track speed. Steering feedback and front axle grip defy conventional road car physics.',
    part_name: 'PCCB 410mm Carbon Ceramic Composite',
    part_category: 'Braking Architecture',
    part_health: 'RACE READY (100%)',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    brand: 'Nissan',
    model: 'GT-R Nismo (R35)',
    year: 2024,
    category: 'jdm',
    categoryLabel: 'JDM TRACK',
    hp: 600,
    torque: '652 Nm @ 3,600 RPM',
    acceleration: '2.5s',
    topSpeed: '330 km/h',
    engine: '3.8L Twin-Turbocharged VR38DETT V6',
    transmission: '6-Speed Dual-Clutch Transaxle',
    nurburgringTime: '7:08.67',
    rating: 5,
    score: '9.6/10',
    review: 'ATTESA E-TS intelligent all-wheel-drive vectors torque with microsecond precision. GT3-spec turbochargers eliminate mid-range boost lag.',
    part_name: 'Nismo Fujitsubo Titanium Exhaust',
    part_category: 'Exhaust & Thermal',
    part_health: 'OPTIMAL (97%)',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    brand: 'Ferrari',
    model: '296 GTB Assetto Fiorano',
    year: 2024,
    category: 'hypercar',
    categoryLabel: 'HYBRID HYPERCAR',
    hp: 819,
    torque: '740 Nm @ 6,250 RPM',
    acceleration: '2.8s',
    topSpeed: '330 km/h',
    engine: '3.0L 120-Degree Hot-Vee Twin-Turbo V6 Hybrid',
    transmission: '8-Speed F1 Dual-Clutch',
    nurburgringTime: '6:58.70',
    rating: 5,
    score: '9.8/10',
    review: '120-degree engine configuration provides an ultra-low center of gravity. 165 hp axial-flux MGU-K motor fills torque before turbos reach peak boost.',
    part_name: 'Multimatic Dynamic Suspensions Spool Valve (DSSV)',
    part_category: 'Chassis Telemetry',
    part_health: 'OPTIMAL (99%)',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    brand: 'BMW',
    model: 'M4 Competition xDrive (G82)',
    year: 2024,
    category: 'euro_gt',
    categoryLabel: 'EUROPEAN GT',
    hp: 503,
    torque: '650 Nm @ 2,750 RPM',
    acceleration: '3.4s',
    topSpeed: '290 km/h',
    engine: '3.0L Twin-Turbocharged S58 Inline-6',
    transmission: '8-Speed M Steptronic with Drivelogic',
    nurburgringTime: '7:28.57',
    rating: 4,
    score: '9.2/10',
    review: 'Forged lightweight crankshaft and wire-arc sprayed cylinder liners allow high-RPM track endurance. Switchable rear-wheel drive mode unlocks full drift control.',
    part_name: 'M Adaptive Damper System',
    part_category: 'Suspension',
    part_health: 'EXCELLENT (95%)',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    brand: 'Lamborghini',
    model: 'Revuelto V12 Hybrid',
    year: 2024,
    category: 'hypercar',
    categoryLabel: 'HYBRID HYPERCAR',
    hp: 1001,
    torque: '725 Nm + Tri-Electric Motor Vectoring',
    acceleration: '2.5s',
    topSpeed: '350 km/h',
    engine: '6.5L Naturally Aspirated L545 V12 + 3 E-Motors',
    transmission: '8-Speed Transverse Dual-Clutch',
    nurburgringTime: '6:54.00 (Est)',
    rating: 5,
    score: '9.9/10',
    review: 'Naturally aspirated V12 screams to 9,500 RPM while front dual-motors provide instant torque vectoring through sharp technical chicanes.',
    part_name: 'Monofuselage Carbon Monocoocoque Frame',
    part_category: 'Structural Carbon',
    part_health: 'STRUCTURAL 100%',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 7,
    brand: 'McLaren',
    model: '750S Performance Coupe',
    year: 2024,
    category: 'euro_gt',
    categoryLabel: 'EUROPEAN GT',
    hp: 740,
    torque: '800 Nm @ 5,500 RPM',
    acceleration: '2.7s',
    topSpeed: '332 km/h',
    engine: '4.0L Twin-Turbocharged M840T Flat-Plane V8',
    transmission: '7-Speed Reverse Seamless Shift Gearbox',
    nurburgringTime: '7:06.00',
    rating: 5,
    score: '9.7/10',
    review: 'Proactive Chassis Control III links hydraulic dampers across all four corners, eliminating anti-roll bars while maintaining zero body roll.',
    part_name: 'Active Hydraulic Aero Airbrake Wing',
    part_category: 'Aerodynamics',
    part_health: 'OPTIMAL (98%)',
    image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 8,
    brand: 'Chevrolet',
    model: 'Corvette Z06 (C8.R Spec)',
    year: 2024,
    category: 'track',
    categoryLabel: 'TRACK WEAPON',
    hp: 670,
    torque: '624 Nm @ 6,300 RPM',
    acceleration: '2.6s',
    topSpeed: '314 km/h',
    engine: '5.5L Naturally Aspirated Flat-Plane Crank LT6 V8',
    transmission: '8-Speed Dual-Clutch Tremec',
    nurburgringTime: '7:10.50',
    rating: 5,
    score: '9.5/10',
    review: 'Highest-horsepower naturally aspirated production V8 in automotive history. 8,600 RPM redline matches GT3 endurance racing acoustics.',
    part_name: 'Carbon Fiber Z07 Aero Package & Wheels',
    part_category: 'Carbon Aero',
    part_health: 'RACE READY (99%)',
    image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get('q') || '').trim().toLowerCase();
  const category = (searchParams.get('category') || 'all').trim().toLowerCase();

  let results = CARS_DATA;

  if (category && category !== 'all') {
    results = results.filter((car) => car.category === category);
  }

  if (query) {
    results = results.filter(
      (car) =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.engine.toLowerCase().includes(query) ||
        car.part_name.toLowerCase().includes(query)
    );
  }

  try {
    const Database = require('better-sqlite3');
    const dbPath = path.join(process.cwd(), 'dev.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: false });
    db.close();
  } catch (error) {
    // Fail gracefully to in-memory verified telemetry
  }

  return NextResponse.json(results);
}
