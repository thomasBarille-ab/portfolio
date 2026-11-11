import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import type { Project } from "../data/projects"

export function ProjectCard({ project }: { project: Project }) {
  const shineRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rawRotateX = useTransform(y, [-0.5, 0.5], [5, -5])
  const rawRotateY = useTransform(x, [-0.5, 0.5], [-5, 5])
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 28 })
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 28 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width - 0.5
    const my = (e.clientY - rect.top) / rect.height - 0.5
    x.set(mx)
    y.set(my)
    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(255,255,255,0.08) 0%, transparent 65%)`
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    if (shineRef.current) shineRef.current.style.background = "transparent"
  }

  return (
    <motion.div
      className="card-tilt-wrapper"
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={shineRef} className="card-shine" />

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex rounded-[20px] overflow-hidden h-72 sm:h-80 w-full"
        style={{ background: "rgba(255,255,255,0.025)", textDecoration: "none" }}
      >
        {/* Gradient panel */}
        <div className={`bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0 w-2/5 sm:w-1/3 relative overflow-hidden`}>
          <span
            className="absolute text-white/10 font-black select-none"
            style={{ fontSize: "clamp(5rem, 8vw, 8rem)" }}
          >
            {project.title[0]}
          </span>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center gap-4 p-7 flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white truncate">{project.title}</h2>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Voir le repo GitHub"
                className="shrink-0 p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            )}
          </div>

          <p className="text-sm leading-relaxed overflow-y-auto max-h-20" style={{ color: "rgba(255,255,255,0.4)" }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-micro">{tag}</span>
            ))}
          </div>

          <div
            className="flex items-center gap-1.5 mt-auto group-hover:text-white/55 transition-colors"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)" }}
          >
            <span>Voir le projet</span>
            <svg
              className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  )
}
