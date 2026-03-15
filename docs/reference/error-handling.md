---
sidebar_position: 2
title: PDFixa Error Handling
description: Common exceptions in PDFixa — invalid arguments, font loading failures, I/O errors — with practical try/catch examples.
keywords:
  - java pdf
  - pdf generation java
  - java pdf error handling
  - java pdf library
  - deterministic pdf
---

# Error Handling

PDFixa throws standard Java exceptions. There are no custom exception hierarchies to learn — you handle `IllegalArgumentException` for bad inputs and `IOException` for output failures.

## Exception summary

| Exception | When thrown | Typical cause |
|-----------|-----------|---------------|
| `IllegalArgumentException` | Immediately on the bad call | Negative dimensions, `null` text, unregistered font |
| `IOException` | During `writeTo` | Stream closed, disk full, network error |
| `IOException` | During `registerFont` | Corrupt or unreadable font file |
| `NullPointerException` | On any method | Passing `null` where a value is required |

## Invalid coordinates and dimensions

Page dimensions and draw coordinates must be non-negative. Negative or zero values throw `IllegalArgumentException`:

```java
try (PdfDocument doc = new PdfDocument()) {
    // Negative page width → IllegalArgumentException
    doc.addPage(-100, 842);
}
```

```java
PdfPage page = doc.addPage(595, 842);

// Negative text box width → IllegalArgumentException
page.drawTextBox(72, 750, -200, 40, "Hello");
```

Coordinates **outside** the page (e.g. `x = 1000` on a 595-wide page) are valid — the content is simply clipped or not visible. PDFixa does not enforce page bounds.

### Defensive pattern

```java
void drawSafe(PdfPage page, double x, double y, double w, double h, String text) {
    if (w <= 0 || h <= 0) {
        return;
    }
    page.drawTextBox(x, y, w, h, text);
}
```

## Font loading failures

`doc.registerFont(byte[])` throws `IOException` if the byte array is not a valid TrueType or OpenType font:

```java
try {
    PdfFont font = doc.registerFont(fontBytes);
} catch (IOException e) {
    // Corrupt font file, truncated download, wrong format
    log.error("Failed to load font: {}", e.getMessage());
    throw e;
}
```

Common causes:

| Symptom | Cause | Fix |
|---------|-------|-----|
| `IOException` on startup | Font file not found on classpath | Verify path in `getResourceAsStream` |
| `IOException` mid-stream | Truncated or corrupt `.ttf` file | Re-download or validate the file |
| Garbled text in PDF | Wrong font file (e.g. `.woff` instead of `.ttf`) | Use `.ttf` or `.otf` format |

### Safe font loading from classpath

```java
static PdfFont loadFont(PdfDocument doc, String resourcePath) throws IOException {
    try (InputStream in = MyClass.class.getResourceAsStream(resourcePath)) {
        if (in == null) {
            throw new IOException("Font resource not found: " + resourcePath);
        }
        return doc.registerFont(in.readAllBytes());
    }
}
```

```java
PdfFont bold = loadFont(doc, "/fonts/Inter-Bold.ttf");
```

## I/O errors during writeTo

`doc.writeTo(OutputStream)` throws `IOException` if the underlying stream fails:

```java
try (PdfDocument doc = new PdfDocument();
     FileOutputStream out = new FileOutputStream("report.pdf")) {

    PdfPage page = doc.addPage(595, 842);
    page.drawTextBox(72, 750, 450, 40, "Hello");

    doc.writeTo(out);

} catch (IOException e) {
    log.error("Failed to write PDF: {}", e.getMessage());
    // Disk full, permission denied, stream closed
}
```

### HTTP response errors

When writing to `HttpServletResponse`, the client may disconnect mid-transfer:

```java
try (PdfDocument doc = new PdfDocument()) {
    PdfPage page = doc.addPage(595, 842);
    page.drawTextBox(72, 750, 450, 40, "Report content");

    doc.writeTo(response.getOutputStream());

} catch (IOException e) {
    // Client disconnected — log and move on
    log.warn("PDF delivery interrupted: {}", e.getMessage());
}
```

## Null arguments

Passing `null` where a value is required throws `NullPointerException`:

```java
page.drawTextBox(72, 750, 450, 40, null);           // NPE — null text
page.drawTextBox(72, 750, 450, 40, "ok", null, 12); // NPE — null font
```

Guard with a simple check when input comes from external data:

```java
String title = Optional.ofNullable(report.title()).orElse("Untitled");
page.drawTextBox(72, 750, 450, 40, title, boldFont, 14);
```

## Complete try/catch template

A production-ready pattern that handles all three exception types:

```java
public byte[] generateReport(ReportData data) {
    ByteArrayOutputStream buffer = new ByteArrayOutputStream();

    try (PdfDocument doc = new PdfDocument()) {
        PdfFont font = loadFont(doc, "/fonts/Inter-Regular.ttf");

        doc.setTitle(data.title());
        PdfPage page = doc.addPage(595, 842);
        page.drawTextBox(72, 750, 450, 40, data.title(), font, 16);

        doc.writeTo(buffer);

    } catch (IllegalArgumentException e) {
        throw new ReportException("Invalid report parameters", e);

    } catch (IOException e) {
        throw new ReportException("PDF generation I/O failure", e);
    }

    return buffer.toByteArray();
}
```

The `try-with-resources` ensures `PdfDocument` is always closed, even when an exception occurs. Wrap in your application-specific exception for clean API boundaries.
