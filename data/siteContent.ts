// NOTE: This file is server-only. Do NOT import in client components ('use client').
// Importing contentlayer/generated in client bundles will cause build errors.
import { allBlogs, allAuthors } from 'contentlayer/generated'
import { categories } from './categories'
import type { CurrentlyItem } from '@/components'

const defaultAuthor = allAuthors.find((p) => p.slug === 'default')
if (!defaultAuthor) {
  throw new Error('[siteContent] Author "default" not found — check data/authors/default.mdx')
}

const { name, avatar, occupation, email, github, linkedin, twitter, instagram } = defaultAuthor

export const authorData = {
  name,
  avatar: avatar ?? '/static/images/avatar/profile.jpg',
  occupation: occupation ?? '',
  email: email ?? '',
  github: github ?? '',
  linkedin: linkedin ?? '',
  twitter: twitter ?? '',
  instagram: instagram ?? '',
  bioShort:
    'Dev, estudante e servo oficial de 5 gatos. Escrevo sobre tech, animes, RPG e tudo que me faz abrir mais uma aba às 2h da manhã.',
  sectionTitle: 'PERFIL //',
  stats: [
    { label: 'TRANSMISSÕES', value: String(allBlogs.length), color: 'green' as const },
    { label: 'MUNDOS', value: String(Object.keys(categories).length), color: 'blue' as const },
    { label: 'GATOS', value: '5', color: 'purple' as const },
  ],
}

export const contactsData = {
  sectionTitle: 'CONTATO //',
  channels: [
    {
      label: 'GITHUB //',
      handle: 'rafamaia',
      href: github ?? '',
      description:
        'Código, projetos, issues, PRs. O melhor canal para colaboração técnica e contribuições open source.',
    },
    {
      label: 'EMAIL //',
      handle: email ?? '',
      href: `mailto:${email ?? ''}`,
      description:
        'Assuntos sérios, propostas, parcerias e tudo que merece privacidade. Leio tudo.',
    },
    {
      label: 'LINKEDIN //',
      handle: 'rafael-maia-dev',
      href: linkedin ?? '',
      description:
        'Carreira, networking profissional e oportunidades. Para assuntos que pedem um contexto mais formal.',
    },
    {
      label: 'INSTAGRAM //',
      handle: '@rafathedream',
      href: instagram ?? '',
      description:
        'Fotos, bastidores e o lado mais visual do dia a dia. Canal mais casual e visual.',
    },
  ],
  availableFor: [
    {
      text: 'Conversas sobre tech & programação',
      dotColor: 'bg-[#00ff88]',
      textColor: 'text-[#e0e0f0]',
    },
    {
      text: 'Colaboração em projetos open source',
      dotColor: 'bg-[#00ff88]',
      textColor: 'text-[#e0e0f0]',
    },
    {
      text: 'Freelance / consultoria (caso a caso)',
      dotColor: 'bg-[#f59e0b]',
      textColor: 'text-[#e0e0f0]',
    },
    {
      text: 'Trocas sobre anime, RPG, worldbuilding',
      dotColor: 'bg-[#00ff88]',
      textColor: 'text-[#e0e0f0]',
    },
    {
      text: 'Spam, cold sales, propostas genéricas',
      dotColor: 'bg-[#ef4444]',
      textColor: 'text-[#6b7db3]',
    },
  ],
}

export const currentlyData = {
  sectionTitle: 'FAVORITOS //',
  items: [
    {
      label: 'JOGOS',
      value: 'God of War | Hozizon: Zero Dawn | Pokemon Series | Hades',
      color: 'purple' as const,
      imageSrc: '/static/images/favorites/games.jpg',
    },
    {
      label: 'SERIES',
      value: 'Game of Thrones | Doctor Who | Supernatural | The Office',
      color: 'green' as const,
      imageSrc: '/static/images/favorites/series.jpg',
    },
    {
      label: 'Animações',
      value:
        'Fullmetal Alchemist: Brotherhood | Avatar: The Last Airbender | Gravity Falls | Frieren: Beyond Journey’s End',
      imageSrc: '/static/images/favorites/animations.jpg',
      color: 'blue' as const,
    },
  ] as CurrentlyItem[],
}

export const osData = {
  sectionTitle: '// SISTEMAS OPERACIONAIS',
  items: [
    {
      category: 'FRONTEND',
      color: 'purple',
      items: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
    },
    { category: 'BACKEND', color: 'cyan', items: ['Node.js', 'C#', '.Net', 'PostgreSQL'] },
    { category: 'DEVOPS', color: 'green', items: ['linux', 'Docker', 'GitHub Actions', 'Vercel'] },
    { category: 'TOOLS', color: 'amber', items: ['Git', 'VSCode', 'Claude Code', 'Pencil'] },
  ],
}

export const missionLogData = {
  sectionTitle: '// LOG DE MISSÃO',
  items: [
    {
      date: '2026.01',
      color: '#8B5CF6',
      title: 'Maiahub v2.0 — Construindo meu próprio espaço',
      description:
        'Criação do meu blog pessoal com React e Node.js. Um espaço para unir tecnologia, ideias, criatividade e tudo que me interessa.',
    },
    {
      date: '2025.04',
      color: '#06B6D4',
      title: 'Homelab & autonomia digital',
      description:
        'Montando meu próprio ambiente com Linux, redes e automação. Explorando segurança, acesso remoto e integração com serviços como Nextcloud e Tailscale.',
    },
    {
      date: '2024.01',
      color: '#3B82F6',
      title: 'Transição para tecnologia',
      description:
        'Saindo da experiência em atendimento e gestão para focar em desenvolvimento. Estudando carreira, mercado e como transformar conhecimento em oportunidades reais.',
    },
    {
      date: '2022.01',
      color: '#10B981',
      title: 'Faculdade de Engenharia da Computação',
      description:
        'Entrada na graduação. Base teórica em computação, redes e sistemas, enquanto continuo evoluindo por fora com projetos e cursos.',
    },
    {
      date: '2021.01',
      color: '#F59E0B',
      title: 'Explorando o mundo do código',
      description:
        'Primeiros projetos e contato mais sério com programação. Descobrindo lógica, JavaScript e como transformar ideias em software.',
    },
    {
      date: '2020.01',
      color: '#F97316',
      title: 'O início de tudo',
      description:
        'Primeiro contato com programação. Curiosidade virou interesse — e interesse virou caminho.',
    },
    {
      date: '2017.01',
      color: '#EC4899',
      title: 'Criatividade antes do código',
      description:
        'Estudos em cinema, comunicação e design gráfico. Desenvolvimento do olhar criativo, storytelling e estética — habilidades que hoje influenciam meus projetos.',
    },
  ],
}

export const manifestoData = {
  sectionTitle: '// MISSÃO',
  slug: 'manifest',
}
