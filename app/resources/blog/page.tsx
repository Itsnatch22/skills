'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import Head from 'next/head';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: "Building Authentication with NextAuth & Supabase",
      snippet: "A complete guide to integrating OAuth providers with Supabase for seamless user login.",
      date: "June 2025",
      category: "Development",
      readTime: "5 min read",
      image: "/images/auth-article.jpg",
    },
    {
      id: 2,
      title: "Styling Your Web App with Tailwind & Framer Motion",
      snippet: "Make your site feel alive with utility classes and slick animations.",
      date: "May 2025",
      category: "Design",
      readTime: "4 min read",
      image: "/images/styling-article.jpg",
    },
    {
      id: 3,
      title: "Why Supabase is a Game-Changer for Devs",
      snippet: "Ditch Firebase? Learn why Supabase might be the better open-source option.",
      date: "April 2025",
      category: "Development",
      readTime: "6 min read",
      image: "/images/supabase-article.jpg",
    },
    {
      id: 4,
      title: "The Future of Skills Platforms: Our Vision",
      snippet: "Explore what's next for SkillsConnect — from AI search to career tools.",
      date: "March 2025",
      category: "Company",
      readTime: "8 min read",
      image: "/images/future-article.jpg",
    },
  ];

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Head>
        <title>Blog | SkillsConnect</title>
        <meta name="description" content="Latest thoughts, updates, and tips for developers and users" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">📝 Blog</h1>
            <p className="text-gray-400 text-lg">
              Latest thoughts, updates, and tips for devs & users.
            </p>
          </motion.div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
              <div className="relative w-full md:w-1/2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full bg-gray-800 rounded-lg py-3 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold px-2 py-1 bg-purple-900 text-purple-200 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 mb-4">{post.snippet}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        <button className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
                          Read more
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-300">
                No articles found
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}