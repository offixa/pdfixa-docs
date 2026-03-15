# PDFixa — SEO Keyword Architecture

**Project:** PDFixa — deterministic PDF engine for Java
**Target audience:** Java backend developers searching for PDF generation solutions
**Date:** 2026-03-15

---

## Current state analysis

16 docs pages exist with `title`, `description`, and `keywords` frontmatter.

**Problem:** Keywords are heavily duplicated. 14 of 16 pages share `java pdf` and `pdf generation java`. Search engines see keyword cannibalization — multiple pages compete for the same query instead of one authoritative page winning.

**Strategy:** Assign each page a **primary keyword** it owns. Build new content to capture queries the docs structure cannot reach (comparisons, tutorials, long-tail use-cases). Use the blog for time-sensitive and opinion content; use docs for evergreen reference.

---

## Cluster 1 — Core Category Keywords

These are the high-volume "head" terms. A developer types these when they start evaluating PDF libraries.

| # | Keyword | Search Intent | Why It Matters | Content Type | Priority | Owned By |
|---|---------|--------------|----------------|-------------|----------|----------|
| 1.1 | **java pdf library** | Informational — "which libraries exist?" | Highest-volume entry point. Developer is evaluating options. PDFixa must appear here. | Docs page (intro.md) | **P1** | `intro.md` — already targets this |
| 1.2 | **generate pdf in java** | Transactional — "show me how" | Developer wants working code. Quick Start must rank for this. | Docs page (quick-start.md) | **P1** | `quick-start.md` — already targets `pdf generation java` |
| 1.3 | **java pdf generation library** | Informational — comparison shopping | Longer-tail variant of 1.1. Captures developers deeper in research. | Blog article: "Java PDF Generation in 2026: Libraries Compared" | **P1** | NEW — blog post needed |
| 1.4 | **java create pdf programmatically** | Transactional — "code example please" | Developer has decided to generate PDFs in code (not a UI tool). | Docs page (quick-start.md) — add as secondary keyword | **P2** | `quick-start.md` |
| 1.5 | **java pdf api** | Navigational/Informational — "show me the API" | Developer wants to see method signatures. API Overview must rank. | Docs page (api-overview.md) | **P2** | `api-overview.md` — already targets this |
| 1.6 | **open source pdf java** | Informational — license-sensitive developer | Developers filtering for non-commercial licenses. PDFixa being open-source is a differentiator vs. iText. | Blog article: "Open Source PDF Libraries for Java" | **P2** | NEW — blog post needed |
| 1.7 | **lightweight java pdf library** | Informational — "I don't want 50MB of transitive deps" | Zero-dependency value prop. Maps directly to PDFixa's USP. | Docs page (intro.md) — reinforce in description | **P2** | `intro.md` |
| 1.8 | **java 17 pdf library** | Informational — "modern Java compatible?" | Developers on Java 17+ LTS want confirmation. | Docs page (installation.md) — add as keyword | **P3** | `installation.md` |

### Action items — Cluster 1

1. **De-duplicate keywords.** Each docs page should own ONE primary keyword from this cluster. Remove `java pdf` from 12 of 14 pages that have it and let `intro.md` own it exclusively.
2. **Create a blog post:** *"Java PDF Generation in 2026: Libraries Compared"* — targets 1.3 and 1.6.
3. **Update `quick-start.md` description** to include "create pdf programmatically" and "generate pdf in java".

---

## Cluster 2 — Use-Case Keywords

These are specific tasks a developer wants to accomplish. They have high conversion intent — the developer is already committed to generating PDFs and needs guidance.

