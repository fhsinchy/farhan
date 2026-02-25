# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website (farhan.dev) built with Astro 5.x. Static site generator that fetches external RSS feeds at build time.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview production build locally
```

No test framework is configured. Deployment is automated via GitHub Actions to GitHub Pages on push to main.

## Styling

- NES.css framework (retro gaming aesthetic)
- Press Start 2P font (Google Fonts)
- Dark theme: #212529 background, #92cc41 accent
- Mobile breakpoint at 768px
- Scoped CSS within Astro components

## Environment Variables

See `.env.example` for required variables (site metadata, social links, Goodreads ID, RSS feed URL).
