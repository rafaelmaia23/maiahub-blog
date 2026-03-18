'use client'

import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  className?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onSearch?: (value: string) => void
  onSubmit?: (value: string) => void
}

export function SearchBox({
  className,
  placeholder = 'search transmissions...',
  value,
  defaultValue,
  onSearch,
  onSubmit,
}: SearchBoxProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value ?? '')
      }}
      className={cn(
        'border-border-line bg-input flex h-9 w-[280px] items-center gap-2 rounded-sm border px-3',
        'focus-within:border-accent-green/40 transition-colors',
        className
      )}
    >
      <Search className="text-text-muted h-3.5 w-3.5 shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        {...(value !== undefined ? { value } : { defaultValue })}
        onChange={(e) => onSearch?.(e.target.value)}
        className="font-body text-text-primary placeholder:text-text-muted w-full border-0 bg-transparent p-0 text-xs focus:ring-0"
      />
    </form>
  )
}
