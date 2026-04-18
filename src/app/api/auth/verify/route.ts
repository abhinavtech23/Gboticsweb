import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Find user with this verification token
    const user = db.prepare(
      'SELECT id, email, is_verified FROM users WHERE verification_token = ?'
    ).get(token) as { id: number; email: string; is_verified: number } | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 404 }
      );
    }

    if (user.is_verified) {
      return NextResponse.json({
        success: true,
        message: 'Email already verified. You can log in.',
        already_verified: true,
      });
    }

    // Mark user as verified and clear token
    db.prepare(
      'UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?'
    ).run(user.id);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully! You can now log in.',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
