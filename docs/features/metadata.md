---
sidebar_position: 3
title: Java PDF Metadata
description: Set PDF document metadata (title, author, subject, keywords) deterministically for reproducible output.
keywords:
  - java pdf
  - pdf generation java
  - java pdf metadata
  - deterministic pdf
  - java pdf library
---

# Metadata

PDF metadata appears in document properties (title bar, PDF viewer info panel, search indexes). Set it deterministically from your application data.

## Available fields

| Field | Method | Notes |
|-------|--------|-------|
| Title | `doc.setTitle(...)` | Document title |
| Author | `doc.setAuthor(...)` | Person or system that authored the content |
| Subject | `doc.setSubject(...)` | Short description |
| Keywords | `doc.setKeywords(...)` | Space- or comma-separated keywords |
| Creator | `doc.setCreator(...)` | Application that produced the content |
| Producer | *(set by PDFixa)* | Set to `"PDFixa x.y"` by default |

## Example

```java
try (PdfDocument doc = new PdfDocument()) {
    doc.setTitle("Monthly Sales Report — March 2024");
    doc.setAuthor("Finance System");
    doc.setSubject("Sales figures by region");
    doc.setCreator("Acme Reporting v3.2");

    PdfPage page = doc.addPage(595, 842);
    // ... add content ...

    doc.writeTo(outputStream);
}
```

## Determinism rules

Metadata is serialised into the PDF and directly affects the output bytes. To keep output deterministic:

- **Do not** use `Instant.now()`, `new Date()`, or any wall-clock value as metadata.
- **Do** derive values from your input data (e.g. report period, document ID).
- **Avoid** machine hostnames, process IDs, or thread names.

```java
// Bad — changes on every run
doc.setTitle("Report generated on " + LocalDate.now());

// Good — derived from input
doc.setTitle("Sales Report — " + reportPeriod);
```

See [Deterministic Output](./deterministic-output.md) for the complete list of rules.
