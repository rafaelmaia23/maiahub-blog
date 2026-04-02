# CLAUDE.md — data/

Referência ao schema de conteúdo e dados estáticos do projeto.

---

## Blog MDX Frontmatter (`data/blog/*.mdx`)

| Campo         | Tipo              | Required | Default  | Observação                            |
|---------------|-------------------|----------|----------|---------------------------------------|
| `title`       | string            | sim      | —        |                                       |
| `date`        | date (ISO)        | sim      | —        | Ex: `2025-03-18`                      |
| `category`    | string            | não      | `'dev'`  | Usar slugs de `data/categories.ts`    |
| `tags`        | string[]          | não      | `[]`     | Slugificados pelo Contentlayer        |
| `lastmod`     | date (ISO)        | não      | —        | Data de última modificação            |
| `draft`       | boolean           | não      | —        | `true` oculta em produção             |
| `summary`     | string            | não      | —        | Exibido no card da listagem           |
| `images`      | json (string[])   | não      | —        | Primeira imagem usada no og:image     |
| `authors`     | string[]          | não      | —        | Nome do arquivo em `data/authors/`    |
| `layout`      | string            | não      | —        | Nome do layout em `layouts/`          |
| `bibliography`| string            | não      | —        |                                       |
| `canonicalUrl`| string            | não      | —        |                                       |

**Nota:** `category` default legado era `'dev'` (não existe mais como slug). Use `'tecnologia'` para posts de tecnologia.

### Exemplo mínimo de post

```mdx
---
title: 'Título do Post'
date: '2025-03-18'
category: 'tecnologia'
tags: ['nextjs', 'typescript']
summary: 'Resumo do post para o card na listagem.'
---

Conteúdo do post aqui.
```

### Componentes MDX disponíveis no corpo do post

Além do markdown padrão, os posts aceitam os seguintes componentes JSX no corpo:

| Componente | Descrição |
|-----------|-----------|
| `<Gallery>` | Galeria de imagens com lightbox e navegação |
| `<TOCInline>` | Índice inline do post |
| `<Image>` | Imagem otimizada via `next/image` |

#### `<Gallery>`

Exibe um grid de thumbnails clicáveis. Ao clicar, abre lightbox com navegação entre as imagens do grupo.

```mdx
<Gallery images={[
  { src: "/static/images/posts/meu-post/img1.jpg", alt: "Descrição 1" },
  { src: "/static/images/posts/meu-post/img2.jpg", alt: "Descrição 2" },
  { src: "/static/images/posts/meu-post/img3.jpg", alt: "Descrição 3" },
]} />
```

- `images`: array de `{ src: string; alt?: string }`
- `src`: caminho relativo à raiz pública (ex: `/static/images/posts/...`)
- Imagens devem ficar em `public/static/images/posts/<slug>/`

---

## Authors MDX (`data/authors/*.mdx`)

| Campo        | Tipo   | Required | Observação                   |
|--------------|--------|----------|------------------------------|
| `name`       | string | sim      |                              |
| `avatar`     | string | não      | Caminho da imagem pública    |
| `occupation` | string | não      |                              |
| `company`    | string | não      |                              |
| `email`      | string | não      |                              |
| `twitter`    | string | não      |                              |
| `bluesky`    | string | não      |                              |
| `linkedin`   | string | não      |                              |
| `github`     | string | não      |                              |
| `layout`     | string | não      | Default: `AuthorLayout`      |

Autor padrão: `data/authors/default.mdx`.

---

## `data/siteContent.ts` — fonte de verdade centralizada

**Server-only.** Não importar em client components (`'use client'`).

Lê `allAuthors` do Contentlayer e centraliza todo o conteúdo das seções do site.

### Exports

| Export | Uso |
|--------|-----|
| `authorData` | Dados do autor para AuthorPanel e sidebar |
| `contactsData` | Canais e disponibilidade para `/contact` |
| `currentlyData` | Items da seção Currently |
| `osData` | Tech stack para `/about` |
| `missionLogData` | Log de missão para `/about` |
| `manifestoData` | Slug e sectionTitle do manifesto MDX |

### `authorData`

```ts
{
  name: string         // Do authors/default.mdx
  avatar: string       // Do authors/default.mdx
  occupation: string   // Do authors/default.mdx
  email: string        // Do authors/default.mdx
  github: string       // Do authors/default.mdx
  linkedin: string     // Do authors/default.mdx
  twitter: string      // Do authors/default.mdx
  bioShort: string     // Biografia curta para o sidebar
  sectionTitle: string // Label do painel — 'CREW PROFILE //'
  stats: Array<{
    label: string                       // Ex: 'TRANSMISSÕES', 'MUNDOS', 'MISSÃO'
    value: string                       // Valor dinâmico (allBlogs.length, etc.)
    color: 'green' | 'blue' | 'purple'
  }>
}
```

### `currentlyData`

```ts
{
  sectionTitle: string   // Label da seção — 'STATUS // CURRENTLY'
  items: CurrentlyItem[] // Ver tipo abaixo
}
```

### `CurrentlyItem`

```ts
{
  label: string                       // Ex: 'LENDO', 'OUVINDO', 'BUILDANDO'
  value: string                       // Conteúdo exibido
  color: 'green' | 'blue' | 'purple'
  imageSrc?: string                   // Imagem em public/static/images/currently/ (140px altura)
}
```

Para adicionar um item ao Currently, basta adicionar um objeto em `currentlyData.items`.

### Fonte de verdade do autor

`data/authors/default.mdx` é a fonte de verdade para nome, avatar, occupation e links de contato.
O corpo MDX do arquivo é a bio longa renderizada em `//PILOTO` no AuthorLayout.

---

## `data/pages/manifest.mdx` — manifesto do blog

Documento MDX independente renderizado em `//MISSÃO` no AuthorLayout.
Tipo Contentlayer: `Page` (filePathPattern: `pages/**/*.mdx`).
Slug calculado: `manifest`.

---

## `data/categories.ts`

Define os 8 slugs de categorias válidos. Ver tabela completa em `/CLAUDE.md`.

### Como adicionar uma categoria nova

1. Adicionar entrada em `categories` em `data/categories.ts`:
   ```ts
   'novo-slug': { label: 'NOVO LABEL', color: 'bg-[#cor] text-[...]' }
   ```
2. `CategoryBadge` lê automaticamente via `getCategoryConfig(slug)`.
3. Nenhuma outra alteração necessária — o badge já funcionará.

---

## Arquivos gerados após build

| Arquivo                | Gerado por           | Uso                              |
|------------------------|----------------------|----------------------------------|
| `app/tag-data.json`    | `contentlayer.config.ts` → `createTagCount` | Contagem de tags por slug |
| `public/search.json`   | `contentlayer.config.ts` → `createSearchIndex` | Índice kbar de busca     |

Esses arquivos **não devem ser editados manualmente** — são sobrescritos a cada build.

---

## Notas

- `draft: true` no frontmatter oculta o post em produção (`NODE_ENV === 'production'`), mas ele aparece em dev.
- O campo `category` com default `'dev'` é legado do template original — este slug não existe em `categories.ts`. Posts sem categoria recebem o badge de `tecnologia` pelo fallback de `getCategoryConfig`.
- Contentlayer2 é usado em vez do Contentlayer original — o pacote é `contentlayer2`.
