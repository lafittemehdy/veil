/** Arch-shaped clip-path component. */
import type { FC } from 'react';

import type { ClipBaseProps } from './ClipBase';
import ClipBase from './ClipBase';

/**
 * Arch shape: two arcs forming the top, straight sides, and a flat bottom.
 * M 0,0.333   — start at left, 1/3 down
 * A → 0.5,0   — arc to top center
 * A → 1,0.333 — arc to right, 1/3 down
 * L 1,1 → 0,1 — straight edges along bottom
 */
const ARCH_SHAPE = {
  clipPathId: 'react-veil-arch-definition',
  pathData: 'M 0,0.333 A 0.5,0.333 0 0,1 0.5,0 A 0.5,0.333 0 0,1 1,0.333 L 1,1 L 0,1 Z',
} as const;

/** Clips children into an arch shape. */
const ArchClip: FC<ClipBaseProps> = (props) => (
  <ClipBase shape={ARCH_SHAPE} {...props} />
);

export default ArchClip;
