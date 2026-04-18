import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'gbotics_fallback_secret';
const SESSION_COOKIE = 'gbotics_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface UserPayload {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'customer';
  is_verified: boolean;
}

export interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: string;
  is_verified: number;
  verification_token: string | null;
  created_at: string;
}

// Hash a password
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12);
}

// Verify a password against a hash
export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

// Create a JWT token
export function createToken(user: UserPayload): string {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify a JWT token
export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    return decoded;
  } catch {
    return null;
  }
}

// Create a session for a user
export function createSession(user: UserPayload): string {
  const token = createToken(user);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();

  // Clean up old sessions for this user
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(user.id);

  // Insert new session
  db.prepare('INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)').run(
    user.id,
    token,
    expiresAt
  );

  return token;
}

// Validate a session token
export function validateSession(token: string): UserPayload | null {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  // Check if session exists and hasn't expired
  const session = db.prepare(
    "SELECT * FROM sessions WHERE token = ? AND expires_at > datetime('now')"
  ).get(token) as { user_id: number } | undefined;

  if (!session) return null;

  return decoded;
}

// Get current user from cookies (for server components)
export async function getCurrentUser(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return validateSession(token);
}

// Get user by email
export function getUserByEmail(email: string): DbUser | undefined {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email) as DbUser | undefined;
}

// Get user by ID
export function getUserById(id: number): DbUser | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as DbUser | undefined;
}

// Delete session
export function deleteSession(token: string): void {
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

// Session cookie name export
export { SESSION_COOKIE };
