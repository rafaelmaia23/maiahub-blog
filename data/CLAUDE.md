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

## `data/sidebarData.ts`

Dados estáticos usados nos painéis laterais da home e do blog.

### `authorData`

```ts
{
  name: string       // Nome exibido no AuthorPanel
  role: string       // Cargo/função
  bio: string        // Biografia curta
  stats: {
    posts: string    // Número de transmissões (label: TRANSMISSÕES)
    readers: string  // Mundos/readers (label: MUNDOS)
    days: string     // Status da missão (label: MISSÃO)
  }
}
```

### `currentlyItems` (array de `CurrentlyItem`)

```ts
{
  label: string                       // Ex: 'LENDO', 'OUVINDO', 'BUILDANDO'
  value: string                       // Conteúdo exibido
  color: 'green' | 'blue' | 'purple'
  imageSrc?: string                   // Imagem opcional (140px altura)
}
```

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
