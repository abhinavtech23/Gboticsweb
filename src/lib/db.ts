import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

// Define the absolute path to the database on the D: drive
const DB_PATH = 'D:\\GboticsData\\database.sqlite';

// Admin credentials
const ADMIN_EMAIL = 'gbotics.ai@gmail.com';
const ADMIN_PASSWORD = 'GBOTICS@ogdeck9911';

// Initialize the database connection.
const initDb = () => {
  const db = new Database(DB_PATH);

  // Enable WAL mode for better performance
  db.pragma('journal_mode = WAL');

  // Create the products table with price column
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      color TEXT NOT NULL DEFAULT 'cyan',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add price column if it doesn't exist (migration for existing DB)
  try {
    db.exec(`ALTER TABLE products ADD COLUMN price REAL NOT NULL DEFAULT 0`);
  } catch {
    // Column already exists, ignore
  }

  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT 'customer',
      is_verified INTEGER NOT NULL DEFAULT 0,
      verification_token TEXT,
      reset_token TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Seed admin account if it doesn't exist
  const adminCheck = db.prepare('SELECT id FROM users WHERE email = ?').get(ADMIN_EMAIL);
  if (!adminCheck) {
    console.log('Seeding admin account...');
    const hash = bcrypt.hashSync(ADMIN_PASSWORD, 12);
    db.prepare(`
      INSERT INTO users (email, password_hash, name, role, is_verified)
      VALUES (?, ?, ?, ?, ?)
    `).run(ADMIN_EMAIL, hash, 'GBOTICS Admin', 'admin', 1);
  }

  return db;
};

// Next.js hot-reloading safe singleton
const globalForDb = global as unknown as { db: Database.Database };
export const db = globalForDb.db || initDb();
if (process.env.NODE_ENV !== 'production') globalForDb.db = db;
