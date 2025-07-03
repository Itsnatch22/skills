import { Resend } from 'resend'
import VerificationEmail from '@/email/VerificationEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method not allowed')

  const { name, email, password } = req.body

  try {
    await resend.emails.send({
      from: 'SkillsConnect <no-reply@skillsconnect.com>',
      to: email,
      subject: 'Verify your email for SkillsConnect',
      react: VerificationEmail({ email, name }),
    })

    res.status(200).json({ message: 'Verification email sent! 📬' })
  } catch (err) {
    console.error('Resend error:', err)
    res.status(500).json({ message: 'Signup failed 😢' })
  }
}
