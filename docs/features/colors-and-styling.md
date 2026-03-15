---
sidebar_position: 2
title: Java PDF Colors and Styling
description: Set text color, line color, fill color, and background rectangles in PDFixa using RGB values.
keywords:
  - java pdf
  - pdf generation java
  - java pdf color
  - java pdf styling
  - java pdf library
---

# Colors and Styling

PDFixa uses an RGB color model. Set colors on a page before calling draw methods; the color stays active until you change it.

## Set a color

```java
// setColor(red, green, blue) — each value 0–255
page.setColor(0, 0, 0);        // black  (default)
page.setColor(255, 0, 0);      // red
page.setColor(0, 102, 204);    // blue
page.setColor(255, 255, 255);  // white
```

## Text color

Set the color, then draw. All subsequent `drawTextBox` calls use that color. These examples assume fonts are already registered (see [Fonts](./fonts.md)):

```java
PdfFont boldFont    = doc.registerFont(/* bold .ttf bytes */);
PdfFont regularFont = doc.registerFont(/* regular .ttf bytes */);

page.setColor(30, 30, 30);     // near-black body text
page.drawTextBox(72, 750, 450, 20, "Section title", boldFont, 14);

page.setColor(100, 100, 100);  // grey secondary text
page.drawTextBox(72, 725, 450, 16, "Subtitle or caption", regularFont, 10);

page.setColor(0, 0, 0);        // reset to black
```

## Line color

```java
page.setColor(180, 180, 180);  // light grey rule
page.drawLine(72, 700, 523, 700);

page.setColor(0, 102, 204);    // accent color
page.drawLine(72, 698, 200, 698);  // short underline accent
```

## Fill color (background rectangles)

`fillRect` paints a solid rectangle. Draw it **before** any text that should appear on top.

```java
// Header bar
page.setColor(0, 51, 102);            // dark navy
page.fillRect(0, 800, 595, 42);       // full-width bar at top of A4

page.setColor(255, 255, 255);         // white text on dark background
page.drawTextBox(72, 810, 300, 20, "Monthly Report", boldFont, 14);
```

```java
// Highlighted row in a table
page.setColor(240, 246, 255);         // light blue tint
page.fillRect(72, 460, 451, 18);

page.setColor(0, 0, 0);               // black text on top
page.drawTextBox(76, 462, 447, 14, "Grand total", boldFont, 10);
```

## Rectangle outline

`drawRect` draws only the border, using the current color.

```java
page.setColor(200, 200, 200);         // grey border
page.drawRect(72, 200, 451, 120);     // box outline
```

## Color reset pattern

Always reset to black after a colored section so later draw calls aren't accidentally tinted:

```java
page.setColor(220, 53, 69);           // red alert text
page.drawTextBox(72, 680, 300, 16, "Overdue", boldFont, 10);
page.setColor(0, 0, 0);               // back to black
```

## Common palette

| Purpose | R | G | B | Hex |
|---------|---|---|---|-----|
| Body text | 0 | 0 | 0 | `#000000` |
| Secondary text | 100 | 100 | 100 | `#646464` |
| Rule / divider | 200 | 200 | 200 | `#c8c8c8` |
| Header background | 0 | 51 | 102 | `#003366` |
| Row highlight | 240 | 246 | 255 | `#f0f6ff` |
| Accent / link | 0 | 102 | 204 | `#0066cc` |
| Warning | 220 | 53 | 69 | `#dc3545` |
| Success | 40 | 167 | 69 | `#28a745` |
