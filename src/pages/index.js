import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import styles from './index.module.css';

const features = [
  {
    title: 'Deterministic output',
    text: 'Same input → same bytes. No timestamps, no random IDs, no reordering. Compare hashes across builds.',
  },
  {
    title: 'Zero dependencies',
    text: 'One JAR. No transitive pulls. No iText, no PDFBox, no Bouncy Castle. Just your code and PDFixa.',
  },
  {
    title: 'Java 17+',
    text: 'Modern API surface: try-with-resources, streams, records. No legacy compat baggage.',
  },
  {
    title: 'Maven Central',
    text: 'One line in your pom.xml or build.gradle. No custom repositories, no license keys.',
  },
];

const EXAMPLE_CODE = `import dev.offixa.pdfixa.PdfDocument;
import dev.offixa.pdfixa.PdfPage;

try (PdfDocument doc = new PdfDocument()) {
    PdfPage page = doc.addPage(595, 842);  // A4
    page.drawTextBox(72, 750, 450, 40, "Hello from PDFixa!");
    doc.writeTo(new FileOutputStream("output.pdf"));
}`;

const MAVEN_XML = `<dependency>
    <groupId>dev.offixa</groupId>
    <artifactId>pdfixa</artifactId>
    <version>1.0.0</version>
</dependency>`;

export default function Home() {
  return (
    <Layout title="PDFixa" description="Deterministic PDF engine for Java">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>PDFixa</h1>
          <p className={styles.tagline}>
            Deterministic PDF engine for Java.<br />
            Same input. Same bytes. Every time.
          </p>
          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              Read the docs
            </Link>
            <Link
              className="button button--outline button--lg"
              href="https://github.com/offixa/pdfixa"
            >
              GitHub
            </Link>
          </div>
        </div>
      </header>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {features.map(({ title, text }) => (
              <div key={title} className={clsx('col col--3', styles.feature)}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick example ────────────────────────────────────── */}
      <section className={styles.example}>
        <div className="container">
          <div className="row">
            <div className="col col--6">
              <h2>5 lines to your first PDF</h2>
              <CodeBlock language="java" title="QuickStart.java">
                {EXAMPLE_CODE}
              </CodeBlock>
            </div>
            <div className={clsx('col col--6', styles.exampleRight)}>
              <h2>Add it</h2>
              <CodeBlock language="xml" title="pom.xml">
                {MAVEN_XML}
              </CodeBlock>
              <p className={styles.exampleNote}>
                Also available as{' '}
                <code>implementation("dev.offixa:pdfixa:1.0.0")</code>{' '}
                for Gradle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Links ────────────────────────────────────────────── */}
      <section className={styles.links}>
        <div className="container">
          <div className={styles.linkGrid}>
            <Link to="/docs/getting-started/quick-start" className={styles.linkCard}>
              <strong>Quick Start</strong>
              <span>First PDF in 2 minutes</span>
            </Link>
            <Link to="/examples" className={styles.linkCard}>
              <strong>Examples</strong>
              <span>Invoices, reports, Spring Boot</span>
            </Link>
            <Link href="https://github.com/offixa/pdfixa" className={styles.linkCard}>
              <strong>GitHub</strong>
              <span>Source, issues, releases</span>
            </Link>
            <Link href="https://github.com/offixa/pdfixa-examples" className={styles.linkCard}>
              <strong>Examples repo</strong>
              <span>Standalone runnable samples</span>
            </Link>
            <Link
              href="https://central.sonatype.com/artifact/dev.offixa/pdfixa"
              className={styles.linkCard}
            >
              <strong>Maven Central</strong>
              <span>Versions and artifacts</span>
            </Link>
            <Link to="/docs/reference/api-overview" className={styles.linkCard}>
              <strong>API Reference</strong>
              <span>Classes, methods, conventions</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
