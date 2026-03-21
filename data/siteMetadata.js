/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Maiahub',
  author: 'Rafael Maia',
  headerTitle: 'Maiahub',
  description: 'Blog pessoal sobre desenvolvimento, tecnologia, hobbies, e o que vier na cabeça.',
  language: 'pt-br',
  theme: 'dark',
  siteUrl: 'https://blog.maiahub.com.br',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.svg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'contato@maiahub.com.br',
  locale: 'pt-BR',
  stickyNav: true,
  serverBootDate: '2026-03-19T00:00:00Z', // Data de "inauguração" do servidor — usada no uptime da home
  analytics: {},
  newsletter: null,
  comments: null,
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
    // provider: 'algolia',
    // algoliaConfig: {
    //   // The application ID provided by Algolia
    //   appId: 'R2IYF7ETH7',
    //   // Public API key: it is safe to commit it
    //   apiKey: '599cec31baffa4868cae4e79f180729b',
    //   indexName: 'docsearch',
    // },
  },
}

module.exports = siteMetadata
