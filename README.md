# UKHA Showroom

A quiet showroom website for UKHA, built as a brand portfolio rather than a shopping mall.

The site is designed around slow viewing, handwritten navigation, warm paper tones, and image-first pages for collection, archive, and visit information.

[Live site](https://ukha-showroom.vercel.app)

## Overview

- Framework: Next.js 16
- UI: React 19, Tailwind CSS 4
- Motion: Framer Motion
- Deployment: Vercel
- Repository: `jordy9090/ukha-showroom`

## Site Map

- `/` - first landing view with the UKHA logo and scroll navigation
- `/menu` - handwritten navigation menu
- `/collection` - collection index
- `/collection/[slug]` - vertical collection gallery
- `/piece/[id]` - inquiry-based piece detail
- `/archive-note` - image-first archive area
- `/offline-shop` - visit and showroom information

## Content Editing

Most showroom content is managed through:

```txt
src/data/collections.ts
```

Product, archive, and visit images should be placed in:

```txt
public/images/ukha/
```

Then reference the file with `ukhaImage("filename.png")` inside `src/data/collections.ts`.

Handwritten navigation images live here:

```txt
public/images/ukha/nav-collection.png
public/images/ukha/nav-archive.png
public/images/ukha/nav-visit.png
public/images/ukha/nav-menu.png
```

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Checks

Run lint:

```bash
npm run lint
```

Run production build:

```bash
npm run build
```

## Deployment

Production is deployed on Vercel:

```txt
https://ukha-showroom.vercel.app
```

Deploy manually when needed:

```bash
npx vercel --prod --yes
```

## Notes

This project should stay minimal and showroom-focused.

Do not add cart, checkout, login, payment, database, or admin upload flows unless the direction changes. Product purchase remains inquiry-based for now.
