import React, { type ReactNode } from 'react';
import styles from './ArchClip.module.css';

interface ArchClipProps {
  children: ReactNode;
  className?: string; // Allow for additional custom styling
}

const ArchClip: React.FC<ArchClipProps> = ({ children, className }) => {
  const clipPathId = "react-veil-arch-definition";

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute', zIndex: -1, opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d="M 0,0.333 A 0.5,0.333 0 0,1 0.5,0 A 0.5,0.333 0 0,1 1,0.333 L 1,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className={`${styles.archClipWrapper} ${className || ''}`.trim()}>
        {children}
      </div>
    </>
  );
};

export default ArchClip;