| # | Keyword | Search Intent | Why It Matters | Content Type | Priority | Owned By |
|---|---------|--------------|----------------|-------------|----------|----------|
| 2.1 | **java invoice pdf** | Transactional — "give me invoice code" | One of the most common PDF use-cases in business apps. High commercial value. | Guide (invoice.md) | **P1** | `invoice.md` — already targets this |
| 2.2 | **java generate pdf report** | Transactional — "multi-page report code" | Tied to data reporting — every enterprise app has it. | Guide (report.md) | **P1** | `report.md` — already targets `java report pdf` |
| 2.3 | **java pdf with images** | Transactional — "embed logo / chart in PDF" | Image embedding is a gate — if it works, the library is adopted. | Docs page (images.md) | **P1** | `images.md` — partially targets this |
| 2.4 | **java pdf table** | Transactional — "draw a data table in PDF" | Extremely common query. No current content covers tables. Major gap. | NEW guide: "Drawing Tables in PDFixa" | **P1** | NEW — guide needed |
| 2.5 | **java pdf custom font** | Transactional — "embed TTF in PDF" | Developers building branded documents need custom fonts. | Docs page (fonts.md) | **P2** | `fonts.md` — already targets `java pdf fonts` |
| 2.6 | **java pdf from html** | Transactional — "convert HTML to PDF" | Very high search volume. PDFixa does NOT do this — address it to avoid confusion and redirect to correct approach. | Blog article: "Java PDF from HTML vs Programmatic Generation" | **P2** | NEW — blog post needed |
| 2.7 | **java pdf receipt** | Transactional — niche variant of 2.1 | Receipts are narrower than invoices but equally common in e-commerce. | Guide: "Generate a Receipt" OR extend invoice.md with a receipt variant | **P2** | `invoice.md` or NEW guide |
| 2.8 | **java pdf barcode** | Transactional — "add barcode / QR to PDF" | Common in logistics, e-commerce. If PDFixa supports raw image embedding, barcode libraries (ZXing) + drawImage works. | Blog article: "Add a QR Code to a PDF with Java" | **P3** | NEW — blog post needed |
| 2.9 | **java pdf certificate** | Transactional — "generate a certificate PDF" | Education, training platforms. Similar structure to invoice. | Guide: "Generate a Certificate" | **P3** | NEW — guide needed |
| 2.10 | **java pdf merge** | Transactional — "merge two PDFs" | Moderately searched. If PDFixa does not support merging, a "What PDFixa Does and Doesn't Do" page covers this. | FAQ / scope page | **P3** | NEW |
| 2.11 | **java pdf watermark** | Transactional — "add watermark to PDF" | Enterprise compliance feature. Can be achieved with `setColor` + `drawTextBox` at low opacity if supported. | Blog article or guide | **P3** | NEW |

### Action items — Cluster 2

1. **HIGH PRIORITY:** Create a "Drawing Tables" guide. `java pdf table` is one of the top-5 most searched PDF-related Java queries.
2. **Create a blog post** addressing HTML-to-PDF vs programmatic generation (captures high-volume "java pdf from html" traffic and redirects intent).
3. **Extend `invoice.md`** with a receipt variant section or create a standalone receipt guide.
4. **Create a blog post** about QR codes/barcodes with PDFixa + ZXing.

---

## Cluster 3 — Comparison Keywords

These are "X vs Y" and "alternative to X" queries. Very high conversion — the developer is actively choosing between libraries. These queries are best served by blog articles or dedicated comparison pages, not docs.

| # | Keyword | Search Intent | Why It Matters | Content Type | Priority | Owned By |
|---|---------|--------------|----------------|-------------|----------|----------|
| 3.1 | **itext alternative java** | Navigational — "I need something other than iText" | iText's dual license (AGPL/commercial) drives developers to seek alternatives. This is a high-intent keyword. | Comparison page: "PDFixa vs iText" | **P1** | NEW — comparison page needed |
| 3.2 | **pdfbox alternative** | Navigational — "Apache PDFBox is too complex/slow" | PDFBox is the default open-source option. Developers frustrated with its API search for alternatives. | Comparison page: "PDFixa vs Apache PDFBox" | **P1** | NEW — comparison page needed |
| 3.3 | **itext vs pdfbox** | Comparative — "which is better?" | High search volume. PDFixa can appear as a third option. Classic comparison article. | Blog article: "iText vs PDFBox vs PDFixa (2026)" | **P1** | NEW — blog post needed |
| 3.4 | **openpdf alternative** | Navigational — "OpenPDF fork of iText 4 isn't maintained" | Smaller volume but high conversion. OpenPDF users are migration-ready. | Comparison page or section within iText comparison | **P2** | NEW |
| 3.5 | **java pdf library comparison** | Informational — "comprehensive comparison" | Developer wants a matrix. Perfect for a feature comparison table. | Blog article: "Java PDF Libraries Compared (2026)" | **P1** | NEW — same as 1.3, expanded |
| 3.6 | **flyingsaucer alternative** | Navigational — "Flying Saucer is abandoned" | Niche but zero competition on this keyword. | Section in comparison blog post | **P3** | NEW |
| 3.7 | **jasperreports alternative** | Navigational — "JasperReports is too heavy" | JasperReports is enterprise-grade and XML-heavy. Developers wanting lighter approach search this. | Blog article: "PDFixa vs JasperReports" | **P3** | NEW |
| 3.8 | **java pdf library no license** | Informational — license-sensitive filtering | Developers avoiding AGPL/commercial licenses. PDFixa's permissive license is the answer. | Addressed in comparison pages + intro.md | **P2** | `intro.md` + comparison pages |

