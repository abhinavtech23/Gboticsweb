import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail, verifyPassword, createSession, SESSION_COOKIE } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const passwordValid = verifyPassword(password, user.password_hash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if customer account is verified (admin is always verified)
    if (user.role !== 'admin' && !user.is_verified) {
      return NextResponse.json(
        { error: 'Please verify your email before logging in. Check your inbox.' },
        { status: 403 }
      );
    }

    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'admin' | 'customer',
      is_verified: Boolean(user.is_verified),
    };

    const token = createSession(userPayload);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
