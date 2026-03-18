import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { AuthorPanel, CurrentlySection } from '@/components'
import { GlowBar, SectionLabel } from '@/components/ui'
import { authorData, currentlyItems } from '@/data/sidebarData'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Page title bar */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-text-primary text-2xl font-bold">{'// SOBRE'}</h1>
        <div className="border-accent-green/40 bg-card flex items-center gap-2 rounded-sm border px-4 py-2">
          <span className="bg-accent-green h-1.5 w-1.5 rounded-full" />
          <span className="font-body text-accent-green text-[11px] font-bold">ONLINE</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Profile card */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <SectionLabel>CREW PROFILE //</SectionLabel>
            <GlowBar />

            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              {/* Avatar */}
              {avatar && (
                <div className="border-accent-green/40 relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2">
                  <Image src={avatar} alt={name} fill className="object-cover" />
                </div>
              )}

              {/* Name, role, social */}
              <div className="flex flex-col gap-2">
                <h2 className="font-heading text-text-primary text-xl font-bold">{name}</h2>
                {occupation && (
                  <p className="font-body text-text-secondary text-sm">{occupation}</p>
                )}
                {company && <p className="font-body text-text-muted text-xs">{company}</p>}
                <div className="mt-1 flex items-center gap-3">
                  <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
                  <SocialIcon kind="github" href={github} size={5} />
                  <SocialIcon kind="linkedin" href={linkedin} size={5} />
                  <SocialIcon kind="x" href={twitter} size={5} />
                  <SocialIcon kind="bluesky" href={bluesky} size={5} />
                </div>
              </div>
            </div>
          </div>

          {/* Bio / Manifesto card */}
          <div className="border-border-line bg-elevated flex flex-col gap-4 rounded-sm border p-8">
            <SectionLabel>{'// MISSÃO'}</SectionLabel>
            <GlowBar />
            <div className="prose prose-invert prose-sm font-body max-w-none leading-relaxed">
              {children}
            </div>
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
