'use client'

import { useEffect, useState } from 'react'

// Data em que o "servidor" foi ligado (início do blog)
const SERVER_BOOT = new Date('2025-01-01T00:00:00Z').getTime()

function getUptimeSeconds() {
  return Math.floor((Date.now() - SERVER_BOOT) / 1000)
}

export function HeroStatus() {
  const [uptime, setUptime] = useState(getUptimeSeconds)

  useEffect(() => {
    const interval = setInterval(() => setUptime(getUptimeSeconds()), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className="font-heading text-accent-green text-[11px] font-bold tracking-[1px]">
      {`// status: ONLINE | uptime: ${uptime} | sinal: FORTE`}
    </span>
  )
}
