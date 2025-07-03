'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink } from 'react-icons/fi'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const logos = [
  {
    name: 'GitHub',
    src: '/vibes/github.png',
    url: 'https://github.com',
    color: '#181717'
  },
  {
    name: 'Duolingo',
    src: '/vibes/duolingo.png',
    url: 'https://duolingo.com',
    color: '#58CC02'
  },
  {
    name: 'Upwork',
    src: '/vibes/upwork.png',
    url: 'https://upwork.com',
    color: '#6FDA44'
  },
  {
    name: 'LinkedIn',
    src: '/vibes/linkedin.png',
    url: 'https://linkedin.com',
    color: '#0A66C2'
  },
  {
    name: 'CodeCademy',
    src: '/vibes/codecademy.png',
    url: 'https://codecademy.com',
    color: '#303F9F'
  },
    {
        name: 'Coursera',
        src: '/vibes/coursesa.png',
        url: 'https://coursera.org',
        color: '#0056D2'
    },
    {
        name: 'Khan Academy',
        src: '/vibes/khan.jpeg',
        url: 'https://khanacademy.org',
        color: '#F7DF1E'
    },
    {
        name: 'Skillshare',
        src: '/vibes/skillshare.png',
        url: 'https://skillshare.com',
        color: '#00A0FF'
    }
]

export default function VibeWith() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const logosRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    // Section animation
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )

    // Logo animations (staggered)
    logosRef.current.forEach((logo, i) => {
      if (!logo) return
      
      gsap.fromTo(
        logo,
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: logo,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )

      // Hover animation
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.08,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="text-white py-24 px-6 md:px-20 flex flex-col items-center relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent opacity-20 pointer-events-none" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat bg-[length:40px_40px] animate-grid-scroll" />
      </div>

      <h2
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 relative z-10"
      >
        Who We Vibe With
        <span className="block w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-4 mx-auto" />
      </h2>
      <p
          className="text-lg text-gray-300 mb-12"
        >
          SkillsConnect merges GitHub's developer ecosystem, Duolingo's gamified learning, 
          Upwork's professional network, LinkedIn's career focus, CodeCademy's hands-on coding, 
          Coursera's academic rigor, Khan Academy's accessibility, and Skillshare's creative 
          community into one powerful learning platform.
        </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto relative z-10">
        {logos.map((logo, index) => (
          <Link
            key={index}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
            ref={el => logosRef.current[index] = el}
            style={{ '--brand-color': logo.color } as React.CSSProperties}
          >
            <div className="relative p-4 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 group-hover:border-[var(--brand-color)] transition-all duration-300 shadow-lg group-hover:shadow-[0_10px_30px_-5px_var(--brand-color)]">
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={120}
                className="object-contain h-24 w-24 grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute -bottom-3 -right-3 bg-[var(--brand-color)] text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FiExternalLink className="h-4 w-4" />
              </div>
            </div>
            <span className="mt-4 text-gray-300 group-hover:text-white font-medium transition-colors duration-300">
              {logo.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}