import { genPageMetadata } from 'app/seo'
import { GlowBar, SectionLabel } from '@/components/ui'
import SocialIcon from '@/components/social-icons'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({ title: 'Contato' })

const channels = [
  {
    kind: 'mail' as const,
    label: 'EMAIL',
    value: siteMetadata.email,
    href: `mailto:${siteMetadata.email}`,
    description: 'Respondo em até 48h',
  },
  {
    kind: 'github' as const,
    label: 'GITHUB',
    value: 'github.com/rafamaia',
    href: siteMetadata.github,
    description: 'Código aberto e projetos',
  },
  {
    kind: 'linkedin' as const,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/rafamaia',
    href: siteMetadata.linkedin,
    description: 'Conexões profissionais',
  },
  {
    kind: 'x' as const,
    label: 'TWITTER / X',
    value: '@rafamaia',
    href: siteMetadata.x,
    description: 'Transmissões rápidas',
  },
]

const availableFor = [
  'Consultoria técnica',
  'Revisão de arquitetura',
  'Projetos freelance',
  'Palestras e workshops',
  'Colaborações open-source',
]

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {/* Page title bar */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-text-primary text-2xl font-bold">{'// CONTATO'}</h1>
        <div className="border-accent-green/40 bg-card flex items-center gap-2 rounded-sm border px-4 py-2">
          <span className="bg-accent-green h-1.5 w-1.5 rounded-full" />
          <span className="font-body text-accent-green text-[11px] font-bold">DISPONÍVEL</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Channels card */}
          <div className="border-border-line bg-card flex flex-col gap-5 rounded-sm border p-8">
            <SectionLabel>{'// CANAIS DISPONÍVEIS'}</SectionLabel>
            <GlowBar />

            <div className="flex flex-col divide-y divide-[#1e2540]">
              {channels.map((ch) => (
                <div key={ch.kind} className="flex items-center gap-4 py-5 first:pt-0 last:pb-0">
                  <div className="text-text-secondary shrink-0">
                    <SocialIcon kind={ch.kind} href={ch.href} size={5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-body text-text-muted text-[10px] tracking-widest uppercase">
                      {ch.label}
                    </span>
                    <Link
                      href={ch.href || '#'}
                      className="font-heading text-text-primary hover:text-accent-green text-sm font-semibold transition-colors"
                    >
                      {ch.value}
                    </Link>
                    <span className="font-body text-text-secondary text-xs">{ch.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* Availability card */}
          <div className="border-border-line bg-card flex flex-col gap-4 rounded-sm border p-6">
            <SectionLabel>{'// DISPONÍVEL PARA'}</SectionLabel>
            <GlowBar />
            <ul className="flex flex-col gap-3">
              {availableFor.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="bg-accent-green h-1.5 w-1.5 shrink-0 rounded-full" />
                  <span className="font-body text-text-secondary text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote card */}
          <div className="border-border-line bg-card flex flex-col gap-4 rounded-sm border p-6">
            <SectionLabel className="text-purple-400">{'// TRANSMISSÃO PESSOAL'}</SectionLabel>
            <div className="border-border-line bg-deep-space rounded-sm border p-4">
              <p className="font-heading text-text-secondary text-sm leading-relaxed">
                {'> Não espere o momento perfeito.'}
                <br />
                {'> Manda.'}
              </p>
            </div>
            <p className="font-body text-text-muted text-xs">— Rafael Maia</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
