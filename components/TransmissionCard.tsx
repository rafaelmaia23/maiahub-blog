import { cn } from '@/lib/utils'
import Link from 'next/link'
import { CategoryBadge } from './ui/CategoryBadge'
import { Tag } from './ui/Tag'

interface TransmissionCardProps {
  title: string
  summary: string
  slug: string
  date: string
  readingTime: string
  category: string
  tags: string[]
  className?: string
}

export function TransmissionCard({
  title,
  summary,
  slug,
  date,
  readingTime,
  category,
  tags,
  className,
}: TransmissionCardProps) {
  return (
    <article
      className={cn(
        'border-border-line bg-card flex flex-col gap-4 rounded-sm border p-6',
        'hover:border-border-glow transition-colors',
        className
      )}
    >
      {/* Top row: category badge + date + read time */}
      <div className="flex items-center gap-3">
        <CategoryBadge category={category} />
        <span className="font-body text-text-muted text-[11px]">{date}</span>
        <span className="font-body text-text-muted text-[11px]">{readingTime}</span>
      </div>

      {/* Title */}
      <h2 className="font-heading text-text-primary text-[22px] leading-tight font-bold">
        <Link href={`/blog/${slug}`} className="hover:text-accent-green transition-colors">
          {title}
        </Link>
      </h2>

      {/* Summary */}
      <p className="font-body text-text-secondary text-[13px] leading-relaxed">{summary}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      )}

      {/* Read link */}
      <Link
        href={`/blog/${slug}`}
        className="font-body text-accent-green hover:text-accent-green-dim text-xs font-semibold transition-colors"
      >
        LER TRANSMISSÃO {'>'}
      </Link>
    </article>
  )
}
