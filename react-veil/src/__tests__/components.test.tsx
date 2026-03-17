/** Unit tests for all clip-path components. */
import type { FC, ReactNode } from 'react';

import { render, screen } from '@testing-library/react';
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

      const clipPath = container.querySelector(`clipPath#${expectedClipPathId}`);
      expect(clipPath).toBeInTheDocument();
      expect(clipPath).toHaveAttribute('clipPathUnits', 'objectBoundingBox');
    });

    it('uses the correct SVG path data', () => {
      const { container } = render(
        <Component>
          <span>content</span>
        </Component>,
      );

      const path = container.querySelector(`clipPath#${expectedClipPathId} path`);
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
      expect(wrapper).toHaveStyle(`clip-path: url(#${expectedClipPathId})`);
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
