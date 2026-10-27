---
title: "NoteComplete"
repo_url: "https://github.com/Emefedez/NoteComplete"
logo: "https://github.com/Emefedez/NoteComplete/raw/main/docs/images/banner.svg"
category: "Web Apps"
category_short: "Web Apps"
category_id: "webapps"
category_weight: 5
weight: 1
tags:
  - "Reverse Engineering"
  - "Rust"
  - "WebAssembly"
  - "TODO"
---

A reader and editor for Noteful notes that runs entirely in your browser, on phone or computer. You can use local files or Google Drive Oauth to access your notes.

Audio-to-text, OCR, automatic-quizzes and more are some of the utilities this tool adds over base Noteful.

**Context:**

Noteful's file format is undocumented, so this project reverse engineers it and builds a portable reader around a Rust core compiled to WebAssembly. It opens ink, text, PDF pages, images and synced audio.

> **Keep in mind:**
> While a big chunk of the reverse-engineering of the format was done manually by visualizing file Magic, creating notes with very limited elements and diffing, and using Ghidra to see how the official program interacts with files; the frontend has not (currently) been thoroughly technically revised, this is a work in progress however, since I do use this app to study myself. 