### Action items — Cluster 3

1. **HIGHEST PRIORITY in this cluster:** Create "PDFixa vs iText" and "PDFixa vs Apache PDFBox" comparison pages. These two keywords alone capture a large share of developers evaluating alternatives.
2. **Create a unified comparison blog post:** "Java PDF Libraries Compared (2026)" with a feature matrix (license, deps, API style, determinism, Java version, Maven Central).
3. **Add license clarity to `intro.md`:** Explicitly state the license type (MIT / Apache 2.0 / whatever it is) in the Key Features table.

---

## Cluster 4 — Spring Boot / Backend Integration Keywords

These target developers working within specific frameworks. The intent is "how do I use a PDF library inside my existing stack?"

| # | Keyword | Search Intent | Why It Matters | Content Type | Priority | Owned By |
|---|---------|--------------|----------------|-------------|----------|----------|
| 4.1 | **spring boot pdf generation** | Transactional — "PDF endpoint in Spring Boot" | One of the most-searched framework+PDF queries. PDFixa already has a guide. | Guide (spring-boot.md) | **P1** | `spring-boot.md` — already targets this |
| 4.2 | **spring boot generate pdf rest api** | Transactional — "return PDF from REST endpoint" | More specific than 4.1. Spring Boot guide covers this but should optimize title/description. | Guide (spring-boot.md) — optimize metadata | **P1** | `spring-boot.md` |
| 4.3 | **spring boot pdf download endpoint** | Transactional — "let user download a PDF" | Overlaps with 4.2 but different wording. Spring Boot guide covers streaming with `HttpServletResponse`. | Guide (spring-boot.md) — add as keyword | **P2** | `spring-boot.md` |
| 4.4 | **java microservice pdf generation** | Informational — "PDF in a microservice context" | Maps to deterministic caching, small JARs, no native deps. PDFixa's zero-dep story is perfect here. | Blog article: "PDF Generation in Java Microservices" | **P2** | NEW — blog post needed |
| 4.5 | **quarkus pdf generation** | Transactional — "PDF in Quarkus" | Growing framework. No current guide. Structure is similar to Spring Boot. | NEW guide: "Use with Quarkus" | **P2** | NEW — guide needed |
| 4.6 | **java pdf batch generation** | Transactional — "generate 10k PDFs" | Enterprise use-case. Ties to memory, performance, and deterministic caching. | Blog article: "Batch PDF Generation in Java" | **P2** | NEW — blog post needed |
| 4.7 | **java pdf aws lambda** | Transactional — "serverless PDF generation" | Serverless trend. Zero-dep, small JAR = ideal for Lambda cold starts. | Blog article: "Generate PDFs in AWS Lambda with Java" | **P3** | NEW — blog post needed |
| 4.8 | **graalvm native pdf java** | Transactional — "native image PDF generation" | If PDFixa works with GraalVM native-image (no reflection hacks), this is a strong differentiator. | Blog article: "PDFixa + GraalVM Native Image" | **P3** | NEW — blog post needed |
| 4.9 | **java pdf docker** | Transactional — "containerized PDF generation" | Zero native deps = no special Docker image needed. | Section in microservices or Spring Boot article | **P3** | NEW |

### Action items — Cluster 4

1. **Optimize `spring-boot.md` metadata:** Add "rest api", "download endpoint", "spring boot pdf" as secondary keywords.
2. **Create a Quarkus guide** — mirrors Spring Boot structure but uses JAX-RS / RESTEasy.
3. **Create a blog post:** "PDF Generation in Java Microservices" — covers Docker, caching, batch, and Lambda in one article.
4. **If GraalVM native-image works:** this is a high-value differentiator blog post.

---

## Cluster 5 — Deterministic / Testing Keywords

This is PDFixa's unique selling proposition. No other Java PDF library markets itself on determinism. This cluster has low competition but high conversion for teams that need reproducible output.

