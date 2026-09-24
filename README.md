# DermaLens Landing Page

Marketing landing page for [DermaLens](https://github.com/krez-dot/dermalenss), an Android app that
detects skin conditions on-device with a YOLOv11 model. Built as part of the DermaLens capstone
project at Tarlac State University (2026).

**Live site:** https://krez-dot.github.io/DermaLensLandingPage/

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Open [`index.html`](index.html) directly in a
browser, or serve the folder with any static file server:

```
npx serve .
```

## Structure

```
index.html    Page markup and content
styles.css    Styling, light/dark theme tokens, animations
script.js     Nav toggle, theme toggle, count-up stats, AI model chart, scroll reveal
assets/       Logo, social preview image, and the demo video (demo.mp4 + demo-poster.jpg)
```

## Deployment

Served via GitHub Pages from the `main` branch root. Pushing to `main` redeploys automatically.

## Notes

- Content (features, AI model stats, team roles) is sourced from the
  [DermaLens app repo's README](https://github.com/krez-dot/dermalenss#readme) — keep the two in
  sync if the model, features, or team change.
- "Download APK" links point to the built APK on Google Drive, since no GitHub release is published
  yet. Swap to a GitHub release link once one exists.
