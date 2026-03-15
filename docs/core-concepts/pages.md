---
sidebar_position: 2
title: Java PDF Pages and Coordinates
description: PdfPage sizes (A4, Letter, A3), coordinate system, and how to draw content on pages.
keywords:
  - java pdf
  - pdf generation java
  - pdf page size java
  - java pdf coordinates
  - java pdf library
---

# Pages

A `PdfPage` represents one page of the document. Pages are added in order and rendered in that order.

## Adding pages

```java
try (PdfDocument doc = new PdfDocument()) {
    PdfPage page1 = doc.addPage(595, 842);   // A4
    PdfPage page2 = doc.addPage(612, 792);   // Letter

    // Draw on each page independently
    doc.writeTo(new FileOutputStream("output.pdf"));
}
```

Add as many pages as needed. Pages appear in the PDF in the order they were added.

## Page sizes

Dimensions are in **PDF units** — 1 unit = 1/72 inch (same as a typographic point).

| Format | Width | Height |
|--------|------:|------:|
| A4     | 595   | 842    |
| Letter | 612   | 792    |
| A3     | 842   | 1191   |
| A5     | 420   | 595    |
| Legal  | 612   | 1008   |

For landscape, swap width and height: `doc.addPage(842, 595)` gives landscape A4.

## Coordinate system

```
(0, 842) ────────── (595, 842)   ← top of A4
    │                      │
    │                      │
(0,   0) ────────── (595,   0)   ← origin
```

- Origin `(0, 0)` is at the **bottom-left**.
- X increases to the right.
- Y increases **upward**.
- A typical top margin of 72 units (1 inch) means starting content at `y = 770` on A4.

## Drawing on a page

All draw calls are made on the `PdfPage` object:

```java
PdfPage page = doc.addPage(595, 842);

page.drawTextBox(72, 750, 450, 40, "Section Title");
page.drawTextBox(72, 690, 450, 200, bodyText);
page.drawLine(72, 680, 523, 680);
```

See [Content Streams](./content-streams.md) for the full list of drawing operations.
