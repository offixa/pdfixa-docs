---
sidebar_position: 4
title: Deterministic PDF Testing
description: How to unit test PDF generation with byte-level comparison. Golden file workflow, JUnit examples, SHA-256 verification, and CI/CD integration.
keywords:
  - java pdf unit test
  - deterministic pdf testing
  - pdf golden file testing
  - java pdf regression test
  - pdf generation ci cd
---

# Deterministic PDF Testing

Most PDF libraries produce different bytes on every run — even with the same input. This makes byte-level testing impossible without visual comparison tools or screenshot diffing.

PDFixa generates byte-identical output for the same input. This means you can test PDF generation the same way you test any other function: compare the expected output to the actual output.

---

## Why deterministic PDFs matter for testing

A standard JUnit test for a method that returns a string looks like this:

```java
assertEquals("Hello", greet("World"));
```

PDF generation should work the same way. But with most libraries, it cannot. The output contains embedded timestamps, randomly generated document IDs, and hash-map-ordered resources. Even if the visible content is identical, the bytes differ on every run.

This forces teams into one of three workarounds:

| Workaround | Problem |
|---|---|
| Skip testing PDF output entirely | Regressions go undetected |
| Render to image and compare screenshots | Slow, fragile, requires rendering dependencies |
| Parse the PDF and check text content | Misses layout, font, and image regressions |

Deterministic output eliminates all three. You compare bytes directly.

---

## What makes a PDF non-deterministic

Most libraries embed at least one of these:

| Source | What changes | Impact |
|---|---|---|
| **Creation timestamp** | `/CreationDate (D:20260315...)` | Different every second |
| **Random document ID** | UUID in the PDF trailer | Different every run |
| **HashMap iteration order** | Resource dictionary key order | Different across JVM runs |
| **Locale-dependent formatting** | Decimal separator in coordinates | Different across machines |
| **Font subset ordering** | Glyph table order in embedded fonts | Different across runs |

PDFixa eliminates all of these by design. See [Deterministic Output](/docs/features/deterministic-output) for the full explanation.

---

## Example unit test

A complete JUnit 5 test that verifies invoice PDF output against a golden file:

```java
import org.junit.jupiter.api.Test;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class InvoiceGeneratorTest {

    @Test
    void invoice_pdf_is_deterministic() throws Exception {
        byte[] pdf = InvoiceGenerator.generate();
        byte[] expected = Files.readAllBytes(
            Path.of("src/test/resources/invoice.pdf")
        );
        assertArrayEquals(expected, pdf);
    }
}
```

If the output changes — because a margin shifted, a font was updated, or a calculation changed — the test fails immediately. No visual inspection required.

> This test assumes stable inputs: fixed metadata, stable fonts, and deterministic ordering of any collections used during document generation.

### Testing with SHA-256

If storing golden files is impractical (large files, many variants), compare hashes instead:

```java
import org.junit.jupiter.api.Test;
import java.security.MessageDigest;
import java.util.HexFormat;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ReportGeneratorTest {

    @Test
    void report_hash_is_stable() throws Exception {
        byte[] pdf = ReportGenerator.generate(sampleData());

        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String hash = HexFormat.of().formatHex(digest.digest(pdf));

        assertEquals(
            "a1b2c3d4e5f6...expected hash...",
            hash
        );
    }
}
```

The hash acts as a compact fingerprint. Store it in the test source code instead of a binary file.

### Testing with multiple inputs

Use parameterized tests to verify determinism across input variants:

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.Arguments;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

class InvoiceGeneratorParameterizedTest {

    @ParameterizedTest
    @MethodSource("invoiceInputs")
    void all_invoices_match_golden_files(InvoiceData input, String goldenFile)
            throws Exception {
        byte[] pdf = InvoiceGenerator.generate(input);
        byte[] expected = Files.readAllBytes(
            Path.of("src/test/resources/" + goldenFile)
        );
        assertArrayEquals(expected, pdf);
    }

