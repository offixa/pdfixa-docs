---
sidebar_position: 2
title: Java PDF Quick Start
description: Generate your first PDF with PDFixa in under 2 minutes using PdfDocument, PdfPage, and drawTextBox.
keywords:
  - java pdf
  - pdf generation java
  - java pdf library
  - java pdf quick start
  - deterministic pdf
---

# Quick Start

Create a one-page PDF in four lines using `PdfDocument`, `PdfPage`, and `drawTextBox`.

## Minimal example

```java
import dev.offixa.pdfixa.PdfDocument;
import dev.offixa.pdfixa.PdfPage;
import java.io.FileOutputStream;

public class QuickStart {
    public static void main(String[] args) throws Exception {
        try (PdfDocument doc = new PdfDocument()) {
            PdfPage page = doc.addPage(595, 842);           // A4

            page.drawTextBox(72, 750, 450, 40, "Hello from PDFixa!");

            doc.writeTo(new FileOutputStream("output.pdf"));
        }
    }
}
```

## Step by step

| Step | Call | What it does |
|------|------|--------------|
| 1 | `new PdfDocument()` | Opens a new in-memory PDF document |
| 2 | `doc.addPage(595, 842)` | Adds an A4 page (PDF units = 1/72 inch) |
| 3 | `page.drawTextBox(x, y, w, h, text)` | Draws text at `(72, 750)`, 450 wide, 40 tall |
| 4 | `doc.writeTo(stream)` | Serialises and writes the PDF |

> **Coordinates** start from the **bottom-left** corner of the page. `y = 750` places the text near the top of an A4 page (height 842).

## Output

Running this produces `output.pdf`. The same code, same input → identical bytes every run. See [Deterministic Output](../features/deterministic-output.md) for why this matters.

## Next steps

- [Documents](../core-concepts/documents.md) — lifecycle, writing to streams and files
- [Pages](../core-concepts/pages.md) — sizes, coordinate system, multiple pages
- [Fonts](../features/fonts.md) — built-in and custom fonts
