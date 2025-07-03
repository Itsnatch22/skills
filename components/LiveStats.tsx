'use client'

import { motion, useAnimation, useInView } from 'framer-motion';
import { FiGithub, FiUsers, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { getDatabase, onValue, ref as dbRef, update } from 'firebase/database';
import { app } from '@/lib/firebase';

export default function LiveStats() {
  const [stats, setStats] = useState({
    githubStars: 0,
    activeUsers: 0,
    dailyInteractions: 0,
    jobPostings: 0,
  });

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const incrementStats = async () => {
    const db = getDatabase(app);
    const statsRef = dbRef(db, 'siteStats');

    try {
      const snapshot = await new Promise((resolve) => {
        onValue(statsRef, resolve, { onlyOnce: true });
      });
      const currentStats = snapshot.val() || {
        githubStars: 0,
        activeUsers: 0,
        dailyInteractions: 0,
        jobPostings: 0,
      };

      const updatedStats = {
        githubStars: currentStats.githubStars + Math.floor(Math.random() * 5 + 1), // Random 1-5
        activeUsers: currentStats.activeUsers + Math.floor(Math.random() * 3 + 1), // Random 1-3
        dailyInteractions: currentStats.dailyInteractions + Math.floor(Math.random() * 10 + 5), // Random 5-15
        jobPostings: currentStats.jobPostings + Math.floor(Math.random() * 2 + 1), // Random 1-2
      };

      await update(statsRef, updatedStats);
    } catch (error) {
      console.error('Failed to increment stats:', error);
    }
  };

  useEffect(() => {
    if (!isInView) return;

    // Real-time listener for Firebase stats
    const db = getDatabase(app);
    const statsRef = dbRef(db, 'siteStats');

    const unsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val() || {
        githubStars: 0,
        activeUsers: 0,
        dailyInteractions: 0,
        jobPostings: 0,
      };
      setStats(data);
    });

    // Auto-increment stats every 10 seconds (adjust for production)
    const interval = setInterval(incrementStats, 10000);

    return () => {
      unsubscribe(); // Clean up listener
      clearInterval(interval); // Clean up interval
    };
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
    }
  }, [isInView, controls]);

  const statCards = [
    {
      icon: <FiGithub className="w-6 h-6" />,
      title: 'GitHub Stars',
      value: stats.githubStars,
      change: '+3 today',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+2.1% this week',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: 'Daily Interactions',
      value: stats.dailyInteractions,
      change: '+5.3% from yesterday',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: 'Job Postings',
      value: stats.jobPostings,
      change: '+1 new today',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section className="py-16 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          ref={ref}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            Platform Growth
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1 },
                }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm hover:border-gray-600 transition-all"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${card.color} mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <div className="flex items-end mb-2">
                  <motion.span
                    key={card.value}
                    className="text-3xl font-bold mr-2"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    {card.value.toLocaleString()}
                  </motion.span>
                  <span className="text-sm text-green-400 flex items-center">
                    <FiTrendingUp className="mr-1" />
                    {card.change}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className={`bg-gradient-to-r ${card.color} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((card.value % 1000) / 10, 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}