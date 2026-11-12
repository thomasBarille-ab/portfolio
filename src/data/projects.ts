export interface Project {
  title: string
  description: string
  tags: string[]
  url: string
  github?: string
  gradient: string
}

export const projects: Project[] = [
  {
    title: "Creaclip",
    description: "Pipeline IA de génération de clips courts à partir de longues vidéos.",
    tags: ["Python", "ADK", "React"],
    url: "https://creaclip.thomasbarille.com",
    github: "https://github.com/thomasBarille-ab/clipforgesaas",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "CEA",
    description: "Projet réalisé au Commissariat à l'Énergie Atomique.",
    tags: [],
    url: "https://ceaportfolio.thomasbarille.com",
    github: "https://github.com/thomasBarille-ab/ceaportfolio",
    gradient: "from-slate-500 to-slate-700",
  },
  {
    title: "Sports Predictor",
    description: "Pipeline ML de prédiction des matchs Ligue 1 et NBA. XGBoost + calibration isotonique + dashboard Next.js.",
    tags: ["Python", "XGBoost", "Next.js"],
    url: "https://predictions.thomasbarille.com",
    github: "https://github.com/thomasBarille-ab/sportsPred",
    gradient: "from-green-500 to-emerald-700",
  },
]
