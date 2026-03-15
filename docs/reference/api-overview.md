---
sidebar_position: 1
title: PDFixa API Overview
description: PDFixa API reference — PdfDocument, PdfPage, PdfFont classes, method signatures, error handling, and thread safety.
keywords:
  - java pdf
  - pdf generation java
  - java pdf api
  - java pdf library
  - deterministic pdf
---

# API Overview

A high-level map of the PDFixa public API.

## Core classes

| Class | Package | Purpose |
|-------|---------|---------|
| `PdfDocument` | `dev.offixa.pdfixa` | Root document object. Add pages, set metadata, write output. |
| `PdfPage` | `dev.offixa.pdfixa` | A single page. All drawing happens here. |
| `PdfFont` | `dev.offixa.pdfixa` | Represents a registered font (built-in or embedded). |

## PdfDocument

```java
// Lifecycle
PdfDocument doc = new PdfDocument()
doc.close()                           // AutoCloseable

// Pages
PdfPage page = doc.addPage(width, height)

// Fonts
PdfFont font = doc.registerFont(byte[] ttfBytes)

// Metadata
doc.setTitle(String)
doc.setAuthor(String)
doc.setSubject(String)
doc.setKeywords(String)
doc.setCreator(String)

// Output
doc.writeTo(OutputStream)
```

## PdfPage

```java
// Text — default font (Helvetica 12 pt)
page.drawTextBox(x, y, width, height, text)

// Text — custom font and size
page.drawTextBox(x, y, width, height, text, PdfFont font, double fontSize)

// Text — default font, custom size
page.drawTextBox(x, y, width, height, text, double fontSize)

// Color
page.setColor(int r, int g, int b)

// Shapes
page.drawLine(x1, y1, x2, y2)
page.drawRect(x, y, width, height)
page.fillRect(x, y, width, height)

// Images
page.drawImage(x, y, width, height, byte[] imageBytes)
```

## Coordinate model

All positions and sizes use the same unit: **PDF points** (1/72 inch).

- Origin is **bottom-left** of the page.
- X increases right, Y increases up.
- Typical A4 page: `595 × 842` pt.

## Error handling

PDFixa throws `IOException` for output errors (stream closed, disk full, etc.) and `IllegalArgumentException` for invalid arguments (negative dimensions, null text, unregistered font). All other exceptions are propagated as-is from the JDK.

## Thread safety

`PdfDocument` and `PdfPage` are **not thread-safe**. Create one document per generation task. If generating PDFs concurrently, use separate instances per thread or wrap in a thread-local pool.

## Versioning

PDFixa follows [SemVer](https://semver.org). Patch releases are byte-compatible: the same inputs produce the same PDF bytes. Minor releases may improve output (different bytes for the same input) but maintain API compatibility. Breaking API changes require a major version bump.
