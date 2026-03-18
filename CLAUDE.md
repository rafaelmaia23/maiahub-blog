# CLAUDE.md — Maiahub Blog (Raiz)

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (config via `css/tailwind.css` `@theme`)
- **Content:** Contentlayer2 + MDX (`data/blog/*.mdx`)
- **Package manager:** Yarn

## Comandos

```bash
yarn dev        # next dev (porta padrão 3000)
yarn build      # next build + postbuild (gera search.json e tag-data.json)
yarn lint       # eslint com auto-fix
```

---

## Design System "Starlog"

Dark-only. Sem toggle claro/escuro. Tokens definidos em `css/tailwind.css`.

### Fontes

| Token Tailwind    | Família              | Uso                        |
|-------------------|----------------------|----------------------------|
| `font-heading`    | Space Mono (mono)    | Títulos, labels de destaque |
| `font-body`       | JetBrains Mono (mono)| Corpo de texto, UI          |

### Background

| Token            | Hex       | Uso                        |
|------------------|-----------|----------------------------|
| `bg-deep-space`  | `#0a0e1a` | Fundo raiz / navbar        |
| `bg-panel`       | `#0f1424` | Footer, painéis secundários |
| `bg-card`        | `#141a2e` | Cards, painéis laterais     |
| `bg-elevated`    | `#1a2140` | Hover states, menus        |
| `bg-input`       | `#0d1220` | Campos de input             |

### Accents

| Token                  | Hex       |
|------------------------|-----------|
| `text-accent-green`    | `#00ff88` |
| `text-accent-green-dim`| `#00cc6a` |
| `text-accent-blue`     | `#00d4ff` |
| `text-accent-blue-dim` | `#38bdf8` |
| `text-accent-purple`   | `#a855f7` |
| `text-accent-amber`    | `#f59e0b` |

### Text

| Token                | Hex       | Uso              |
|----------------------|-----------|------------------|
| `text-text-primary`  | `#e0e0e0` | Corpo principal  |
| `text-text-secondary`| `#8892a8` | Labels, subtexto |
| `text-text-muted`    | `#4a5568` | Placeholders     |

### Borders

| Token              | Hex          |
|--------------------|--------------|
| `border-border-line` | `#1e2a4a` |
| `border-border-glow` | `#00ff8833`|

### Efeito glow (linha horizontal)

```css
background: linear-gradient(90deg, transparent 0%, #00ff88 30%, #00d4ff 70%, transparent 100%);
height: 2px;
```

Usado no topo e rodapé da navbar, e no Footer.

---

## Categorias (8 slugs)

Definidas em `data/categories.ts`. Slug usado no frontmatter do post.

| Slug              | Label             | Tailwind color                        |
|-------------------|-------------------|---------------------------------------|
| `tecnologia`      | TECNOLOGIA        | `bg-[#00d4ff] text-[#0D0D0D]`        |
| `carreira`        | CARREIRA          | `bg-[#7b2fff] text-white`            |
| `hobbies`         | HOBBIES           | `bg-[#f97316] text-[#0D0D0D]`        |
| `rpg-world`       | RPG & WORLD       | `bg-[#a855f7] text-white`            |
| `escrita-criativa`| ESCRITA CRIATIVA  | `bg-[#ec4899] text-[#0D0D0D]`        |
| `journaling`      | JOURNALING        | `bg-[#94a3b8] text-[#0D0D0D]`        |
| `leituras`        | LEITURAS          | `bg-[#f59e0b] text-[#0D0D0D]`        |
| `ideias`          | IDEIAS            | `bg-[#10b981] text-[#0D0D0D]`        |

Fallback: `tecnologia` (via `defaultCategory` em `categories.ts`).

---

## Path Aliases (tsconfig.json)

| Alias           | Resolve para    |
|-----------------|-----------------|
| `@/components/*`| `components/*`  |
| `@/lib/*`       | `lib/*`         |
| `@/data/*`      | `data/*`        |
| `@/layouts/*`   | `layouts/*`     |
| `@/hooks/*`     | `hooks/*`       |
| `@/css/*`       | `css/*`         |

**Não existe `@/app`.** Imports dentro de `app/` usam caminhos relativos.

---

## Rotas (URL → Arquivo)

| URL                    | Arquivo                          |
|------------------------|----------------------------------|
| `/`                    | `app/page.tsx`                   |
| `/blog`                | `app/blog/page.tsx`              |
| `/blog/[slug]`         | `app/blog/[...slug]/page.tsx`    |
| `/page/[page]`         | `app/page/[page]/page.tsx`       |
| `/about`               | `app/about/page.tsx`             |
| `/contact`             | `app/contact/page.tsx`           |

---

## Layouts disponíveis

Todos em `layouts/`:

| Arquivo                  | Uso                                    |
|--------------------------|----------------------------------------|
| `PostLayout.tsx`         | Layout padrão de post (com sidebar)    |
| `ListLayoutWithTags.tsx` | Listagem de posts com filtro de tags   |
| `AuthorLayout.tsx`       | Página `/about` do autor               |

---

## Content Pipeline

- **Engine:** Contentlayer2
- **Posts:** `data/blog/*.mdx` → type `Blog`
- **Authors:** `data/authors/*.mdx` → type `Authors`
- **Gerado após build:**
  - `app/tag-data.json` — contagem de tags por slug
  - `public/search.json` — índice de busca para kbar
- **Config:** `contentlayer.config.ts`
- Ver schema completo em `data/CLAUDE.md`

---

## Arquivo Pencil (Design)

`/home/rafamaia/Documents/design/maiahub-blog/maiahub.pen`

Use as ferramentas MCP `pencil` para ler/editar. Nunca usar `Read`/`Grep` em arquivos `.pen`.
