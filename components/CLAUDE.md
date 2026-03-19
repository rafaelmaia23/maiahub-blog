# CLAUDE.md — components/

Referência rápida do design system Starlog. Componentes divididos em dois níveis:

## Convenções

- **Border radius:** `rounded-sm` em todos os elementos (4px)
- **Classnames condicionais:** sempre usar `cn()` de `@/lib/utils`
- **Tema:** dark-only — sem variantes `dark:` (todo estilo é para modo escuro)
- **Fontes:** `font-heading` (Space Mono) para títulos/valores; `font-body` (JetBrains Mono) para texto UI

## Import patterns

```ts
// Atômicos (components/ui/)
import { GlowBar, SectionLabel, CategoryBadge, Tag, NavLink, SearchBox, StatItem, StatusItem, Pagination, HeroStatus } from '@/components/ui'

// Compostos (components/)
import { NavBar, TransmissionCard, AuthorPanel, CurrentlySection, Footer } from '@/components'
```

---

## Componentes Atômicos (`components/ui/`)

### `GlowBar`
Linha decorativa com gradiente verde→azul.
```tsx
<GlowBar className?: string />
```

### `SectionLabel`
Label de seção em caixa-alta, estilo terminal.
```tsx
<SectionLabel className?: string>CREW PROFILE //</SectionLabel>
```

### `CategoryBadge`
Badge colorido da categoria do post. Lê config de `data/categories.ts`.
```tsx
<CategoryBadge category: string className?: string onClick?: () => void />
```

### `Tag`
Tag de post com prefixo `#`.
```tsx
<Tag text: string className?: string onClick?: () => void isActive?: boolean />
```

### `NavLink`
Link de navegação com detecção de rota ativa. Prefixo `> ` inserido automaticamente.
```tsx
<NavLink href: string className?: string>POSTS</NavLink>
```

### `SearchBox`
Campo de busca controlado ou não-controlado.
```tsx
<SearchBox className?: string placeholder?: string value?: string defaultValue?: string onSearch?: (v: string) => void onSubmit?: (v: string) => void />
```

### `StatItem`
Valor + label em coluna com cor de acento. `color?: 'green' | 'blue' | 'purple'` (default: `'green'`).
```tsx
<StatItem value: string label: string color? className? />
```

### `StatusItem`
Label colorido + texto + imagem opcional (140px altura).
```tsx
<StatusItem label: string value: string color? imageSrc? className? />
```

### `Pagination`
Paginação com links ou callbacks.
```tsx
<Pagination currentPage: number totalPages: number basePath?: string className?: string onPageChange?: (page: number) => void />
```

### `HeroStatus`
Linha de status animada com uptime calculado desde `2025-01-01`. Client component, sem props.
```tsx
<HeroStatus />
```

---

## Componentes Compostos (`components/`)

### `NavBar`
Header fixo com logo, links de navegação e busca. Inclui menu mobile com hamburger.
```tsx
<NavBar className?: string />
```
Usa: `NavLink`, `SearchBox` (de `ui/`).

### `TransmissionCard`
Card de post na listagem do blog.
```tsx
<TransmissionCard title summary slug date readingTime category tags: string[] className? />
```
Usa: `CategoryBadge`, `Tag` (de `ui/`).

### `AuthorPanel`
Painel lateral do autor com avatar, bio e stats.
```tsx
<AuthorPanel name role bio avatar? sectionTitle? stats?: Array<{ label; value; color }> className? />
```
`stats` é um array de `{ label: string; value: string; color: 'green'|'blue'|'purple' }`.
Usa: `SectionLabel`, `StatItem` (de `ui/`).

### `CurrentlySection`
Painel lateral com lista de itens do tipo "currently".
```tsx
<CurrentlySection items: CurrentlyItem[] sectionTitle? className? />
// CurrentlyItem: { label, value, color: 'green'|'blue'|'purple', imageSrc? }
```
Usa: `SectionLabel`, `StatusItem` (de `ui/`). `CurrentlyItem` exportado do mesmo arquivo.

### `Footer`
Rodapé com copyright e links de navegação. Links hardcoded: HOME, SOBRE, CONTATO, RSS.
```tsx
<Footer className?: string />
```
