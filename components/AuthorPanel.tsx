import { cn } from '@/lib/utils'
import Image from 'next/image'
import { SectionLabel } from './ui/SectionLabel'
import { StatItem } from './ui/StatItem'

interface AuthorPanelProps {
  name: string
  role: string
  bio: string
  avatar?: string
  stats?: {
    posts: string
    readers: string
    days: string
  }
  className?: string
}

export function AuthorPanel({ name, role, bio, avatar, stats, className }: AuthorPanelProps) {
  return (
    <div
      className={cn(
        'border-border-line bg-card flex flex-col items-center gap-4 rounded-sm border p-6',
        className
      )}
    >
      <SectionLabel className="text-accent-green font-bold">CREW PROFILE //</SectionLabel>

      {/* Avatar */}
      <div className="relative h-20 w-20 overflow-hidden rounded-sm border-2 border-[#00e5ff]">
        {avatar ? (
          <Image src={avatar} alt={name} fill className="object-cover" />
        ) : (
          <div className="bg-elevated font-heading flex h-full w-full items-center justify-center text-2xl text-[#00e5ff]">
            {name.charAt(0)}
          </div>
        )}
      </div>

      {/* Name & Role */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="font-heading text-text-primary text-base font-bold">{name}</h3>
        <span className="font-body text-text-secondary text-[11px]">{role}</span>
      </div>

      {/* Bio */}
      <p className="font-body text-text-secondary text-center text-xs leading-relaxed">{bio}</p>

      {/* Stats */}
      {stats && (
        <div className="border-border-line flex w-full justify-between border-t pt-4">
          <StatItem value={stats.posts} label="TRANSMISSÕES" color="green" />
          <StatItem value={stats.readers} label="MUNDOS" color="blue" />
          <StatItem value={stats.days} label="MISSÃO" color="purple" />
        </div>
      )}
    </div>
  )
}
