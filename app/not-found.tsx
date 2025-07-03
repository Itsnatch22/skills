'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiCode, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function NotFound() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = [
      '$ checking page...',
      '$ error 404: page not found',
      '$ running diagnostics...',
      '$ suggestion: return to homepage'
    ];

    let currentMessage = 0;
    let currentChar = 0;
    let timeout: NodeJS.Timeout;

    const typeWriter = () => {
      if (terminalRef.current && currentMessage < messages.length) {
        if (currentChar <= messages[currentMessage].length) {
          terminalRef.current.innerHTML = messages
            .slice(0, currentMessage)
            .join('<br/>') + 
            '<br/>' + 
            messages[currentMessage].substring(0, currentChar) + 
            '<span class="animate-pulse">█</span>';
          currentChar++;
          timeout = setTimeout(typeWriter, Math.random() * 50 + 50);
        } else {
          currentMessage++;
          currentChar = 0;
          timeout = setTimeout(typeWriter, 800);
        }
      }
    };

    typeWriter();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen text-gray-100 flex flex-col items-center justify-center p-6">
      {/* Binary code background animation */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Terminal window */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700 mb-12"
        >
          <div className="flex items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <FiTerminal className="mr-2" />
              <span>terminal</span>
            </div>
          </div>
          <div 
            ref={terminalRef}
            className="p-4 font-mono text-green-400 h-32 overflow-y-auto"
          ></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            404
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist in our codebase.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="relative group px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium flex items-center justify-center"
            >
              <span>Return to Homepage</span>
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn"
              className="relative group px-6 py-3 border border-gray-600 hover:border-blue-400 rounded-lg font-medium flex items-center justify-center"
            >
              <FiCode className="mr-2" />
              <span>Explore Learning Paths</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating code elements */}
      <motion.div
        className="absolute left-10 bottom-20 text-gray-400 opacity-60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="font-mono text-sm block">{"// 404 page not found"}</span>
      </motion.div>
      <motion.div
        className="absolute right-10 top-1/3 text-gray-400 opacity-60"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <span className="font-mono text-sm block">{"<ErrorPage />"}</span>
      </motion.div>
    </div>
  );
}