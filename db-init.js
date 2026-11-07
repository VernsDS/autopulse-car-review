const Database = require('better-sqlite3');
const db = new Database('dev.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    year INTEGER
  );

  CREATE TABLE IF NOT EXISTS spareparts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rating INTEGER,
    content TEXT,
    car_id INTEGER,
    sparepart_id INTEGER,
    FOREIGN KEY(car_id) REFERENCES cars(id),
    FOREIGN KEY(sparepart_id) REFERENCES spareparts(id)
  );
`);

console.log("Database initialized.");
