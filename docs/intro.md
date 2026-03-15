---
sidebar_position: 0
slug: /intro
title: PDFixa Java PDF Library
description: PDFixa — deterministic PDF engine for Java. Zero dependencies, Java 17+, Maven Central. Same input, same bytes, every time.
keywords:
  - java pdf
  - pdf generation java
  - java pdf library
  - deterministic pdf
  - java invoice pdf
---

# What is PDFixa

PDFixa is a deterministic PDF generation engine for Java. One dependency, zero transitive pulls, byte-identical output for the same input.

```xml
<dependency>
    <groupId>dev.offixa</groupId>
    <artifactId>pdfixa</artifactId>
    <version>1.0.0</version>
</dependency>
```

---

## Key features

| Feature | Detail |
|---|---|
| **Deterministic** | Same API calls + same data = same PDF bytes. No embedded timestamps, no random document IDs, no HashMap-order variance. |
| **Zero dependencies** | Ships as a single JAR with no transitive dependencies. No iText, no PDFBox, no Bouncy Castle. |
| **Java 17+** | Built for modern Java. `AutoCloseable` documents, clean method signatures, no legacy compat. |
| **Maven Central** | Published to Maven Central. Works with Maven, Gradle, and any JVM build tool. No license key, no custom repo. |
| **Compact API** | Three core classes: `PdfDocument`, `PdfPage`, `PdfFont`. You can generate a PDF in 5 lines. |
| **Testable** | Byte-identical output means you can `assertArrayEquals` against a golden file or compare SHA-256 hashes. |

---

## Quick example

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

`PdfDocument` → add pages → draw content → `writeTo`. That's it.

Run the same code twice — you get the same bytes. [Why this matters →](features/deterministic-output.md)

---

## Links

| Resource | URL |
|---|---|
| GitHub | [github.com/offixa/pdfixa](https://github.com/offixa/pdfixa) |
| Examples repository | [github.com/offixa/pdfixa-examples](https://github.com/offixa/pdfixa-examples) |
| Maven Central | [central.sonatype.com/artifact/dev.offixa/pdfixa](https://central.sonatype.com/artifact/dev.offixa/pdfixa) |

---

## Next

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem'}}>

<span>

**[Installation →](getting-started/installation.md)**
Maven / Gradle setup

</span>

<span>

**[Quick Start →](getting-started/quick-start.md)**
First PDF in 2 minutes

</span>

<span>

**[Core Concepts →](core-concepts/documents.md)**
Documents, pages, content streams

</span>

<span>

**[Guides →](guides/invoice.md)**
Invoice, report, Spring Boot

</span>

</div>
