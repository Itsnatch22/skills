import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import AdminEmail from '@/emails/AdminEmail';
import SubscriberEmail from '@/emails/Subscriber';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Send to Admin (you)
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: '🔥 New Newsletter Subscriber',
      react: AdminEmail({ email }),
    });

    // Send to Subscriber
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Welcome to the Squad! 🎉',
      react: SubscriberEmail({ email }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Resend error:', error);
    return NextResponse.json({ success: false, error: 'Something went wrong' }, { status: 500 });
  }
}
