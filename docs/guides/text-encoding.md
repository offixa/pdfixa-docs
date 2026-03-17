---
sidebar_position: 5
title: Text Encoding in PDFixa
description: How PDFixa Core handles text encoding — WinAnsiEncoding (Latin-1), supported languages, limitations, and when to use PDFixa Pro for full Unicode support.
keywords:
  - java pdf text encoding
  - pdf latin-1 encoding
  - pdf winansi java
  - java pdf unicode limitation
  - java pdf western european
---

# Text Encoding in PDFixa

## Overview

PDFixa Core renders text using the PDF Base14 font set (Helvetica, Times, Courier, and their variants). These fonts are encoded with **WinAnsiEncoding**, which corresponds to the Latin-1 character set (Windows code page 1252).

WinAnsiEncoding covers:

- ASCII characters (0–127)
- Western European extended characters (128–255)
- Common typographic symbols (em dash, curly quotes, copyright, etc.)

This means PDFixa Core works correctly for documents in English, French, Spanish, German, Portuguese, Italian, Dutch, Swedish, Norwegian, Danish, Finnish, and several other Western European languages.

Full Unicode support — including CJK scripts, Arabic, Cyrillic, Devanagari, and other non-Latin writing systems — is available in **PDFixa Pro**.

---

## Supported characters

### English

All standard ASCII characters are supported. No issues.

```java
page.drawTextBox(72, 750, 450, 20, "Invoice #1001 — Total: $299.00");
```

### French

Accented characters used in French are fully supported:

| Character | Name |
|-----------|------|
| é è ê ë | e with accent |
| à â | a with accent |
| ç | cedilla |
| ù û | u with accent |
| î ï | i with accent |
| œ | ligature oe |
| « » | guillemets |

```java
page.drawTextBox(72, 750, 450, 20, "Résumé — Référence nº 42 — Côte d'Ivoire");
```

### Spanish

Spanish-specific characters are supported:

| Character | Name |
|-----------|------|
| ñ Ñ | n with tilde |
| á é í ó ú | vowels with acute accent |
| ü | u with umlaut (loanwords) |
| ¡ ¿ | inverted punctuation |

```java
page.drawTextBox(72, 750, 450, 20, "Español — Año fiscal — Ñoño");
```

### German

German umlauts and the eszett are fully supported:

| Character | Name |
|-----------|------|
| ä ö ü | vowels with umlaut |
| Ä Ö Ü | uppercase umlauts |
| ß | eszett |

```java
page.drawTextBox(72, 750, 450, 20, "Überblick — Straße — Größe");
```

### Turkish

Turkish support is **partial**. WinAnsiEncoding covers the most common Turkish characters:

| Character | Supported |
|-----------|-----------|
| ç Ç | ✓ |
| ş Ş | ✓ |
| ö Ö | ✓ |
| ü Ü | ✓ |
| ğ Ğ | ✓ |
| ı (dotless i) | ✓ in WinAnsi (U+0131) |
| İ (dotted I) | ✓ in WinAnsi (U+0130) |

Most everyday Turkish text renders correctly. However, **if you embed a custom TrueType font in Core**, the font subsetter in Core operates on the Latin-1 range only. A font that stores Turkish glyphs outside this range may not render those characters correctly.

For full, reliable Turkish text rendering with embedded fonts, use PDFixa Pro.

```java
// Works with Base14 fonts in Core
page.drawTextBox(72, 750, 450, 20, "Türkçe — Ğüzel — İstanbul");
```

---

## Example

A single `drawTextBox` call that exercises characters from several Western European languages:

```java
import dev.offixa.pdfixa.PdfDocument;
import dev.offixa.pdfixa.PdfPage;
import java.io.FileOutputStream;

try (PdfDocument doc = new PdfDocument()) {
    PdfPage page = doc.addPage(595, 842);

    // French, Spanish, Turkish — all within WinAnsiEncoding
    page.drawTextBox(72, 750, 450, 20,
        "Résumé — Español — Türkçe");

    // German and Portuguese
    page.drawTextBox(72, 720, 450, 20,
        "Größe — Ação — Über");

    doc.writeTo(new FileOutputStream("output.pdf"));
}
```

This renders correctly when using the default Helvetica font (Base14). No font registration is required for Latin-1 text.

---

## Limitations

PDFixa Core does not support:

| Script | Examples | Available in |
|--------|----------|--------------|
| **Cyrillic** | Russian, Bulgarian, Serbian | PDFixa Pro |
| **Greek** | Modern Greek | PDFixa Pro |
| **Arabic** | Arabic, Persian, Urdu | PDFixa Pro |
| **Devanagari** | Hindi, Marathi, Nepali | PDFixa Pro |
| **CJK** | Chinese, Japanese, Korean | PDFixa Pro |
| **Hebrew** | Hebrew, Yiddish | PDFixa Pro |
| **Thai** | Thai | PDFixa Pro |
| **Other non-Latin scripts** | — | PDFixa Pro |

If your application passes text containing characters outside the WinAnsiEncoding range, PDFixa Core will either skip the characters silently or render a replacement glyph, depending on the font. There is no runtime exception for unsupported characters.

**If your application targets international users, do not rely on Core for text rendering outside Western European languages.**

---

## When to use PDFixa Pro

PDFixa Pro extends the font pipeline with a full Unicode shaping engine. It covers:

- **Full Unicode** — any character from U+0000 to U+FFFF and beyond, including all the scripts listed above
- **Custom font embedding** — embed any TrueType or OpenType font and render text from its full glyph table
- **Font subsetting** — only the glyphs actually used are embedded, keeping file sizes small even for large CJK fonts
- **Advanced typography** — OpenType features: ligatures, kerning pairs, contextual alternates, mark positioning
- **Bidirectional text** — Arabic and Hebrew right-to-left text with correct character shaping

If your application generates documents in Russian, Chinese, Arabic, Greek, Hindi, or any other non-Latin language, PDFixa Pro is the correct choice.

---

## Best practices

**Stick to Latin-1 in Core.**
If your application only generates documents in Western European languages, PDFixa Core is sufficient and requires no configuration. Do not attempt to force Unicode characters through Core — the output will be incorrect.

**Validate text before rendering.**
If your application accepts user input or pulls text from a database, validate that the text falls within the WinAnsiEncoding range before passing it to `drawTextBox`. Characters outside the range will not render correctly.

```java
// Simple validation example — reject characters above U+00FF
static boolean isWinAnsiSafe(String text) {
    return text.chars().allMatch(c -> c <= 0x00FF);
}

if (!isWinAnsiSafe(customerName)) {
    // fallback: transliterate, truncate, or reject the input
}
```

**Use Pro for international applications.**
If your target audience includes users in Russia, China, Japan, Korea, the Middle East, or South Asia, use PDFixa Pro from the start. Retrofitting Unicode support into a Core-based document generator is non-trivial.

**Do not mix encodings.**
If you embed a custom TrueType font that covers a wider glyph range than WinAnsiEncoding, Core will only subset the Latin-1 glyphs. Text in other scripts will not render even if the font file supports them. In this case, upgrade to Pro to use the full font glyph table.

---

## Related pages

- [Fonts](/docs/features/fonts) — Base14 fonts and TrueType embedding in Core
- [Core vs Pro](/docs/core-vs-pro) — full feature comparison
- [PDFixa Pro](/docs/pro) — Unicode, advanced typography, and font subsetting