| # | Keyword | Search Intent | Why It Matters | Content Type | Priority | Owned By |
|---|---------|--------------|----------------|-------------|----------|----------|
| 5.1 | **deterministic pdf generation** | Informational — "is this even possible?" | Unique differentiator. A developer searching this is PDFixa's ideal user. | Docs page (deterministic-output.md) | **P1** | `deterministic-output.md` — already targets this |
| 5.2 | **reproducible pdf java** | Informational — "same input same output" | Alternate phrasing of 5.1. Scientific computing, compliance, and CI/CD use-cases. | Docs page (deterministic-output.md) — add as keyword | **P1** | `deterministic-output.md` |
| 5.3 | **java pdf unit test** | Transactional — "how do I test PDF generation?" | Testing PDFs is painful. If PDFixa makes it easy (golden file + SHA-256), this wins developers. | NEW guide: "Testing Guide" | **P1** | NEW — guide needed (also in audit) |
| 5.4 | **pdf golden file testing** | Transactional — niche CI/CD keyword | Zero competition. Developers who know this pattern are looking for a library that supports it. | NEW guide: "Testing Guide" (section) | **P1** | NEW — same guide as 5.3 |
| 5.5 | **java pdf hash comparison** | Transactional — "compare PDF bytes in CI" | Specific to deterministic workflows. | NEW guide: "Testing Guide" (section) | **P2** | NEW — same guide as 5.3 |
| 5.6 | **java pdf regression test** | Transactional — "detect unintended PDF changes" | CI/CD teams want to catch visual regressions. Golden file pattern. | NEW guide: "Testing Guide" (section) | **P2** | NEW — same guide as 5.3 |
| 5.7 | **pdf generation ci cd** | Informational — "PDF in continuous integration" | Broader intent. A blog post combining determinism + testing + CI. | Blog article: "Deterministic PDFs and CI/CD" | **P2** | NEW — blog post needed |
| 5.8 | **java pdf snapshot testing** | Transactional — specific testing methodology | Snapshot testing is popular in frontend (Jest). Introducing it for PDFs is novel. | Blog article: "Snapshot Testing for PDFs in Java" | **P3** | NEW — blog post needed |

### Action items — Cluster 5

1. **HIGHEST PRIORITY:** Create the Testing Guide. It captures 5.3, 5.4, 5.5, and 5.6 in one page. This is also the #1 recommendation from the audit.
2. **Create a blog post:** "Deterministic PDFs and CI/CD" — positions PDFixa as the only library where `assertArrayEquals` works on PDF bytes.
3. **Add `reproducible pdf java` to `deterministic-output.md` keywords.**

---

## Content Creation Roadmap

### Phase 1 — Priority 1 (next 2 weeks)

| # | Content | Type | Target Keywords | Expected Impact |
|---|---------|------|-----------------|-----------------|
| A | **Testing Guide** | Docs guide | java pdf unit test, pdf golden file testing, pdf hash comparison | Captures unique PDFixa differentiator. No competitor has this content. |
| B | **Drawing Tables Guide** | Docs guide | java pdf table, java pdf grid | Captures one of the highest-volume use-case queries. |
| C | **PDFixa vs iText** | Comparison page | itext alternative java, itext vs pdfixa | Captures license-frustrated iText users. High conversion. |
| D | **PDFixa vs Apache PDFBox** | Comparison page | pdfbox alternative, apache pdfbox vs pdfixa | Captures complexity-frustrated PDFBox users. |
| E | **Java PDF Libraries Compared (2026)** | Blog article | java pdf library comparison, java pdf generation library, open source pdf java | Umbrella comparison. Links to C and D. |
| F | **De-duplicate existing keywords** | Metadata update | — | Fixes keyword cannibalization across 16 pages. |

### Phase 2 — Priority 2 (weeks 3–6)

| # | Content | Type | Target Keywords |
|---|---------|------|-----------------|
| G | **"Java PDF from HTML vs Programmatic"** | Blog article | java pdf from html |
| H | **Quarkus Integration Guide** | Docs guide | quarkus pdf generation |
| I | **"PDF Generation in Java Microservices"** | Blog article | java microservice pdf, java pdf docker, java pdf batch generation |
| J | **"Deterministic PDFs and CI/CD"** | Blog article | pdf generation ci cd, deterministic pdf |
| K | **FAQ / Troubleshooting page** | Docs page | java pdf empty, java pdf font not working |
| L | **Optimize Spring Boot guide keywords** | Metadata update | spring boot generate pdf rest api, spring boot pdf download |

