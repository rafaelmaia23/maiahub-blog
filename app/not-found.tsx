import Image from 'next/image'
import Link from '@/components/Link'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/static/images/bg-404.png"
        alt=""
        fill
        className="object-cover"
        style={{ zIndex: 0 }}
        priority
      />

      {/* Radial overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 10,
          background:
            'radial-gradient(ellipse at center, rgba(10,14,26,0.55) 0%, rgba(10,14,26,0.85) 60%, rgba(10,14,26,0.97) 100%)',
        }}
      />

      {/* Decorative cyan orb */}
      <div
        className="absolute right-0 bottom-0 h-96 w-96 rounded-full"
        style={{
          zIndex: 11,
          background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
          opacity: 0.2,
          transform: 'translate(30%, 30%)',
        }}
      />

      {/* Corner brackets */}
      <span
        className="absolute top-6 left-6 h-6 w-6 border-t-2 border-l-2 border-[#00ff88]"
        style={{ zIndex: 12 }}
      />
      <span
        className="absolute top-6 right-6 h-6 w-6 border-t-2 border-r-2 border-[#00ff88]"
        style={{ zIndex: 12 }}
      />
      <span
        className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-[#00ff88]"
        style={{ zIndex: 12 }}
      />
      <span
        className="absolute right-6 bottom-6 h-6 w-6 border-r-2 border-b-2 border-[#00ff88]"
        style={{ zIndex: 12 }}
      />

      {/* Central content */}
      <div
        className="font-body relative flex w-full max-w-[672px] flex-col items-center gap-5 px-4 py-16 text-center"
        style={{ zIndex: 20 }}
      >
        <p className="text-[11px] font-bold tracking-[2px] text-[#00ff88]">
          {'// ERRO_DE_NAVEGAÇÃO'}
        </p>

        <p
          className="text-[96px] leading-none font-bold text-[#00d4ff]"
          style={{
            opacity: 0.75,
            filter: 'drop-shadow(0 0 24px #00d4ff88)',
          }}
        >
          404
        </p>

        {/* Terminal card */}
        <div className="w-full max-w-[576px] overflow-x-auto rounded border border-[#1e2540] bg-[#161829] p-5 text-left">
          <p className="text-xs font-bold whitespace-nowrap text-[#00ff88]">
            SISTEMA_DE_RASTREAMENTO v2.4.1
          </p>
          <hr className="my-2 border-[#1e2540]" />
          <p className="text-xs whitespace-nowrap text-[#8892a8]">
            &gt; rastreando sinal de navegação...
          </p>
          <p className="text-xs whitespace-nowrap text-[#8892a8]">
            &gt; verificando registro de rotas... [<span className="text-red-400">FALHOU</span>]
          </p>
          <p className="text-xs whitespace-nowrap text-[#8892a8]">
            &gt; objeto: não encontrado no mapa estelar
          </p>
          <p className="text-xs whitespace-nowrap text-[#a855f7]">
            &gt; status: TRANSMISSÃO INTERROMPIDA
          </p>
          <p className="text-xs whitespace-nowrap text-[#00d4ff]">
            &gt; última transmissão conhecida:{' '}
            <Link href="/" className="underline hover:text-[#00ff88]">
              [/]
            </Link>
          </p>
          <hr className="my-2 border-[#1e2540]" />
          <p className="text-xs font-bold whitespace-nowrap text-[#00ff88]">
            {'// sugestão: retornar à base'}
          </p>
        </div>

        <h1 className="text-4xl font-bold text-[#e0e0f0]">SINAL PERDIDO</h1>

        <p className="max-w-[448px] text-sm leading-relaxed text-[#b0bfd4]">
          A coordenada que você buscava não existe neste setor. Pode ter sido movida, deletada ou
          nunca ter existido neste quadrante.
        </p>

        <Link
          href="/"
          className="rounded bg-[#00ff88] px-7 py-3 text-sm font-bold text-[#0a0e1a] transition-opacity hover:opacity-90"
        >
          [ RETORNAR À BASE ]
        </Link>

        <p className="text-xs text-[#8892a8]">{'// ou explore o arquivo no menu de navegação'}</p>
      </div>
    </section>
  )
}
