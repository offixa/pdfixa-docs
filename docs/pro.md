---
title: PDFixa Pro
description: Production-grade PDF generation for Java with full Unicode, advanced typography, table layout, and enterprise features.
keywords:
  - java pdf generation
  - unicode pdf java
  - java pdf table generation
  - pdf generation library java
  - enterprise pdf generation
---

# PDFixa Pro

**Everything in Core, plus the features production systems need.**

PDFixa Pro extends the deterministic Core engine with advanced capabilities required for large-scale and international document generation.

PDFixa Core remains fully usable for many projects.  
PDFixa Pro is designed for teams running PDF generation in **production environments**.

---

# Built on the same Core

PDFixa Pro is not a separate engine.

It builds directly on top of **PDFixa Core**.

That means:

- Same API design
- Same deterministic output
- Same document model
- Same performance characteristics

You start with Core and upgrade only when your requirements grow.

---

# What Pro adds

| Capability | Core | Pro |
|------|------|------|
| Deterministic PDF generation | ✓ | ✓ |
| Images (JPEG, PNG) | ✓ | ✓ |
| Shapes and drawing primitives | ✓ | ✓ |
| Color support | ✓ | ✓ |
| Latin-1 text | ✓ | ✓ |
| Custom fonts | ✓ | ✓ |
| **Full Unicode support** | — | ✓ |
| **CJK / Arabic / RTL text** | — | ✓ |
| **Font subsetting** | — | ✓ |
| **Advanced typography** | — | ✓ |
| **Table layout engine** | — | ✓ |
| **Automatic pagination** | — | ✓ |
| **Template engine** | — | ✓ |
| **PDF/A compliance** | — | ✓ |
| **Digital signatures** | — | ✓ |
| **Encryption** | — | ✓ |
| **Priority support** | — | ✓ |

---

# Full Unicode support

PDFixa Core supports **Latin-based languages**.

PDFixa Pro adds support for:

- Chinese
- Japanese
- Korean
- Arabic
- Hindi
- Cyrillic
- Thai
- and all other Unicode scripts.

This enables international document generation for global systems.

---

# Table layout engine

One of the most requested features in PDF generation is **table rendering**.

PDFixa Pro introduces a full table layout system:

- automatic column sizing
- header row repetition
- row spanning
- multi-page tables

Example use cases:

- financial reports
- inventory exports
- analytics dashboards
- billing summaries

---

# Automatic pagination

Core provides precise control over coordinates.

PDFixa Pro adds **page-aware layout**:

- flowing text across pages
- automatic page breaks
- repeating headers and footers
- page numbering

This makes large report generation significantly simpler.

---

# Compliance and security

Production environments often require compliance features.

PDFixa Pro includes:

- **PDF/A generation**
- **digital signatures**
- **document encryption**

These capabilities are commonly required in:

- banking
- insurance
- government systems
- legal document workflows

---

# Priority support

PDFixa Pro includes **commercial support**.

Benefits include:

- priority issue handling
- direct engineering support
- architectural guidance for large deployments

---

# Start with Core

Most developers start with **PDFixa Core**.

You can generate real documents in just a few lines of code:

```java
try (PdfDocument doc = new PdfDocument()) {

    PdfPage page = doc.addPage();

    page.drawTextBox(
        72, 750, 400, 24,
        "Invoice #12345"
    );

    doc.writeTo(new FileOutputStream("invoice.pdf"));
}