/** Verifies that the media demo gives users control over video motion. */
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import App from './App';

afterEach(cleanup);

it('offers video controls without starting automatic playback', () => {
  const { container } = render(<App />);
  const video = container.querySelector('video');
  expect(video).toHaveAttribute('controls');
  expect(video).not.toHaveAttribute('autoplay');
  expect(video).toHaveAccessibleName('Arch clipped video');
});
