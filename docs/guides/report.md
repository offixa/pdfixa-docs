---
sidebar_position: 2
title: Java PDF Report Guide
description: Build a multi-page PDF report with cover page, section headings, pagination, and page numbers.
keywords:
  - java pdf
  - pdf generation java
  - java report pdf
  - java pdf pagination
  - deterministic pdf
---

# Generate a Report

Build a multi-page report with a cover page, section headings, body text, and page numbers.

## Structure

```
Page 1: Cover
Page 2+: Sections
  - Section heading
  - Body paragraphs
  - Optional table or image
Last page: page numbers in footer
```

## Font setup

Register both font weights once on the document. The same `PdfFont` handle is reused across all pages.

```java
PdfFont boldFont    = doc.registerFont(
    getClass().getResourceAsStream("/fonts/Inter-Bold.ttf").readAllBytes());
PdfFont regularFont = doc.registerFont(
    getClass().getResourceAsStream("/fonts/Inter-Regular.ttf").readAllBytes());
```

## Cover page

```java
try (PdfDocument doc = new PdfDocument();
     FileOutputStream out = new FileOutputStream("report.pdf")) {

    doc.setTitle(report.title());
    doc.setAuthor(report.author());
    doc.setCreator("Reporting Engine v2");

    PdfFont boldFont    = doc.registerFont(
        getClass().getResourceAsStream("/fonts/Inter-Bold.ttf").readAllBytes());
    PdfFont regularFont = doc.registerFont(
        getClass().getResourceAsStream("/fonts/Inter-Regular.ttf").readAllBytes());

    // ── Cover ─────────────────────────────────────────────────────
    PdfPage cover = doc.addPage(595, 842);

    cover.fillRect(0, 0, 595, 842);   // dark background — see Colors and Styling

    cover.drawTextBox(72, 500, 450, 60,  report.title(),    boldFont,    28);
    cover.drawTextBox(72, 440, 300, 30,  report.subtitle(), regularFont, 14);
    cover.drawTextBox(72, 100, 300, 20,  report.date(),     regularFont, 11);

    // ── Content pages ──────────────────────────────────────────────
    for (Section section : report.sections()) {
        PdfPage page = doc.addPage(595, 842);
        int y = 770;

        page.drawTextBox(72, y, 450, 28, section.title(), boldFont, 16);
        y -= 36;

        page.drawLine(72, y, 523, y);
        y -= 20;

        for (String paragraph : section.paragraphs()) {
            int blockHeight = estimateHeight(paragraph, 450, 11);
            page.drawTextBox(72, y, 450, blockHeight, paragraph, regularFont, 11);
            y -= blockHeight + 12;
        }

        // Page number footer
        int pageNum = report.sections().indexOf(section) + 2;
        page.drawTextBox(72, 40, 450, 14,
            "Page " + pageNum + " of " + (report.sections().size() + 1),
            regularFont, 9);
    }

    doc.writeTo(out);
}
```

## Text height estimation

PDFixa draws text inside a fixed rectangle (`drawTextBox`). It does not return how much vertical space the text consumed, so you need to estimate height before drawing to make pagination decisions.

### How text height works in PDF

A text block's height depends on three values:

| Term | Meaning | Typical value |
|------|---------|---------------|
| **Font size** | The em-square size in PDF points (1/72 inch) | 10–12 pt for body |
| **Line height** | Vertical distance between baselines of consecutive lines | `fontSize × 1.2` to `fontSize × 1.5` |
| **Line count** | Number of wrapped lines = `⌈textLength / charsPerLine⌉` | Depends on box width |

The total block height is `lineCount × lineHeight`.

The tricky part is **characters per line**: it depends on the average glyph width of the font. For proportional fonts (like Inter or Helvetica), characters vary in width — "W" is roughly 3× wider than "i". A good rule of thumb for Latin text:

- **Sans-serif** (Helvetica, Inter): average character width ≈ `fontSize × 0.5`
- **Serif** (Times): average character width ≈ `fontSize × 0.45`
- **Monospace** (Courier): average character width ≈ `fontSize × 0.6`

### Helper implementation

```java
static int estimateHeight(String text, int boxWidth, double fontSize) {
    return estimateHeight(text, boxWidth, fontSize, 1.35, 0.5);
}

static int estimateHeight(String text, int boxWidth, double fontSize,
                          double lineSpacingFactor, double charWidthFactor) {
    if (text == null || text.isEmpty()) {
        return (int) Math.ceil(fontSize * lineSpacingFactor);
    }

    double avgCharWidth = fontSize * charWidthFactor;
    int charsPerLine    = Math.max(1, (int) (boxWidth / avgCharWidth));
    int lineCount       = (text.length() + charsPerLine - 1) / charsPerLine;
    double lineHeight   = fontSize * lineSpacingFactor;

    return (int) Math.ceil(lineCount * lineHeight);
}
```

The two-argument version uses sensible defaults (`1.35` line spacing, `0.5` char width factor). Override when you need tighter or looser layout:

```java
// Tight layout for table cells
int h = estimateHeight(cellText, 200, 9, 1.15, 0.48);

// Loose layout for reading paragraphs
int h = estimateHeight(paragraph, 450, 11, 1.5, 0.52);
```

### Calibration

The estimate is approximate. If text overflows or leaves too much whitespace:

1. Increase `charWidthFactor` (e.g. `0.55`) if text wraps earlier than expected.
2. Decrease it (e.g. `0.45`) if lines are shorter than the box.
3. Adjust `lineSpacingFactor` to tighten (`1.2`) or loosen (`1.5`) vertical rhythm.

For pixel-accurate layout, read glyph metrics from the `.ttf` file directly (e.g. with `java.awt.Font` or a font parsing library) and sum actual glyph advance widths.

## Pagination helper

When content may overflow a page, track available space and start a new page when needed:

```java
PdfFont regularFont = doc.registerFont(
    getClass().getResourceAsStream("/fonts/Inter-Regular.ttf").readAllBytes());

int y         = 770;
int minY      = 60;   // reserve space for footer
PdfPage page  = doc.addPage(595, 842);

for (String paragraph : paragraphs) {
    int blockHeight = estimateHeight(paragraph, 450, 11);

    if (y - blockHeight < minY) {
        page = doc.addPage(595, 842);
        y    = 770;
    }

    page.drawTextBox(72, y, 450, blockHeight, paragraph, regularFont, 11);
    y -= blockHeight + 12;
}
```

## Key patterns

- **Cover page first** — `addPage` before content pages so they are page 1 in the PDF.
- **Page numbers** — derived from section index, never from runtime state.
- **Determinism** — `report.date()` comes from your data, not `LocalDate.now()`.

See [Documents](../core-concepts/documents.md) for writing to streams, and [Fonts](../features/fonts.md) for registering `boldFont` and `regularFont`.
