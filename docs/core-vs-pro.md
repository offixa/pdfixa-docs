---
description: Understand the difference between PDFixa Core and PDFixa
  Pro. Compare features, capabilities, and when to upgrade.
keywords:
- pdfixa core vs pro
- java pdf library comparison
- java pdf generation library
- pdfixa pro features
- deterministic pdf java
title: PDFixa Core vs PDFixa Pro
---

# PDFixa Core vs PDFixa Pro

PDFixa follows an **Open Core** model.

-   **PDFixa Core** is the open-source PDF engine available on Maven
    Central.
-   **PDFixa Pro** is the commercial version designed for
    production-scale systems.

The goal is simple:

> Start with Core. Upgrade when your system needs advanced capabilities.

------------------------------------------------------------------------

# PDFixa Core

PDFixa Core is designed for developers who want a **clean, deterministic
PDF engine for Java** without heavy dependencies.

Core focuses on the most common document generation use cases:

-   invoices
-   reports
-   receipts
-   exports
-   certificates

### Core capabilities

  Feature                         Available
  ------------------------------- -----------
  Deterministic output            ✓
  Java 17+ modern API             ✓
  Zero dependencies               ✓
  Maven Central distribution      ✓
  Basic text rendering            ✓
  Built-in PDF fonts (Base14)     ✓
  Latin-1 character support       ✓
  Images (JPEG, PNG)              ✓
  Shapes and drawing primitives   ✓
  Color support                   ✓
  Metadata                        ✓
  Multi-page documents            ✓

These capabilities are sufficient for many real-world documents such as
invoices, receipts, and internal reports.

------------------------------------------------------------------------

# PDFixa Pro

PDFixa Pro builds on top of Core and adds **advanced document
capabilities for production systems**.

Pro targets:

-   SaaS platforms
-   financial systems
-   enterprise reporting
-   regulated industries
-   international applications

### Pro capabilities

  Feature                                Core   Pro
  -------------------------------------- ------ -----
  Deterministic output                   ✓      ✓
  Images                                 ✓      ✓
  Shapes and colors                      ✓      ✓
  Latin-1 text                           ✓      ✓
  Custom fonts                           ✓      ✓
  **Full Unicode (CJK, Arabic, etc.)**   ---    ✓
  **Font subsetting**                    ---    ✓
  **Advanced typography (OpenType)**     ---    ✓
  **Table layout engine**                ---    ✓
  **Automatic pagination**               ---    ✓
  **Template engine**                    ---    ✓
  **PDF/A compliance**                   ---    ✓
  **Digital signatures**                 ---    ✓
  **Encryption**                         ---    ✓
  **Commercial license**                 ---    ✓
  **Priority support**                   ---    ✓

------------------------------------------------------------------------

# When to use Core

Use **PDFixa Core** if your application:

-   generates invoices or simple reports
-   produces internal business documents
-   exports data to PDF
-   requires deterministic output for testing
-   only needs Latin-based languages

Core is intentionally **simple, fast, and dependency-free**.

------------------------------------------------------------------------

# When to use Pro

Upgrade to **PDFixa Pro** when your application needs:

-   international language support
-   advanced typography
-   complex document layouts
-   large multi-page reports
-   compliance output (PDF/A)
-   digital signatures
-   production-level support

------------------------------------------------------------------------

# Start with Core

Most teams begin with PDFixa Core.

You can generate real production documents with just a few lines of
code:

``` java
try (PdfDocument doc = new PdfDocument()) {

    PdfPage page = doc.addPage();

    page.drawTextBox(
        72, 750, 400, 24,
        "Invoice #12345"
    );

    doc.writeTo(new FileOutputStream("invoice.pdf"));
}
```

When your requirements grow, **PDFixa Pro extends the same API** with
additional modules.

------------------------------------------------------------------------

# Learn more

-   **Core documentation:** /docs
-   **Examples:** /examples
-   **GitHub repository:** https://github.com/offixa/pdfixa
-   **PDFixa Pro:** /pro
