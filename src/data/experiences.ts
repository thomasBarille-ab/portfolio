export interface SubProject {
  name: string
  description: string
  tech: string[]
}

export interface Experience {
  company: string
  role: string
  type: "Alternance" | "Stage"
  period: string
  location: string
  description?: string
  subProjects?: SubProject[]
  tech?: string[]
}

export interface Education {
  school: string
  field: string
  period: string
  location: string
  details?: string[]
}

export const experiences: Experience[] = [
  {
    company: "CEA",
    role: "Développeur FullStack",
    type: "Alternance",
    period: "Sept 2022 – Sept 2025",
    location: "Toulouse",
    subProjects: [
      {
        name: "Quick POC",
        description:
          "Générateur de code et agrégateur de services. Élaboration du cahier des charges, état de l'art et spécification. Définition d'une roadmap et de jalons. Animation de réunions, maquettage, développement front et back.",
        tech: ["React", "Loopback", "Yeoman", "Gitlab", "Kanban"],
      },
      {
        name: "NACRE",
        description:
          "Démonstrateur sur la thématique énergie — simulation du réseau électrique français. Définition des besoins, intégration d'une maquette, animation SVG.",
        tech: ["React", "Loopback", "Electron"],
      },
      {
        name: "DONUT",
        description:
          "Interface graphique d'un outil de gestion de crise et nouvelle architecture. Maquettage d'interface, mise en production.",
        tech: ["React", "Meteor", "Loopback", "Kafka"],
      },
    ],
  },
  {
    company: "Redbox Communication",
    role: "Développeur FullStack",
    type: "Stage",
    period: "Mai – Juin 2021",
    location: "Bidard",
    description:
      "Application web de gestion de signalements pour une compagnie de transports en commun. Formulaire de signalement, mailer, gestion BDD MySQL.",
    tech: ["Symfony 5", "Bootstrap 5", "MySQL"],
  },
]

export const education: Education[] = [
  {
    school: "EPSI",
    field: "École d'ingénierie informatique",
    period: "2020 – 2025",
    location: "Bordeaux",
    details: [
      "Titre RNCP Niveau 7 — Expert informatique et système d'information",
      "Titre RNCP Niveau 5 — Concepteur Développeur d'Application",
    ],
  },
  {
    school: "EFJ",
    field: "École du nouveau journalisme",
    period: "2017 – 2019",
    location: "Bordeaux",
    details: ["Première et deuxième années"],
  },
  {
    school: "Lycée Villa Pia",
    field: "Baccalauréat ES",
    period: "2017",
    location: "Bayonne",
  },
]
