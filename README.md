# UKHA Showroom

A quiet, image-led showroom website for UKHA.

**Live:** https://ukha-showroom.vercel.app

## Tech

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- Vercel

## Pages

- `/` - Landing
- `/menu` - Navigation
- `/collection` - Collection index
- `/collection/[slug]` - Collection gallery
- `/piece/[id]` - Piece details and inquiry
- `/archive-note` - Archive
- `/offline-shop` - Showroom information

## Content

Edit showroom content in:

```text
src/data/collections.ts
```

Add images to:

```text
public/images/ukha/
```

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm run lint
npm run build
```

## Deploy

```bash
npx vercel --prod --yes
```
