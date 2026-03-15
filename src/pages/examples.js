import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const examples = [
  {
    category: 'Getting Started',
    items: [
      { label: 'Quick Start — PdfDocument, PdfPage, drawTextBox', to: '/docs/getting-started/quick-start' },
    ],
  },
  {
    category: 'Core Concepts',
    items: [
      { label: 'Document lifecycle and writing to streams', to: '/docs/core-concepts/documents' },
      { label: 'Pages — sizes, coordinate system', to: '/docs/core-concepts/pages' },
      { label: 'Content Streams — draw operations and order', to: '/docs/core-concepts/content-streams' },
    ],
  },
  {
    category: 'Features',
    items: [
      { label: 'Built-in and custom fonts', to: '/docs/features/fonts' },
      { label: 'Colors and styling — RGB text, lines, fills', to: '/docs/features/colors-and-styling' },
      { label: 'Embedding JPEG and PNG images', to: '/docs/features/images' },
      { label: 'Setting document metadata', to: '/docs/features/metadata' },
      { label: 'Deterministic output — verification and rules', to: '/docs/features/deterministic-output' },
    ],
  },
  {
    category: 'Guides',
    items: [
      { label: 'Generate an invoice (header, line items, totals)', to: '/docs/guides/invoice' },
      { label: 'Generate a multi-page report with cover', to: '/docs/guides/report' },
      { label: 'Use PDFixa with Spring Boot REST endpoint', to: '/docs/guides/spring-boot' },
    ],
  },
  {
    category: 'Reference',
    items: [
      { label: 'API Overview — classes, methods, conventions', to: '/docs/reference/api-overview' },
      { label: 'Error Handling — exceptions, try/catch patterns', to: '/docs/reference/error-handling' },
    ],
  },
];

export default function Examples() {
  return (
    <Layout title="Examples" description="PDFixa code examples and patterns">
      <main className="container margin-vert--xl">
        <h1>Examples</h1>
        <p>
          Code samples and patterns for common PDF generation tasks with PDFixa.
          For the full API, see the{' '}
          <a href="https://github.com/offixa/pdfixa" target="_blank" rel="noopener noreferrer">
            GitHub repository
          </a>.
        </p>
        {examples.map(({ category, items }) => (
          <div key={category} className="margin-top--lg">
            <h2>{category}</h2>
            <ul>
              {items.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </Layout>
  );
}
