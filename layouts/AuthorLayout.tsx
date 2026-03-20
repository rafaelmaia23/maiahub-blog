import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import { allPages } from 'contentlayer/generated'
import Image from '@/components/Image'
import { CurrentlySection } from '@/components'
import { GlowBar, SectionLabel, StatItem } from '@/components/ui'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import {
  authorData,
  currentlyData,
  osData,
  missionLogData,
  manifestoData,
} from '@/data/siteContent'
import { resolveColor } from '@/lib/colorUtils'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, email, linkedin, github } = content
  const manifest = allPages.find((p) => p.slug === manifestoData.slug)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <main className="flex flex-col gap-6">
          {/* Card 1 — // PILOTO */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <div className="flex items-center justify-between">
              <SectionLabel className="text-accent-green">{'// PILOTO'}</SectionLabel>
              <div className="border-accent-green/40 bg-elevated flex items-center gap-2 rounded-sm border px-3 py-1">
                <span className="bg-accent-green h-1.5 w-1.5 rounded-full" />
                <span className="font-body text-accent-green text-[11px] font-bold">ONLINE</span>
              </div>
            </div>
            <GlowBar />

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              {avatar && (
                <div className="border-accent-green/40 relative h-40 w-40 shrink-0 overflow-hidden rounded-sm border-2">
                  <Image src={avatar} alt={name} fill className="object-cover" />
                </div>
              )}

              {/* Name, role, links */}
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-text-primary text-xl font-bold uppercase">
                  {name}
                </h2>
                {occupation && <p className="font-body text-accent-green text-sm">{occupation}</p>}
                <div className="mt-1 flex items-center gap-4">
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-text-secondary hover:text-text-primary text-xs transition-colors"
                    >
                      [GITHUB]
                    </a>
                  )}
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-text-secondary hover:text-text-primary text-xs transition-colors"
                    >
                      [LINKEDIN]
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="font-body text-text-secondary hover:text-text-primary text-xs transition-colors"
                    >
                      [EMAIL]
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio longa */}
            <div className="prose prose-invert prose-sm font-body max-w-none">{children}</div>

            {/* Stats row */}
            <div className="flex items-center justify-between border-t border-b border-[#1e2540] py-3">
              {authorData.stats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  color={stat.color}
                />
              ))}
            </div>
          </div>

          {/* Card 2 — // MISSÃO */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <SectionLabel className="text-accent-green">{manifestoData.sectionTitle}</SectionLabel>
            <GlowBar />
            {manifest && (
              <div className="prose prose-invert prose-sm font-body max-w-none leading-relaxed">
                <MDXLayoutRenderer code={manifest.body.code} />
              </div>
            )}
            {/* Terminal block */}
            <div className="border-border-line bg-deep-space flex flex-col gap-1.5 rounded-sm border p-4">
              <p className="font-body text-accent-green text-xs">{'> missao.init()'}</p>
              <p className="font-body text-accent-green text-xs">{'> status: ATIVA'}</p>
              <p className="font-body text-text-muted text-xs">
                {'# construído com curiosidade e café'}
              </p>
              <p className="font-body text-accent-green/60 text-xs">
                {'> Explorando sistemas, construindo mundos.'}
              </p>
              <p className="font-body text-accent-green animate-pulse text-xs">
                <span className="bg-accent-green inline-block h-[10px] w-[7px] align-middle" />
              </p>
            </div>
          </div>

          {/* Card 3 — // SISTEMAS OPERACIONAIS */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <SectionLabel className="text-accent-green">{osData.sectionTitle}</SectionLabel>
            <GlowBar />
            <div className="flex flex-col gap-3">
              {osData.items.map(({ category, color, items }) => {
                return (
                  <div key={category} className="flex flex-wrap items-center gap-2">
                    <span
                      className="font-heading w-28 shrink-0 text-xs"
                      style={{ color: resolveColor(color) }}
                    >
                      {category} {'//'}
                    </span>
                    {items.map((item) => (
                      <span
                        key={item}
                        className="font-body rounded-sm border border-[#1e2540] bg-[#161829] px-2 py-0.5 text-xs text-[#6b7db3]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Card 4 — // LOG DE MISSÃO */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <SectionLabel className="text-accent-green">{missionLogData.sectionTitle}</SectionLabel>
            <GlowBar />
            <div className="flex flex-col gap-5">
              {missionLogData.items.map((entry) => {
                return (
                  <div
                    key={entry.date}
                    className="flex flex-col gap-1 border-l-2 pl-3"
                    style={{ borderLeftColor: resolveColor(entry.color) }}
                  >
                    <span
                      className="font-heading text-xs"
                      style={{ color: resolveColor(entry.color) }}
                    >
                      {entry.date}
                    </span>
                    <span className="font-heading text-text-primary text-sm font-bold">
                      {entry.title}
                    </span>
                    <span className="font-body text-text-secondary text-sm">
                      {entry.description}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          <CurrentlySection items={currentlyData.items} sectionTitle={currentlyData.sectionTitle} />
        </aside>
      </div>
    </div>
  )
}
