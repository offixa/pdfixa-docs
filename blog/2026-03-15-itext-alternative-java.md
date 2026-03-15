---
title: iText Alternative for Java
description: A technical comparison of Java PDF libraries for teams evaluating alternatives to iText. Covers Apache PDFBox, OpenPDF, and PDFixa — licensing, dependencies, API complexity, and when to choose each.
keywords:
  - itext alternative java
  - itext alternative
  - java pdf library
  - open source pdf java
  - java pdf generation library
  - pdfbox alternative
  - deterministic pdf generation
slug: /itext-alternative-java
authors: [pdfixa-team]
tags:
  - java
  - pdf
  - comparisons
  - backend
---

iText is one of the most established PDF libraries in the Java ecosystem. It is also one of the most commonly searched for alternatives.

The reasons teams look for a replacement are predictable: a licensing model change that blocks commercial use, a dependency footprint that conflicts with a microservice architecture, or simply the need for a library that better fits a specific use case. This article covers the available options, what each one is suited for, and how to choose.

<!-- truncate -->

---

## Why teams search for an iText alternative

iText 5, the version most Java developers encountered in the 2000s and early 2010s, was distributed under LGPL. That license allowed commercial use without requiring your application to be open source.

iText 7, the current version, changed the community edition license to AGPL (Affero General Public License). AGPL requires that any application using AGPL-licensed software — including when accessed over a network — must also release its source code under AGPL. For most commercial applications, this is not acceptable.

iText addresses this with a dual license model: AGPL for open-source projects, and a paid commercial license for proprietary applications. Commercial license pricing is not public and is negotiated per deployment.

The three situations where teams typically start looking for alternatives:

1. **The application is commercial.** An AGPL dependency requires either purchasing a commercial license or finding a different library.
2. **The license cost exceeds the budget.** Especially common in startups, small teams, or internal tooling.
3. **The feature set is larger than needed.** iText 7 is a comprehensive PDF platform. Teams generating invoices or reports from application data rarely need digital signatures, XFA forms, or interactive PDF/A compliance tooling.

---

## What developers typically need from a PDF library

Most backend PDF generation falls into a small number of categories:

**Invoices and billing documents.** Structured layout, custom fonts, company logo, line items, totals. Generated on demand from order or billing data. Must be consistent across environments.

**Reports.** Multi-page documents with tables, headers, footers, and page numbers. Generated on schedule or on request from a data source.

**Document exports.** Contracts, terms, receipts, confirmation letters. Usually template-driven, data-filled at generation time.

**Certificates.** Fixed layout with variable text, often with custom branding.

For all of these use cases, the core requirements are: layout control, font embedding, image embedding, and reliable output. PDF/A compliance, digital signatures, and form filling are not required.

---

## Alternatives to iText

### Apache PDFBox

Apache PDFBox is a project from the Apache Software Foundation. It covers PDF creation, reading, text extraction, rendering, and signing under the Apache 2.0 license.

PDFBox models the PDF specification closely. Creating a document from scratch means working with `PDPage`, `PDPageContentStream`, and positioning content manually using coordinates. The API does not provide higher-level abstractions like text boxes or automatic line wrapping.

PDFBox is most naturally used for tasks that involve reading or manipulating existing PDF files: text extraction, form processing, adding annotations, signing. Generating new documents from application data requires significantly more code than with higher-level libraries.

```java
// PDFBox: drawing a single line of text
try (PDDocument document = new PDDocument()) {
    PDPage page = new PDPage(PDRectangle.A4);
    document.addPage(page);

    PDFont font = PDType1Font.HELVETICA;
    try (PDPageContentStream stream = new PDPageContentStream(document, page)) {
        stream.beginText();
        stream.setFont(font, 12);
        stream.newLineAtOffset(72, 750);
        stream.showText("Invoice #1001");
        stream.endText();
    }

    document.save("invoice.pdf");
}
```

**License:** Apache 2.0
**Use when:** Reading, extracting, or signing existing PDFs. Text extraction pipelines. Signing workflows.

---

### OpenPDF

OpenPDF is a fork of iText 4, maintained under LGPL and MPL by the LibrePDF organization. It was created after iText moved to a more restrictive license, to preserve a permissively-licensed version of the original API.

The API is close to iText 4 and iText 5. If your existing codebase uses those versions, migrating to OpenPDF is largely a package rename. OpenPDF covers basic document generation — text, tables, images, fonts — but does not implement PDF/A, PDF 2.0, or the more advanced features introduced in iText 7.

```java
// OpenPDF: basic document creation
Document document = new Document(PageSize.A4);
PdfWriter.getInstance(document, new FileOutputStream("invoice.pdf"));
document.open();
document.add(new Paragraph("Invoice #1001"));
document.close();
```

**License:** LGPL / MPL — permissive for commercial use
**Use when:** Migrating from an iText 4 or 5 codebase. Basic document generation. Teams that need a working replacement with minimal code changes.

