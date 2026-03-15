---
sidebar_position: 4
title: Deterministic PDF in Java
description: How PDFixa guarantees byte-identical PDF output — no timestamps, stable IDs, deterministic font subsetting, and verification patterns.
keywords:
  - java pdf
  - deterministic pdf
  - pdf generation java
  - reproducible pdf java
  - java pdf library
---

# Deterministic Output

PDFixa guarantees that the same sequence of API calls, with the same data, produces **byte-identical PDF output** on every run.

## What makes a PDF non-deterministic

Most PDF libraries introduce at least one of these:

| Source | Example |
|--------|---------|
| Timestamps | `/CreationDate (D:20240315...)` changes every run |
| Random IDs | Document ID is a random UUID embedded in the trailer |
| HashMap iteration | Resource dictionary keys in unpredictable order |
| Floating-point | Locale-dependent decimal formatting in content streams |
| Font subsetting | Glyphs subsetted in hash-map order |

PDFixa eliminates all of these by design.

## What PDFixa does

- **No timestamps** — Creation and modification dates are not written, or can be set to a fixed value.
- **Stable IDs** — Document ID is derived from content, not randomly generated.
- **Ordered resources** — Dictionaries, fonts, and image resources are written in insertion order.
- **Fixed number format** — PDF unit values are serialised with a fixed locale and precision.
- **Deterministic font subsetting** — Glyph selection and ordering are deterministic.

## Verification

You can verify determinism in a test:

```java
@Test
void pdfIsDeterministic() throws Exception {
    byte[] first  = generateReport(sampleData);
    byte[] second = generateReport(sampleData);

    assertArrayEquals(first, second);
}
```

Or compare SHA-256 hashes across deploys:

```java
String hash = sha256Hex(generateReport(sampleData));
assertEquals("e3b0c44298fc...", hash);
```

## Your responsibilities

PDFixa controls its own output, but you control the inputs. For byte-identical results:

| Do | Avoid |
|----|-------|
| Derive titles/authors from input | `Instant.now()` in metadata |
| Use consistent font files | Different font versions |
| Pass images as stable byte arrays | Re-encoding images with different quality |
| Sort collections before iterating | Iterating `HashMap` or `Set` |

See [Metadata](./metadata.md) for field-level guidance.