    static Stream<Arguments> invoiceInputs() {
        return Stream.of(
            Arguments.of(singleLineInvoice(),  "invoice-single.pdf"),
            Arguments.of(multiLineInvoice(),   "invoice-multi.pdf"),
            Arguments.of(discountedInvoice(),  "invoice-discount.pdf")
        );
    }
}
```

---

## Golden file workflow

Golden file testing is a pattern where you generate the expected output once, store it, and compare all future output against it.

### Step 1 — Generate the golden file

Run your PDF generation code once and save the output to your test resources directory:

```java
byte[] pdf = InvoiceGenerator.generate();
Files.write(Path.of("src/test/resources/invoice.pdf"), pdf);
```

Or from the command line:

```bash
mvn exec:java -Dexec.mainClass="com.example.GenerateGoldenFiles"
```

### Step 2 — Commit the golden file

Add the file to version control:

```bash
git add src/test/resources/invoice.pdf
git commit -m "Add invoice golden file for PDF regression testing"
```

The golden file is now the source of truth. Any byte-level difference from this file means the output has changed.

### Step 3 — Compare in tests

The unit test loads the golden file and compares it to the current output:

```java
byte[] expected = Files.readAllBytes(
    Path.of("src/test/resources/invoice.pdf")
);
byte[] actual = InvoiceGenerator.generate();
assertArrayEquals(expected, actual);
```

### Step 4 — Update when output changes intentionally

When you intentionally change the PDF layout (new logo, different margins, added field), regenerate the golden file and commit the update:

```bash
mvn exec:java -Dexec.mainClass="com.example.GenerateGoldenFiles"
git diff --stat src/test/resources/
git add src/test/resources/
git commit -m "Update golden files after invoice layout change"
```

The git diff shows exactly which golden files changed — making the review process clear.

### Project structure

```
src/
├── main/java/com/example/
│   └── InvoiceGenerator.java
└── test/
    ├── java/com/example/
    │   └── InvoiceGeneratorTest.java
    └── resources/
        ├── invoice-single.pdf       ← golden file
        ├── invoice-multi.pdf        ← golden file
        └── invoice-discount.pdf     ← golden file
```

---

## CI/CD integration

Deterministic PDF testing integrates into any CI/CD pipeline that runs JUnit tests. No PDF renderer or visual diff tool is required.

### Maven

```bash
mvn test
```

The golden file comparison runs as part of the standard test suite. If a PDF output changes unexpectedly, the build fails.

### Gradle

```bash
gradle test
```

Same behavior — `assertArrayEquals` fails the build if bytes differ.

### What CI catches

| Scenario | Without deterministic testing | With deterministic testing |
|---|---|---|
| Developer changes a margin by 1 point | Undetected | Test fails immediately |
| Font file is updated in resources | Undetected | Test fails — golden file needs update |
| Dependency upgrade changes number formatting | Undetected | Test fails — locale issue caught |
| Image re-encoded with different compression | Undetected | Test fails — image bytes differ |
| Code refactoring with no output change | Unknown | Test passes — confirms no regression |

### GitHub Actions example

```yaml
name: Build and Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 17
      - run: mvn test
```

No special configuration. The golden file tests run with every push and every pull request.

---

## Real use cases

### Invoice regression testing

An e-commerce platform generates invoices for every order. The invoice layout includes a company logo, line items, tax calculations, and a total. A golden file test ensures that a code change in the tax calculation module does not silently alter the invoice layout.

### Report verification across environments

A financial reporting service generates monthly PDF reports. The same report is generated on developer machines, staging, and production. Deterministic output means the SHA-256 hash of a report generated locally matches the hash generated in CI — confirming environment parity.

### Compliance auditing

A healthcare application produces patient discharge summaries. Regulations require that the same input data produces the same document. Deterministic output provides a verifiable guarantee: given the same input record, the system produces byte-identical output at any point in time.

### Cache validation

A SaaS application caches generated PDFs by content hash. Deterministic output ensures that the same request always maps to the same cache entry. Without determinism, the cache would store duplicate documents with different bytes for the same logical content.

---

## Your responsibilities

PDFixa controls its own output. You control the inputs. For golden file tests to pass consistently:

| Do | Avoid |
|---|---|
| Use fixed input data in tests | `Instant.now()` or `LocalDate.now()` in test data |
| Load fonts from stable files | Downloading fonts at test time |
| Pass images as stable byte arrays | Re-encoding images with lossy compression |
| Sort collections before passing to the generator | Iterating `HashMap` or `HashSet` directly |
| Pin the PDFixa version in your build file | Using `LATEST` or `RELEASE` version ranges |

---

## Next steps

- [Deterministic Output](/docs/features/deterministic-output) — how PDFixa eliminates non-deterministic sources
- [Quick Start](/docs/getting-started/quick-start) — generate your first PDF
- [Generate an Invoice](/docs/guides/invoice) — full invoice example to test against
- [Error Handling](/docs/reference/error-handling) — handling exceptions in generation code
