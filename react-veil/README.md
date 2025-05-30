# React Veil 🖼️

[![npm version](https://badge.fury.io/js/react-veil.svg)](https://badge.fury.io/js/react-veil)
[![pages-build-deployment](https://github.com/lafittemehdy/veil/actions/workflows/pages/pages-build-deployment/badge.svg?branch=main)](https://github.com/lafittemehdy/veil/actions/workflows/pages/pages-build-deployment)

Simple React components for framing your images and videos with SVG clip-paths.

**[✨ Live Demo & Docs ✨](https://lafittemehdy.github.io/veil/)**

## What it is

`react-veil` gives you a few wrapper components to easily apply stylish SVG frames to your media.

*   `ArchClip`
*   `RoundedRectangleClip`
*   `RoundedLeftClip`

They're SVG-based, so they scale nicely and are lightweight. They use a `2:3` (portrait) aspect ratio by default.

## Installation

```bash
npm install react-veil
# or
yarn add react-veil
```

## Usage

Import the component you need and the library's CSS. Then, wrap your media element.

```jsx
import { ArchClip } from 'react-veil';
import 'react-veil/style.css'; // Main styles for the components

// Example in your component:
// You can control the size of the Veil component via its parent.
// The Veil component itself will take up 100% width of its parent.
<div style={{ width: '300px' /* or any size you need */ }}>
  <ArchClip>
    <img src="your-image.jpg" alt="My pic" />
  </ArchClip>
</div>

// Works with videos too!
<div style={{ width: '300px' }}>
  <RoundedRectangleClip>
    <video src="your-video.mp4" autoPlay loop muted playsInline />
  </RoundedRectangleClip>
</div>
```
Use `ArchClip`, `RoundedRectangleClip`, or `RoundedLeftClip` around your `<img>`, `<video>`, or even Next.js `<Image>` tags.

## Props

For the clipping components (`ArchClip`, `RoundedRectangleClip`, `RoundedLeftClip`):

*   `children`: `ReactNode` (Required) - Your image or video element.
*   `className`: `string` (Optional) - Custom CSS classes for the wrapper.

Check the **[Docs Site](https://lafittemehdy.github.io/veil/)** for live examples.

## Contributing

This library is part of the [Veil Monorepo](https://github.com/lafittemehdy/veil). Contributions are welcome there.

## License

MIT. See [LICENSE](https://github.com/lafittemehdy/veil/blob/main/LICENSE) in the main repo.
