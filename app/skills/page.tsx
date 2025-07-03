'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories, type Skill, type SkillCategory } from '@/types/skills';
import { FiMessageSquare, FiExternalLink, FiSearch, FiX, FiLoader } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { skillsData } from '@/types/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('standard');
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skillsData);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const subscribed = localStorage.getItem('issubscribed');
    if (subscribed === 'true') {
      router.push('/login');
    }
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll('.skill-card'), {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, [filteredSkills, router]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSkills(
        activeCategory === 'All'
          ? skillsData
          : skillsData.filter(skill => skill.category === activeCategory)
      );
      return;
    }

    if (searchMode === 'standard') {
      const results = skillsData.filter(
        skill =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredSkills(
        activeCategory === 'All'
          ? results
          : results.filter(skill => skill.category === activeCategory)
      );
    }
  }, [searchQuery, activeCategory, searchMode]);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();
      setAiResponse(data.response);

      const aiSuggestedSkills = data.suggestedSkills || [];
      setFilteredSkills(
        skillsData.filter(
          skill =>
            aiSuggestedSkills.includes(skill.name) ||
            skill.tags.some(tag => aiSuggestedSkills.includes(tag))
        )
      );
    } catch (error) {
      setAiResponse('Failed to get AI response. Showing standard results.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={sectionRef} className="mx-auto py-12 px-4 bg-white">
      {/* Search Section */}
      <div className="mb-12">
        <motion.div
          className={`search-container ${searchMode === 'ai' ? 'ai-active' : ''}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex items-center">
            <div className="absolute left-4 text-gray-400">
              {searchMode === 'ai' ? <AiOutlineRobot /> : <FiSearch />}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                searchMode === 'ai'
                  ? "Ask AI about skills (e.g. 'What skills do I need for web design?')"
                  : "Search skills (e.g. 'React', 'Figma')"
              }
              className="w-full pl-12 pr-24 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
              onKeyDown={e => {
                if (e.key === 'Enter' && searchMode === 'ai') {
                  handleAISearch();
                }
              }}
            />
            <div className="absolute right-4 flex space-x-2">
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setAiResponse('');
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX />
                </button>
              )}
              <button
                onClick={() => {
                  setSearchMode(prev => (prev === 'ai' ? 'standard' : 'ai'));
                  setAiResponse('');
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  searchMode === 'ai'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {searchMode === 'ai' ? 'AI Mode' : 'Standard'}
              </button>
              {searchMode === 'ai' && (
                <button
                  onClick={handleAISearch}
                  disabled={isLoading || !searchQuery.trim()}
                  className="px-4 py-1 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin mr-1" />
                      Asking...
                    </>
                  ) : (
                    'Ask AI'
                  )}
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-purple-50 border border-purple-100 rounded-lg"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 mr-3 text-purple-600">
                    <AiOutlineRobot />
                  </div>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">AI Assistant:</p>
                    <p>{ aiResponse}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === 'All'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map(skill => (
            <motion.div
              key={skill.id}
              className="skill-card bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              whileHover={{ y: -5 }}
              layout
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
                    <span className="inline-block px-2 py-1 mt-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
                    {skill.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{skill.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={skill.postedBy.avatar}
                      alt={skill.postedBy.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">{skill.postedBy.name}</p>
                      <p className="text-xs text-gray-500">{skill.postedBy.role}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => window.open(skill.resourceURL, '_blank')}
                      className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                      aria-label="Learn this skill"
                    >
                      <FiExternalLink />
                    </button>
                    <button
                      onClick={() => router.push(`/messages/${skill.id}`)}
                      className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                      aria-label={`Message ${skill.postedBy.name}`}
                    >
                      <FiMessageSquare />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try a different search term' : 'No skills available in this category'}
          </p>
        </motion.div>
      )}
    </div>
  );
}