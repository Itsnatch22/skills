'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Kairo Tanaka',
    title: 'Creative Director, NovaForm',
    quote: 'Natch and his team redefined our design pipeline. Smooth, precise, and scary futuristic.',
    avatar: '/avatars/kairo.jpg',
  },
  {
    id: 2,
    name: 'Yelena Dusk',
    title: 'Founder, DuskLab Studios',
    quote: 'The energy, the execution, the aesthetics—🔥! This was more than a collab, it was a statement.',
    avatar: '/avatars/yelena.jpg',
  },
  {
    id: 3,
    name: 'Omari Reeves',
    title: 'CTO, PhaseZero',
    quote: 'We didn’t just build a product—we launched an experience. Respect to the craft, fam.',
    avatar: '/avatars/omari.jpg',
  }
];

export function StudioTestimonials() {
  return (
    <section className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-blue-500/30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white">Client Voices</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Real words from real humans. Proof that bold work creates lasting impact.
        </p>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:shadow-2xl hover:border-white/20 transition duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-white">{t.name}</p>
                <p className="text-sm text-gray-400">{t.title}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">"{t.quote}"</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
