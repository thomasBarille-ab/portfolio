import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Phone, MapPin } from "lucide-react"
import { ProjectCard } from "./components/ProjectCard"
import { FadeIn } from "./components/FadeIn"
import { Scene } from "./components/Scene"
import { projects } from "./data/projects"
import { experiences, education } from "./data/experiences"

const DURATION = 5000
const SLIDE_MS = 550
const slides = [projects[projects.length - 1], ...projects, projects[0]]

const SKILLS = [
  "React", "Next.js", "TypeScript", "Python", "FastAPI",
  "Supabase", "Stripe", "Claude API", "Docker", "Git",
  "Vercel", "Kafka", "PostgreSQL", "n8n", "ADK", "Méthodes Agiles",
]

const ease = [0.16, 1, 0.3, 1] as const

function App() {
  // ── Carousel state ──
  const [dotIndex, setDotIndex] = useState(0)
  const posRef = useRef(1)
  const stripRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const busy = useRef(false)

  const projectsRef = useRef<HTMLElement>(null)
  const sceneScrollRef = useRef<number>(0)

  // ── Scroll-triggered refs ──
  const statsRef       = useRef<HTMLDivElement>(null)
  const experienceRef  = useRef<HTMLDivElement>(null)
  const educationRef   = useRef<HTMLDivElement>(null)
  const skillsRef      = useRef<HTMLDivElement>(null)
  const contactRef     = useRef<HTMLDivElement>(null)

  const statsInView      = useInView(statsRef,      { once: true, margin: "-10% 0px" })
  const experienceInView = useInView(experienceRef,  { once: true, margin: "-10% 0px" })
  const educationInView  = useInView(educationRef,   { once: true, margin: "-10% 0px" })
  const skillsInView     = useInView(skillsRef,      { once: true, margin: "-10% 0px" })
  const contactInView    = useInView(contactRef,     { once: true, margin: "-10% 0px" })

  // ── Carousel logic (unchanged) ──
  const setTransform = (index: number, animated = true) => {
    const el = stripRef.current
    if (!el) return
    el.style.transition = animated
      ? `transform ${SLIDE_MS}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : "none"
    el.style.transform = `translateX(-${(index / slides.length) * 100}%)`
  }

  const toReal = (i: number) =>
    i === 0 ? projects.length - 1 : i >= slides.length - 1 ? 0 : i - 1

  const goTo = (index: number) => {
    if (busy.current) return
    busy.current = true
    posRef.current = index
    setDotIndex(toReal(index))
    setTransform(index)
  }

  const handleTransitionEnd = () => {
    if (posRef.current === slides.length - 1) { posRef.current = 1; setTransform(1, false) }
    else if (posRef.current === 0) { posRef.current = projects.length; setTransform(projects.length, false) }
    busy.current = false
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => goTo(posRef.current + 1), DURATION)
  }

  const handleNav = (dir: "prev" | "next") => {
    goTo(dir === "next" ? posRef.current + 1 : posRef.current - 1)
    startTimer()
  }

  useEffect(() => {
    setTransform(1, false)
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      sceneScrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
    <Scene scrollRef={sceneScrollRef} />
    <div className="min-h-screen text-white overflow-x-hidden" style={{ position: "relative", zIndex: 1 }}>

      {/* ── Background overlays over canvas ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="grid-bg" />
        <div className="noise-overlay" />
      </div>

      {/* ── Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-bold tracking-widest font-mono" style={{ color: "rgba(255,255,255,0.65)" }}>TB</span>
          <nav className="flex items-center gap-6 sm:gap-8">
            <a href="#experience" className="text-xs tracking-widest uppercase transition-colors hidden sm:block" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.1em" }}
               onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}>
              Expérience
            </a>
            <a href="#projects" className="text-xs tracking-widest uppercase transition-colors" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.1em" }}
               onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}>
              Projets
            </a>
            <a href="#contact" className="text-xs tracking-widest uppercase transition-colors" style={{ color: "rgba(255,255,255,0.32)", letterSpacing: "0.1em" }}
               onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.32)")}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* ════════════════════════════
          HERO
      ════════════════════════════ */}
      <section id="about" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-10"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>
              Disponible pour de nouveaux projets
            </span>
          </motion.div>

          {/* Name — clip reveal */}
          <div className="mb-8">
            {["Thomas", "Barillé"].map((word, i) => (
              <div key={word} style={{ overflow: "hidden", lineHeight: 0.95 }}>
                <motion.span
                  className="hero-name"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.85, ease }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Role — no typewriter, clean static */}
          <motion.p
            className="text-lg sm:text-xl font-light tracking-wide mb-5"
            style={{ color: "rgba(255,255,255,0.32)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Développeur FullStack · SaaS Builder · IA
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-sm sm:text-base max-w-md mx-auto mb-14 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.28)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Je construis des produits IA, automatise des processus métier{" "}
            <br className="hidden sm:block" />
            et crée des SaaS rapides et bien faits.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <motion.button
              className="btn-primary"
              onClick={() => projectsRef.current?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Voir mes projets
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.a
              className="btn-secondary"
              href="https://github.com/thomasBarille-ab"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none"
          style={{ color: "rgba(255,255,255,0.22)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
          <div
            className="w-px h-10 scroll-line"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── Stats bar ── */}
      <section className="max-w-5xl mx-auto px-6">
        <div ref={statsRef} className="flex justify-center items-center gap-8 sm:gap-16 py-16">
          {[
            { n: "3+",    l: "ans d'expérience" },
            { n: "5+",    l: "projets livrés" },
            { n: "Bac+5", l: "RNCP niveau 7" },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
            >
              <div className="text-3xl sm:text-4xl font-black text-white mb-1 tracking-tight">{s.n}</div>
              <div className="text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          EXPERIENCES
      ════════════════════════════ */}
      <section id="experience" className="max-w-5xl mx-auto px-6 py-24">
        <div className="glass-panel px-8 py-10">
        <FadeIn className="mb-14">
          <span className="section-label">Parcours</span>
          <h2 className="section-title">
            Expériences <span className="text-accent">professionnelles</span>
          </h2>
        </FadeIn>

        <div ref={experienceRef} className="tl-container">
          <div className="tl-line" />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="tl-entry"
              initial={{ opacity: 0, x: -20 }}
              animate={experienceInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2, duration: 0.6, ease }}
            >
              <motion.span
                className="tl-dot"
                initial={{ scale: 0 }}
                animate={experienceInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.2 + 0.1, type: "spring", stiffness: 300, damping: 20 }}
              />

              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                <span className={exp.type === "Alternance" ? "exp-badge exp-badge-alt" : "exp-badge exp-badge-stage"}>
                  {exp.type}
                </span>
              </div>
              <p className="text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.52)" }}>{exp.role}</p>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>{exp.period} · {exp.location}</p>

              {exp.subProjects ? (
                <div className="space-y-2.5">
                  {exp.subProjects.map((sp, j) => (
                    <motion.div
                      key={sp.name}
                      className="subproject-card"
                      initial={{ opacity: 0, y: 8 }}
                      animate={experienceInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.2 + 0.3 + j * 0.1, duration: 0.4 }}
                    >
                      <p className="text-xs font-semibold tracking-wide uppercase mb-1.5" style={{ color: "rgba(255,255,255,0.62)" }}>
                        {sp.name}
                      </p>
                      <p className="text-xs leading-relaxed mb-2.5" style={{ color: "rgba(255,255,255,0.38)" }}>
                        {sp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {sp.tech.map(t => <span key={t} className="tech-micro">{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  {exp.description && (
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.38)" }}>
                      {exp.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech?.map(t => <span key={t} className="tech-micro">{t}</span>)}
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ════════════════════════════
          PROJECTS
      ════════════════════════════ */}
      <section ref={projectsRef} id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <div className="glass-panel px-8 py-10">
        <FadeIn className="mb-14">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">
            Mes <span className="text-accent">projets</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative">
            <button onClick={() => handleNav("prev")} aria-label="Précédent"
              className="carousel-btn absolute -left-6 top-1/2 -translate-y-1/2 z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="overflow-hidden">
              <div
                ref={stripRef}
                style={{ width: `${slides.length * 100}%` }}
                className="flex will-change-transform"
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((project, i) => (
                  <div key={i} style={{ width: `${100 / slides.length}%` }}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => handleNav("next")} aria-label="Suivant"
              className="carousel-btn absolute -right-6 top-1/2 -translate-y-1/2 z-10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-5 h-px rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div key={dotIndex} className="h-full progress-bar"
              style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)" }} />
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i + 1); startTimer() }}
                aria-label={`Projet ${i + 1}`}
                className="rounded-full transition-all duration-300"
                style={i === dotIndex
                  ? { width: "20px", height: "8px", background: "white" }
                  : { width: "8px", height: "8px", background: "rgba(255,255,255,0.18)" }}
              />
            ))}
          </div>
        </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════
          FORMATION
      ════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="glass-panel px-8 py-10">
        <FadeIn className="mb-14">
          <span className="section-label">Académique</span>
          <h2 className="section-title">Formation</h2>
        </FadeIn>

        <div ref={educationRef} className="tl-container">
          <div className="tl-line" />
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              className="tl-entry"
              initial={{ opacity: 0, x: -20 }}
              animate={educationInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease }}
            >
              <motion.span
                className="tl-dot tl-dot-edu"
                initial={{ scale: 0 }}
                animate={educationInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.15 + 0.1, type: "spring", stiffness: 300, damping: 20 }}
              />
              <h3 className="text-base font-bold text-white mb-0.5">{edu.school}</h3>
              <p className="text-sm mb-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{edu.field}</p>
              <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>{edu.period} · {edu.location}</p>
              {edu.details?.map(d => (
                <p key={d} className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.33)" }}>{d}</p>
              ))}
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ════════════════════════════
          SKILLS
      ════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="glass-panel px-8 py-10">
        <div ref={skillsRef} className="text-center">
          <FadeIn>
            <span className="section-label">Stack technique</span>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-2.5 mt-6">
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                className="skill-pill"
                initial={{ opacity: 0, y: 12 }}
                animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          {[
            { lang: "Anglais", level: "B2", detail: "avancé" },
            { lang: "Espagnol", level: "B1", detail: "scolaire" },
          ].map((l, i) => (
            <motion.div
              key={l.lang}
              className="lang-card"
              initial={{ opacity: 0, y: 12 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: SKILLS.length * 0.04 + i * 0.08, duration: 0.4 }}
            >
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.62)" }}>{l.lang}</span>
              <span className="lang-badge">{l.level}</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{l.detail}</span>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* ════════════════════════════
          CONTACT
      ════════════════════════════ */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-28">
        <div ref={contactRef}>
          <span className="section-label">Contact</span>

          {/* Clip-reveal heading */}
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              className="contact-heading"
              initial={{ y: "100%" }}
              animate={contactInView ? { y: "0%" } : {}}
              transition={{ delay: 0.1, duration: 0.85, ease }}
            >
              Parlons-en.
            </motion.h2>
          </div>

          {/* Email CTA */}
          <motion.a
            href="mailto:thomasbarille@gmail.com"
            className="contact-email-link"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            whileHover={{ x: 6 }}
          >
            thomasbarille@gmail.com
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          {/* Secondary links */}
          <motion.div
            className="contact-secondary"
            initial={{ opacity: 0 }}
            animate={contactInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            <a href="tel:+33681612749" className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              06 81 61 27 49
            </a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/thomas-barille" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <span>·</span>
            <a href="https://github.com/thomasBarille-ab" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Toulouse, France
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} className="py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="font-mono" style={{ fontSize: "11px", color: "rgba(255,255,255,0.14)" }}>
            © 2025 Thomas Barillé — Développeur FullStack Freelance
          </span>
        </div>
      </footer>
    </div>
    </>
  )
}

export default App
