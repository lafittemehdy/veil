# Veil Monorepo
[![pages-build-deployment](https://github.com/lafittemehdy/veil/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/lafittemehdy/veil/actions/workflows/pages/pages-build-deployment)

Hi there! This is the main spot for the Veil project.

It's a monorepo that currently holds:

*   **`react-veil/`**: A React component library for the Veil project. It offers simple wrapper components that use SVG clip-paths to give your images and videos some cool, modern framing.
    *   **The Veil Idea:** The core idea is to provide easy-to-use wrappers that apply stylish SVG clip-path frames to your visual content. Just wrap your existing `<img>`, `<video>`, or framework-specific image components (like Next.js `<Image>`) with a Veil component (e.g., `ArchClip`, `RoundedRectangleClip`).
    *   **Simple & Scalable:** Being SVG-based, these frames scale beautifully without quality loss and keep things lightweight. They currently default to a common `2:3` (portrait) aspect ratio, chosen for a pleasing look when showcasing items or portraits. The components aim for straightforward integration.
    *   **See `react-veil` in action:** The best way to see the current React components is on the [demo site](https://lafittemehdy.github.io/veil/) (which is built from the `docs/` folder).
*   **`docs/`**: The documentation and demo site, currently focused on the `react-veil` implementation.

## Getting Around

This project uses npm workspaces.

*   To work on the **documentation site**: `npm run dev --workspace=docs`
*   To build the **component library**: `npm run build --workspace=react-veil`
*   To build the **documentation site**: `npm run build --workspace=docs`

Check out the `package.json` in the root and in each workspace for more scripts.

---

That's pretty much it. Feel free to explore!