import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, update } from 'firebase/database';
import { app } from '@/lib/firebase';

export async function POST(req: NextRequest) {
  try {
    const { skillId, userEmail, recipientEmail, isTyping } = await req.json();

    if (!skillId || !userEmail || !recipientEmail || typeof isTyping !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing or invalid parameters' },
        { status: 400 }
      );
    }

    const db = getDatabase(app);
    const chatId = [userEmail, recipientEmail]
      .sort()
      .join('_')
      .replace(/\./g, '_');
    const typingRef = ref(db, `typing/${skillId}/${chatId}/${userEmail.replace(/\./g, '_')}`);

    await update(typingRef, { isTyping });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Typing API error:', error);
    return NextResponse.json(
      { error: 'Error updating typing status', details: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}