'use client'

import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { TransmissionCard } from '@/components'
import { SectionLabel, GlowBar, Tag, CategoryBadge, Pagination } from '@/components/ui'
import { categories } from '@/data/categories'
import { useRouter, useSearchParams } from 'next/navigation'

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
}

function formatDateDot(dateStr: string): string {
  const d = new Date(dateStr)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function formatReadingTime(rt: { minutes: number }): string {
  const mins = Math.max(1, Math.ceil(rt.minutes))
  return `${mins} min`
}

type PostData = {
  slug: string
  title: string
  date: string
  summary?: string
  tags: string[]
  category: string
  readingTime: { minutes: number }
}

const POSTS_PER_PAGE = 6

function buildUrl(
  current: URLSearchParams,
  overrides: { q?: string; category?: string | null; tags?: string[]; page?: number }
): string {
  const params = new URLSearchParams()
  const q = 'q' in overrides ? overrides.q : current.get('q')
  const category = 'category' in overrides ? overrides.category : current.get('category')
  const tags = 'tags' in overrides ? overrides.tags : current.getAll('tags').filter(Boolean)
  const page = 'page' in overrides ? overrides.page : parseInt(current.get('page') || '1')

  if (q) params.set('q', q)
  if (category) params.set('category', category)
  for (const tag of tags || []) params.append('tags', tag)
  if (page && page > 1) params.set('page', String(page))

  const qs = params.toString()
  return qs ? `/blog?${qs}` : '/blog'
}

export default function ListLayoutWithTags({ posts, title }: ListLayoutProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || ''
  const activeTags = searchParams.getAll('tags').filter(Boolean)
  const hasFilters = !!(query || activeCategory || activeTags.length)
  const currentPage = parseInt(searchParams.get('page') || '1')

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const p = post as unknown as PostData

    if (query) {
      const q = query.toLowerCase()
      const inTitle = p.title.toLowerCase().includes(q)
      const inSummary = (p.summary || '').toLowerCase().includes(q)
      const inTags = (p.tags || []).some((t) => t.toLowerCase().includes(q))
      if (!inTitle && !inSummary && !inTags) return false
    }

    if (activeCategory && p.category !== activeCategory) return false

    if (activeTags.length > 0) {
      const postTags = p.tags || []
      if (!activeTags.every((t) => postTags.includes(t))) return false
    }

    return true
  })

  const postCategories = [
    ...new Set(posts.map((p) => (p as unknown as PostData).category).filter(Boolean)),
  ]

  const tagCounts: Record<string, number> = {}
  for (const post of posts) {
    const p = post as unknown as PostData
    for (const tag of p.tags || []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    }
  }
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  function toggleCategory(cat: string) {
    const next = activeCategory === cat ? null : cat
    router.push(buildUrl(searchParams, { category: next }))
  }

  function toggleTag(tag: string) {
    const next = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag]
    router.push(buildUrl(searchParams, { tags: next }))
  }

  function clearAll() {
    router.push('/blog')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Page title */}
      <section className="mb-8">
        <SectionLabel>{'// ARQUIVO DE TRANSMISSÕES'}</SectionLabel>
        <h1 className="font-heading text-text-primary mt-2 text-2xl font-bold sm:text-3xl">
          {title}
        </h1>
        <GlowBar className="mt-4" />
      </section>

      {/* Sidebar (mobile: above posts) + Posts grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Sidebar — mobile only (above posts) */}
        <div className="border-border-line bg-card rounded-sm border p-6 lg:hidden">
          <FilterSidebar
            postCategories={postCategories}
            sortedTags={sortedTags}
            tagCounts={tagCounts}
            activeCategory={activeCategory}
            activeTags={activeTags}
            hasFilters={hasFilters}
            onToggleCategory={toggleCategory}
            onToggleTag={toggleTag}
            onClearAll={clearAll}
          />
        </div>

        {/* Posts column */}
        <div className="flex flex-col gap-6">
          {!filteredPosts.length && (
            <p className="text-text-muted font-body text-sm">Nenhuma transmissão encontrada.</p>
          )}
          {filteredPosts
            .slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)
            .map((post) => {
              const p = post as unknown as PostData
              return (
                <TransmissionCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.title}
                  summary={p.summary || ''}
                  date={formatDateDot(p.date)}
                  readingTime={formatReadingTime(p.readingTime)}
                  category={p.category || 'tecnologia'}
                  tags={p.tags || []}
                />
              )
            })}
          {Math.ceil(filteredPosts.length / POSTS_PER_PAGE) > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / POSTS_PER_PAGE)}
              onPageChange={(p) => router.push(buildUrl(searchParams, { page: p }))}
            />
          )}
        </div>

        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <div className="border-border-line bg-card sticky top-24 rounded-sm border p-6">
            <FilterSidebar
              postCategories={postCategories}
              sortedTags={sortedTags}
              tagCounts={tagCounts}
              activeCategory={activeCategory}
              activeTags={activeTags}
              hasFilters={hasFilters}
              onToggleCategory={toggleCategory}
              onToggleTag={toggleTag}
              onClearAll={clearAll}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

interface FilterSidebarProps {
  postCategories: string[]
  sortedTags: string[]
  tagCounts: Record<string, number>
  activeCategory: string
  activeTags: string[]
  hasFilters: boolean
  onToggleCategory: (cat: string) => void
  onToggleTag: (tag: string) => void
  onClearAll: () => void
}

function FilterSidebar({
  postCategories,
  sortedTags,
  tagCounts,
  activeCategory,
  activeTags,
  hasFilters,
  onToggleCategory,
  onToggleTag,
  onClearAll,
}: FilterSidebarProps) {
  const inactiveCategories = postCategories.filter((cat) => activeCategory !== cat)
  const inactiveTags = sortedTags.filter((tag) => !activeTags.includes(tag))

  return (
    <div className="flex flex-col gap-6">
      {/* Active filters */}
      {hasFilters && (
        <div>
          <SectionLabel>{'// FILTROS ATIVOS'}</SectionLabel>
          <div className="mt-3 flex flex-wrap gap-2">
            {activeCategory && (
              <CategoryBadge
                category={activeCategory}
                onClick={() => onToggleCategory(activeCategory)}
              />
            )}
            {activeTags.map((tag) => (
              <Tag key={tag} text={tag} isActive onClick={() => onToggleTag(tag)} />
            ))}
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="font-body border-border-line text-text-muted hover:border-text-muted hover:text-text-secondary mt-3 rounded-sm border px-2 py-1 text-[10px] tracking-wider uppercase transition-colors"
          >
            ↺ limpar tudo
          </button>
        </div>
      )}

      {/* Categories */}
      {inactiveCategories.length > 0 && (
        <div>
          <SectionLabel>{'// CATEGORIAS'}</SectionLabel>
          <ul className="mt-3 flex flex-col gap-2">
            {inactiveCategories.map((cat) => {
              const config = categories[cat]
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onToggleCategory(cat)}
                    className="font-body text-text-secondary hover:text-text-primary text-xs uppercase transition-colors"
                  >
                    {'> '}
                    {config?.label || cat.toUpperCase()}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Tags */}
      {inactiveTags.length > 0 && (
        <div>
          <SectionLabel>{'// TAGS'}</SectionLabel>
          <ul className="mt-3 flex flex-col gap-2">
            {inactiveTags.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className="font-body text-text-secondary hover:text-text-primary text-xs transition-colors"
                >
                  {'> '}
                  {`${tag} (${tagCounts[tag]})`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
