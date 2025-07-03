'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiShield } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

 const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data.success) throw new Error(data.error || 'Failed to subscribe');

    setEmail('');
    alert('Subscribed! Check your inbox 📨');
  } catch (err) {
    console.error(err);
    setError('Failed to subscribe. Try again later.');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <footer className="text-gray-300 border-t border-gray-800 bg-purple-500/10">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                SkillsConnect
              </span>
            </Link>
            <p className="text-sm">
                SkillsConnect is your go-to platform for discovering and mastering essential skills in today&apos;s digital landscape. Join our community to learn, share, and grow together.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FiGithub, url: 'https://github.com' },
                { icon: FiTwitter, url: 'https://twitter.com' },
                { icon: FiLinkedin, url: 'https://linkedin.com' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Insights', href: '/insights' },
                { name: 'Skills', href: '/skills' },
                { name: 'Message', href: '/message' },
                { name: 'Contact', href: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: 'Documentation', href: '/resources/docs' },
                { name: 'Blog', href: '/resources/blog' },
                { name: 'Cheat Sheets', href: '/resources/cheats' },
                { name: 'Webinars', href: '/resources/webinars' },
                { name: 'FAQ', href: '/resources/faq' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest courses and updates.
            </p>
            <form className="flex" onSubmit={handleSubmit}>
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 p-2 text-sm"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                {error && (
                   <div className="mt-2 text-red-500 text-sm">{error}</div>
          )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} SkillsConnect. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <p className='text-xs text-gray-500 hover:text-gray-300 animate-pulse'>
            <FiShield className="inline-block mr-1 text-green-500" />
            All Systems Operational
          </p>
        </motion.div>
        <p 
        className='hidden md:flex lg:items-center text-sm justify flex-col mt-10 md:mt-4
        text-gray-500'>Design and backend made possible by ChatGPT</p>
      </div>
    </footer>
  );
}