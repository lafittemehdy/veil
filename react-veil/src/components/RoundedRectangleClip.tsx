/** Rounded-rectangle clip-path component. */
import type { FC } from 'react';

import type { ClipBaseProps } from './ClipBase';
import ClipBase from './ClipBase';

/**
 * Rounded-rectangle shape: flat left side, rounded right-side curves.
 * M 0,0 → L 0.5,0 — flat top edge to midpoint
 * A → 1,0.333     — rounded top-right curve
 * L 1,0.667       — straight right edge
 * A → 0.5,1       — rounded bottom-right curve
 * L 0,1           — flat bottom edge
 */
const ROUNDED_RECTANGLE_SHAPE = {
  clipPathId: 'react-veil-rounded-rectangle-definition',
  pathData: 'M 0,0 L 0.5,0 A 0.5,0.333 0 0,1 1,0.333 L 1,0.667 A 0.5,0.333 0 0,1 0.5,1 L 0,1 Z',
} as const;

/** Clips children into a rounded rectangle shape. */
const RoundedRectangleClip: FC<ClipBaseProps> = (props) => (
  <ClipBase shape={ROUNDED_RECTANGLE_SHAPE} {...props} />
);

export default RoundedRectangleClip;
