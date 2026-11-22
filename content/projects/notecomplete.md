---
title: "NoteComplete"
repo_url: "https://emefedez.github.io/NoteComplete/"
logo: "https://github.com/Emefedez/NoteComplete/raw/main/docs/images/banner.svg"
category: "Academic Tools"
category_short: "Academic Tools"
category_id: "academic"
category_weight: 1
weight: 1
tags:
  - "Reverse Engineering"
  - "Rust"
  - "WebAssembly"
---

A reader and editor for `.noteful`, `.goodnotes`, `.ntb` and other note-taking formats that runs entirely on your or computer and conserves most of its feature set on the web and phones. You can use local files or connect to online platforms to access your notes. 

Audio-to-text, OCR, automatic-quizzes, simplified chinese typing alongside character stroke drawing, and many more are some of the utilities this tool adds over Noteful.

**Context:**

Noteful's file format is undocumented, so this project reverse engineers it and builds a portable reader around a Rust core compiled to WebAssembly. It opens ink, text, PDF pages, images and synced audio. With time, this has developed into my main supporting app for taking notes alongside Noteful on my iPad.

> **Keep in mind:**
> While a big chunk of the **initial** reverse-engineering of the format was done manually by visualizing file Magic, creating notes with very limited elements and diffing, and using Ghidra to see how the official program interacts with files; the frontend has not (currently) been thoroughly technically revised, this is a work in progress however, since I do use this app to study myself. 
