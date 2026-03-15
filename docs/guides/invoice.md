---
sidebar_position: 1
title: Java Invoice PDF Guide
description: Complete example — generate a single-page A4 invoice PDF with header, line items table, totals, and footer.
keywords:
  - java invoice pdf
  - java pdf
  - pdf generation java
  - java pdf library
  - deterministic pdf
---

# Generate an Invoice

Build a single-page A4 invoice PDF: header, line items table, totals, and footer.

## Overview

```
┌────────────────────────────────────┐
│  Company logo       Invoice #0042  │  ← header
│  Client address     Date           │
├────────────────────────────────────┤
│  Item          Qty   Price  Total  │  ← table header
│  Widget A        2   15.00  30.00  │
│  Widget B        1   40.00  40.00  │
├────────────────────────────────────┤
│                         Total: 70  │  ← totals
├────────────────────────────────────┤
│  Payment terms · Bank details      │  ← footer
└────────────────────────────────────┘
```

## Font setup

Register fonts once on the document before drawing. PDFixa embeds only the glyphs you use (subsetting).

```java
// From the filesystem
PdfFont boldFont = doc.registerFont(Files.readAllBytes(Path.of("fonts/Inter-Bold.ttf")));

// From the classpath (e.g. inside a JAR)
PdfFont boldFont = doc.registerFont(
    getClass().getResourceAsStream("/fonts/Inter-Bold.ttf").readAllBytes());
```

The invoice uses `boldFont` for headings and column headers. Body rows use the default font (Helvetica) by omitting the font argument.

## Full example

```java
public byte[] generateInvoice(Invoice invoice) throws Exception {
    ByteArrayOutputStream out = new ByteArrayOutputStream();

    try (PdfDocument doc = new PdfDocument()) {
        doc.setTitle("Invoice " + invoice.number());
        doc.setCreator("Billing System");

        PdfFont boldFont = doc.registerFont(
            getClass().getResourceAsStream("/fonts/Inter-Bold.ttf").readAllBytes());

        PdfPage page = doc.addPage(595, 842);  // A4

        int marginLeft  = 72;
        int marginRight = 523;
        int y = 780;

        // ── Header ────────────────────────────────────────────────
        page.drawTextBox(marginLeft, y, 200, 24, "ACME Corp", boldFont, 18);
        page.drawTextBox(350,        y, 173, 24,
            "Invoice #" + invoice.number(), boldFont, 14);
        y -= 20;

        page.drawTextBox(marginLeft, y, 200, 16, invoice.clientName(), 11);
        page.drawTextBox(350,        y, 173, 16,
            "Date: " + invoice.date(), 10);
        y -= 30;

        page.drawLine(marginLeft, y, marginRight, y);
        y -= 20;

        // ── Table header ───────────────────────────────────────────
        page.drawTextBox(marginLeft, y, 250, 16, "Description", boldFont, 10);
        page.drawTextBox(330,        y,  50, 16, "Qty",         boldFont, 10);
        page.drawTextBox(390,        y,  60, 16, "Unit price",  boldFont, 10);
        page.drawTextBox(460,        y,  63, 16, "Total",       boldFont, 10);
        y -= 18;
        page.drawLine(marginLeft, y, marginRight, y);
        y -= 4;

        // ── Line items ─────────────────────────────────────────────
        for (LineItem item : invoice.items()) {
            y -= 16;
            page.drawTextBox(marginLeft, y, 250, 14, item.description(), 10);
            page.drawTextBox(330,        y,  50, 14, String.valueOf(item.qty()), 10);
            page.drawTextBox(390,        y,  60, 14, format(item.unitPrice()), 10);
            page.drawTextBox(460,        y,  63, 14, format(item.total()), 10);
        }

        y -= 20;
        page.drawLine(marginLeft, y, marginRight, y);
        y -= 20;

        // ── Totals ─────────────────────────────────────────────────
        page.drawTextBox(390, y, 63, 16, "Total:", boldFont, 11);
        page.drawTextBox(460, y, 63, 16, format(invoice.total()), boldFont, 11);

        // ── Footer ─────────────────────────────────────────────────
        page.drawLine(marginLeft, 80, marginRight, 80);
        page.drawTextBox(marginLeft, 60, 450, 16,
            "Payment due 30 days · IBAN: DE00 0000 0000 0000", 9);

        doc.writeTo(out);
    }

    return out.toByteArray();
}

private String format(BigDecimal amount) {
    return String.format("%.2f", amount);
}
```

## Key patterns

- **Deterministic** — use `invoice.date()` from your data model, not `LocalDate.now()`.
- **Margin constants** — define `marginLeft` and `marginRight` once; align all columns to them.
- **Y cursor** — track vertical position with a mutable `y` variable, decrement after each block.
- **Fonts** — register `boldFont` once on `doc`, reuse across all pages/calls.

For multi-page invoices with many line items, check `y < bottomMargin` inside the loop and call `doc.addPage(595, 842)` to continue on a new page.
