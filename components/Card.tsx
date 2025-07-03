'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Project{
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps){
    return(
        <motion.div
        initial={{y: 50, opacity: 0}}
        whileInView={{ y: 0, opacity: 1}}
        viewport={{once:true}}
        transition={{delay: index * 0.1, duration: 0.6, ease: 'easeOut'}}>
            <Link href={project.link}>
            <div className="group relative overflow-hidden rounded-xl shadow-lg border border-neutral-200 hover:shadow-2xl transition-shadow duration-300">
                <div className="relative w-full h-60">
                    <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset=0 bg-black=10 group-hover:bg-black/20 transition=colors duration-300"/>
                </div>
                <div className="p-5 bg-white dark:bg-zinc-900">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">{project.category}</p>
                    <h3 className="text-xl font-semibold group-hover:underline">{project.title}</h3>
                </div>
            </div>
            </Link>
        </motion.div>
    )
}