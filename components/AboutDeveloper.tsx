// components/AboutDeveloper.tsx
'use client';

import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import Image from 'next/image';

export default function AboutDeveloper() {
  const developer = {
    name: "Mark",
    role: "Founder & Lead Developer",
    bio: "Frontend developer with a passion for creating educational platforms that make tech learning accessible to everyone. With over 3 years of experience in web development, I built SkillsConnect to bridge the gap between learners, developers and frelancers to enable collaborative learning and skill sharing.",
    avatar: "/developer-avatar.jpg", 
    stats: [
      { value: "10K+", label: "Students taught" },
      { value: "8+", label: "Years experience" },
      { value: "50+", label: "Projects completed" }
    ],
    links: [
      { icon: <FiGithub />, url: "https://github.com/Itsnatch22", label: "GitHub" },
      { icon: <FiTwitter />, url: "https://twitter.com/itsnatch_", label: "Twitter" },
      { icon: <FiLinkedin />, url: "https://linkedin.com/mark-kamau", label: "LinkedIn" },
      { icon: <FiMail />, url: "mailto:mark@skillsconnect.dev", label: "Email" }
    ],
    skills: [
      "JavaScript/TypeScript",
      "React/Next.js",
      "Node.js",
      "UI/UX Design",
      "Technical Education"
    ]
  };

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            About the Developer
          </h2>
          <p className="text-gray-400 mb-12 max-w-2xl">
            Meet the mind behind SkillsConnect and our approach to tech education
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Developer Profile Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 rounded-full border-2 border-purple-500/50 overflow-hidden">
                  <Image
                    src={developer.avatar}
                    alt={developer.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">{developer.name}</h3>
                <p className="text-purple-400 mb-4">{developer.role}</p>
                <p className="text-gray-300 mb-6">{developer.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 w-full mb-8">
                  {developer.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-purple-400">{stat.value}</p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-3">
                  {developer.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
                      aria-label={link.label}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Skills & Philosophy */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">Technical Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {developer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-700 rounded-full text-sm hover:bg-purple-500/10 hover:text-purple-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">Education Philosophy</h3>
                <p className="text-gray-300 mb-4">
                  I believe in learning by building. The best way to master programming is through hands-on projects and real-world applications.
                </p>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-purple-400">→</div>
                    <p className="text-gray-300">
                      <span className="font-semibold">Project-based learning:</span> Every concept should be immediately applicable to real code
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-purple-400">→</div>
                    <p className="text-gray-300">
                      <span className="font-semibold">Community-driven:</span> Learning happens best when we collaborate and share knowledge
                    </p>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4 text-purple-400">→</div>
                    <p className="text-gray-300">
                      <span className="font-semibold">Progressive complexity:</span> Start simple, then gradually tackle more complex problems
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold mb-4 text-purple-400">Why I Built SkillsConnect</h3>
                <p className="text-gray-300 mb-4">
                  After a period of researching between learning platforms like CodeCademy, Duolingo and skill finding platforms like UpWork and Skill Share, I wanted to create a platform that:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 block w-2 h-2 mt-2 mr-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Provides interactive learning environments for immediate practice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 block w-2 h-2 mt-2 mr-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Focuses on modern tech stacks used in industry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 block w-2 h-2 mt-2 mr-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Encourages building portfolio projects from day one</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 block w-2 h-2 mt-2 mr-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Creates a supportive community of learners & entrepreneurs</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div> 
      </div>
    </section>
  );
}