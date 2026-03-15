---
sidebar_position: 3
title: Java PDF Content Streams
description: Content stream drawing operations — text, lines, rectangles, images — and how operation order affects rendering.
keywords:
  - java pdf
  - pdf generation java
  - java pdf content stream
  - java draw text pdf
  - deterministic pdf
---

# Content Streams

Every `PdfPage` has an internal **content stream** — a sequence of PDF operators that describes what to draw. PDFixa writes these operators deterministically in the order you call the drawing methods.

## Drawing operations

### Text

```java
// drawTextBox(x, y, width, height, text)
page.drawTextBox(72, 700, 450, 40, "Hello, world!");
```

Draws `text` inside a box anchored at `(x, y)`. If the text is longer than the box width, it wraps. The `height` clips overflow.

### Lines and shapes

```java
// Horizontal line from (x1, y) to (x2, y)
page.drawLine(72, 680, 523, 680);

// Rectangle outline at (x, y) with given width and height
page.drawRect(72, 500, 450, 100);

// Filled rectangle
page.fillRect(72, 500, 450, 100);
```

### Images

```java
byte[] imageBytes = Files.readAllBytes(Path.of("logo.png"));
page.drawImage(72, 750, 120, 40, imageBytes);
```

See [Images](../features/images.md) for supported formats and embedding details.

## Operation order

Operations are appended to the content stream in the order you call them. Later operations are painted **on top** of earlier ones. There is no z-index — order is the only layering mechanism.

```java
page.fillRect(72, 700, 200, 50);          // background box (painted first)
page.drawTextBox(80, 710, 184, 30, "Label");  // text on top (painted second)
```

## Determinism guarantee

PDFixa writes the content stream in a fixed, reproducible format. Given the same sequence of draw calls, the resulting stream bytes are identical on every run. No floating-point variance, no locale-dependent formatting, no timestamps.

See [Deterministic Output](../features/deterministic-output.md) for the full picture.
