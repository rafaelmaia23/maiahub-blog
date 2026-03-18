import { cn } from '@/lib/utils'
import Link from 'next/link'

interface FooterLink {
  href: string
  label: string
}

interface FooterProps {
  className?: string
}

const footerLinks: FooterLink[] = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'SOBRE' },
  { href: '/contact', label: 'CONTATO' },
  { href: '/feed.xml', label: 'RSS' },
]

export function Footer({ className }: FooterProps) {
  return (
    <footer className={cn('bg-panel w-full', className)}>
      {/* Glow line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #00ff88 30%, #00d4ff 70%, transparent 100%)',
        }}
      />
      <div className="px-4 py-6 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="font-body text-text-muted text-[11px]">
            © 2026 Maiahub // Todas as transmissões arquivadas
          </span>

          <nav
            className="flex flex-wrap items-center gap-4 sm:gap-6"
            aria-label="Navegação do rodapé"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-text-secondary hover:text-accent-green text-[11px] transition-colors"
              >
                {'> '}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
