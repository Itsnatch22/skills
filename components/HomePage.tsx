'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { clearInterval } from 'timers'

export default function HomePage() {
  const cardRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    )

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [])

  const words = ['Skills', 'Collabs', 'Projects' , 'People' , 'Systems'];
  const [index,setIndex] = useState(0);

  return (
    <main className="min-h-screen  text-white flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12">
      {/* LEFT CONTENT */}
      <div className="flex flex-col gap-6 md:w-1/2">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Link up with <span className="text-purple-500 bg-gray-300 rounded-xl px-6">{words[index]}</span> That Matter.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg text-gray-300 max-w-lg"
        >
          Explore. Learn. Elevate your craft with skilled individuals and vibrant communities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex gap-4 mt-4"
        >
          <Link href="/skills"
          className="px-5 py-2 border border-purple-500 rounded-md hover:shadow-[0_0_10px_#a855f7] transition-shadow"
          >
              Explore Skills
          </Link>
          <Link href="/join"
          className="px-5 py-2 border border-white rounded-xl hover:bg-white hover:text-black transition duration-300"
          >
              Join Community
          </Link>
        </motion.div>
      </div>

      {/* RIGHT IMAGE */}
      <div ref={cardRef} className="mt-10 md:mt-0 md:w-1/2 flex justify-center items-center">
        <Image
          src="/people.png" 
          alt="SkillsConnect Hero"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
         <div className="animate-bounce flex flex-col items-center">
          <span className="text-sm text-white mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2"></div>
          </div>
         </div>
      </div>
    </main>
  )
}
