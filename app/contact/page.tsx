import { genPageMetadata } from 'app/seo'
import { GlowBar, SectionLabel } from '@/components/ui'
import Link from '@/components/Link'
import { contactsData } from '@/data/siteContent'

export const metadata = genPageMetadata({ title: 'Contato' })

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-16">
      {/* Hero bar */}
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-body text-2xl font-bold text-[#e0e0f0]">{'// CONTATO'}</h1>
        <div className="flex items-center gap-2 rounded border border-[#00ff88] bg-[#0d1f14] px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-sm bg-[#00ff88]" />
          <span className="font-body text-[11px] font-bold tracking-widest text-[#00ff88]">
            CANAL ABERTO
          </span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* IntroCard */}
          <div className="flex flex-col gap-4 rounded-md border border-[#1e2540] bg-[#13152b] p-7">
            <div className="flex flex-col gap-1.5 rounded bg-[#0a0e1a] px-4 py-3">
              <p className="font-body text-xs text-[#6b7db3]">
                {'$ contact --channel=open --status=active'}
              </p>
              <p className="font-body text-xs text-[#00ff88]">
                {'> Canal ativo. Aguardando transmissão...'}
              </p>
            </div>
            <GlowBar />
            <p className="font-body text-sm leading-relaxed text-[#a0b4d0]">
              Este blog não tem formulário de contato. Isso é intencional.
              <br />
              <br />
              Não há intermediário entre você e eu — sem bots, sem autoresponders, sem algoritmo
              decidindo se sua mensagem chega. Os canais abaixo são diretos ao ponto. Escolha o que
              faz mais sentido para o que você quer dizer.
            </p>
          </div>

          {/* ChannelsCard */}
          <div className="flex flex-col gap-5 rounded-md border border-[#1e2540] bg-[#13152b] p-7">
            <SectionLabel className="text-[#00ff88]">{'// CANAIS DISPONÍVEIS'}</SectionLabel>
            <GlowBar />
            <div className="flex flex-col gap-5">
              {contactsData.channels.map((ch, i) => (
                <div key={ch.label}>
                  <div className="flex flex-col gap-1">
                    <span className="font-body text-[10px] font-bold text-[#4a5568]">
                      {ch.label}
                    </span>
                    <Link
                      href={ch.href || '#'}
                      className="font-body text-sm font-bold text-[#00ff88] transition-opacity hover:opacity-75"
                    >
                      {ch.handle}
                    </Link>
                    <p className="font-body text-[13px] leading-snug text-[#a0b4d0]">
                      {ch.description}
                    </p>
                  </div>
                  {i < contactsData.channels.length - 1 && (
                    <div className="mt-5 h-px bg-[#1e2540]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ProtocolCard */}
          <div className="flex flex-col gap-4 rounded-md border border-[#1e2540] bg-[#13152b] p-7">
            <SectionLabel className="text-[#00ff88]">{'// PROTOCOLO DE RESPOSTA'}</SectionLabel>
            <GlowBar />
            <p className="font-body text-sm leading-relaxed text-[#a0b4d0]">
              Leio tudo. Respondo o que consigo.
              <br />
              <br />
              Sem bots, sem templates, sem respostas automáticas. Se você mandou algo genuíno, vai
              receber o mesmo de volta — pode demorar um pouco, mas vai.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-6">
          {/* AvailabilityCard */}
          <div className="flex flex-col gap-4 rounded-md border border-[#1e2540] bg-[#13152b] p-6">
            <SectionLabel className="text-[#00ff88]">{'// DISPONÍVEL PARA'}</SectionLabel>
            <GlowBar />
            <ul className="flex flex-col gap-2.5">
              {contactsData.availableFor.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 shrink-0 rounded-sm ${item.dotColor}`} />
                  <span className={`font-body text-sm ${item.textColor}`}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* QuoteCard */}
          <div className="flex flex-col gap-3 rounded-md border border-[#1e2540] bg-[#13152b] p-6">
            <SectionLabel className="text-[#8b5cf6]">{'// TRANSMISSÃO PESSOAL'}</SectionLabel>
            <div className="flex flex-col gap-2 rounded bg-[#0a0e1a] p-4">
              <p className="font-body text-[13px] text-[#00ff88]">{'> A melhor conversa começa'}</p>
              <p className="font-body text-[13px] text-[#00ff88]">
                {'  com uma mensagem enviada.'}
              </p>
              <span className="font-body animate-pulse text-[13px] text-[#00ff88]">{'_'}</span>
            </div>
            <p className="font-body text-xs text-[#6b7db3]">
              Não espere o momento perfeito. Manda.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
