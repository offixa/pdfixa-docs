/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PDFixa',
  tagline: 'Deterministic PDF engine for Java',
  favicon: 'img/logo.svg',
  url: 'https://pdfixa.dev',
  baseUrl: '/',
  organizationName: 'offixa',
  projectName: 'pdfixa-docs',
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: false,
    format: 'mdx',
  },
  
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/offixa/pdfixa-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'PDFixa',
      logo: {
        alt: 'PDFixa',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/', label: 'Home', position: 'left' },
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { to: '/examples', label: 'Examples', position: 'left' },
        {
          href: 'https://github.com/offixa/pdfixa',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            { label: 'Installation', to: '/docs/getting-started/installation' },
            { label: 'Quick Start', to: '/docs/getting-started/quick-start' },
          ],
        },
        {
          title: 'Core Concepts',
          items: [
            { label: 'Documents', to: '/docs/core-concepts/documents' },
            { label: 'Pages', to: '/docs/core-concepts/pages' },
            { label: 'Content Streams', to: '/docs/core-concepts/content-streams' },
          ],
        },
        {
          title: 'Guides',
          items: [
            { label: 'Generate an Invoice', to: '/docs/guides/invoice' },
            { label: 'Generate a Report', to: '/docs/guides/report' },
            { label: 'Use with Spring Boot', to: '/docs/guides/spring-boot' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'API Overview', to: '/docs/reference/api-overview' },
            { label: 'Error Handling', to: '/docs/reference/error-handling' },
            { label: 'GitHub', href: 'https://github.com/offixa/pdfixa' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Offixa.`,
    },
    prism: {
      additionalLanguages: ['java'],
    },
  },
};

module.exports = config;
