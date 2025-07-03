'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiLoader } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { app } from '@/lib/firebase';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

export default function AIAssistant() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load messages from Firebase
  useEffect(() => {
    if (!session || !isOpen) return;

    const db = getDatabase(app);
    const messagesRef = ref(db, `chat/${session.user?.email?.replace(/\./g, '_')}`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          sender: msg.sender,
          content: msg.content,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(loadedMessages);
      }
    });

    return () => unsubscribe();
  }, [session, isOpen]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // Save user message to Firebase
    const db = getDatabase(app);
    const messagesRef = ref(db, `chat/${session.user?.email?.replace(/\./g, '_')}`);
    await push(messagesRef, {
      sender: 'user',
      content: userMessage.content,
      timestamp: userMessage.timestamp.toISOString(),
    });

    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input.trim() }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: data.reply || 'Sorry, I got nothing! Try again? 😅',
        timestamp: new Date(),
      };

      // Save AI message to Firebase
      await push(messagesRef, {
        sender: 'ai',
        content: aiMessage.content,
        timestamp: aiMessage.timestamp.toISOString(),
      });

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: 'Oops, something broke! Try again later. 💀',
        timestamp: new Date(),
      };
      await push(messagesRef, {
        sender: 'ai',
        content: errorMessage.content,
        timestamp: errorMessage.timestamp.toISOString(),
      });
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Don't render for unauthenticated users
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg"
        aria-label="Toggle AI Assistant"
      >
        <FiMessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center">
                <AiOutlineRobot className="text-purple-600 mr-2" />
                <h3 className="text-sm font-semibold text-gray-900">SkillsConnect AI</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-600 hover:text-gray-800"
                aria-label="Close AI Assistant"
              >
                <FiX />
              </button>
            </div>

            <div className="p-4 max-h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  Ask about skills, e.g., "What skills are needed for web development?"
                </p>
              ) : (
                messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-3 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-3"
                >
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <span className="text-sm text-gray-600 flex items-center">
                      <FiLoader className="animate-spin mr-2" />
                      AI is typing...
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
                  disabled={isLoading}
                  aria-label="Type your message"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="ml-2 p-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg disabled:opacity-50"
                  aria-label="Send message"
                >
                  <FiSend />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}