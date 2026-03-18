import { TransmissionCard, AuthorPanel, CurrentlySection } from '@/components'
import { Pagination, HeroStatus, GlowBar } from '@/components/ui'
import { authorData, currentlyItems } from '@/data/sidebarData'

const POSTS_PER_PAGE = 6

interface Post {
  slug: string
  title: string
  date: string
  summary?: string
  tags: string[]
  category: string
  readingTime: { text: string; minutes: number; time: number; words: number }
}

interface HomeProps {
  posts: Post[]
  currentPage?: number
}

function formatDateDot(dateStr: string): string {
  const d = new Date(dateStr)
  const year = d.getUTCFullYear()
  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function formatReadingTime(rt: { minutes: number }): string {
  const mins = Math.max(1, Math.ceil(rt.minutes))
  return `${mins} min`
}

export default function Home({ posts, currentPage }: HomeProps) {
  const page = currentPage ?? 1
  const start = (page - 1) * POSTS_PER_PAGE
  const displayPosts = posts.slice(start, start + POSTS_PER_PAGE)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  return (
    <div>
      {/* Hero — full width background */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/static/images/hero-section.png')",
          minHeight: '400px',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:px-10">
          {/* Left column */}
          <div className="flex max-w-[640px] flex-col gap-5">
            {/* Tag badge */}
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00e5ff]" />
              <span className="font-heading text-[11px] font-bold text-[#00e5ff]">
                TRANSMISSÃO AO VIVO // SYS:ONLINE
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-heading font-bold text-[#e0e0f0]"
              style={{ fontSize: '52px', lineHeight: '1.1' }}
            >
              ARQUIVO DE
              <br />
              TRANSMISSÕES
            </h1>

            {/* Description */}
            <p className="font-body text-[15px] text-[#a0b4d0]">
              Registros de exploração em dev, design e tecnologia. Sintonize, viajante.
            </p>
          </div>

          {/* Right terminal box */}
          <div
            className="w-full rounded-sm p-[1px] lg:w-[540px] lg:shrink-0"
            style={{ background: 'linear-gradient(135deg, #00ff88, #00e5ff)' }}
          >
            <div className="font-heading rounded-sm bg-[#161829] p-4 text-xs">
              <p className="font-bold text-[#00ff88]">
                {'[ TERMINAL v4.2.1 // MAINFRAME MAIAHUB ]'}
              </p>
              <p className="my-2 text-[#2a3a4a]">{'─'.repeat(48)}</p>
              <p className="text-[#4a6a7a]">{'sys.init > carregando módulos...'}</p>
              <p className="text-[#4a6a7a]">{'sys.init > verificando integridade do arquivo...'}</p>
              <p className="text-[#4a6a7a]">{'sys.init > bem-vindo, viajante.'}</p>
              <p className="mt-1 text-[#00e5ff]">
                {'sync > sincronizando transmissões recentes...'}
              </p>
              <p className="my-2 text-[#2a3a4a]">{'─'.repeat(48)}</p>
              <HeroStatus />
              <p className="mt-4 text-[#2a3a4a]">&nbsp;</p>
              <p className="flex items-center gap-1 text-[#4a6a7a]">
                <span>{'>'}</span>
                <span className="inline-block h-[13px] w-[7px] animate-pulse bg-[#00e5ff] opacity-70" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        {/* Main grid: posts + sidebar */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          {/* Posts column */}
          <div className="flex flex-col gap-6">
            {/* Column header */}
            <div className="flex w-full items-center gap-4">
              <span className="font-heading text-text-primary shrink-0 text-sm font-bold">
                {'// ÚLTIMAS TRANSMISSÕES'}
              </span>
              <GlowBar />
            </div>

            {!displayPosts.length && (
              <p className="text-text-muted font-body text-sm">Nenhuma transmissão encontrada.</p>
            )}
            {displayPosts.map((post) => (
              <TransmissionCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                summary={post.summary || ''}
                date={formatDateDot(post.date)}
                readingTime={formatReadingTime(post.readingTime)}
                category={post.category}
                tags={post.tags}
              />
            ))}

            {totalPages > 1 && (
              <Pagination currentPage={page} totalPages={totalPages} basePath="" />
            )}
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
    </div>
  )
}
