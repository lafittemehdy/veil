/** Unit tests for all clip-path components. */
import type { FC, ReactNode } from 'react';

import { act, render, screen } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ArchClip, RoundedLeftClip, RoundedRectangleClip } from '../index';

/**
 * Shared test suite factory for clip components.
 * Each component renders an SVG clipPath definition and a clipped wrapper div.
 */
function describeClipComponent(
  name: string,
  Component: FC<{ children: ReactNode; className?: string }>,
  expectedClipPathId: string,
  expectedPathFragment: string,
) {
  describe(name, () => {
    it('preserves server-generated IDs during hydration', async () => {
      const container = document.createElement('div');
      const content = <Component><span>server content</span></Component>;
      container.innerHTML = renderToString(content);
      const serverId = container.querySelector('clipPath')?.id;
      const errors: unknown[] = [];
      let root: ReturnType<typeof hydrateRoot>;
      await act(async () => {
        root = hydrateRoot(container, content, { onRecoverableError: (error) => errors.push(error) });
      });
      expect(container.querySelector('clipPath')?.id).toBe(serverId);
      expect(errors).toEqual([]);
      await act(async () => { root.unmount(); });
    });

    it('renders children content', () => {
      render(
        <Component>
          <img alt="test" src="test.jpg" />
        </Component>,
      );

      expect(screen.getByAltText('test')).toBeInTheDocument();
    });

    it('renders the hidden SVG element with aria-hidden', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('width', '0');
      expect(svg).toHaveAttribute('height', '0');
    });

    it('contains the correct clipPath ID in SVG defs', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const clipPath = container.querySelector('clipPath');
      expect(clipPath).toBeInTheDocument();
      expect(clipPath?.id).toMatch(new RegExp(`^${expectedClipPathId}-`));
      expect(clipPath).toHaveAttribute('clipPathUnits', 'objectBoundingBox');
    });

    it('uses the correct SVG path data', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const path = container.querySelector('clipPath path');
      expect(path).toBeInTheDocument();
      expect(path?.getAttribute('d')).toContain(expectedPathFragment);
    });

    it('applies clip-path inline style referencing the correct ID', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const wrapper = container.querySelector('div');
      const clipPath = container.querySelector('clipPath');
      expect(wrapper).toHaveStyle(`clip-path: url(#${clipPath?.id})`);
    });

    it('keeps each definition unique and valid when another instance unmounts', () => {
      const { container, rerender } = render(
        <>
          <Component key="first"><span>first</span></Component>
          <Component key="second"><span>second</span></Component>
        </>,
      );
      const ids = [...container.querySelectorAll('clipPath')].map((clip) => clip.id);
      expect(new Set(ids).size).toBe(2);
      const secondWrapper = screen.getByText('second').parentElement;
      expect(secondWrapper).toHaveStyle(`clip-path: url(#${ids[1]})`);

      rerender(<Component key="second"><span>second</span></Component>);
      expect(container.querySelector('clipPath')?.id).toBe(ids[1]);
      expect(screen.getByText('second').parentElement).toHaveStyle(`clip-path: url(#${ids[1]})`);
    });

    it('appends custom className when provided', () => {
      const { container } = render(
        <Component className="custom-class">
          <span>content</span>
        </Component>,
      );

      const wrapper = container.querySelector('div');
      expect(wrapper?.className).toContain('custom-class');
    });

    it('does not add trailing space when className is undefined', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const wrapper = container.querySelector('div');
      expect(wrapper?.className).not.toMatch(/\s$/);
    });

    it('renders multiple children', () => {
      render(
        <Component>
          <img alt="first" src="a.jpg" />
          <img alt="second" src="b.jpg" />
        </Component>,
      );

      expect(screen.getByAltText('first')).toBeInTheDocument();
      expect(screen.getByAltText('second')).toBeInTheDocument();
    });
  });
}

describeClipComponent(
  'ArchClip',
  ArchClip,
  'react-veil-arch-definition',
  'M 0,0.333',
);

describeClipComponent(
  'RoundedLeftClip',
  RoundedLeftClip,
  'react-veil-rounded-left-definition',
  'M 0,0 L 0.5,0',
);

describeClipComponent(
  'RoundedRectangleClip',
  RoundedRectangleClip,
  'react-veil-rounded-rectangle-definition',
  'M 0,0 L 0.5,0',
);
