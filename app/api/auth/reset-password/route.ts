import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ResetPasswordEmail } from '@/components/emails/ResetPassword';
import { encode } from 'jwt-simple';

const resend = new Resend(process.env.RESEND_API_KEY);
const secret = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  const { email } = await request.json();
  
  try {
    // Create a token that expires in 1 hour
    const token = encode({
      email,
      exp: Date.now() + 60 * 60 * 1000 // 1 hour
    }, secret);

    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'Auth <auth@yourdomain.com>',
      to: [email],
      subject: 'Reset Your Password',
      react: ResetPasswordEmail({ url: resetLink }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send reset email' },
      { status: 500 }
    );
  }
}