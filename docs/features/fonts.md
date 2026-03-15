---
sidebar_position: 1
title: Java PDF Fonts
description: Built-in PDF fonts, embedding custom TrueType/OpenType fonts, font subsetting, and deterministic font handling.
keywords:
  - java pdf
  - pdf generation java
  - java pdf fonts
  - java embed ttf pdf
  - deterministic pdf
---

# Fonts

PDFixa supports the 14 PDF standard fonts out of the box and can embed custom TrueType/OpenType fonts.

## Built-in fonts

The PDF specification mandates that every viewer supports these 14 fonts. No embedding required — they are referenced by name:

| Family | Faces |
|--------|-------|
| Helvetica | Helvetica, Helvetica-Bold, Helvetica-Oblique, Helvetica-BoldOblique |
| Times | Times-Roman, Times-Bold, Times-Italic, Times-BoldItalic |
| Courier | Courier, Courier-Bold, Courier-Oblique, Courier-BoldOblique |
| Symbol | Symbol |
| ZapfDingbats | ZapfDingbats |

When you call `drawTextBox` without specifying a font, Helvetica at 12 pt is used.

## Custom fonts

Embed a font from a file or classpath resource:

```java
byte[] fontBytes = Files.readAllBytes(Path.of("fonts/Inter-Regular.ttf"));
PdfFont font = doc.registerFont(fontBytes);

page.drawTextBox(72, 750, 450, 40, "Hello in Inter!", font, 14);
```

PDFixa performs **subsetting**: only the glyph outlines used in the document are embedded. This keeps file sizes small even for large font files.

## Font size

Font sizes are in PDF points (1/72 inch). Common sizes:

| Usage | Size |
|-------|-----:|
| Body text | 10–12 pt |
| Section heading | 14–16 pt |
| Title | 20–24 pt |
| Caption / footnote | 8–9 pt |

## Bold and italic

Bold and italic are separate font files. Select the correct face rather than applying synthetic styles:

```java
PdfFont regular = doc.registerFont(regularBytes);
PdfFont bold    = doc.registerFont(boldBytes);

page.drawTextBox(72, 750, 200, 20, "Summary",     bold,    14);
page.drawTextBox(72, 720, 450, 80, bodyText,      regular, 11);
```

## Determinism

Font subsetting in PDFixa is deterministic: the same text drawn with the same font produces the same subset bytes. See [Deterministic Output](./deterministic-output.md).
