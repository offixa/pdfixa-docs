---
sidebar_position: 1
title: PDF Documents in Java
description: PdfDocument lifecycle — creating documents, writing to files, byte arrays, and HTTP responses.
keywords:
  - java pdf
  - pdf generation java
  - pdfdocument java
  - java pdf outputstream
  - deterministic pdf
---

# Documents

`PdfDocument` is the root object. Every PDF starts here.

## Creating a document

`PdfDocument` implements `AutoCloseable`. Always use try-with-resources:

```java
try (PdfDocument doc = new PdfDocument()) {
    // add pages, draw content
}
```

Closing the document releases internal buffers. Failing to close it does not corrupt the output, but it is good practice.

## Writing output

### Write to a file

```java
try (PdfDocument doc = new PdfDocument();
     FileOutputStream out = new FileOutputStream("report.pdf")) {
    doc.addPage(595, 842);
    // ...
    doc.writeTo(out);
}
```

### Write to a byte array

```java
ByteArrayOutputStream buffer = new ByteArrayOutputStream();
try (PdfDocument doc = new PdfDocument()) {
    doc.addPage(595, 842);
    // ...
    doc.writeTo(buffer);
}
byte[] pdfBytes = buffer.toByteArray();
```

### Write to an HTTP response

```java
response.setContentType("application/pdf");
try (PdfDocument doc = new PdfDocument()) {
    doc.addPage(595, 842);
    // ...
    doc.writeTo(response.getOutputStream());
}
```

`writeTo` accepts any `OutputStream` — files, buffers, HTTP responses, S3 streams, etc.

## Document lifecycle

```
new PdfDocument()
    └── addPage(w, h)  →  PdfPage
            └── draw*()
    └── setTitle / setAuthor / ...
    └── writeTo(stream)
close()
```

All pages must be added and all content drawn **before** calling `writeTo`. Calling `writeTo` multiple times is supported and produces the same bytes each time (deterministic).

## Related

- [Pages](./pages.md)
- [Metadata](../features/metadata.md)
- [Deterministic Output](../features/deterministic-output.md)
