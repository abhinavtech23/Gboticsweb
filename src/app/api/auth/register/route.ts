import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = getUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Hash password and create user
    const passwordHash = hashPassword(password);
    db.prepare(`
      INSERT INTO users (email, password_hash, name, role, is_verified, verification_token)
      VALUES (?, ?, ?, 'customer', 0, ?)
    `).run(normalizedEmail, passwordHash, name || '', verificationToken);

    // Send verification email
    const emailSent = await sendVerificationEmail(normalizedEmail, verificationToken);

    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Account created! Please check your email to verify your account.'
        : 'Account created! Email verification could not be sent. Please contact support.',
      emailSent,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
