/** Rounded-left clip-path component. */
import type { FC } from 'react';

import type { ClipBaseProps } from './ClipBase';
import ClipBase from './ClipBase';

/**
 * Rounded-left shape: flat top-left, rounded top-right and bottom-right curves.
 * M 0,0 → L 0.5,0 — flat top edge to midpoint
 * A → 1,0.333     — rounded top-right corner
 * L 1,1 → 0.5,1   — right side and bottom edge
 * A → 0,0.667     — rounded bottom-left corner
 */
const ROUNDED_LEFT_SHAPE = {
  clipPathId: 'react-veil-rounded-left-definition',
  pathData: 'M 0,0 L 0.5,0 A 0.5,0.333 0 0,1 1,0.333 L 1,1 L 0.5,1 A 0.5,0.333 0 0,1 0,0.667 Z',
} as const;

/** Clips children into a rounded-left shape. */
const RoundedLeftClip: FC<ClipBaseProps> = (props) => (
  <ClipBase shape={ROUNDED_LEFT_SHAPE} {...props} />
);

export default RoundedLeftClip;
