import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function makeGeminiRequest(prompt: string, retries = 3, delay = 1000) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      return text.trim(); // Ensure clean text output
    } catch (error: any) {
      if (error.response?.status === 429 && i < retries - 1) {
        console.warn(`Gemini rate limit hit, retrying after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      } else {
        throw error;
      }
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('Missing Gemini API key');
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== 'string') {
      console.error('Invalid prompt:', prompt);
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const reply = await makeGeminiRequest(
      `You are a helpful AI assistant for SkillsConnect, a platform for sharing and discovering skills. Provide a concise, relevant response to the user's query: "${prompt}"`
    );

    if (!reply) {
      return NextResponse.json(
        { error: 'No response from Gemini API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Gemini API error:', {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    });
    return NextResponse.json(
      { error: 'Error processing your request', details: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}