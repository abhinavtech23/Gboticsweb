import nodemailer from 'nodemailer';

const GMAIL_USER = 'gbotics.ai@gmail.com';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || '';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Send verification email to a customer
export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const verifyUrl = `${BASE_URL}/verify?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"GBOTICS" <${GMAIL_USER}>`,
      to: email,
      subject: 'Verify your GBOTICS account',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #ffffff; padding: 40px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #00f0ff, #3b82f6); border-radius: 8px; line-height: 48px; font-size: 24px; font-weight: 900; color: white;">G</div>
            <h1 style="margin: 16px 0 0; font-size: 24px; letter-spacing: 4px;">GBOTICS</h1>
          </div>
          
          <h2 style="color: #00f0ff; font-size: 20px; margin-bottom: 16px;">Verify Your Email</h2>
          <p style="color: #a0a0b0; line-height: 1.6; margin-bottom: 24px;">
            Thank you for creating a GBOTICS account. Please click the button below to verify your email address and activate your account.
          </p>
          
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verifyUrl}" style="display: inline-block; padding: 14px 32px; background: #00f0ff; color: #000000; text-decoration: none; font-weight: 700; border-radius: 8px; font-size: 16px;">
              Verify Email Address
            </a>
          </div>
          
          <p style="color: #606070; font-size: 13px; line-height: 1.5;">
            If you didn't create an account, you can safely ignore this email.
          </p>
          <p style="color: #606070; font-size: 13px;">
            Or copy and paste this link: <br/>
            <a href="${verifyUrl}" style="color: #00f0ff; word-break: break-all;">${verifyUrl}</a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #1a1a2e; margin: 32px 0;" />
          <p style="color: #404050; font-size: 12px; text-align: center;">
            &copy; ${new Date().getFullYear()} GBOTICS. All rights reserved.
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return false;
  }
}
