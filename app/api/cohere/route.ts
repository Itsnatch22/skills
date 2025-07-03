import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Invalid question' }, { status: 400 });
    }

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-r-plus',
        prompt: `You are an AI assistant for SkillsConnect, a platform for developers to share and learn skills. Provide a concise, helpful answer to the following user question in the context of a FAQ about the platform: "${question}"`,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const answer = data.generations?.[0]?.text?.trim() || null;

    if (!answer) {
      return NextResponse.json({ error: 'Failed to generate answer' }, { status: 500 });
    }

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('Cohere API error:', error);
    return NextResponse.json({ error: 'Error generating answer', details: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}