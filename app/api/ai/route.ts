// app/api/ai/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { skillsData } from '@/types/skills';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { query, provider = 'gemini' } = body;

    const allSkills = skillsData.map(s => s.name);
    const allCategories = [...new Set(skillsData.map(s => s.category))];
    const allTags = [...new Set(skillsData.flatMap(s => s.tags))];

    const prompt = `
You're a skills advisor for SkillsConnect.

User query: "${query}"

Available skills: ${allSkills.join(', ')}
Available categories: ${allCategories.join(', ')}
Available tags: ${allTags.join(', ')}

Your tasks:
1. Provide a helpful response to the user's query
2. Suggest relevant skills from our database (return as array in suggestedSkills)
3. If asking about learning paths, suggest a sequence of skills

Respond in this JSON format:
{
  "response": "your text response",
  "suggestedSkills": ["skill1", "skill2"]
}
`.trim();

    // 🧠 GEMINI
    if (provider === 'gemini') {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(prompt);
      const rawText = result.response.text();
      const cleanText = rawText.replace(/```json|```/g, '').trim();
      return new Response(cleanText, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 🧠 OPENAI
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      messages: [
        { role: 'system', content: 'You are a helpful skills advisor for SkillsConnect.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const content = chatCompletion.choices[0].message.content || '';
    const cleanText = content.replace(/```json|```/g, '').trim();
    return new Response(cleanText, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('AI handler error:', err);
    return new Response(JSON.stringify({
      response: "AI request failed. Here are all available skills:",
      suggestedSkills: skillsData.map(s => s.name),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
