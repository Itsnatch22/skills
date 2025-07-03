import { Resend } from 'resend';
import ContactEmail from '@/emails/ContactEmail';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      console.error('[Contact API] Missing fields');
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const emailHtml = ContactEmail({ name, email, message });

    const result = await resend.emails.send({
      from: 'SkillsConnect <onboarding@resend.dev>',
      to: process.env.CONTACT_RECEIVER!,
      subject: `New message from ${name}`,
      react: emailHtml,
    });

    if (result.error) {
      console.error('[Resend Error]', result.error);
      return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (err) {
    console.error('[Contact API] Unexpected error:', err);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
