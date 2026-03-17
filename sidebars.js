/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsed: false,
      items: [
        'core-concepts/documents',
        'core-concepts/pages',
        'core-concepts/content-streams',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/fonts',
        'features/colors-and-styling',
        'features/images',
        'features/metadata',
        'features/deterministic-output',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/invoice',
        'guides/spring-boot',
        'guides/deterministic-testing',
        'guides/text-encoding',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api-overview',
        'reference/error-handling',
      ],
    },
    {
      type: 'category',
      label: 'PDFixa Pro',
      items: [
        'core-vs-pro',
        'pro',
        'reference/pricing',
      ],
    },
  ],
};

module.exports = sidebars;
