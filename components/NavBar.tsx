'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import headerNavLinks from '@/data/headerNavLinks'
import { NavLink } from './ui/NavLink'
import { SearchBox } from './ui/SearchBox'

interface NavBarProps {
  className?: string
}

function NavSearchBox({ onSubmitMobile }: { onSubmitMobile?: () => void }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const isOnBlog = pathname === '/blog' || pathname === '/blog/'
  const urlQ = isOnBlog ? (searchParams.get('q') ?? '') : ''
  const [inputValue, setInputValue] = useState(urlQ)

  useEffect(() => {
    setInputValue(urlQ)
  }, [urlQ])

  function handleSubmit(value: string) {
    const trimmed = value.trim()
    router.push(trimmed ? `/blog?q=${encodeURIComponent(trimmed)}` : '/blog')
    onSubmitMobile?.()
  }

  return <SearchBox value={inputValue} onSearch={setInputValue} onSubmit={handleSubmit} />
}


export function NavBar({ className }: NavBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        'bg-deep-space/90 fixed top-0 right-0 left-0 z-50 w-full backdrop-blur-md',
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center transition-opacity hover:opacity-80">
          <Image
            src="/static/images/logo.svg"
            alt="Maiahub"
            width={220}
            height={50}
            className="h-11 w-auto"
          />
        </Link>

        {/* Nav Links (desktop) — right after logo */}
        <nav className="ml-8 hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {headerNavLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Spacer to push search to the right */}
        <div className="flex-1" />

        {/* Search (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Suspense fallback={<SearchBox />}>
              <NavSearchBox />
            </Suspense>
          </div>

          {/* Hamburger button */}
          <button
            type="button"
            className="text-text-secondary hover:text-accent-green inline-flex items-center justify-center p-2 transition-colors lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Abrir menu"
          >
            {mobileOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="bg-deep-space/95 border-border-line border-t backdrop-blur-md lg:hidden"
          aria-label="Menu mobile"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-text-secondary hover:text-accent-green hover:bg-elevated rounded-sm px-3 py-2.5 text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {'> '}
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-3">
              <Suspense fallback={<SearchBox />}>
                <NavSearchBox onSubmitMobile={() => setMobileOpen(false)} />
              </Suspense>
            </div>
          </div>
        </nav>
      )}
      {/* Glow line */}
      <div
        className="h-[2px] w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #00ff88 30%, #00d4ff 70%, transparent 100%)',
        }}
      />
    </header>
  )
}
