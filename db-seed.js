const Database = require('better-sqlite3');
const db = new Database('dev.db');

// Insert sample data
const insertCar = db.prepare('INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)');
const insertPart = db.prepare('INSERT INTO spareparts (name, category) VALUES (?, ?)');
const insertReview = db.prepare('INSERT INTO reviews (rating, content, car_id, sparepart_id) VALUES (?, ?, ?, ?)');

insertCar.run('Toyota', 'GR Supra', 2024);
insertPart.run('Brake Pad', 'Braking System');
insertReview.run(5, 'Excellent stopping power, very responsive.', 1, 1);

console.log("Sample data inserted.");
