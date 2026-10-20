# Veil Monorepo
[![CI](https://github.com/lafittemehdy/veil/actions/workflows/ci.yml/badge.svg)](https://github.com/lafittemehdy/veil/actions/workflows/ci.yml)

Hi there! This is the main spot for the Veil project.

It's a monorepo that currently holds:

*   **`react-veil/`**: A React component library for the Veil project. It offers simple wrapper components that use SVG clip-paths to give your images and videos some cool, modern framing.
    *   **The Veil Idea:** The core idea is to provide easy-to-use wrappers that apply stylish SVG clip-path frames to your visual content. Just wrap your existing `<img>`, `<video>`, or framework-specific image components (like Next.js `<Image>`) with a Veil component (e.g., `ArchClip`, `RoundedRectangleClip`).
    *   **Simple & Scalable:** Being SVG-based, these frames scale beautifully without quality loss and keep things lightweight. They currently default to a common `2:3` (portrait) aspect ratio, chosen for a pleasing look when showcasing items or portraits. The components aim for straightforward integration.
    *   **See `react-veil` in action:** The best way to see the current React components is on the [demo site](https://lafittemehdy.github.io/veil/) (which is built from the `docs/` folder).
*   **`docs/`**: The documentation and demo site, currently focused on the `react-veil` implementation.

## Getting Around

Use Node.js 22.22.2+, 24.15+, or 26+ with npm 12.2.0. Run `npm ci` at
the repository root; one root lockfile owns both npm workspaces. TypeScript
remains on 6.0.3, the newest release supported by the ESLint TypeScript parser.

Run `npm run check` for library and docs builds, lint, type checks, and tests.
`npm audit --audit-level=high` and `npm pack --workspace=react-veil --dry-run`
match the additional CI checks.

Clips use React `useId` so multiple instances and server hydration retain
independent definitions. For multiple independent React roots, use distinct
`identifierPrefix` values in your React root options.

Deploy the committed `main` branch with `gh workflow run pages.yml` or the
Pages workflow in GitHub Actions. Deployment no longer uses the `gh-pages` CLI.

*   To work on the **documentation site**: `npm run dev --workspace=docs`
*   To build the **component library**: `npm run build --workspace=react-veil`
*   To build the **documentation site**: `npm run build --workspace=docs`

Check out the `package.json` in the root and in each workspace for more scripts.

---

That's pretty much it. Feel free to explore!