'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Video } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { FiMail, FiCheck } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Webinar = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export default function WebinarsComingSoon() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    dev: true,
    design: true,
    career: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webinars, setWebinars] = useState<Webinar[]>([]);

  useEffect(() => {
    const fetchWebinars = async () => {
      const { data } = await supabase.from('webinars').select('*');
      setWebinars(data || []);
    };

    fetchWebinars();
  }, []);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return alert('Please enter a valid email! 😅');
    await supabase.from('webinar_signups').insert({
      email: session?.user?.email || email,
      preferences,
    });
    setIsSubmitted(true);
    setEmail('');
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-xl"
      >
        <div className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Live Webinars 🎥
        </div>
        <p className="text-lg text-gray-400 mb-6">
          Connect, learn, and grow with developers around the world.{' '}
          <span className="text-white font-medium">Coming soon to SkillsConnect.</span>
        </p>

        <div className="bg-gray-900 p-6 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-4">Get Notified</h3>
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full pl-10 py-2 px-4 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isSubmitted}
              aria-label="Enter email for webinar notifications"
            />
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-sm text-gray-400">Interested in:</p>
            <div className="flex flex-col gap-2">
              {['dev', 'design', 'career'].map(key => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={preferences[key as keyof typeof preferences]}
                    onChange={() => handlePreferenceChange(key as keyof typeof preferences)}
                    disabled={isSubmitted}
                    className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
                  />
                  <span className="text-sm text-gray-300">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2 mx-auto disabled:opacity-50"
            aria-label="Sign up for webinar notifications"
          >
            {isSubmitted ? <FiCheck /> : <CalendarDays size={18} />}
            {isSubmitted ? 'Signed Up!' : 'Notify Me'}
          </motion.button>
        </div>

        {webinars.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Upcoming Webinars</h3>
            <div className="grid gap-4">
              {webinars.map((webinar, index) => (
                <motion.div
                  key={webinar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <h4 className="text-white font-semibold">{webinar.title}</h4>
                  <p className="text-gray-400 text-sm">{webinar.description}</p>
                  <p className="text-gray-500 text-xs mt-2">{new Date(webinar.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
        className="absolute bottom-12 opacity-10"
      >
        <Video size={180} className="text-blue-500" />
      </motion.div>
    </div>
  );
}