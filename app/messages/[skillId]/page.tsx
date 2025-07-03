'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { skillsData, type Skill } from '@/types/skills';
import { mockReplies, type MockReply } from '@/types/mockReplies';
import { FiArrowLeft, FiSend, FiLoader } from 'react-icons/fi';
import { useSession } from 'next-auth/react';
import { timeStamp } from 'console';

export default function MessagesPage() {
  const { data: session, status } = useSession();
  const { skillId } = useParams();
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState<{sender: 'user' | 'other'; text: string; timestamp: Date}[]>([]);
  const [ isSending, setIsSending ] = useState(false);
  const [ conversationPhase, setConversationPhase] = useState(0);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const skill = skillsData.find(skill => skill.id === skillId);
  const recipient = skill ? skill.postedBy : null;
  const replies = mockReplies.find(reply => reply.skillId === skillId)?.replies || [];
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if( status === 'unauthenticated'){
      router.push('/login');
    }
    if(!skill && status === 'authenticated'){
      router.push('/skills')
    }
  }, [skill, router, status]);

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    setIsSending(true);
    const newMessage = {
      sender: 'user' as const,
      text: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    const phaseReplies = replies.filter(reply => reply.phase === conversationPhase);
    
    phaseReplies.forEach((reply, index) => {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'other' as const,
            text: reply.text,
            timestamp: new Date(),
          },
        ]);
        if (index === phaseReplies.length - 1) {
          setIsSending(false);
          if (replies.some(r => r.phase === conversationPhase + 1)) {
            setConversationPhase(prev => prev + 1);
          }
        }
      }, reply.delay);
    });

    if (phaseReplies.length === 0) {
      setIsSending(false);
    }
  };

  if (status !== 'authenticated' || !skill || !recipient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FiLoader className="animate-spin text-purple-600" size={24} />
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-3xl py-12 px-4 bg-white min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div className="flex items-center">
          <button
            onClick={() => router.push('/skills')}
            className="p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors mr-3"
            aria-label="Back to skills"
          >
            <FiArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <img
              src={recipient.avatar}
              alt={recipient.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{recipient.name}</h2>
              <p className="text-sm text-gray-500">{recipient.role}</p>
              <p className="text-sm text-purple-600 font-medium">About: {skill.name}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6 h-[60vh] overflow-y-auto">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500 py-12"
            >
              Start the conversation about {skill.name}! 🚀
            </motion.div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={`Message ${recipient.name} about ${skill.name}...`}
          className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending || !message.trim()}
          className="absolute right-2 p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {isSending ? <FiLoader className="animate-spin" size={20} /> : <FiSend size={20} />}
        </button>
      </motion.div>
    </div>
  );
}