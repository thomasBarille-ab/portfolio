import type { Project } from "../data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors duration-200 cursor-pointer w-full h-72 sm:h-80"
    >
      {/* Gradient panel */}
      <div className={`w-2/5 sm:w-1/3 bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
        <span className="text-white/20 text-8xl sm:text-9xl font-bold select-none">
          {project.title[0]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center gap-4 p-8 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
            {project.title}
          </h2>
          <svg
            className="w-5 h-5 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors shrink-0"
            fill="none" stroke="currentColor" strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14M5 5H3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-2" />
          </svg>
        </div>

        <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed overflow-y-auto max-h-24">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