### Phase 3 — Priority 3 (weeks 7–12)

| # | Content | Type | Target Keywords |
|---|---------|------|-----------------|
| M | **"Add QR Code to PDF with Java"** | Blog article | java pdf barcode, java pdf qr code |
| N | **Generate a Certificate Guide** | Docs guide | java pdf certificate |
| O | **"PDFixa + GraalVM Native Image"** | Blog article | graalvm native pdf java |
| P | **"PDFixa + AWS Lambda"** | Blog article | java pdf aws lambda |
| Q | **"Snapshot Testing for PDFs"** | Blog article | java pdf snapshot testing |
| R | **Changelog / Release Notes** | Docs page | — (trust signal, not SEO) |

---

## Keyword De-duplication Plan

Current problem: 14 pages have `java pdf` as keyword #1. This is wasteful.

Proposed primary keyword ownership:

| Page | Primary Keyword (exclusive) | Secondary Keywords |
|------|----------------------------|-------------------|
| `intro.md` | java pdf library | lightweight java pdf, java pdf api |
| `installation.md` | maven java pdf dependency | gradle java pdf, java 17 pdf library |
| `quick-start.md` | generate pdf in java | java create pdf programmatically, java pdf hello world |
| `documents.md` | java pdfdocument lifecycle | java pdf outputstream, java pdf autocloseable |
| `pages.md` | java pdf page size | java pdf coordinates, pdf coordinate system java |
| `content-streams.md` | java pdf content stream | java pdf draw operations, java pdf graphics |
| `fonts.md` | java pdf custom font | java embed ttf pdf, java pdf font loading |
| `colors-and-styling.md` | java pdf color rgb | java pdf text color, java pdf fill color |
| `images.md` | java embed image pdf | java pdf png, java pdf jpeg |
| `metadata.md` | java pdf metadata | java pdf author title, java pdf document properties |
| `deterministic-output.md` | deterministic pdf generation | reproducible pdf java, java pdf same bytes |
| `invoice.md` | java invoice pdf | java pdf receipt, java pdf billing |
| `report.md` | java pdf report generation | java pdf pagination, java pdf multi-page |
| `spring-boot.md` | spring boot pdf generation | spring boot pdf rest api, spring boot pdf download |
| `api-overview.md` | pdfixa api reference | java pdf api methods, pdfixa documentation |
| `error-handling.md` | java pdf error handling | java pdf exception, java pdf troubleshooting |

---

## SEO Technical Checklist

| Task | Status | Notes |
|------|--------|-------|
| `title` frontmatter on all pages | Done (16/16) | Follow `[Topic] + Java PDF` pattern |
| `description` frontmatter on all pages | Done (16/16) | Under 160 chars each |
| `keywords` frontmatter on all pages | Done but needs de-duplication | See table above |
| One `<h1>` per page | Done | Markdown `#` headings |
| Internal cross-links between pages | Done | Guides link to features, features link to guides |
| `og:image` / social preview card | Missing | Create an OG image for social sharing |
| `sitemap.xml` generation | Auto (Docusaurus) | Enabled by default |
| `robots.txt` | Auto (Docusaurus) | Enabled by default |
| Canonical URLs | Auto (Docusaurus) | Enabled by default |
| Page load speed | Good | Static site, no client-side rendering |
| Mobile responsive | Good | Docusaurus default theme |
| Blog section enabled | Not yet | Needed for comparison articles and tutorials |

---

## Estimated Search Volume Context

Approximate monthly search volumes (global, English) for reference:

| Keyword | Estimated Monthly Volume | Competition |
|---------|------------------------:|-------------|
| java pdf library | 2,400 | Medium |
| generate pdf in java | 1,900 | Medium |
| itext alternative java | 1,000 | Low |
| spring boot pdf generation | 880 | Medium |
| java invoice pdf | 720 | Low |
| pdfbox alternative | 590 | Low |
| java pdf table | 1,300 | Medium |
| java pdf from html | 2,100 | High |
| itext vs pdfbox | 480 | Low |
| deterministic pdf generation | 90 | Very Low |
| java pdf unit test | 210 | Very Low |
| java pdf custom font | 390 | Low |
| quarkus pdf generation | 170 | Very Low |
| java pdf barcode | 320 | Low |

> Note: Low competition + low volume keywords (like "deterministic pdf generation") are strategically important because they have **zero** competitor content and **100%** conversion relevance for PDFixa.
