import type { CurrentlyItem } from '@/components'

export const authorData = {
  name: 'Rafael Maia',
  role: 'Engenheiro de Software',
  bio: 'Construindo interfaces e sistemas com foco em qualidade, performance e experiência do desenvolvedor.',
  stats: {
    posts: '42',
    readers: '7+',
    days: 'ATIVA',
  },
}

export const currentlyItems: CurrentlyItem[] = [
  { label: 'LENDO', value: 'Designing Data-Intensive Applications', color: 'purple' },
  { label: 'OUVINDO', value: 'Synthwave FM', color: 'green' },
  { label: 'BUILDANDO', value: 'Maiahub v2.0', color: 'blue' },
]
