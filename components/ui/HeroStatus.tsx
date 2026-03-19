'use client'

import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

const SERVER_BOOT = new Date(siteMetadata.serverBootDate).getTime()

function getUptimeSeconds() {
  return Math.floor((Date.now() - SERVER_BOOT) / 1000)
}

export function HeroStatus() {
  const [uptime, setUptime] = useState<number | null>(null)

  useEffect(() => {
    setUptime(getUptimeSeconds())
    const interval = setInterval(() => setUptime(getUptimeSeconds()), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-heading text-accent-green text-[11px] font-bold tracking-[1px]">
      {uptime === null
        ? '// status: ONLINE | uptime: ... | sinal: FORTE'
        : `// status: ONLINE | uptime: ${uptime} | sinal: FORTE`}
    </span>
  )
}
