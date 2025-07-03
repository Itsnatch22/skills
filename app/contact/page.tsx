'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResponseMessage(data.message);

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setResponseMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-gradient-to-br from-purple-500/10 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-5 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Get in Touch <span className="ml-1">💬</span>
        </h2>

        <input
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50 transition-all"
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50 transition-all"
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/50 transition-all"
          name="message"
          rows={5}
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full p-4 rounded-xl text-white font-semibold transition-all
            ${status === 'sending'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800'}
          `}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status !== 'idle' && (
          <p
            className={`text-sm text-center ${
              status === 'success'
                ? 'text-green-600'
                : status === 'error'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {responseMessage}
          </p>
        )}
      </form>
    </div>
  );
}
