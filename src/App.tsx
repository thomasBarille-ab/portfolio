import { useEffect, useRef, useState } from "react"
import { ProjectCard } from "./components/ProjectCard"
import { ThemeToggle } from "./components/ThemeToggle"
import { projects } from "./data/projects"

const DURATION = 5000
const SLIDE_MS = 550
const slides = [projects[projects.length - 1], ...projects, projects[0]]

function App() {
  const [dotIndex, setDotIndex] = useState(0)
  const posRef = useRef(1)
  const stripRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const busy = useRef(false)

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
    // Silent teleport from clone to real slide
    if (posRef.current === slides.length - 1) {
      posRef.current = 1
      setTransform(1, false)
    } else if (posRef.current === 0) {
      posRef.current = projects.length
      setTransform(projects.length, false)
    }
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

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Thomas Barille
        </span>
        <ThemeToggle />
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        <div className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
            Mes projets
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md mx-auto">
            Une sélection de ce sur quoi j'ai travaillé — side projects, SaaS et explorations.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => handleNav("prev")}
            aria-label="Précédent"
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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

          <button
            onClick={() => handleNav("next")}
            aria-label="Suivant"
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
          >
            <svg className="w-4 h-4 text-neutral-600 dark:text-neutral-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div key={dotIndex} className="h-full bg-neutral-500 dark:bg-neutral-400 progress-bar" />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i + 1); startTimer() }}
              aria-label={`Projet ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === dotIndex
                  ? "w-5 h-2 bg-neutral-900 dark:bg-neutral-100"
                  : "w-2 h-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
