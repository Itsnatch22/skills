'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import { app } from '@/lib/firebase';
import { FiPlus, FiThumbsUp, FiLoader } from 'react-icons/fi';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  upvotes: string[];
  isAI: boolean;
};

export default function FAQPage() {
  const { data: session } = useSession();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const db = getDatabase(app);
    const faqsRef = ref(db, 'faqs');

    const unsubscribe = onValue(faqsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedFaqs = Object.entries(data).map(([id, faq]: [string, any]) => ({
          id,
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          upvotes: faq.upvotes || [],
          isAI: faq.isAI || false,
        }));
        setFaqs(loadedFaqs);
      } else {
        setFaqs([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];

  const filteredFaqs = faqs.filter(faq =>
    activeCategory === 'All' || faq.category === activeCategory
  );

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubmitQuestion = async () => {
    if (!session || !newQuestion.trim() || isGenerating) return;

    setIsGenerating(true);
    const db = getDatabase(app);
    const faqsRef = ref(db, 'faqs');

    try {
      // Call Cohere API to generate answer
      const response = await fetch('/api/cohere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: newQuestion }),
      });

      const { answer } = await response.json();
      if (!answer) throw new Error('No answer from Cohere');

      // Store in Firebase
      await push(faqsRef, {
        question: newQuestion,
        answer: answer || 'Our team will answer soon!',
        category: 'Pending',
        upvotes: [],
        isAI: true,
      });

      setNewQuestion('');
    } catch (error) {
      console.error('Failed to generate FAQ:', error);
      alert('Oops, something went wrong generating your FAQ! 😅 Try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpvote = async (id: string) => {
    if (!session) return alert('Sign in to upvote! 😅');
    const userEmail = session.user?.email!;
    const faq = faqs.find(f => f.id === id);
    const upvotes = faq?.upvotes.includes(userEmail)
      ? faq.upvotes.filter(email => email !== userEmail)
      : [...faq!.upvotes, userEmail];

    const db = getDatabase(app);
    await update(ref(db, `faqs/${id}`), { upvotes });
  };

  return (
    <>
      <Head>
        <title>FAQ | SkillsConnect</title>
        <meta name="description" content="Frequently asked questions about SkillsConnect platform" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">❓ FAQ</h1>
            <p className="text-gray-400 text-lg">Got questions? Our AI’s got answers, or we’ll get you sorted!</p>
          </motion.div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
            {session && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Ask a question, and our AI will answer..."
                  className="w-full bg-gray-800 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmitQuestion()}
                  disabled={isGenerating}
                  aria-label="Submit new FAQ"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSubmitQuestion}
                  disabled={isGenerating || !newQuestion.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg disabled:opacity-50"
                  aria-label="Submit question"
                >
                  {isGenerating ? <FiLoader className="animate-spin" /> : <FiPlus />}
                </motion.button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white pr-4">
                      {faq.question} {faq.isAI && <span className="text-xs text-purple-400">AI</span>}
                    </h2>
                    <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                      id={`faq-answer-${faq.id}`}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-gray-300">{faq.answer}</p>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded-full">{faq.category}</span>
                          <button
                            onClick={() => handleUpvote(faq.id)}
                            className="flex items-center gap-1 text-gray-400 hover:text-purple-400"
                            aria-label="Upvote FAQ"
                          >
                            <FiThumbsUp className={faq.upvotes.includes(session?.user?.email || '') ? 'text-purple-400' : ''} />
                            <span>{faq.upvotes.length}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-300">No FAQs found in this category</h3>
              <p className="mt-2 text-gray-500">Try selecting a different category or ask a new question!</p>
            </motion.div>
          )}

          <div className="mt-12 bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-4">Can't find what you're looking for? Our support team is ready to vibe with you.</p>
            <Link href="/contact" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}