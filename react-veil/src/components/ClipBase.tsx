/** Shared base component for all SVG clip-path shapes. */
import type { FC, ReactNode } from 'react';

import styles from './ClipBase.module.css';

/** Configuration for a specific clip-path shape. */
export interface ClipShapeConfig {
  /** Unique ID for the SVG clipPath definition. */
  clipPathId: string;
  /** SVG path data (d attribute) using objectBoundingBox units. */
  pathData: string;
}

/** Props shared by all clip components. */
export interface ClipBaseProps {
  /** Content to render inside the clipped container. */
  children: ReactNode;
  /** Optional additional CSS class name. */
  className?: string;
}

/**
 * Base component that renders an SVG clip-path definition
 * and applies it to a wrapper div.
 */
const ClipBase: FC<ClipBaseProps & { shape: ClipShapeConfig }> = ({
  children,
  className,
  shape,
}) => (
  <>
    <svg
      aria-hidden="true"
      height="0"
      style={{ opacity: 0, pointerEvents: 'none', position: 'absolute', zIndex: -1 }}
      width="0"
    >
      <defs>
        <clipPath clipPathUnits="objectBoundingBox" id={shape.clipPathId}>
          <path d={shape.pathData} />
        </clipPath>
      </defs>
    </svg>
    <div
      className={`${styles.clipWrapper} ${className || ''}`.trim()}
      style={{ clipPath: `url(#${shape.clipPathId})` }}
    >
      {children}
    </div>
  </>
);

export default ClipBase;
