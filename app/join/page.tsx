'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiCheckCircle } from 'react-icons/fi'

export default function JoinCommunityPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [preferences, setPreferences] = useState({
    devLogs: true,
    techNews: true,
    communityEvents: true,
  })

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preferences }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')

      setShowModal(true)
      setEmail('')
      setPreferences({ devLogs: true, techNews: true, communityEvents: true })
    } catch (err: any) {
      alert(err.message || 'Join failed 💀')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <motion.form
        onSubmit={handleJoin}
        className="bg-[#111] p-8 rounded-xl max-w-md w-full space-y-6 shadow-lg border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Join the SkillsConnect Community 🚀
        </motion.h1>

        <div className="relative">
          <FiMail className="absolute top-3 left-3 text-gray-500" />
          <input
            type="email"
            required
            placeholder="your@email.com"
            autoComplete="current-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 py-2 px-4 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
            aria-label="Enter your email"
          />
        </div>

        {/* Newsletter Preferences */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Get updates on:</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.devLogs}
                onChange={() => handlePreferenceChange('devLogs')}
                disabled={isLoading}
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
              />
              <span className="text-sm text-gray-300">Dev Logs</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.techNews}
                onChange={() => handlePreferenceChange('techNews')}
                disabled={isLoading}
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
              />
              <span className="text-sm text-gray-300">Tech News</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.communityEvents}
                onChange={() => handlePreferenceChange('communityEvents')}
                disabled={isLoading}
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-600 rounded"
              />
              <span className="text-sm text-gray-300">Community Events</span>
            </label>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-medium transition disabled:opacity-50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Joining...' : 'Join Now'}
        </motion.button>
      </motion.form>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#111] p-8 rounded-xl max-w-md w-full text-center border border-gray-800"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FiCheckCircle className="text-purple-400 w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-2">
                You’re In! 🎉
              </h2>
              <p className="text-gray-400 mb-6">
                Welcome to the SkillsConnect Community! Check your inbox for a hype welcome email.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <a
                  href="/skills"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white transition"
                >
                  Explore Skills
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}