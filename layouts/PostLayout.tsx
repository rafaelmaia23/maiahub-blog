import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Link from 'next/link'
import { AuthorPanel, CurrentlySection } from '@/components'
import { CategoryBadge, Tag, GlowBar } from '@/components/ui'
import { authorData, currentlyItems } from '@/data/sidebarData'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
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

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { title, date, tags, category, readingTime } = content
  const authorName = authorDetails?.[0]?.name || authorData.name

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Post area */}
        <div className="flex flex-col gap-8">
          {/* Card 1: Post Header */}
          <div className="border-border-line bg-card flex flex-col gap-4 rounded-sm border p-8">
            {/* Category + date + reading time */}
            <div className="flex items-center gap-3">
              <CategoryBadge category={category || 'dev'} />
              <span className="font-body text-text-muted text-[11px]">{formatDateDot(date)}</span>
              <span className="font-body text-text-muted text-[11px]">
                {formatReadingTime(readingTime as unknown as { minutes: number })}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-heading text-text-primary text-2xl leading-tight font-bold sm:text-[32px] sm:leading-[1.3]">
              {title}
            </h1>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}

            {/* Separator */}
            <GlowBar />

            {/* Author */}
            <span className="font-body text-text-muted text-[11px]">
              {`// transmitido por ${authorName.toUpperCase()}`}
            </span>
          </div>

          {/* Card 2: Post Body */}
          <div className="border-border-line bg-card rounded-sm border p-8">
            <div className="prose prose-invert max-w-none">{children}</div>
          </div>

          {/* Card 3: Prev/Next Navigation */}
          <div className="border-border-line bg-card flex items-center justify-between rounded-sm border px-6 py-5">
            {prev && prev.path ? (
              <Link
                href={`/${prev.path}`}
                className="font-body group flex flex-col gap-1 transition-colors"
              >
                <span className="text-accent-green text-xs font-semibold">
                  {'< TRANSMISSÃO ANTERIOR'}
                </span>
                <span className="text-text-secondary group-hover:text-accent-green text-[11px] transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/blog"
              className="font-body text-accent-green hover:text-accent-green-dim shrink-0 text-xs font-semibold transition-colors"
            >
              {'[ TODOS OS POSTS ]'}
            </Link>

            {next && next.path ? (
              <Link
                href={`/${next.path}`}
                className="font-body group flex flex-col items-end gap-1 transition-colors"
              >
                <span className="text-accent-green text-xs font-semibold">
                  {'PRÓXIMA TRANSMISSÃO >'}
                </span>
                <span className="text-text-secondary group-hover:text-accent-green text-[11px] transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <AuthorPanel
            name={authorData.name}
            role={authorData.role}
            bio={authorData.bio}
            stats={authorData.stats}
          />
          <CurrentlySection items={currentlyItems} />
        </aside>
      </div>
    </div>
  )
}
