---
sidebar_position: 1
title: PDFixa Installation
description: Add PDFixa to your Maven or Gradle project. Java 17+, zero transitive dependencies, distributed via Maven Central.
keywords:
  - java pdf
  - pdf generation java
  - java pdf library
  - maven java pdf
  - gradle java pdf
---

# Installation

PDFixa is distributed via Maven Central. No extra repositories are required.

## Maven

Add the dependency to your `pom.xml`:

```xml
<dependency>
    <groupId>dev.offixa</groupId>
    <artifactId>pdfixa</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Gradle (Groovy)

```groovy
implementation 'dev.offixa:pdfixa:1.0.0'
```

## Gradle (Kotlin DSL)

```kotlin
implementation("dev.offixa:pdfixa:1.0.0")
```

## Requirements

| Requirement | Value |
|---|---|
| Java | 17 or later |
| Transitive dependencies | None |
| Distribution | Maven Central |

No extra repositories, no native libraries, no runtime agents — just one JAR.

After adding the dependency, follow the [Quick Start](./quick-start.md) guide to create your first PDF.
