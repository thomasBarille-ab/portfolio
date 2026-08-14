export interface Project {
  title: string
  description: string
  tags: string[]
  url: string
  gradient: string
}

export const projects: Project[] = [
  {
    title: "Euromillions ML",
    description: "Modèle ML d'analyse des tirages Euromillions. Exploration statistique.",
    tags: ["Python", "scikit-learn", "Pandas"],
    url: "https://github.com",
    gradient: "from-yellow-500 to-amber-600",
  },
  {
    title: "NBA Query",
    description: "Requêtes en langage naturel sur les stats NBA. Pose une question, reçois les données.",
    tags: ["TypeScript", "OpenAI", "SQL"],
    url: "https://github.com",
    gradient: "from-orange-500 to-red-600",
  },
  {
    title: "Creaclip",
    description: "Pipeline IA de génération de clips courts à partir de longues vidéos.",
    tags: ["Python", "ADK", "React"],
    url: "https://github.com",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    title: "CEA",
    description: "Projet réalisé au Commissariat à l'Énergie Atomique.",
    tags: [],
    url: "https://github.com",
    gradient: "from-slate-500 to-slate-700",
  },
  {
    title: "Flight Globe",
    description: "Visualisation 3D des vols en temps réel sur un globe interactif.",
    tags: ["Three.js", "WebGL", "API"],
    url: "https://github.com",
    gradient: "from-emerald-500 to-teal-700",
  },
]
