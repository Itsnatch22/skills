// components/MarqueeBanner.tsx
"use client";

import { motion } from "framer-motion";

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-purple-950 py-3">
      <motion.div
        className="inline-block whitespace-nowrap text-white font-extrabold text-2xl tracking-wider px-4 animate-marquee"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "linear",
        }}
      >
        Vibe 😎 • Learn ✍️ • Chat 🗣️ • Vibe 😎 • Learn ✍️ • Chat 🗣️ • Vibe 😎 • Learn ✍️ • Chat 🗣️ • 
      </motion.div>
    </div>
  );
}