---

### PDFixa

PDFixa is a PDF generation library for Java 17 and later. It generates PDFs from application data with a document-drawing API and produces byte-identical output for the same input across runs.

The library ships as a single JAR with no transitive dependencies and is available on Maven Central. The three core classes are `PdfDocument`, `PdfPage`, and `PdfFont`.

```java
// PDFixa: generating an invoice header
try (PdfDocument doc = new PdfDocument()) {
    PdfPage page = doc.addPage(595, 842);   // A4 in points

    PdfFont bold = doc.registerFont(
        getClass().getResourceAsStream("/fonts/Inter-Bold.ttf").readAllBytes()
    );

    page.drawTextBox(72, 770, 300, 24, "Invoice #1001", bold, 16);
    page.drawTextBox(72, 745, 300, 20, "Due: 2026-04-15");
    page.drawLine(72, 735, 523, 735);

    doc.writeTo(new FileOutputStream("invoice.pdf"));
}
```

**License:** Permissive open-source
**Use when:** Generating invoices, reports, and exports from application data. Reproducible output is needed for testing or caching. Minimizing transitive dependencies is a requirement.

---

## Comparison table

| Library | License | Transitive deps | API style | Deterministic | Typical use |
|---------|---------|-----------------|-----------|---------------|-------------|
| **iText 7** | AGPL / commercial | Many | PDF-native, layered | No | Signatures, PDF/A, forms, enterprise |
| **Apache PDFBox** | Apache 2.0 | Several | PDF-native, verbose | No | Reading, extraction, signing |
| **OpenPDF** | LGPL / MPL | Several | iText 4 style | No | iText migration, basic generation |
| **PDFixa** | Permissive | None | Document-drawing | Yes | Generation from data, testing, microservices |

---

## When to choose each library

**Stay with iText 7 (or purchase the commercial license) when:**
- Your application requires digital signatures, interactive forms, or PDF/A compliance
- You are in a regulated industry where iText's audit trail and support contract matter
- The feature set or the commercial support is worth the license cost

**Choose Apache PDFBox when:**
- Reading, extracting, or modifying existing PDF files is the primary task
- An Apache 2.0 license is required by your organization's policy
- You are building a signing or text extraction pipeline

**Choose OpenPDF when:**
- You have an existing iText 4 or 5 codebase and need a drop-in replacement
- Basic generation (text, tables, images) is sufficient
- An AGPL dependency is not acceptable and a commercial license is not in scope

**Choose PDFixa when:**
- You are generating documents — invoices, reports, exports — from application data
- Reproducible output is useful for testing or caching
- Dependency footprint matters (Docker images, AWS Lambda, GraalVM native image)
- You are on Java 17 or later and want a clean, low-ceremony API

---

## Deterministic PDF generation and why it matters

When any of the common Java PDF libraries generates a document, the output includes a creation timestamp and a randomly generated document ID embedded in the file. The same source code and the same input data produce different bytes on every run.

This behavior is invisible when the goal is just to display or print a document. It becomes a problem in two specific scenarios.

**Testing.** Automated tests for PDF output usually fall back to visual comparison (screenshot diffs, rendering checks) because byte comparison is not possible with non-deterministic output. Visual comparison tools are slower to set up, harder to run in CI, and more fragile. With deterministic output, the test is simple:

```java
byte[] expected = Files.readAllBytes(Path.of("testdata/invoice_1001.pdf"));
byte[] actual   = invoiceService.generate(order);

assertArrayEquals(expected, actual);
```

If the output changes — because a layout calculation changed, a font was updated, or a margin shifted — the test fails immediately. No visual diffing required.

**Caching.** If you generate a PDF on demand and want to cache it by input content, you need to be able to derive a stable cache key from the input. Non-deterministic output means you cannot verify a cached file is still valid by content hash. With deterministic output, the SHA-256 hash of the input uniquely identifies the expected output, and cache invalidation is straightforward.

PDFixa removes the embedded timestamp and document ID from generated files. Run the same code twice with the same data — you get the same bytes.

---

## Conclusion

iText is a capable library, and for applications that need digital signatures, PDF/A, or complex form handling, it may still be the right choice with a commercial license.

For teams generating invoices, reports, and document exports from application data — and especially for teams where a commercial license is not feasible — there are solid alternatives.

Apache PDFBox covers reading and signing workflows well. OpenPDF is the lowest-friction iText migration path. PDFixa is purpose-built for server-side document generation with deterministic output and zero transitive dependencies.

**Resources:**
- [PDFixa documentation](/docs/intro) — Quick Start, guides, API reference
- [PDFixa on GitHub](https://github.com/offixa/pdfixa)
- [pdfixa-examples repository](https://github.com/offixa/pdfixa-examples) — invoice, report, Spring Boot examples
- [Maven Central](https://central.sonatype.com/artifact/dev.offixa/pdfixa)
