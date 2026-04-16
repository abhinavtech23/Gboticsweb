import Database from 'better-sqlite3';
import path from 'path';

// Define the absolute path to the database on the D: drive
const DB_PATH = 'D:\\GboticsData\\database.sqlite';

// Initialize the database connection.
// We use a singleton pattern to avoid multiple connections in Next.js development.
const initDb = () => {
  const db = new Database(DB_PATH);

  // Enable foreign keys and WAL mode for better performance
  db.pragma('journal_mode = WAL');

  // Create the products table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      color TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed initial data if the database is completely empty
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM products');
  const result = countStmt.get() as { count: number };

  if (result.count === 0) {
    console.log("Database empty. Seeding initial products...");
    const insertStmt = db.prepare(`
      INSERT INTO products (name, category, image, description, color) 
      VALUES (?, ?, ?, ?, ?)
    `);
    
    // Original Hardcoded products
    const initialProducts = [
      ["Arma-V 900", "Robotics", "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop", "6-axis robotic arm with sub-millimeter precision for automotive assembly.", "cyan"],
      ["Nexus Core AI", "AI", "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop", "Quantum-ready processor built specifically for real-time edge robotics processing.", "blue"],
      ["Sentinel Drone", "Industrial", "https://images.unsplash.com/photo-1527430253228-e93688616381?q=80&w=2834&auto=format&fit=crop", "AI-powered drone for spatial mapping and hazardous environment inspection.", "purple"],
      ["OpticFlow Vision", "AI", "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2832&auto=format&fit=crop", "Real-time computer vision system capable of identifying microscopic defects at 120fps.", "blue"],
      ["TITAN Chassis", "Robotics", "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2670&auto=format&fit=crop", "Heavy-duty autonomous mobile robot base capable of moving 2-ton payloads.", "cyan"],
      ["Synapse OS", "Industrial", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop", "Centralized factory automation software that controls up to 10,000 nodes simultaneously.", "purple"]
    ];

    const insertMany = db.transaction((products) => {
      for (const prod of products) {
        insertStmt.run(prod[0], prod[1], prod[2], prod[3], prod[4]);
      }
    });

    insertMany(initialProducts);
  }

  return db;
};

// Next.js hot-reloading safe singleton
const globalForDb = global as unknown as { db: Database.Database };
export const db = globalForDb.db || initDb();
if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
