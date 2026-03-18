'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={cn(
        'font-body text-[13px] font-semibold transition-colors',
        isActive ? 'text-accent-green' : 'text-text-secondary hover:text-accent-green',
        className
      )}
    >
      {'> '}
      {children}
    </Link>
  )
}
