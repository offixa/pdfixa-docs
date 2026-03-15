---
sidebar_position: 2
title: Java PDF Images
description: Embed JPEG and PNG images in PDFs — positioning, scaling, deduplication, and deterministic image handling.
keywords:
  - java pdf
  - pdf generation java
  - java pdf images
  - java embed png pdf
  - deterministic pdf
---

# Images

Embed raster images into any page at an arbitrary position and size.

## Supported formats

| Format | Notes |
|--------|-------|
| JPEG | Stored as-is in the PDF (no re-encoding) |
| PNG | Supports transparency (alpha channel) |

The exact set of formats depends on your PDFixa version. Refer to the API javadoc.

## Embedding an image

```java
byte[] imageBytes = Files.readAllBytes(Path.of("logo.png"));

// drawImage(x, y, width, height, imageBytes)
page.drawImage(72, 760, 120, 40, imageBytes);
```

- `(x, y)` — bottom-left corner of the image in page units
- `width`, `height` — rendered size in PDF units (not pixels)

The image is embedded once in the document even if drawn on multiple pages. PDFixa deduplicates by content hash.

## Scaling

The image is stretched or shrunk to fill the rectangle you specify. To preserve the original aspect ratio, compute the target dimensions before drawing:

```java
int originalWidth  = 1200;
int originalHeight = 400;
double scale = 120.0 / originalWidth;   // target width 120 pt

double targetWidth  = 120;
double targetHeight = originalHeight * scale;  // 40 pt

page.drawImage(72, 760, targetWidth, targetHeight, imageBytes);
```

## Determinism

Image bytes are stored verbatim. As long as you pass the same bytes, the embedded image data is identical across runs. See [Deterministic Output](./deterministic-output.md).
