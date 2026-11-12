import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { ThemeToggle } from "./components/ThemeToggle"
import { projects } from "./data/projects"
import { experiences, education } from "./data/experiences"

const SKILLS = [
  "React", "Next.js", "TypeScript", "Python",
  "Supabase", "Stripe", "Docker", "Git",
  "PostgreSQL",
]

const ease = [0.16, 1, 0.3, 1] as const

function Prompt({ cmd }: { cmd: string }) {
  return (
    <p className="prompt-line">
      <span className="prompt-user">thomas@portfolio</span>
      <span className="prompt-sep">:</span>
      <span className="prompt-path">~</span>
      <span className="prompt-sep">$ </span>
      <span>{cmd}</span>
    </p>
  )
}

function FadeIn({ children, className = "", delay = 0 }: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-8% 0px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <header className="term-header">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="term-logo">
            <span className="prompt-user">thomas</span>
            <span className="prompt-sep">@</span>
            <span>portfolio</span>
            <span className="cursor-blink">▌</span>
          </div>
          <nav className="flex items-center gap-5 sm:gap-7">
            <a href="#experience" className="term-nav-link hidden sm:inline">./experience</a>
            <a href="#projects" className="term-nav-link">./projects</a>
            <a href="#contact" className="term-nav-link">./contact</a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6">

        {/* ════════════════════════════
            HERO
        ════════════════════════════ */}
        <section id="about" className="pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Prompt cmd="whoami" />
          </motion.div>

          <motion.div
            className="mt-6 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
          >
            <h1 className="term-name">Thomas Barillé</h1>
            <p className="term-role">Développeur FullStack · React · Toulouse</p>
            <p className="term-desc">
              De l'idée au produit déployé —<br />
              apps web, pipelines IA, outils sur mesure.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a href="#projects" className="term-btn">./projets ↓</a>
            <a
              href="https://github.com/thomasBarille-ab"
              target="_blank"
              rel="noopener noreferrer"
              className="term-link"
            >
              github ↗
            </a>
          </motion.div>
        </section>

        {/* ── Stats ── */}
        <div className="term-stats">
          <span>3+ ans d'expérience</span>
          <span className="term-sep">·</span>
          <span>Bac+5 RNCP niveau 7</span>
        </div>

        {/* ════════════════════════════
            EXPERIENCE
        ════════════════════════════ */}
        <section id="experience" className="py-16">
          <Prompt cmd="cat ./experience/*" />
          <div className="mt-6 space-y-8">
            {experiences.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1}>
                <div className="term-entry">
                  <div className="term-entry-header">
                    <span className="term-company">{exp.company}</span>
                    <span className="term-badge">{exp.type}</span>
                    <span className="term-period">{exp.period}</span>
                  </div>
                  <div className="term-entry-role">{exp.role} · {exp.location}</div>

                  {exp.subProjects ? (
                    <div className="mt-3 space-y-2">
                      {exp.subProjects.map(sp => (
                        <div key={sp.name} className="term-subproject">
                          <span className="term-sp-name">{sp.name}</span>
                          <span className="term-sp-tech">{sp.tech.join(' · ')}</span>
                          <p className="term-sp-desc">{sp.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {exp.description && <p className="term-sp-desc mt-2">{exp.description}</p>}
                      {exp.tech && <p className="term-tech-list">{exp.tech.join(' · ')}</p>}
                    </>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ════════════════════════════
            PROJECTS
        ════════════════════════════ */}
        <section id="projects" className="py-16">
          <Prompt cmd="ls -la ./projets/" />
          <div className="mt-6 space-y-1">
            {projects.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="term-project-row"
                >
                  <span className="term-proj-name">{p.title}/</span>
                  <span className="term-proj-tags">{p.tags.join(' · ')}</span>
                  <span className="term-proj-url">↗ {p.url.replace('https://', '')}</span>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ════════════════════════════
            EDUCATION
        ════════════════════════════ */}
        <section className="py-16">
          <Prompt cmd="cat ./education/*" />
          <div className="mt-6 space-y-6">
            {education.map((edu, i) => (
              <FadeIn key={edu.school} delay={i * 0.1}>
                <div className="term-entry">
                  <div className="term-entry-header">
                    <span className="term-company">{edu.school}</span>
                    <span className="term-period">{edu.period}</span>
                  </div>
                  <div className="term-entry-role">{edu.field} · {edu.location}</div>
                  {edu.details?.map(d => (
                    <p key={d} className="term-sp-desc">// {d}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ════════════════════════════
            SKILLS
        ════════════════════════════ */}
        <section className="py-16">
          <Prompt cmd="echo $STACK" />
          <FadeIn>
            <p className="term-skills mt-4">{SKILLS.join(' · ')}</p>
          </FadeIn>
          <div className="mt-6 flex gap-5 flex-wrap">
            {[
              { lang: "Anglais", level: "B2" },
              { lang: "Espagnol", level: "B1" },
            ].map(l => (
              <span key={l.lang} className="term-lang">
                {l.lang}
                <span className="term-lang-badge">{l.level}</span>
              </span>
            ))}
          </div>
        </section>

        {/* ════════════════════════════
            CONTACT
        ════════════════════════════ */}
        <section id="contact" className="py-16 pb-28">
          <Prompt cmd="./contact.sh" />
          <FadeIn>
            <div className="mt-6 space-y-0">
              <a href="mailto:thomasbarille@gmail.com" className="term-contact-row">
                thomasbarille@gmail.com
              </a>
              <div className="term-contact-row">06 81 61 27 49</div>
              <div className="term-contact-row">Toulouse, France</div>
            </div>
            <div className="mt-6 flex gap-6 flex-wrap">
              <a href="https://www.linkedin.com/in/thomas-barille" target="_blank" rel="noopener noreferrer" className="term-link">
                linkedin ↗
              </a>
              <a href="https://github.com/thomasBarille-ab" target="_blank" rel="noopener noreferrer" className="term-link">
                github ↗
              </a>
            </div>
          </FadeIn>
        </section>

      </main>

      <footer className="term-footer">
        <div className="max-w-3xl mx-auto px-6">
          © 2025 Thomas Barillé — Développeur FullStack Freelance
        </div>
      </footer>
    </div>
  )
}

export default App
