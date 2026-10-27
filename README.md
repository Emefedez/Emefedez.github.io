# Emefedez's Lair (`emefedez.github.io`)

Personal website built with [Hugo](https://gohugo.io/), preserving the classic `fakewp2` aesthetic with Markdown content editing, automatic WebP image optimization, and a responsive category-tinted project grid.

## Editing Content

- **Landing Page Text**: Edit [`content/_index.md`](content/_index.md).
- **Projects Page Intro**: Edit [`content/projects/_index.md`](content/projects/_index.md).
- **Add or Edit a Project**: Create or edit a Markdown file in [`content/projects/`](content/projects/) (or run `hugo new content projects/my-project.md`).
  - Projects are automatically grouped adjacently by `category_weight` and styled according to `category_id` (`notes`, `hardware`, `security`, `software`, `webapps`).
  - High-resolution images placed in `assets/images/projects/` and referenced via `image: "images/projects/..."` are automatically converted and resized to `.webp` thumbnails with click-to-zoom.
- **Add a Blog Post**: Create a Markdown file in `content/posts/`—the right sidebar on the landing page will automatically list published posts.

## Local Preview

```bash
hugo server
```
