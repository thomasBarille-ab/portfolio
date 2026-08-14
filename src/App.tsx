import { ProjectCard } from "./components/ProjectCard"
import { ThemeToggle } from "./components/ThemeToggle"
import { projects } from "./data/projects"

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
          Thomas Barille
        </span>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-6 pb-20">
        <div className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-4">
            Mes projets
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-md mx-auto">
            Une sélection de ce sur quoi j'ai travaillé — side projects, SaaS et explorations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
