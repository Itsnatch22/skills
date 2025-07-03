'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiCpu, FiBookOpen, FiShare2 } from 'react-icons/fi'

export default function InsightsPage() {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categoryIcons = {
    'AI Trends': <FiTrendingUp />,
    'DevOps': <FiCpu />,
    'Education': <FiBookOpen />,
    'Blockchain': <FiTrendingUp />,
    'Frontend': <FiCpu />,
    'Career Growth': <FiBookOpen />,
    'Tech News': <FiTrendingUp />,
  }

  const categories = ['All', ...new Set(insights.map((insight) => insight.category))]

  useEffect(() => {
    const fetchInsights = async () => {
      try {

        const response = await fetch(
          'https://newsapi.org/v2/top-headlines?category=technology&apiKey=cb62c61d310d48b4b10ffff231422fb6'
        )
        if (!response.ok) throw new Error('Failed to fetch news')

        const data = await response.json()

        // Transform API data to match insight card structure
        const fetchedInsights = data.articles.slice(0, 6).map((article, index) => ({
          id: index + 1,
          title: article.title,
          category: article.source.name || 'Tech News',
          description: article.description || 'No description available.',
          image: article.urlToImage || '/insights/placeholder.jpg',
          icon: categoryIcons[article.source.name] || <FiTrendingUp />,
          url: article.url, // For sharing
        }))

        setInsights(fetchedInsights)
        setLoading(false)
      } catch (err) {
        setError('Whoops, couldn’t load the latest news! Try again later. 😅')
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // Handle share button click
  const handleShare = async (title, url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
          text: `Check out this article on SkillsConnect: ${title}`,
        })
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard! 🚀')
      }
    } catch (err) {
      console.error('Share failed:', err)
      alert('Failed to share, try again! 😅')
    }
  }

  // Filter insights based on selected category
  const filteredInsights = selectedCategory === 'All'
    ? insights
    : insights.filter((insight) => insight.category === selectedCategory)

  return (
    <motion.div 
      className="min-h-screen bg-black text-white px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🧠 Hero */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Real-Time Insights. Evolved. 🚀
        </motion.h1>
        <motion.p 
          className="text-gray-400 text-lg md:text-xl mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Dive into dev trends, platform growth, and wild data analytics – powered by SkillsConnect AI.
        </motion.p>
        {/* Category Filter Dropdown */}
        <motion.div
          className="relative inline-block text-left"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <select
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            aria-label="Filter insights by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </motion.div>
      </div>

      {/* 🎯 Insight Cards */}
      {loading ? (
        <div className="text-center text-gray-400 text-lg">
          Loading the latest tech vibes... 🔄
        </div>
      ) : error ? (
        <div className="text-center text-red-400 text-lg">
          {error}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredInsights.length === 0 ? (
            <div className="text-center text-gray-400 text-lg col-span-full">
              No insights found for this category. Try another! 😎
            </div>
          ) : (
            filteredInsights.map((insight, i) => (
              <motion.div 
                key={insight.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl text-purple-400">
                      {insight.icon}
                    </div>
                    <button
                      onClick={() => handleShare(insight.title, insight.url)}
                      className="text-gray-400 hover:text-purple-400 transition"
                      aria-label={`Share ${insight.title}`}
                    >
                      <FiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{insight.title}</h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{insight.category}</span>
                  <p className="text-sm text-gray-400 mt-3">{insight.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  )
}