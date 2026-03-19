const COLOR_TOKENS: Record<string, string> = {
  green: '#00ff88',
  blue: '#00d4ff',
  purple: '#a855f7',
  amber: '#f59e0b',
  orange: '#f97316',
  cyan: '#06b6d4',
  pink: '#ec4899',
  red: '#ef4444',
}

export function resolveColor(color: string): string {
  if (color.startsWith('#')) return color
  return COLOR_TOKENS[color] ?? COLOR_TOKENS.green
}
