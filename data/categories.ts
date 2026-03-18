export interface CategoryConfig {
  label: string
  color: string
}

/**
 * Mapa de categorias do blog.
 * A chave é o slug usado no frontmatter dos posts.
 * `color` é a classe Tailwind aplicada ao badge.
 */
export const categories: Record<string, CategoryConfig> = {
  tecnologia: {
    label: 'TECNOLOGIA',
    color: 'bg-[#00d4ff] text-[#0D0D0D]',
  },
  carreira: {
    label: 'CARREIRA',
    color: 'bg-[#7b2fff] text-white',
  },
  hobbies: {
    label: 'HOBBIES',
    color: 'bg-[#f97316] text-[#0D0D0D]',
  },
  'rpg-world': {
    label: 'RPG & WORLD',
    color: 'bg-[#a855f7] text-white',
  },
  'escrita-criativa': {
    label: 'ESCRITA CRIATIVA',
    color: 'bg-[#ec4899] text-[#0D0D0D]',
  },
  journaling: {
    label: 'JOURNALING',
    color: 'bg-[#94a3b8] text-[#0D0D0D]',
  },
  leituras: {
    label: 'LEITURAS',
    color: 'bg-[#f59e0b] text-[#0D0D0D]',
  },
  ideias: {
    label: 'IDEIAS',
    color: 'bg-[#10b981] text-[#0D0D0D]',
  },
}

export const defaultCategory: CategoryConfig = {
  label: 'TECNOLOGIA',
  color: 'bg-[#00d4ff] text-[#0D0D0D]',
}

export function getCategoryConfig(slug: string): CategoryConfig {
  return categories[slug.toLowerCase()] || defaultCategory
}
