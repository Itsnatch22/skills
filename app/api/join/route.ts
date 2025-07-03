import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from '@/lib/firebase'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiter (for demo; use Redis in production)
const rateLimitMap = new Map()
const RATE_LIMIT = 5 // Max requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()

    // Rate limiting
    const clientRequests = rateLimitMap.get(clientIp) || []
    const recentRequests = clientRequests.filter((timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW)
    
    if (recentRequests.length >= RATE_LIMIT) {
      return NextResponse.json({ error: 'Too many requests, try again later!' }, { status: 429 })
    }

    rateLimitMap.set(clientIp, [...recentRequests, now])

    const { email, preferences } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Store in Firebase
    const db = getDatabase(app)
    const subscriberRef = ref(db, `subscribers/${email.replace(/\./g, '_')}`)
    await set(subscriberRef, {
      email,
      preferences: preferences || { devLogs: true, techNews: true, communityEvents: true },
      joinedAt: new Date().toISOString(),
    })

    // Send welcome email 📨
    await resend.emails.send({
      from: 'SkillsConnect <onboarding@resend.dev>',
      to: email,
      subject: '🎉 Welcome to the SkillsConnect Community!',
      html: `
        <div style="font-family:sans-serif; padding:24px; background:#111; color:#fff; border-radius:12px">
          <h2>Yo, ${email.split('@')[0]}! Welcome to SkillsConnect! 👋</h2>
          <p>We're stoked to have you in the community!</p>
          <p>Expect dope updates on ${Object.keys(preferences).filter(key => preferences[key]).join(', ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}.</p>
          <p>Ready to dive in? <a href="https://localhost:3000/skills" style="color:#a78bfa; text-decoration:underline;">Explore skills now</a>!</p>
          <p>– The SkillsConnect Crew 💜</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Join API error 💀:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}