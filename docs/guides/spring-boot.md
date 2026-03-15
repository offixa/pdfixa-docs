---
sidebar_position: 3
title: Spring Boot PDF Generation
description: Serve PDFs from Spring Boot — REST controller, service layer, response streaming, and deterministic caching.
keywords:
  - java pdf
  - spring boot pdf
  - pdf generation java
  - java pdf library
  - deterministic pdf
---

# Use with Spring Boot

Serve PDF files from a Spring Boot REST endpoint using PDFixa.

## No special setup needed

PDFixa has zero dependencies and no Spring integration layer — use it as a plain Java library inside any Spring component.

## Dependency

```xml
<dependency>
    <groupId>dev.offixa</groupId>
    <artifactId>pdfixa</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Service layer

Encapsulate PDF generation in a `@Service`:

```java
@Service
public class ReportService {

    public byte[] generateMonthlyReport(String period, List<SaleRecord> records) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try (PdfDocument doc = new PdfDocument()) {
            doc.setTitle("Sales Report — " + period);
            doc.setCreator("Acme Reports");

            PdfPage page = doc.addPage(595, 842);

            page.drawTextBox(72, 780, 450, 30,
                "Sales Report: " + period, 18);

            int y = 730;
            for (SaleRecord r : records) {
                page.drawTextBox(72, y, 350, 16, r.product(), 11);
                page.drawTextBox(430, y, 93, 16, String.valueOf(r.amount()), 11);
                y -= 18;
            }

            doc.writeTo(out);

        } catch (IOException e) {
            throw new RuntimeException("PDF generation failed", e);
        }

        return out.toByteArray();
    }
}
```

## Controller

Return the bytes as a `application/pdf` response:

```java
@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;
    private final SaleRepository saleRepository;

    public ReportController(ReportService reportService,
                            SaleRepository saleRepository) {
        this.reportService  = reportService;
        this.saleRepository = saleRepository;
    }

    @GetMapping(value = "/{period}", produces = "application/pdf")
    public ResponseEntity<byte[]> report(@PathVariable String period) {
        List<SaleRecord> records = saleRepository.findByPeriod(period);
        byte[] pdf = reportService.generateMonthlyReport(period, records);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"report-" + period + ".pdf\"")
            .body(pdf);
    }
}
```

## Streaming large PDFs

For very large PDFs, write directly to the `HttpServletResponse` output stream instead of buffering in memory:

```java
@GetMapping("/{period}/stream")
public void streamReport(@PathVariable String period,
                         HttpServletResponse response) throws Exception {
    response.setContentType("application/pdf");
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
        "attachment; filename=\"report-" + period + ".pdf\"");

    List<SaleRecord> records = saleRepository.findByPeriod(period);

    try (PdfDocument doc = new PdfDocument()) {
        doc.setTitle("Sales Report — " + period);
        PdfPage page = doc.addPage(595, 842);
        // ... draw content ...
        doc.writeTo(response.getOutputStream());
    }
}
```

## Caching

Because PDFixa output is deterministic, you can cache the result safely:

```java
@Service
public class CachedReportService {

    private final Map<String, byte[]> cache = new ConcurrentHashMap<>();
    private final ReportService reportService;

    public byte[] getOrGenerate(String period, List<SaleRecord> records) {
        // Include the input data in the key so different record sets do not collide.
        String cacheKey = period + ":" + records.hashCode();
        return cache.computeIfAbsent(cacheKey,
            k -> reportService.generateMonthlyReport(period, records));
    }
}
```

The cache key includes both the period and a hash of the input data. Same key → same bytes → safe to cache. If the data changes for the same period, a new PDF is generated.
