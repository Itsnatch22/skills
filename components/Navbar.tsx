'use client'
import { LogIn, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { signIn, signOut, useSession } from "next-auth/react"
import { AnimatePresence, motion } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setOpen] = useState(false)
    const toggleMenu = () => setOpen(prev => !prev)

    const navItems = [
        { name: 'Insights', path: '/insights' },
        { name: 'Skills', path: '/skills' },
        { name: 'Message', path: '/messages' },
        { name: 'Webinars', path: '/resources/webinars' },
        { name: 'Contact', path: '/contact' },
    ]

    const { data: session, status } = useSession()

    const handleLinkClick = () => {
        setOpen(false)
    }

    return (
        <nav className="w-full px-4 py-3 border-b bg-purple-500 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link 
                    href="/" 
                    className="text-xl font-bold text-primary hover:text-primary/90 transition-colors"
                    aria-label="Home"
                >
                    SkillsConnect
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6 text-sm">
                        {navItems.map((item) => (
                            <Link 
                                key={item.path}
                                href={item.path}
                                className="hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {status === 'loading' ? (
                            <p>Loading...</p>
                        ) : session?.user ? (
                            <>
                                <Image
                                    src={session.user.image || '/default-avatar.png'}
                                    alt="Profile"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => signIn()}
                                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    {status === 'loading' ? (
                        <p>Loading...</p>
                    ) : session?.user ? (
                        <>
                            <Image
                                src={session.user.image || '/default-avatar.png'}
                                alt="Profile"
                                width={32}
                                height={32}
                                className="rounded-full"
                            />
                            <button
                                onClick={() => signOut()}
                                className="p-1 hover:text-primary transition-colors"
                            >
                                <LogIn className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className="p-1 hover:text-primary transition-colors"
                        >
                            <LogIn className="w-5 h-5" />
                        </button>
                    )}
                    <button 
                        onClick={toggleMenu}
                        className="p-1 hover:text-primary transition-colors"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-neutral-700 bg-background overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-4 text-sm">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.path}
                                    href={item.path} 
                                    onClick={handleLinkClick}
                                    className="hover:text-primary transition-colors py-2"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}