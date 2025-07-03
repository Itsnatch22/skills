import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { MagicLinkEmail } from '@/components/emails/MagicLink';
import { encode } from 'jwt-simple';
import { cookies } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);
const secret = process.env.JWT_SECRET!;

export async function POST(request: Request) {
  const { email } = await request.json();
  
  try {
    // Create a token that expires in 15 minutes
    const token = encode({
      email,
      exp: Date.now() + 15 * 60 * 1000 // 15 minutes
    }, secret);

    const magicLink = `${process.env.NEXTAUTH_URL}/auth/callback?token=${token}`;

    await resend.emails.send({
      from: 'Auth <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Magic Login Link',
      react: MagicLinkEmail({ url: magicLink }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}